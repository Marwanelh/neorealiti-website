import BrandSwitcher from '@/components/BrandSwitcher'
import NeoNavigation from '@/components/neo/NeoNavigation'
import NeoHero from '@/components/neo/NeoHero'
import NeoAbout from '@/components/neo/NeoAbout'
import NeoClients from '@/components/neo/NeoClients'
import NeoServices from '@/components/neo/NeoServices'
import NeoVentures from '@/components/neo/NeoVentures'
import NeoBookingCalendar from '@/components/neo/NeoBookingCalendar'
import NeoContact from '@/components/neo/NeoContact'
import NeoFooter from '@/components/neo/NeoFooter'

export default function Home() {
  return (
    <main>
      <BrandSwitcher />
      <NeoNavigation />
      <NeoHero />
      <NeoAbout />
      <NeoClients />
      <NeoServices />
      <NeoVentures />
      <NeoBookingCalendar />
      <NeoContact />
      <NeoFooter />
    </main>
  )
}
