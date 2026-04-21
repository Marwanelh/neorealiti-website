'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { demos, Demo } from './demos'

const categories = ['all', 'gamification', 'interactive', 'ai-ml', 'xr', 'data-viz', 'digital-twin', 'lab'] as const
type Category = typeof categories[number]

const categoryLabels: Record<string, string> = {
  all: 'All',
  gamification: 'Gamification',
  interactive: 'Interactive Installation',
  'ai-ml': 'AI / ML',
  xr: 'XR',
  'data-viz': 'Data Visualisation',
  'digital-twin': 'Digital Twin',
  lab: 'Lab',
}

const techColors: Record<string, string> = {
  'GLSL / WebGL': '#008197',
  'Three.js': '#00A8BD',
  'p5.js': '#00C8DC',
  'GLSL / Raymarching': '#008197',
  'Camera / TF.js': '#00D4AA',
  'p5.js / Camera': '#00C8DC',
  'p5.js / Optical Flow': '#00C8DC',
  'MediaPipe / Canvas': '#00D4AA',
  'ML5 / HandPose': '#00E5BB',
  'ML5 / FaceMesh': '#00E5BB',
}

export default function VisualStudio() {
  const [active, setActive] = useState<Category>('all')
  const visible = demos.filter(d => !d.hidden)
  const filtered = active === 'all' ? visible : visible.filter(d => d.category === active)

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#008197]/30 bg-[#008197]/5 text-[#00C8DC] text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8DC] animate-pulse" />
            Visual Studio
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
            Visual<br />
            <span className="neo-gradient-text">Studio</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Our expertise spans across experiential journeys, mixed reality applications, generative art installations, and interactive artworks. Our commitment to innovation drives us to explore the intersection of digital art, interactive design, and immersive storytelling.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${
                active === cat
                  ? 'border-[#008197] bg-[#008197]/10 text-[#00C8DC]'
                  : 'border-white/10 text-slate-500 hover:border-[#008197]/40 hover:text-slate-300'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(demo => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-600 text-sm uppercase tracking-widest">
            No visuals in this category yet
          </div>
        )}
      </section>
    </>
  )
}

function DemoCard({ demo }: { demo: Demo }) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [thumbSrc, setThumbSrc] = useState<string | null>(null)

  useEffect(() => {
    if (demo.camera) return // camera demos need permission — no auto preview
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setThumbSrc(`/api/visuals/${demo.id}`)
          observer.disconnect()
        }
      },
      { rootMargin: '150px', threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [demo.id, demo.camera])

  return (
    <div
      ref={cardRef}
      onClick={() => router.push(`/visuals/${demo.id}`)}
      className="group relative cursor-pointer border border-white/5 hover:border-[#008197]/30 bg-[#0B0F1A] transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="h-52 relative overflow-hidden bg-black">
        {/* Gradient bg — always present, fades behind live preview */}
        <div className={`absolute inset-0 bg-gradient-to-br ${demo.thumbnail} transition-opacity duration-700 ${thumbSrc ? 'opacity-0' : 'opacity-100'}`} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,129,151,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,129,151,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        {/* Live preview iframe (non-camera demos, lazy-loaded) */}
        {thumbSrc && (
          <iframe
            src={thumbSrc}
            className="absolute top-0 left-0 border-0 pointer-events-none"
            style={{ width: '1280px', height: '720px', transform: 'scale(0.29)', transformOrigin: 'top left' }}
            title=""
            tabIndex={-1}
          />
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-14 h-14 border border-white/20 flex items-center justify-center group-hover:border-[#008197] group-hover:bg-[#008197]/10 transition-all duration-300 backdrop-blur-sm">
            <svg className="w-5 h-5 text-white/60 group-hover:text-[#00C8DC] transition-colors ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        {/* Camera badge */}
        {demo.camera && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-black/60 border border-[#008197]/40 text-[#00C8DC] text-[9px] uppercase tracking-widest">
            ● CAM
          </span>
        )}
        {/* Controls badge */}
        {demo.controls && demo.controls.length > 0 && (
          <span className="absolute bottom-3 right-3 z-10 px-2 py-0.5 bg-black/60 border border-white/10 text-slate-500 text-[9px] uppercase tracking-widest">
            ⚙ Controls
          </span>
        )}
        {/* Tech badge */}
        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 bg-black/60 border border-white/10 text-slate-400 text-[9px] uppercase tracking-widest">
          {demo.tech}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-bold text-base">{demo.title}</h3>
          <div
            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
            style={{ backgroundColor: techColors[demo.tech] || '#008197' }}
          />
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">{demo.description}</p>
        {demo.hint && (
          <p className="mt-2 text-[10px] text-slate-600 uppercase tracking-wider">{demo.hint}</p>
        )}
        <div className="mt-4 flex items-center gap-2 text-[#008197] text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all">
          <span>Launch</span>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
