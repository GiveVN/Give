import { Stat } from '@/components/catalyst/stat'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Link } from '@/components/catalyst/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Mock data functions
async function getEvent(id: string) {
  const events = [
    {
      id: '1',
      name: 'Bear Hug: Live in Concert',
      status: 'On Sale',
      date: 'May 25, 2024',
      time: '9:00 PM',
      location: 'Meadowlands Arena',
      imgUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      totalRevenue: '$35,000',
      totalRevenueChange: '+12%',
      ticketsSold: 350,
      ticketsAvailable: 500,
      ticketsSoldChange: '+5%',
      pageViews: '2,543',
      pageViewsChange: '+8%'
    },
    {
      id: '2',
      name: 'Six Fingers — DJ Set',
      status: 'Closed',
      date: 'May 20, 2024',
      time: '10:00 PM',
      location: 'Electric Ballroom',
      imgUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      totalRevenue: '$28,500',
      totalRevenueChange: '+8%',
      ticketsSold: 285,
      ticketsAvailable: 300,
      ticketsSoldChange: '+15%',
      pageViews: '1,892',
      pageViewsChange: '+12%'
    },
    {
      id: '3',
      name: 'We All Look The Same',
      status: 'On Sale',
      date: 'June 2, 2024',
      time: '8:30 PM',
      location: 'Madison Square Garden',
      imgUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      totalRevenue: '$52,000',
      totalRevenueChange: '+20%',
      ticketsSold: 520,
      ticketsAvailable: 800,
      ticketsSoldChange: '+25%',
      pageViews: '4,123',
      pageViewsChange: '+18%'
    },
    {
      id: '4',
      name: 'Viking People',
      status: 'On Sale',
      date: 'June 8, 2024',
      time: '7:00 PM',
      location: 'Brooklyn Bowl',
      imgUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      totalRevenue: '$18,200',
      totalRevenueChange: '+6%',
      ticketsSold: 182,
      ticketsAvailable: 250,
      ticketsSoldChange: '+10%',
      pageViews: '1,456',
      pageViewsChange: '+4%'
    }
  ]
  
  return events.find(event => event.id === id)
}

async function getEventOrders(eventId: string) {
  return [
    {
      id: '3000',
      date: 'Dec 9, 2024',
      customer: { name: 'Leslie Alexander' },
      amount: { usd: '$80.00' },
      url: `/catalyst/orders/3000`
    },
    {
      id: '3001',
      date: 'Dec 8, 2024',
      customer: { name: 'Michael Foster' },
      amount: { usd: '$120.00' },
      url: `/catalyst/orders/3001`
    },
    {
      id: '3002',
      date: 'Dec 7, 2024',
      customer: { name: 'Dries Vincent' },
      amount: { usd: '$160.00' },
      url: `/catalyst/orders/3002`
    },
    {
      id: '3003',
      date: 'Dec 6, 2024',
      customer: { name: 'Lindsay Walton' },
      amount: { usd: '$200.00' },
      url: `/catalyst/orders/3003`
    }
  ]
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let event = await getEvent(params.id)

  return {
    title: event?.name,
  }
}

export default async function Event({ params }: { params: { id: string } }) {
  let event = await getEvent(params.id)
  let orders = await getEventOrders(params.id)

  if (!event) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/catalyst/events" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Events
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img className="aspect-3/2 rounded-lg shadow-sm" src={event.imgUrl} alt="" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading className="text-white">{event.name}</Heading>
              <Badge color={event.status === 'On Sale' ? 'lime' : 'zinc'}>{event.status}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-400">
              {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Edit</Button>
          <Button>View</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Total revenue" value={event.totalRevenue} change={event.totalRevenueChange} />
        <Stat
          title="Tickets sold"
          value={`${event.ticketsSold}/${event.ticketsAvailable}`}
          change={event.ticketsSoldChange}
        />
        <Stat title="Pageviews" value={event.pageViews} change={event.pageViewsChange} />
      </div>
      <Subheading className="mt-12 text-white">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-400">{order.date}</TableCell>
              <TableCell className="text-white">{order.customer.name}</TableCell>
              <TableCell className="text-right text-white">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
} 