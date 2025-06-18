"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

import { SetPasswordForm } from "./_components/SetPasswordForm"

/**
 * Page logic:
 * 1. If Strapi redirects with `code=<token>` → user still needs to set password.
 * 2. If no `code` param (standard email-confirmation redirect) → account is already confirmed,
 *    show success notice & link to sign-in.
 */
export default function ActivateAccountPage() {
  const t = useTranslations("auth.accountActivation")
  const params = useSearchParams()

  const code = params.get("code") as string | null
  const name = params.get("name") as string | null
  const email = params.get("email") as string | null

  if (code) {
    // Require user to set their initial password
    return <SetPasswordForm accountActivation />
  }

  // Success screen – email already confirmed
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <h4 className="text-2xl">
        {name ? `${t("welcome")}, ${name}!` : t("status.success")}
      </h4>
      <p className="text-base text-center max-w-sm">
        {t("emailConfirmed", { email: email ?? "" })}
      </p>
      <Button asChild variant="default">
        <a href="/auth/signin">{t("signInLink")}</a>
      </Button>
    </div>
  )
}
