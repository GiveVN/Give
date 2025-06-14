'use client'

import { Input } from '@/components/catalyst/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/catalyst/listbox'
import { useState } from 'react'

// Mock data cho countries
const countries = [
  {
    code: 'CA',
    name: 'Canada',
    flagUrl: 'https://flagcdn.com/w20/ca.png',
    regions: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan']
  },
  {
    code: 'US',
    name: 'United States',
    flagUrl: 'https://flagcdn.com/w20/us.png',
    regions: ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania']
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flagUrl: 'https://flagcdn.com/w20/gb.png',
    regions: ['England', 'Scotland', 'Wales', 'Northern Ireland']
  }
]

export function Address() {
  let [country, setCountry] = useState(countries[0])

  return (
    <div className="grid grid-cols-2 gap-6">
      <Input
        aria-label="Street Address"
        name="address"
        placeholder="Street Address"
        defaultValue="147 Catalyst Ave"
        className="col-span-2"
      />
      <Input aria-label="City" name="city" placeholder="City" defaultValue="Toronto" className="col-span-2" />
      <Listbox aria-label="Region" name="region" placeholder="Region" defaultValue="Ontario">
        {country.regions.map((region) => (
          <ListboxOption key={region} value={region}>
            <ListboxLabel>{region}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Input aria-label="Postal code" name="postal_code" placeholder="Postal Code" defaultValue="A1A 1A1" />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="code"
        value={country}
        onChange={(country) => setCountry(country)}
        className="col-span-2"
      >
        {countries.map((country) => (
          <ListboxOption key={country.code} value={country}>
            <img className="w-5 sm:w-4" src={country.flagUrl} alt="" />
            <ListboxLabel>{country.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  )
}
