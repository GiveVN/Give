"use client"

import React, { forwardRef, useId, useState } from "react"
import * as Headless from "@headlessui/react"
import { Dialog, DialogPanel } from "@headlessui/react"
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"
import { LayoutGroup, motion } from "framer-motion"

import { Button } from "@/components/ui/button"

import { TouchTarget } from "./button"
import { Link } from "./link"
import { Logo } from "./logo"

const navigation = [
  { name: "Discover", href: "/discover" },
  { name: "Start a campaign", href: "/start" },
  { name: "My campaigns", href: "/my-campaigns" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Left side - Logo + Menu */}
        <div className="flex items-center gap-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 flex items-center gap-3 p-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-green-600 to-green-700 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Give
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.slice(0, 2).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm leading-6 font-medium text-gray-700 transition-colors duration-200 hover:text-green-600"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Center - Search Bar (less rounded) */}
        <div className="hidden lg:flex lg:max-w-2xl lg:flex-1 lg:justify-center">
          <div className="relative w-full max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              placeholder="Search for campaigns, creators, or categories..."
              className="block w-full rounded-md border border-gray-300 bg-white py-3 pr-4 pl-12 text-sm leading-5 placeholder-gray-500 shadow-sm transition-shadow duration-200 hover:shadow-md focus:border-transparent focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="submit"
                className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Login + Start Campaign */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          <a
            href="/en/auth/signin"
            className="px-3 py-2 text-sm leading-6 font-medium text-gray-700 transition-colors duration-200 hover:text-green-600"
          >
            Sign in
          </a>
          <Button
            asChild
            className="rounded bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-green-700"
          >
            <a href="/start">Start a campaign</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 flex items-center gap-3 p-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-green-600 to-green-700">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Give</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Mobile Search - Less rounded */}
              <div className="py-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search campaigns, creators..."
                    className="block w-full rounded-md border border-gray-300 bg-white py-3 pr-4 pl-12 leading-5 placeholder-gray-500 shadow-sm focus:border-transparent focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded px-3 py-2 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="space-y-4 py-6">
                <a
                  href="/en/auth/signin"
                  className="-mx-3 block rounded px-3 py-2.5 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Sign in
                </a>
                <Button
                  asChild
                  className="w-full rounded bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                >
                  <a href="/start">Start a campaign</a>
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export function NavbarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
    />
  )
}

export function NavbarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  let id = useId()

  return (
    <LayoutGroup id={id}>
      <div {...props} className={clsx(className, "flex items-center gap-3")} />
    </LayoutGroup>
  )
}

export function NavbarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "-ml-4 flex-1")}
    />
  )
}

export const NavbarItem = forwardRef(function NavbarItem(
  {
    current,
    className,
    children,
    ...props
  }: { current?: boolean; className?: string; children: React.ReactNode } & (
    | Omit<Headless.ButtonProps, "as" | "className">
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  let classes = clsx(
    // Base
    "relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5",
    // Leading icon/icon-only
    "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
    // Trailing icon (down chevron or similar)
    "*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
    // Avatar
    "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6",
    // Hover
    "data-hover:bg-zinc-950/5 data-hover:*:data-[slot=icon]:fill-zinc-950",
    // Active
    "data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950",
    // Dark mode
    "dark:text-white dark:*:data-[slot=icon]:fill-zinc-400",
    "dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white",
    "dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white"
  )

  return (
    <span className={clsx(className, "relative")}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
        />
      )}
      {"href" in props ? (
        <Link
          {...props}
          className={classes}
          data-current={current ? "true" : undefined}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          <TouchTarget>{children}</TouchTarget>
        </Link>
      ) : (
        <Headless.Button
          {...props}
          className={clsx("cursor-default", classes)}
          data-current={current ? "true" : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  )
})

export function NavbarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={clsx(className, "truncate")} />
}
