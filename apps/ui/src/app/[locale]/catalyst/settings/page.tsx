import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { Divider } from '@/components/catalyst/divider'
import { Label } from '@/components/catalyst/fieldset'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { Text } from '@/components/catalyst/text'
import { Textarea } from '@/components/catalyst/textarea'
import type { Metadata } from 'next'
import { Address } from './address'

// Import ApplicationLayout từ trang home
import { ApplicationLayout } from '../page'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  return (
    <ApplicationLayout>
      <form method="post" className="mx-auto max-w-4xl">
        <Heading className="text-white">Settings</Heading>
        <Divider className="my-10 mt-6" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading className="text-white">Organization Name</Subheading>
            <Text className="text-zinc-400">This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading className="text-white">Organization Bio</Subheading>
            <Text className="text-zinc-400">This will be displayed on your public profile. Maximum 240 characters.</Text>
          </div>
          <div>
            <Textarea aria-label="Organization Bio" name="bio" />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading className="text-white">Organization Email</Subheading>
            <Text className="text-zinc-400">This is how customers can contact you for support.</Text>
          </div>
          <div className="space-y-4">
            <Input type="email" aria-label="Organization Email" name="email" defaultValue="info@example.com" />
            <CheckboxField>
              <Checkbox name="email_is_public" defaultChecked />
              <Label className="text-white">Show email on public profile</Label>
            </CheckboxField>
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading className="text-white">Address</Subheading>
            <Text className="text-zinc-400">This is where your organization is registered.</Text>
          </div>
          <Address />
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading className="text-white">Currency</Subheading>
            <Text className="text-zinc-400">The currency that your organization will be collecting.</Text>
          </div>
          <div>
            <Select aria-label="Currency" name="currency" defaultValue="cad">
              <option value="cad">CAD - Canadian Dollar</option>
              <option value="usd">USD - United States Dollar</option>
            </Select>
          </div>
        </section>

        <Divider className="my-10" soft />

        <div className="flex justify-end gap-4">
          <Button type="reset" plain>
            Reset
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </ApplicationLayout>
  )
}
