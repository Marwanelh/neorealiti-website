import BrandSwitcher from '@/components/BrandSwitcher'
import NeoNavigation from '@/components/neo/NeoNavigation'

export default function VisualsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07080F]">
      <BrandSwitcher />
      <NeoNavigation />
      <main>{children}</main>
    </div>
  )
}
