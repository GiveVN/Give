'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/catalyst/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, CurrencyDollarIcon, PhotoIcon, TagIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Reward {
  title: string
  description: string
  amount: string
  limit?: string
  estimatedDelivery?: Date
}

export default function CreateCampaignPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('basics')
  
  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [category, setCategory] = useState('')
  const [fundingGoal, setFundingGoal] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [media, setMedia] = useState<File[]>([])
  const [videoUrl, setVideoUrl] = useState('')
  const [rewards, setRewards] = useState<Reward[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement API call to create campaign
      console.log('Creating campaign:', {
        title,
        description,
        shortDescription,
        category,
        fundingGoal,
        currency,
        startDate,
        endDate,
        media,
        videoUrl,
        rewards,
        tags
      })

      // Redirect to campaign page after creation
      router.push('/projects')
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addReward = () => {
    setRewards([...rewards, {
      title: '',
      description: '',
      amount: '',
      limit: '',
      estimatedDelivery: undefined
    }])
  }

  const updateReward = (index: number, field: keyof Reward, value: any) => {
    const newRewards = [...rewards]
    newRewards[index] = { ...newRewards[index], [field]: value }
    setRewards(newRewards)
  }

  const removeReward = (index: number) => {
    setRewards(rewards.filter((_, i) => i !== index))
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create Your Campaign</h1>
          <p className="text-muted-foreground mt-2">
            Share your vision and bring your project to life with the support of our community
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>
                    Tell us about your project and what you're trying to achieve
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Campaign Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Give your campaign a clear, attention-grabbing title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="A brief tagline for your campaign (max 160 characters)"
                      maxLength={160}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      {shortDescription.length}/160 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your project in detail. What problem are you solving? Why should people support you?"
                      rows={8}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="film">Film & Video</SelectItem>
                        <SelectItem value="games">Games</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="publishing">Publishing</SelectItem>
                        <SelectItem value="food">Food & Craft</SelectItem>
                        <SelectItem value="design">Design & Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Add tags separated by commas (e.g., innovation, sustainability, community)"
                      onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          <TagIcon className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="funding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Funding Details</CardTitle>
                  <CardDescription>
                    Set your funding goal and campaign duration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fundingGoal">Funding Goal *</Label>
                      <Input
                        id="fundingGoal"
                        type="number"
                        value={fundingGoal}
                        onChange={(e) => setFundingGoal(e.target.value)}
                        placeholder="0"
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency *</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="VND">VND - Vietnamese Dong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-medium mb-2">Campaign Duration</h4>
                    <p className="text-sm text-muted-foreground">
                      {startDate && endDate
                        ? `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days`
                        : 'Select start and end dates'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards</CardTitle>
                  <CardDescription>
                    Create rewards to incentivize backers to support your campaign
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rewards.map((reward, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Reward {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeReward(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={reward.title}
                            onChange={(e) => updateReward(index, 'title', e.target.value)}
                            placeholder="e.g., Early Bird Special"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={reward.description}
                            onChange={(e) => updateReward(index, 'description', e.target.value)}
                            placeholder="Describe what backers will receive"
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Minimum Amount ({currency})</Label>
                            <Input
                              type="number"
                              value={reward.amount}
                              onChange={(e) => updateReward(index, 'amount', e.target.value)}
                              placeholder="0"
                              min="1"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Limit (optional)</Label>
                            <Input
                              type="number"
                              value={reward.limit}
                              onChange={(e) => updateReward(index, 'limit', e.target.value)}
                              placeholder="Unlimited"
                              min="1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addReward}
                    className="w-full"
                  >
                    Add Reward
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>
                    Add images and videos to showcase your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="media">Project Images</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label
                          htmlFor="media"
                          className="cursor-pointer text-sm font-medium text-primary hover:underline"
                        >
                          <span>Upload images</span>
                          <input
                            id="media"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files) {
                                setMedia(Array.from(e.target.files))
                              }
                            }}
                          />
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    {media.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {media.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="rounded-lg object-cover w-full h-24"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL (optional)</Label>
                    <Input
                      id="videoUrl"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Add a YouTube or Vimeo link to showcase your project
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/projects')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title || !description || !category || !fundingGoal || !startDate || !endDate}
            >
              {isSubmitting ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
} 