import type { Metadata } from "next"

import { Avatar } from "@/components/catalyst/avatar"
import { Button } from "@/components/catalyst/button"
import { Heading } from "@/components/catalyst/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst/table"

export const metadata: Metadata = {
  title: "Orders",
}

// Mock data cho orders
const orders = [
  {
    id: "3000",
    date: "Dec 9, 2024",
    customer: { name: "Leslie Alexander" },
    event: {
      name: "Bear Hug: Live in Concert",
      thumbUrl: "https://picsum.photos/24/24?random=1",
    },
    amount: { usd: "$80.00" },
    url: "/catalyst/orders/3000",
  },
  {
    id: "3001",
    date: "Dec 5, 2024",
    customer: { name: "Michael Foster" },
    event: {
      name: "Six Fingers — DJ Set",
      thumbUrl: "https://picsum.photos/24/24?random=2",
    },
    amount: { usd: "$299.00" },
    url: "/catalyst/orders/3001",
  },
  {
    id: "3002",
    date: "Nov 28, 2024",
    customer: { name: "Dries Vincent" },
    event: {
      name: "We All Look The Same",
      thumbUrl: "https://picsum.photos/24/24?random=3",
    },
    amount: { usd: "$150.00" },
    url: "/catalyst/orders/3002",
  },
  {
    id: "3003",
    date: "Nov 23, 2024",
    customer: { name: "Lindsay Walton" },
    event: {
      name: "Bear Hug: Live in Concert",
      thumbUrl: "https://picsum.photos/24/24?random=4",
    },
    amount: { usd: "$80.00" },
    url: "/catalyst/orders/3003",
  },
  {
    id: "3004",
    date: "Nov 18, 2024",
    customer: { name: "Courtney Henry" },
    event: {
      name: "Viking People",
      thumbUrl: "https://picsum.photos/24/24?random=5",
    },
    amount: { usd: "$114.99" },
    url: "/catalyst/orders/3004",
  },
]

export default function Orders() {
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Orders</Heading>
        <Button className="-my-0.5">Create order</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              href={order.url}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
