const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Holographic Displays',
    desc: 'Volumetric and holographic projection systems for retail, events, and enterprise showrooms. Partner-powered by Euclideon.',
    tags: ['Hardware', 'Installation'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Augmented & Mixed Reality',
    desc: 'Custom AR/MR applications for product visualization, training, and interactive marketing campaigns.',
    tags: ['AR', 'MR', 'Mobile'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2M20 9h2m-2 6h2" />
      </svg>
    ),
    title: 'AI Process Automation',
    desc: 'End-to-end workflow automation using large language models and computer vision — reducing manual effort by up to 80%.',
    tags: ['AI', 'LLM', 'Automation'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
        <path d="M7 8h10M7 12h6" />
      </svg>
    ),
    title: 'Digital Twin Solutions',
    desc: 'Real-time 3D replicas of facilities and infrastructure for smarter operations, maintenance, and planning.',
    tags: ['3D', 'IoT', 'Analytics'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: 'Immersive Retail Experiences',
    desc: 'Transform physical stores with interactive displays, virtual try-ons, and data-driven engagement layers.',
    tags: ['Retail', 'AR', 'UX'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: 'VR Training Simulations',
    desc: 'High-fidelity virtual environments for safety training, onboarding, and skills assessment — with measurable outcomes.',
    tags: ['VR', 'Training', 'Safety'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" />
      </svg>
    ),
    title: 'Spatial Data Visualization',
    desc: 'Turn complex datasets into intuitive 3D environments — ideal for construction, energy, and logistics sectors.',
    tags: ['3D', 'Data', 'Dashboard'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: 'Systems Integration',
    desc: 'Connect immersive tech with existing ERP, CRM, and IoT infrastructure for a seamless end-to-end stack.',
    tags: ['Integration', 'API', 'Enterprise'],
  },
]

export default function NeoServices() {
  return (
    <section id="services" className="py-28 bg-[#07080F] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 border border-[#008197]/30 bg-[#008197]/10 text-[#00C8DC] text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Services Built For The<br />
            <span className="neo-gradient-text">Next Frontier</span>
          </h2>
          <p className="text-white/50 text-lg">
            From concept to deployment — we handle every layer of your immersive technology initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {services.map(s => (
            <div
              key={s.title}
              className="p-6 bg-[#0B0F1A] hover:bg-[#0F1420] group transition-colors"
            >
              <div className="w-7 h-7 text-[#008197] mb-5 group-hover:text-[#00C8DC] transition-colors">
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-sm mb-2 tracking-wide group-hover:text-[#00C8DC] transition-colors">{s.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-semibold border border-[#008197]/20 bg-[#008197]/10 text-[#00A8BD] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/70 text-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-[#07080F] transition-all duration-300"
          >
            Discuss Your Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
