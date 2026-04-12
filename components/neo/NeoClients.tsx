'use client'

import Image from 'next/image'

const clients = [
  { name: 'Muscat Municipality', src: '/images/clients/muscat.png' },
  { name: 'MBRDI', src: '/images/clients/mbrdi.png' },
  { name: 'NRAA', src: '/images/clients/nraa.png' },
  { name: 'Oman Airports', src: '/images/clients/oman-airports-color.png' },
  { name: 'TAISM', src: '/images/clients/taism.png' },
  { name: 'Oman Data Park', src: '/images/clients/oman-datapark.webp' },
  { name: 'Mercedes-Benz', src: '/images/clients/mercedes.png' },
]

export default function NeoClients() {
  return (
    <section className="py-20 bg-[#07080F] border-t border-[#1A2035]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-12">
          Trusted by leading organizations across the region
        </p>

        {/* Seamless scrolling marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #07080F, transparent)' }} />
          <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #07080F, transparent)' }} />

          {/*
            Seamless loop: each item has px-10 (padding on both sides),
            so spacing is symmetric at loop boundary. Translate -50% = exact one full set.
          */}
          <div
            className="flex animate-marquee"
            style={{ width: 'max-content' }}
          >
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-16 px-10"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={160}
                  height={56}
                  className="h-10 w-auto object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
