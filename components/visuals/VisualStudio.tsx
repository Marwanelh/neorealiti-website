'use client'

import { useState } from 'react'
import { demos, Demo } from './demos'

const categories = ['all', 'shader', 'generative', 'interactive', 'camera'] as const
type Category = typeof categories[number]

const categoryLabels: Record<string, string> = {
  all: 'All',
  shader: 'Shaders',
  generative: 'Generative',
  interactive: 'Interactive',
  camera: 'Camera / AR',
}

const techColors: Record<string, string> = {
  'GLSL / WebGL': '#008197',
  'Three.js': '#00A8BD',
  'p5.js': '#00C8DC',
  'GLSL / Raymarching': '#008197',
  'Camera / TF.js': '#00D4AA',
}

export default function VisualStudio() {
  const [active, setActive] = useState<Category>('all')
  const [selected, setSelected] = useState<Demo | null>(null)

  const filtered = active === 'all' ? demos : demos.filter(d => d.category === active)

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
            Immersive<br />
            <span className="neo-gradient-text">Experiences</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Real-time visuals built on GLSL shaders, Three.js, and generative algorithms.
            This is the technology behind our installations and holographic displays.
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
            <DemoCard key={demo.id} demo={demo} onOpen={() => setSelected(demo)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-600 text-sm uppercase tracking-widest">
            No visuals in this category yet
          </div>
        )}
      </section>

      {/* Viewer Modal */}
      {selected && (
        <VisualViewer demo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}

function DemoCard({ demo, onOpen }: { demo: Demo; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer border border-white/5 hover:border-[#008197]/30 bg-[#0B0F1A] transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className={`h-52 bg-gradient-to-br ${demo.thumbnail} relative overflow-hidden`}>
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(0,129,151,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,129,151,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 border border-white/20 flex items-center justify-center group-hover:border-[#008197] group-hover:bg-[#008197]/10 transition-all duration-300 backdrop-blur-sm">
            <svg className="w-5 h-5 text-white/60 group-hover:text-[#00C8DC] transition-colors ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        {/* Camera badge */}
        {demo.camera && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 border border-[#008197]/40 text-[#00C8DC] text-[9px] uppercase tracking-widest">
            ● AR
          </span>
        )}
        {/* Tech badge */}
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 border border-white/10 text-slate-400 text-[9px] uppercase tracking-widest">
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

function VisualViewer({ demo, onClose }: { demo: Demo; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#07080F] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold text-sm">{demo.title}</span>
          <span
            className="px-2 py-0.5 text-[9px] uppercase tracking-widest border"
            style={{ borderColor: `${techColors[demo.tech] || '#008197'}40`, color: techColors[demo.tech] || '#008197' }}
          >
            {demo.tech}
          </span>
          {demo.camera && (
            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Camera permission required</span>
          )}
        </div>
        <button
          onClick={onClose}
          className="px-5 py-2 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-[#07080F] transition-all duration-200"
        >
          Close
        </button>
      </div>

      {/* iframe */}
      <div className="flex-1 relative">
        <iframe
          srcDoc={demo.html}
          allow={demo.camera ? 'camera; microphone' : undefined}
          sandbox={demo.camera ? 'allow-scripts allow-same-origin' : 'allow-scripts'}
          className="absolute inset-0 w-full h-full border-0"
          title={demo.title}
        />
      </div>

      {/* Bottom bar */}
      <div className="px-6 py-2.5 border-t border-white/5 flex-shrink-0 flex items-center justify-between">
        <p className="text-slate-600 text-xs">{demo.description}</p>
        <span className="text-slate-700 text-[10px] uppercase tracking-widest">Neorealiti Visual Studio</span>
      </div>
    </div>
  )
}
