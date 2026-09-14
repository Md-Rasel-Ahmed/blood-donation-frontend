import Hero from '@/components/modules/homePage/Hero'
import HowItWork from '@/components/modules/homePage/HowItWork'
import SearchDonor from '@/components/modules/homePage/SearchDonor'
import WhyDonateSection from '@/components/modules/homePage/WhyDonateSection'

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <SearchDonor></SearchDonor>
      <HowItWork></HowItWork>
      <WhyDonateSection></WhyDonateSection>
    </div>
  )
}
