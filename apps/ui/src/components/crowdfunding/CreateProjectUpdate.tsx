"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileImage, Loader2, Pin, Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Validation schema
const createUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be under 200 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z
    .string()
    .max(300, "Excerpt must be under 300 characters")
    .optional(),
  isPublic: z.boolean().default(true),
  isPinned: z.boolean().default(false),
  images: z
    .array(z.instanceof(File))
    .max(5, "Maximum 5 images allowed")
    .optional(),
})

type CreateUpdateFormData = z.infer<typeof createUpdateSchema>

interface CreateProjectUpdateProps {
  projectId: string
  projectTitle: string
  onUpdateCreated?: () => void
  onCancel?: () => void
}

export default function CreateProjectUpdate({
  projectId,
  projectTitle,
  onUpdateCreated,
  onCancel,
}: CreateProjectUpdateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const form = useForm<CreateUpdateFormData>({
    resolver: zodResolver(createUpdateSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      isPublic: true,
      isPinned: false,
      images: [],
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newImages = Array.from(files)
    const totalImages = uploadedImages.length + newImages.length

    if (totalImages > 5) {
      toast.error("Too many images", {
        description: "You can upload maximum 5 images per update",
      })
      return
    }

    setUploadedImages((prev) => [...prev, ...newImages])
    form.setValue("images", [...uploadedImages, ...newImages])
  }

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index)
    setUploadedImages(newImages)
    form.setValue("images", newImages)
  }

  const onSubmit = async (data: CreateUpdateFormData) => {
    try {
      setIsSubmitting(true)

      // Create FormData for file uploads
      const formData = new FormData()

      // Add text fields
      formData.append(
        "data",
        JSON.stringify({
          Title: data.title,
          Content: data.content,
          Excerpt: data.excerpt || data.content.substring(0, 300),
          IsPublic: data.isPublic,
          IsPinned: data.isPinned,
          Project: projectId,
          publishedAt: new Date().toISOString(),
        })
      )

      // Add images if any
      if (data.images && data.images.length > 0) {
        data.images.forEach((file, index) => {
          formData.append(`files.Images`, file)
        })
      }

      const response = await fetch("/api/project-updates", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create update")
      }

      const result = await response.json()

      toast({
        title: "Update created successfully!",
        description:
          "Your project update has been published and supporters will be notified.",
      })

      // Reset form
      form.reset()
      setUploadedImages([])

      // Callback to parent
      onUpdateCreated?.()
    } catch (error) {
      console.error("Error creating update:", error)
      toast({
        title: "Error creating update",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Project Update
        </CardTitle>
        <CardDescription>
          Share progress, milestones, and news with your supporters for{" "}
          <strong>{projectTitle}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Major milestone reached - 50% completed!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A clear, engaging title that summarizes your update
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Content *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share detailed progress, challenges overcome, next steps, or any exciting news about your project..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use markdown formatting for better readability. Be detailed
                    and engaging.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Summary (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary for email notifications and previews..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    If left empty, we'll use the first 300 characters of your
                    content
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Images & Media (Optional)</Label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="h-24 w-full rounded-lg border object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                {uploadedImages.length < 5 && (
                  <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50">
                    <FileImage className="h-6 w-6 text-gray-400" />
                    <span className="mt-1 text-xs text-gray-500">
                      Add Image
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Upload up to 5 images to accompany your update
              </p>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 gap-6 rounded-lg bg-gray-50 p-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Public Update</FormLabel>
                      <FormDescription>
                        Visible to everyone or backers only
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPinned"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-1">
                        <Pin className="h-3 w-3" />
                        Pin Update
                      </FormLabel>
                      <FormDescription>
                        Pin to top of updates list
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 border-t pt-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
