import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format currency – tự động fallback sang USD nếu mã tiền tệ null/không hợp lệ
export function formatCurrency(
  amount: number,
  currency?: string | null
): string {
  const safeCurrency =
    currency && typeof currency === "string" && currency.trim()
      ? currency.trim().toUpperCase()
      : "USD"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: safeCurrency as string,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
