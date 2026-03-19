const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Holographic Reality',
    desc: 'Delivering volumetric 3D displays and spatial computing experiences that go far beyond traditional screens.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2M20 9h2m-2 6h2" />
        <path d="M9 9 7 7m8 2 2-2M9 15l-2 2m10-2 2 2" />
      </svg>
    ),
    title: 'AI Automation',
    desc: 'Intelligent systems that streamline workflows, reduce overhead, and let your team focus on what matters most.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Immersive Engagement',
    desc: 'Augmented and mixed reality applications that transform how customers discover, explore and buy.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Regional Expertise',
    desc: "Deep roots in the Sultanate of Oman, with experience navigating the Gulf's unique enterprise landscape.",
  },
]

export default function NeoAbout() {
  return (
    <section id="about" className="py-28 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <span className="inline-block px-3 py-1 border border-[#008197]/30 bg-[#008197]/10 text-[#00C8DC] text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">
              About NeoRealiti
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Technology that<br />
              <span className="neo-gradient-text">closes the gap</span><br />
              between digital and real.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-5">
              We are an immersive technology company headquartered in Oman, building the bridge between digital innovation and real-world business impact. From bespoke holographic installations to AI-driven process automation, every solution we deliver is engineered for measurable results.
            </p>
            <p className="text-white/40 leading-relaxed">
              Our multi-disciplinary team combines hardware expertise, software craftsmanship, and strategic consulting — so you get not just a product, but a competitive advantage.
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/80 text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-[#07080F] transition-all duration-300"
              >
                See Our Services
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-white/60 text-xs font-semibold tracking-[0.2em] uppercase hover:border-white/50 hover:text-white transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(p => (
              <div
                key={p.title}
                className="p-6 border border-[#1A2035] bg-[#0F1420] hover:border-[#008197]/40 transition-colors group"
              >
                <div className="w-9 h-9 text-[#008197] mb-4 group-hover:text-[#00C8DC] transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-white font-bold mb-2 text-sm tracking-wide">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
