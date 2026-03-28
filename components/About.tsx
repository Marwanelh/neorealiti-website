const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2M20 9h2m-2 6h2" />
      </svg>
    ),
    title: 'AI-First Solutions',
    description: 'We build intelligent systems that turn manual workflows into scalable growth engines — AI automation, smart capture, and workflow orchestration.',
    accent: 'from-purple-600/20 to-purple-600/5',
    border: 'border-purple-500/20',
    iconColor: '#7C3AED',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Immersive Technology',
    description: "Neorealiti pioneered holographic experiences in Oman. We're establishing new standards in AR, VR, and spatial computing for businesses.",
    accent: 'from-cyan-600/20 to-cyan-600/5',
    border: 'border-cyan-500/20',
    iconColor: '#06B6D4',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'Innovation Culture',
    description: 'We culture innovation, build frameworks for adoption, and help organizations stay ahead in a rapidly evolving technological landscape.',
    accent: 'from-teal-600/20 to-teal-600/5',
    border: 'border-teal-500/20',
    iconColor: '#00D4AA',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" />
      </svg>
    ),
    title: 'Results Driven',
    description: 'Every solution we build is measured by real business outcomes — more leads, faster responses, higher revenue, and deeper connections.',
    accent: 'from-pink-600/20 to-pink-600/5',
    border: 'border-pink-500/20',
    iconColor: '#EC4899',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F1120]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-widest">Who We Are</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight">
            Redefining Technology As A{' '}
            <span className="gradient-text">Means Of Engagement</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
            <span className="text-white font-semibold">Neorealiti</span> is redefining technology
            as a means of engaging audiences through stronger communication and building better
            channels for interacting with information. We're establishing a new standard of
            exciting, immersive experiences in Oman — giving businesses the chance to cultivate
            robust connections with consumers and bring new life to their strategies.
          </p>
        </div>

        {/* Mission visual */}
        <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-purple-600/10 to-cyan-500/10 border border-[#1C1F35] mb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-600/10 rounded-full blur-[80px]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-black mb-4">
                We do everything{' '}
                <span className="gradient-text">experiential.</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Experiential success comes from its unique capacity to connect emotionally
                through participation: to each other, to a story, to a cause, to a belief,
                or to a brand. It's indisputably effective at educating, empowering and
                inspiring — with proven success to drive sales, raise awareness, and grow advocacy.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="p-5 rounded-2xl bg-[#07080F]/60 border border-[#1C1F35] text-center min-w-[120px]">
                <div className="text-2xl font-black gradient-text mb-1">🇴🇲</div>
                <div className="text-xs text-slate-500">Based in Oman</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${pillar.accent} border ${pillar.border} card-hover`}
            >
              <div className="w-8 h-8 mb-4" style={{ color: pillar.iconColor }}>
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{pillar.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
