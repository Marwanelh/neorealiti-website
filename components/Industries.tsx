const industries = [
  { icon: '🏥', name: 'Healthcare', description: 'AI-powered patient intake, scheduling automation, and immersive training simulations.' },
  { icon: '🏗️', name: 'Real Estate', description: 'Virtual property tours, AR staging, automated lead follow-up, and CRM pipelines.' },
  { icon: '🛍️', name: 'Retail & E-Commerce', description: 'AR try-on experiences, smart inventory systems, and personalized automation flows.' },
  { icon: '🎓', name: 'Education', description: 'Immersive learning platforms, holographic classrooms, and AI tutoring systems.' },
  { icon: '🏛️', name: 'Government & Public', description: 'Holographic data visualization, citizen engagement platforms, and smart city tools.' },
  { icon: '⚡', name: 'Energy & Industry', description: 'Holographic command centers, AI monitoring, and predictive maintenance systems.' },
  { icon: '🎭', name: 'Events & Entertainment', description: 'Immersive brand activations, AR experiences, and automated event management.' },
  { icon: '🏦', name: 'Finance & Banking', description: 'AI client onboarding, automated reporting, and secure workflow orchestration.' },
]

const results = [
  { metric: '3×', label: 'Average output increase', sublabel: 'for clients using our AI systems' },
  { metric: '<60s', label: 'AI response time', sublabel: 'for lead capture and follow-up' },
  { metric: '+40%', label: 'Revenue growth', sublabel: 'reported by clients after 6 months' },
  { metric: '65%', label: 'Oman youth population', sublabel: 'under 29 — the talent we\'re unlocking' },
]

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F1120]" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Industries */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-widest">Industries We Serve</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
            Built for <span className="gradient-text">Every Sector</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Whether you're transforming customer experience or internal operations,
            our combined expertise covers every major industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group p-6 rounded-2xl bg-[#07080F] border border-[#1C1F35] card-hover"
            >
              <div className="text-3xl mb-4 w-14 h-14 rounded-xl bg-[#1C1F35] flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                {industry.icon}
              </div>
              <h3 className="text-base font-bold mb-2">{industry.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{industry.description}</p>
            </div>
          ))}
        </div>

        {/* Results section */}
        <div className="relative p-10 lg:p-16 rounded-3xl bg-gradient-to-br from-purple-600/10 to-cyan-500/10 border border-[#1C1F35] overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/15 rounded-full blur-[80px]" />

          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">
              Real Results. Real Business Impact.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              The numbers don't lie. Here's what our clients experience when AI meets immersive technology.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {results.map((r) => (
              <div key={r.label} className="text-center">
                <div className="text-5xl lg:text-6xl font-black holographic mb-2">{r.metric}</div>
                <div className="text-sm font-bold text-white mb-1">{r.label}</div>
                <div className="text-xs text-slate-500">{r.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
