import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown'
import { Heading } from '@/components/catalyst/heading'
import { Input, InputGroup } from '@/components/catalyst/input'
import { Link } from '@/components/catalyst/link'
import { Select } from '@/components/catalyst/select'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

// Import ApplicationLayout từ trang home
import { ApplicationLayout } from '../page'

export const metadata: Metadata = {
  title: 'Events',
}

// Mock data cho events
const events = [
  {
    id: '1',
    name: 'Bear Hug: Live in Concert',
    date: 'Dec 15, 2024',
    time: '8:00 PM',
    location: 'Madison Square Garden',
    imgUrl: 'https://picsum.photos/200/133?random=1',
    url: '/catalyst/events/1',
    ticketsSold: 2500,
    ticketsAvailable: 3000,
    status: 'On Sale'
  },
  {
    id: '2',
    name: 'Six Fingers — DJ Set',
    date: 'Dec 20, 2024',
    time: '10:00 PM',
    location: 'Brooklyn Bowl',
    imgUrl: 'https://picsum.photos/200/133?random=2',
    url: '/catalyst/events/2',
    ticketsSold: 800,
    ticketsAvailable: 1000,
    status: 'On Sale'
  },
  {
    id: '3',
    name: 'We All Look The Same',
    date: 'Jan 5, 2025',
    time: '7:30 PM',
    location: 'The Apollo Theater',
    imgUrl: 'https://picsum.photos/200/133?random=3',
    url: '/catalyst/events/3',
    ticketsSold: 0,
    ticketsAvailable: 1200,
    status: 'Coming Soon'
  },
  {
    id: '4',
    name: 'Viking People',
    date: 'Jan 12, 2025',
    time: '9:00 PM',
    location: 'Terminal 5',
    imgUrl: 'https://picsum.photos/200/133?random=4',
    url: '/catalyst/events/4',
    ticketsSold: 0,
    ticketsAvailable: 1500,
    status: 'Coming Soon'
  }
]

export default function Events() {
  return (
    <ApplicationLayout>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading className="text-white">Events</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search events&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create event</Button>
      </div>
      <ul className="mt-10">
        {events.map((event, index) => (
          <li key={event.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={event.id} className="flex gap-6 py-6">
                <div className="w-32 shrink-0">
                  <Link href={event.url} aria-hidden="true">
                    <img className="aspect-3/2 rounded-lg shadow-sm" src={event.imgUrl} alt="" />
                  </Link>
                </div>
                <div className="space-y-1.5">
                  <div className="text-base/6 font-semibold">
                    <Link href={event.url} className="text-white">{event.name}</Link>
                  </div>
                  <div className="text-xs/6 text-zinc-400">
                    {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
                  </div>
                  <div className="text-xs/6 text-zinc-400">
                    {event.ticketsSold}/{event.ticketsAvailable} tickets sold
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="max-sm:hidden" color={event.status === 'On Sale' ? 'lime' : 'zinc'}>
                  {event.status}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={event.url}>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ApplicationLayout>
  )
}
