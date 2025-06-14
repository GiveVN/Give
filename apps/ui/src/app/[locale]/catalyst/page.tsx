"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar } from "@/components/catalyst/avatar"
import { Badge } from "@/components/catalyst/badge"
import { Divider } from "@/components/catalyst/divider"
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/catalyst/dropdown"
import { Heading, Subheading } from "@/components/catalyst/heading"
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/catalyst/navbar"
import { Select, SelectOption } from "@/components/catalyst/select"
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/catalyst/sidebar"
import { SidebarLayout } from "@/components/catalyst/sidebar-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst/table"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid"
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid"

// Mock data from the original demo
const orders = [
  {
    id: "3000",
    url: "/catalyst/orders/3000",
    date: "Dec 9, 2024",
    customer: "Leslie Alexander",
    event: "Bear Hug: Live in Concert",
    amount: "$80.00",
    status: "Refunded"
  },
  {
    id: "3001",
    url: "/catalyst/orders/3001",
    date: "Dec 5, 2024",
    customer: "Michael Foster",
    event: "Six Fingers — DJ Set",
    amount: "$299.00",
    status: "Paid"
  },
  {
    id: "3002",
    url: "/catalyst/orders/3002",
    date: "Nov 28, 2024",
    customer: "Dries Vincent",
    event: "We All Look The Same",
    amount: "$150.00",
    status: "Paid"
  },
  {
    id: "3003",
    url: "/catalyst/orders/3003",
    date: "Nov 23, 2024",
    customer: "Lindsay Walton",
    event: "Bear Hug: Live in Concert",
    amount: "$80.00",
    status: "Paid"
  },
  {
    id: "3004",
    url: "/catalyst/orders/3004",
    date: "Nov 18, 2024",
    customer: "Courtney Henry",
    event: "Viking People",
    amount: "$114.99",
    status: "Paid"
  },
  {
    id: "3005",
    url: "/catalyst/orders/3005",
    date: "Nov 14, 2024", 
    customer: "Tom Cook",
    event: "Six Fingers — DJ Set",
    amount: "$299.00", 
    status: "Paid"
  },
  {
    id: "3006",
    url: "/catalyst/orders/3006",
    date: "Nov 10, 2024",
    customer: "Whitney Francis",
    event: "We All Look The Same",
    amount: "$150.00",
    status: "Paid"
  }
]

function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6 text-white">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8 text-white">{value}</div>
      <div className="mt-3 text-sm/6 text-zinc-400">
        <span className={change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}>{change}</span>{' '}
        <span>from last week</span>
      </div>
    </div>
  )
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="https://picsum.photos/40/40?random=user" square />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/catalyst/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/catalyst/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/catalyst/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/catalyst/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/catalyst/logout">
                  <ArrowUpIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="https://picsum.photos/16/16?random=logo" />
                <SidebarLabel>Catalyst</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/catalyst/teams/1">
                  <Avatar slot="icon" src="https://picsum.photos/16/16?random=team1" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/catalyst/teams/2">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/catalyst/teams/create">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/catalyst" current>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/catalyst/events">
                <Square2StackIcon />
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/catalyst/orders">
                <TicketIcon />
                <SidebarLabel>Orders</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/catalyst/settings">
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarHeading>Upcoming Events</SidebarHeading>
              <SidebarItem href="/catalyst/events/1">Bear Hug: Live in Concert</SidebarItem>
              <SidebarItem href="/catalyst/events/2">Six Fingers — DJ Set</SidebarItem>
              <SidebarItem href="/catalyst/events/3">We All Look The Same</SidebarItem>
              <SidebarItem href="/catalyst/events/4">Viking People</SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src="https://picsum.photos/40/40?random=erica" className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-white">Erica</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-400">
                      erica@example.com
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="top start">
                <DropdownItem href="/catalyst/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/catalyst/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/catalyst/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/catalyst/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/catalyst/logout">
                  <ArrowUpIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}

export default function Home() {
  return (
    <ApplicationLayout>
      <div className="max-w-2xl lg:max-w-none">
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl/8 font-semibold text-white">Good afternoon, Erica</h1>
        </div>
        
        <div className="mt-8 flex items-end justify-between gap-4">
          <h2 className="text-xl/8 font-semibold text-white">Overview</h2>
          <div className="flex gap-4">
            <Select name="period" className="min-w-40">
              <SelectOption value="last_week">Last week</SelectOption>
              <SelectOption value="last_two_weeks">Last two weeks</SelectOption>
              <SelectOption value="last_month">Last month</SelectOption>
              <SelectOption value="last_year">Last year</SelectOption>
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="text-sm/6 font-medium text-zinc-400">Total revenue</div>
            <div className="text-3xl/8 font-semibold text-white">$2.6M</div>
            <div className="text-sm/6 text-zinc-400">
              <span className="text-emerald-500">+4.5%</span> from last week
            </div>
          </div>
          <div>
            <div className="text-sm/6 font-medium text-zinc-400">Average order value</div>
            <div className="text-3xl/8 font-semibold text-white">$455</div>
            <div className="text-sm/6 text-zinc-400">
              <span className="text-rose-600">-0.5%</span> from last week
            </div>
          </div>
          <div>
            <div className="text-sm/6 font-medium text-zinc-400">Tickets sold</div>
            <div className="text-3xl/8 font-semibold text-white">5,888</div>
            <div className="text-sm/6 text-zinc-400">
              <span className="text-emerald-500">+4.5%</span> from last week
            </div>
          </div>
          <div>
            <div className="text-sm/6 font-medium text-zinc-400">Pageviews</div>
            <div className="text-3xl/8 font-semibold text-white">823,067</div>
            <div className="text-sm/6 text-zinc-400">
              <span className="text-emerald-500">+21.2%</span> from last week
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl/8 font-semibold text-white">Recent orders</h2>
        <div className="flow-root">
          <div className="mt-4 overflow-x-auto whitespace-nowrap">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left text-sm/6 text-white">
                <thead className="text-zinc-400">
                  <tr>
                    <th className="border-b border-b-white/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                      Order number
                    </th>
                    <th className="border-b border-b-white/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                      Purchase date
                    </th>
                    <th className="border-b border-b-white/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                      Customer
                    </th>
                    <th className="border-b border-b-white/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                      Event
                    </th>
                    <th className="border-b border-b-white/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-950/50">
                      <td className="border-b border-white/5 px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                        <div className="flex items-center gap-4">
                          <Link
                            href={order.url}
                            className="font-medium text-white hover:text-zinc-300"
                          >
                            Order #{order.id}
                          </Link>
                          <div className="text-zinc-400">
                            {order.id}
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-white/5 px-4 py-4 text-zinc-400 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                        <Link
                          href={order.url}
                          className="hover:text-zinc-300"
                        >
                          {order.date}
                        </Link>
                      </td>
                      <td className="border-b border-white/5 px-4 py-4 text-white first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                        <Link
                          href={order.url}
                          className="hover:text-zinc-300"
                        >
                          {order.customer}
                        </Link>
                      </td>
                      <td className="border-b border-white/5 px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                        <Link
                          href={order.url}
                          className="hover:text-zinc-300"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              className="size-6 rounded-full"
                              src={`https://picsum.photos/seed/${order.event.replace(/\s+/g, '')}/24/24`}
                              alt=""
                            />
                            <span className="text-white">{order.event}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="border-b border-white/5 px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]">
                        <Link
                          href={order.url}
                          className="hover:text-zinc-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-white">{order.amount}</span>
                            <span className={`inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-xs font-medium ${
                              order.status === 'Paid' 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  )
} 