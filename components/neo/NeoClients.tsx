'use client'

import Image from 'next/image'

const clients = [
  { name: 'Muriya',              src: '/images/clients/muriya.png',             maxH: 78,  maxW: 273 },
  { name: 'Oman Airports',       src: '/images/clients/oman-airports-color.png',maxH: 110, maxW: 390 },
  { name: 'Oman Data Park',      src: '/images/clients/oman-datapark.png',      maxH: 110, maxW: 390 },
  { name: 'NRAA',                src: '/images/clients/nraa.png',               maxH: 110, maxW: 429 },
  { name: 'TAISM',               src: '/images/clients/taism.png',              maxH: 156, maxW: 234 },
  { name: 'MBRDI',               src: '/images/clients/mbrdi.png',              maxH: 141, maxW: 312 },
  { name: 'Muscat Municipality', src: '/images/clients/muscat.png',             maxH: 171, maxW: 234 },
]

export default function NeoClients() {
  return (
    <section className="py-20 bg-[#07080F] border-t border-[#1A2035]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-14">
          Trusted by leading organizations across the region
        </p>

        {/* Seamless scrolling marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #07080F, transparent)' }} />
          <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #07080F, transparent)' }} />

          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-28 px-14"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={280}
                  height={112}
                  className="w-auto object-contain opacity-60 hover:opacity-100 hover:drop-shadow-[0_0_12px_rgba(0,200,220,0.3)] transition-all duration-500"
                  style={{ maxHeight: client.maxH, maxWidth: client.maxW }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
