const ventures = [
  {
    name: 'FillFlow',
    tagline: 'AI & Automation Platform',
    desc: 'Our AI automation branch — intelligent agents, workflow automation, and AI-powered lead generation that helps businesses scale without growing headcount.',
    href: '/fillflow',
    external: false,
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
    badge: 'New',
    icon: '⚡',
    highlights: ['AI Lead Generation', 'CRM Automation', 'Workflow Intelligence', 'Custom AI Agents'],
  },
  {
    name: 'Euclideon',
    tagline: 'Holographic Technology',
    desc: 'Our holographic technology partner — delivering world-class volumetric display systems, spatial computing hardware, and cutting-edge 3D visualization solutions to the Middle East.',
    href: 'https://www.euclideonme.com',
    external: true,
    color: '#00C8DC',
    gradient: 'linear-gradient(135deg, #008197, #00C8DC)',
    badge: null,
    icon: '🔮',
    highlights: ['Holographic Displays', 'Volumetric 3D', 'Spatial Computing', 'Enterprise AR'],
  },
]

export default function NeoVentures() {
  return (
    <section id="ventures" className="py-28 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#008197]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-[#008197]/30 bg-[#008197]/10 text-[#00C8DC] text-xs font-semibold uppercase tracking-widest mb-5">
            Our Ventures
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            The NeoRealiti<br />
            <span className="neo-gradient-text">ecosystem</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Specialized brands, unified vision — each venture tackles a distinct dimension of the immersive technology landscape.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {ventures.map(v => (
            <div
              key={v.name}
              className="relative p-8 rounded-3xl border border-[#1A2035] bg-[#0F1420] overflow-hidden group card-hover"
            >
              {/* Gradient accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: v.gradient }}
              />

              {/* Background glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-5 blur-3xl"
                style={{ background: v.color }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{v.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-white">{v.name}</h3>
                        {v.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {v.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium" style={{ color: v.color }}>{v.tagline}</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed mb-6">{v.desc}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {v.highlights.map(h => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        borderColor: `${v.color}30`,
                        backgroundColor: `${v.color}10`,
                        color: v.color,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <a
                  href={v.href}
                  {...(v.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                  style={{ background: v.gradient }}
                >
                  {v.external ? 'Visit Website' : 'Explore FillFlow'}
                  {v.external
                    ? <span className="text-xs opacity-70">↗</span>
                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                  }
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
