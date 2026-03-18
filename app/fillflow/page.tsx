import BrandSwitcher from '@/components/BrandSwitcher'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Technology from '@/components/Technology'
import Industries from '@/components/Industries'
import BookingCalendar from '@/components/BookingCalendar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function FillFlowPage() {
  return (
    <main>
      <BrandSwitcher />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Technology />
      <Industries />
      <BookingCalendar />
      <Contact />
      <Footer />
    </main>
  )
}
