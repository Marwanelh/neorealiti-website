import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NeoRealiti — AI & Immersive Technology',
  description: 'Reimagining how businesses interact with the world through AI automation, holographic technology, and immersive experiences.',
  keywords: ['AI', 'automation', 'holographic', 'immersive technology', 'Oman', 'NeoRealiti'],
  openGraph: {
    title: 'NeoRealiti — AI & Immersive Technology',
    description: 'Reimagining how businesses interact with the world through AI automation, holographic technology, and immersive experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#07080F] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
