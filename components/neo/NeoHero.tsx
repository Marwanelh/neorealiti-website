'use client'

import { useEffect, useRef } from 'react'

export default function NeoHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const colors = ['#008197', '#00A8BD', '#00C8DC', '#00D4AA']
    const particles: { x: number; y: number; vx: number; vy: number; baseVx: number; baseVy: number; r: number; color: string }[] = []
    for (let i = 0; i < 80; i++) {
      const vx = (Math.random() - 0.5) * 0.4
      const vy = (Math.random() - 0.5) * 0.4
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx, vy, baseVx: vx, baseVy: vy,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let frame: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      for (const p of particles) {
        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180 && dist > 0) {
          const force = ((180 - dist) / 180) * 0.25
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        } else {
          // Drift back toward base velocity
          p.vx += (p.baseVx - p.vx) * 0.02
          p.vy += (p.baseVy - p.vy) * 0.02
        }
        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5 }

        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.7
        ctx.fill()
        ctx.globalAlpha = 1
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = '#008197'
            ctx.globalAlpha = (1 - dist / 120) * 0.25
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#07080F]">

      {/* Geometric triangle shapes — brand identity */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="1440,900 720,900 1440,120" fill="#00414F" opacity="0.55" />
        <polygon points="1440,900 900,900 1440,320" fill="#005F73" opacity="0.50" />
        <polygon points="1440,900 1060,900 1440,500" fill="#007A8E" opacity="0.45" />
        <polygon points="1440,900 1200,900 1440,680" fill="#008197" opacity="0.35" />
        <polygon points="1440,900 1320,900 1440,820" fill="#00A8BD" opacity="0.25" />
      </svg>

      {/* Animated canvas — interactive particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(0,129,151,0.10),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8DC] animate-pulse" />
            <span className="text-xs text-white/70 font-medium tracking-[0.2em] uppercase">Immersive Technology · Sultanate of Oman</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            <span className="text-white">We&apos;re Reimagining</span>
            <br />
            <span className="neo-gradient-text">How People Interact</span>
            <br />
            <span className="text-white">With The World.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed tracking-wide">
            Neorealiti pioneers immersive reality experiences — from immersive multi sensory interactive installations to AI-powered workflow automation — giving businesses across the Middle East a decisive edge.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-white/80 text-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-[#07080F] transition-all duration-300"
            >
              Book A Free Discovery Call
            </a>
            <a
              href="#ventures"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-white/30 text-white/70 text-xs font-semibold tracking-[0.25em] uppercase hover:border-white/70 hover:text-white transition-all duration-300"
            >
              Our Ventures
            </a>
            <a
              href="/visuals"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#008197]/40 text-[#00C8DC] text-xs font-semibold tracking-[0.25em] uppercase hover:border-[#008197] hover:bg-[#008197]/10 transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8DC]" />
              Visual Studio
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
            {[
              { value: '5+', label: 'Years of Innovation' },
              { value: '18+', label: 'Projects Delivered' },
              { value: '8+', label: 'Industries Served' },
              { value: '100%', label: 'Client Retention' },
            ].map(s => (
              <div key={s.label} className="p-6 bg-[#07080F]">
                <div className="text-3xl font-black neo-gradient-text">{s.value}</div>
                <div className="text-xs text-white/40 mt-1 tracking-[0.15em] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}
