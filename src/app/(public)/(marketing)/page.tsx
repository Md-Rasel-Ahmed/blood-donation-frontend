import Hero from '@/components/modules/homePage/Hero'
import HowItWork from '@/components/modules/homePage/HowItWork'
import SearchDonor from '@/components/modules/homePage/SearchDonor'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <SearchDonor></SearchDonor>
      <HowItWork></HowItWork>
    </div>
  )
}
