import Hero from '@/components/modules/homePage/Hero'
import HowItWork from '@/components/modules/homePage/HowItWork'
import ImpactStatsSection from '@/components/modules/homePage/ImpactStatsSection'
import SearchDonor from '@/components/modules/homePage/SearchDonor'
import TestimonialsSection from '@/components/modules/homePage/TestimonialsSection'
import TopDonorsSection from '@/components/modules/homePage/TopDonorsSection'
import WhyDonateSection from '@/components/modules/homePage/WhyDonateSection'

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <SearchDonor></SearchDonor>
      <HowItWork></HowItWork>
      <WhyDonateSection></WhyDonateSection>
      <ImpactStatsSection></ImpactStatsSection>
      <TopDonorsSection/>
      <TestimonialsSection></TestimonialsSection>
    </div>
  )
}
