const services = [
  {
    icon: '🔮',
    title: 'Holographic Displays',
    desc: 'Volumetric and holographic projection systems for retail, events, and enterprise showrooms. Partner-powered by Euclideon.',
    tags: ['Hardware', 'Installation'],
  },
  {
    icon: '🥽',
    title: 'Augmented & Mixed Reality',
    desc: 'Custom AR/MR applications for product visualization, training, and interactive marketing campaigns.',
    tags: ['AR', 'MR', 'Mobile'],
  },
  {
    icon: '🤖',
    title: 'AI Process Automation',
    desc: 'End-to-end workflow automation using large language models and computer vision — reducing manual effort by up to 80%.',
    tags: ['AI', 'LLM', 'Automation'],
  },
  {
    icon: '🏗️',
    title: 'Digital Twin Solutions',
    desc: 'Real-time 3D replicas of facilities and infrastructure for smarter operations, maintenance, and planning.',
    tags: ['3D', 'IoT', 'Analytics'],
  },
  {
    icon: '🛍️',
    title: 'Immersive Retail Experiences',
    desc: 'Transform physical stores with interactive displays, virtual try-ons, and data-driven engagement layers.',
    tags: ['Retail', 'AR', 'UX'],
  },
  {
    icon: '🎓',
    title: 'VR Training Simulations',
    desc: 'High-fidelity virtual environments for safety training, onboarding, and skills assessment — with measurable outcomes.',
    tags: ['VR', 'Training', 'Safety'],
  },
  {
    icon: '📊',
    title: 'Spatial Data Visualization',
    desc: 'Turn complex datasets into intuitive 3D environments — ideal for construction, energy, and logistics sectors.',
    tags: ['3D', 'Data', 'Dashboard'],
  },
  {
    icon: '🔗',
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
          <span className="inline-block px-3 py-1 rounded-full border border-[#008197]/30 bg-[#008197]/10 text-[#00C8DC] text-xs font-semibold uppercase tracking-widest mb-5">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Services built for the<br />
            <span className="neo-gradient-text">next frontier</span>
          </h2>
          <p className="text-slate-400 text-lg">
            From concept to deployment — we handle every layer of your immersive technology initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(s => (
            <div
              key={s.title}
              className="p-6 rounded-2xl border border-[#1A2035] bg-[#0B0F1A] card-hover group"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00C8DC] transition-colors">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold border border-[#008197]/20 bg-[#008197]/10 text-[#00A8BD]"
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #008197, #00C8DC)' }}
          >
            Discuss Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
