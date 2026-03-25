'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: '3×', label: 'Business Output' },
  { value: '<60s', label: 'AI Response Time' },
  { value: '+40%', label: 'Revenue Growth' },
  { value: '100%', label: 'Custom Solutions' },
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const colors = ['#7C3AED', '#06B6D4', '#00D4AA', '#EC4899']
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      baseVx: number; baseVy: number;
      size: number; opacity: number; color: string;
    }> = []

    for (let i = 0; i < 70; i++) {
      const vx = (Math.random() - 0.5) * 0.4
      const vy = (Math.random() - 0.5) * 0.4
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx, vy, baseVx: vx, baseVy: vy,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      particles.forEach((p, i) => {
        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = ((200 - dist) / 200) * 0.22
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        } else {
          p.vx += (p.baseVx - p.vx) * 0.02
          p.vy += (p.baseVy - p.vy) * 0.02
        }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5 }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()

        particles.slice(i + 1).forEach((p2) => {
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - d / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="absolute inset-0 grid-bg opacity-30 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          Reimagining How
          <br />
          <span className="holographic">Businesses Interact</span>
          <br />
          With The World
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-400 leading-relaxed mb-10">
          We combine cutting-edge <span className="text-purple-400 font-semibold">AI automation</span> with{' '}
          <span className="text-cyan-400 font-semibold">holographic &amp; immersive technology</span> to build
          the future of business — from Oman to the world.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#booking"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/80 text-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-[#07080F] transition-all duration-300"
          >
            Book A Free Strategy Call
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-[#0F1120]/60 border border-[#1C1F35] backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-[10px] text-slate-400 uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  )
}
