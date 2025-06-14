import { Avatar } from '@/components/catalyst/avatar'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/catalyst/description-list'
import { Divider } from '@/components/catalyst/divider'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Link } from '@/components/catalyst/link'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RefundOrder } from './refund'

// Mock data function
async function getOrder(id: string) {
  const orders = [
    {
      id: '3000',
      date: 'Dec 9, 2024',
      customer: { 
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        address: '123 Main St, New York, NY 10001',
        country: 'United States',
        countryFlagUrl: 'https://flagcdn.com/w20/us.png'
      },
      amount: { 
        usd: '$80.00',
        cad: '$108.00',
        fee: '$3.24',
        net: '$104.76'
      },
      payment: {
        transactionId: 'txn_1234567890',
        card: {
          type: 'Visa',
          number: '4242',
          expiry: '12/25'
        }
      },
      event: {
        name: 'Bear Hug: Live in Concert',
        url: '/catalyst/events/1',
        thumbUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: '3001',
      date: 'Dec 8, 2024',
      customer: { 
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        address: '456 Oak Ave, Los Angeles, CA 90210',
        country: 'United States',
        countryFlagUrl: 'https://flagcdn.com/w20/us.png'
      },
      amount: { 
        usd: '$120.00',
        cad: '$162.00',
        fee: '$4.86',
        net: '$157.14'
      },
      payment: {
        transactionId: 'txn_1234567891',
        card: {
          type: 'Mastercard',
          number: '5555',
          expiry: '10/26'
        }
      },
      event: {
        name: 'Six Fingers — DJ Set',
        url: '/catalyst/events/2',
        thumbUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: '3002',
      date: 'Dec 7, 2024',
      customer: { 
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        address: '789 Pine St, Chicago, IL 60601',
        country: 'United States',
        countryFlagUrl: 'https://flagcdn.com/w20/us.png'
      },
      amount: { 
        usd: '$160.00',
        cad: '$216.00',
        fee: '$6.48',
        net: '$209.52'
      },
      payment: {
        transactionId: 'txn_1234567892',
        card: {
          type: 'American Express',
          number: '3782',
          expiry: '08/27'
        }
      },
      event: {
        name: 'We All Look The Same',
        url: '/catalyst/events/3',
        thumbUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: '3003',
      date: 'Dec 6, 2024',
      customer: { 
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        address: '321 Elm Dr, Miami, FL 33101',
        country: 'United States',
        countryFlagUrl: 'https://flagcdn.com/w20/us.png'
      },
      amount: { 
        usd: '$200.00',
        cad: '$270.00',
        fee: '$8.10',
        net: '$261.90'
      },
      payment: {
        transactionId: 'txn_1234567893',
        card: {
          type: 'Visa',
          number: '4111',
          expiry: '06/28'
        }
      },
      event: {
        name: 'Viking People',
        url: '/catalyst/events/4',
        thumbUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
      }
    }
  ]
  
  return orders.find(order => order.id === id)
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let order = await getOrder(params.id)

  return {
    title: order && `Order #${order.id}`,
  }
}

export default async function Order({ params }: { params: { id: string } }) {
  let order = await getOrder(params.id)

  if (!order) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/catalyst/orders" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orders
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading className="text-white">Order #{order.id}</Heading>
          <Badge color="lime">Successful</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>US{order.amount.usd}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {order.payment.card.type}{' '}
                <span>
                  <span aria-hidden="true">••••</span> {order.payment.card.number}
                </span>
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.date}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <RefundOrder outline amount={order.amount.usd}>
              Refund
            </RefundOrder>
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading className="text-white">Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Customer</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.customer.name}</DescriptionDetails>
          <DescriptionTerm>Event</DescriptionTerm>
          <DescriptionDetails>
            <Link href={order.event.url} className="flex items-center gap-2">
              <Avatar src={order.event.thumbUrl} className="size-6" />
              <span className="text-white">{order.event.name}</span>
            </Link>
          </DescriptionDetails>
          <DescriptionTerm>Amount</DescriptionTerm>
          <DescriptionDetails className="text-white">US{order.amount.usd}</DescriptionDetails>
          <DescriptionTerm>Amount after exchange rate</DescriptionTerm>
          <DescriptionDetails className="text-white">
            US{order.amount.usd} &rarr; CA{order.amount.cad}
          </DescriptionDetails>
          <DescriptionTerm>Fee</DescriptionTerm>
          <DescriptionDetails className="text-white">CA{order.amount.fee}</DescriptionDetails>
          <DescriptionTerm>Net</DescriptionTerm>
          <DescriptionDetails className="text-white">CA{order.amount.net}</DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading className="text-white">Payment method</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Transaction ID</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.payment.transactionId}</DescriptionDetails>
          <DescriptionTerm>Card number</DescriptionTerm>
          <DescriptionDetails className="text-white">•••• {order.payment.card.number}</DescriptionDetails>
          <DescriptionTerm>Card type</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.payment.card.type}</DescriptionDetails>
          <DescriptionTerm>Card expiry</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.payment.card.expiry}</DescriptionDetails>
          <DescriptionTerm>Owner</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.customer.name}</DescriptionDetails>
          <DescriptionTerm>Email address</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.customer.email}</DescriptionDetails>
          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails className="text-white">{order.customer.address}</DescriptionDetails>
          <DescriptionTerm>Country</DescriptionTerm>
          <DescriptionDetails>
            <span className="inline-flex gap-3 text-white">
              <img src={order.customer.countryFlagUrl} alt={order.customer.country} />
              {order.customer.country}
            </span>
          </DescriptionDetails>
          <DescriptionTerm>CVC</DescriptionTerm>
          <DescriptionDetails>
            <Badge color="lime">Passed successfully</Badge>
          </DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  )
} 