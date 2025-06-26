"use client"

import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { safeJSONParse } from "@/lib/general-helpers"
import { Link, useRouter } from "@/lib/navigation"
import { AppField } from "@/components/forms/AppField"
import { AppForm } from "@/components/forms/AppForm"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function SignInForm() {
  const t = useTranslations("auth.signIn")
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  const form = useForm<z.infer<FormSchemaType>>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { email: "", password: "" },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: z.infer<FormSchemaType>) {
    try {
      const res = await signIn("credentials", {
        ...values,
        callbackUrl,
        redirect: false,
      })

      if (!res?.error) {
        toast({ variant: "default", description: t("status.success") })
        // Force a hard refresh to ensure server components re-render with new session
        window.location.href = callbackUrl
      } else {
        let message = t("errors.CredentialsSignin")
        
        // Try to parse error as JSON, but handle non-JSON errors too
        if (res.error && res.error !== "CredentialsSignin") {
          try {
            const parsedError = JSON.parse(res.error)
            if (parsedError.message) {
              message = parsedError.message
            }
          } catch {
            // If not JSON, use the error string directly
            message = res.error
          }
        }

        toast({
          variant: "destructive",
          description: message,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: t("errors.CredentialsSignin"),
      })
    }
  }

  return (
    <Card className="m-auto w-[400px]">
      <CardHeader>
        <CardTitle>{t("header")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <AppForm form={form} onSubmit={onSubmit} id={signInFormName}>
          <AppField
            name="email"
            type="text"
            autoComplete="email"
            required
            label={t("email")}
          />
          <AppField
            name="password"
            type="password"
            // https://www.chromium.org/developers/design-documents/create-amazing-password-forms/
            autoComplete="current-password"
            required
            label={t("password")}
          />
        </AppForm>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Button 
          type="submit" 
          size="lg" 
          variant="default" 
          form={signInFormName}
          disabled={isSubmitting}
          className="relative"
        >
          {isSubmitting && (
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {isSubmitting ? t("status.signingIn") || "Signing in..." : t("submit")}
        </Button>

        <div className="mt-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/forgot-password">{t("forgotPassword")}?</Link>
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/register">{t("createAccount")}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const SignInFormSchema = z.object({
  email: z.string().min(1).email().or(z.string().min(1)),
  password: z.string().min(1),
})

type FormSchemaType = typeof SignInFormSchema

const signInFormName = "signInForm"
