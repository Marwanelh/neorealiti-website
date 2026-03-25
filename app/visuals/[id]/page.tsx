'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRef, useState, useEffect, useCallback } from 'react'
import { demos, DemoControl } from '@/components/visuals/demos'

const techColors: Record<string, string> = {
  'GLSL / WebGL': '#008197',
  'Three.js': '#00A8BD',
  'p5.js': '#00C8DC',
  'GLSL / Raymarching': '#008197',
  'Camera / TF.js': '#00D4AA',
  'p5.js / Camera': '#00C8DC',
  'p5.js / Optical Flow': '#00C8DC',
  'MediaPipe / Canvas': '#00D4AA',
}

export default function DemoPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const [controlValues, setControlValues] = useState<Record<string, number | boolean>>({})

  const demo = demos.find(d => d.id === id)

  // Initialise control defaults
  useEffect(() => {
    if (!demo?.controls) return
    const defaults: Record<string, number | boolean> = {}
    demo.controls.forEach(c => { defaults[c.id] = c.default })
    setControlValues(defaults)
  }, [demo])

  const send = useCallback((msg: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage({ _src: 'neo', ...msg }, '*')
  }, [])

  const togglePause = () => {
    const next = !paused
    setPaused(next)
    send({ paused: next })
  }

  const reset = () => {
    setPaused(false)
    send({ reset: true })
  }

  const handleControl = (ctrl: DemoControl, value: number | boolean) => {
    setControlValues(prev => ({ ...prev, [ctrl.id]: value }))
    if (ctrl.id === 'speed') {
      send({ speed: value as number })
    } else {
      send({ ctrl: { [ctrl.id]: value } })
    }
  }

  const requestFullscreen = () => {
    const el = iframeRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
  }

  if (!demo) {
    return (
      <div className="fixed inset-0 bg-[#07080F] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest mb-4">Demo not found</p>
          <button
            onClick={() => router.push('/visuals')}
            className="px-6 py-2 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-[#07080F] transition-all"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  const accentColor = techColors[demo.tech] || '#008197'

  return (
    <div className="fixed inset-0 z-[200] bg-[#07080F] flex flex-col">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 flex-shrink-0 bg-[#07080F]/95 backdrop-blur-md">
        {/* Left: back + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => router.push('/visuals')}
            className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors flex-shrink-0"
            aria-label="Back to gallery"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest hidden sm:inline">Gallery</span>
          </button>

          <span className="text-white/20">|</span>

          <span className="text-white font-bold text-sm truncate">{demo.title}</span>

          <span
            className="hidden sm:inline px-2 py-0.5 text-[9px] uppercase tracking-widest border flex-shrink-0"
            style={{ borderColor: `${accentColor}40`, color: accentColor }}
          >
            {demo.tech}
          </span>

          {demo.camera && (
            <span className="hidden md:inline text-slate-500 text-[10px] uppercase tracking-wider flex-shrink-0">
              Camera required
            </span>
          )}
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Pause */}
          <button
            onClick={togglePause}
            title={paused ? 'Resume' : 'Pause'}
            className="p-2 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
          >
            {paused ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            )}
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            title="Reset"
            className="p-2 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.24"/>
            </svg>
          </button>

          {/* Fullscreen */}
          <button
            onClick={requestFullscreen}
            title="Fullscreen"
            className="p-2 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>

          {/* Controls panel toggle — only show if demo has controls */}
          {demo.controls && demo.controls.length > 0 && (
            <button
              onClick={() => setPanelOpen(!panelOpen)}
              className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest border transition-all ${
                panelOpen
                  ? 'border-[#008197] bg-[#008197]/10 text-[#00C8DC]'
                  : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
              }`}
            >
              Controls
            </button>
          )}
        </div>
      </div>

      {/* ── Main area: iframe + side panel ── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Demo iframe */}
        <iframe
          ref={iframeRef}
          src={`/api/visuals/${demo.id}`}
          allow={demo.camera ? 'camera; microphone' : undefined}
          className="flex-1 border-0 bg-black"
          title={demo.title}
        />

        {/* ── Controls side panel ── */}
        {panelOpen && demo.controls && demo.controls.length > 0 && (
          <div className="w-64 bg-[#0A0D18]/95 backdrop-blur-md border-l border-white/5 flex flex-col overflow-y-auto flex-shrink-0">
            <div className="px-5 py-4 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Controls</p>
            </div>

            <div className="px-5 py-4 space-y-6">
              {/* Playback */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-3">Playback</p>
                <div className="flex gap-2">
                  <button
                    onClick={togglePause}
                    className={`flex-1 py-2 text-[10px] font-semibold uppercase tracking-widest border transition-all ${
                      paused
                        ? 'border-[#008197] bg-[#008197]/10 text-[#00C8DC]'
                        : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {paused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={reset}
                    className="flex-1 py-2 text-[10px] font-semibold uppercase tracking-widest border border-white/10 text-slate-400 hover:border-white/20 hover:text-white transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Demo-specific controls */}
              {demo.controls.map(ctrl => (
                <ControlRow
                  key={ctrl.id}
                  ctrl={ctrl}
                  value={controlValues[ctrl.id] ?? ctrl.default}
                  onChange={val => handleControl(ctrl, val)}
                />
              ))}
            </div>

            {/* Hint */}
            {demo.hint && (
              <div className="mt-auto px-5 py-4 border-t border-white/5">
                <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">How To Use</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{demo.hint}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-5 py-2 border-t border-white/5 flex-shrink-0 flex items-center justify-between bg-[#07080F]/95">
        <p className="text-slate-600 text-[10px] truncate max-w-[60%]">{demo.description}</p>
        <span className="text-slate-700 text-[9px] uppercase tracking-widest flex-shrink-0">Neorealiti Visual Studio</span>
      </div>
    </div>
  )
}

function ControlRow({
  ctrl,
  value,
  onChange,
}: {
  ctrl: DemoControl
  value: number | boolean
  onChange: (val: number | boolean) => void
}) {
  if (ctrl.type === 'toggle') {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] uppercase tracking-widest text-slate-400">{ctrl.label}</label>
          <button
            onClick={() => onChange(!value)}
            className={`w-8 h-4 rounded-full transition-colors relative ${value ? 'bg-[#008197]' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    )
  }

  const numVal = value as number
  const pct = ctrl.min !== undefined && ctrl.max !== undefined
    ? ((numVal - ctrl.min) / (ctrl.max - ctrl.min)) * 100
    : 50

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] uppercase tracking-widest text-slate-400">{ctrl.label}</label>
        <span className="text-[10px] font-mono text-[#00C8DC]">
          {numVal.toFixed(ctrl.step && ctrl.step < 1 ? 1 : 0)}{ctrl.unit ?? ''}
        </span>
      </div>
      <div className="relative h-1 bg-white/5 rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-[#008197] rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={ctrl.min}
          max={ctrl.max}
          step={ctrl.step}
          value={numVal}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-4 -top-1.5"
        />
      </div>
    </div>
  )
}
