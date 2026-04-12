'use client'

import Image from 'next/image'

const clients = [
  { name: 'Muscat Municipality', src: '/images/clients/muscat.png' },
  { name: 'MBRDI', src: '/images/clients/mbrdi.png' },
  { name: 'NRAA', src: '/images/clients/nraa.png' },
  { name: 'Oman Airports', src: '/images/clients/oman-airports.png' },
  { name: 'TAISM', src: '/images/clients/taism.png' },
  { name: 'Oman Data Park', src: '/images/clients/oman-datapark.webp' },
  { name: 'Client', src: '/images/clients/client7.webp' },
]

export default function NeoClients() {
  return (
    <section className="py-20 bg-[#07080F] border-t border-[#1A2035]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-12">
          Trusted by leading organizations across the region
        </p>

        {/* Scrolling marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #07080F, transparent)' }} />
          <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #07080F, transparent)' }} />

          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-16 w-40"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={140}
                  height={56}
                  className="max-h-12 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300 filter brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
