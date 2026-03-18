const steps = [
  {
    step: '01',
    icon: '🎯',
    title: 'Discovery',
    description: 'We deep-dive into your business, goals, and pain points. No guesswork — we build a complete picture before writing a single line of code.',
    color: '#7C3AED',
  },
  {
    step: '02',
    icon: '🗺️',
    title: 'Strategy',
    description: 'We craft a custom roadmap combining the right mix of AI, automation, and immersive tech to hit your specific targets.',
    color: '#9B59B6',
  },
  {
    step: '03',
    icon: '⚡',
    title: 'Build',
    description: 'Our team executes fast — deploying AI systems, web presence, holographic experiences, or automation workflows in sprints.',
    color: '#06B6D4',
  },
  {
    step: '04',
    icon: '🔁',
    title: 'Automate',
    description: 'We wire everything together — CRM, AI capture, follow-up sequences, analytics — so your business runs while you sleep.',
    color: '#00D4AA',
  },
  {
    step: '05',
    icon: '📊',
    title: 'Optimize',
    description: 'Real data drives real decisions. We track performance, iterate fast, and continuously improve your results.',
    color: '#10B981',
  },
  {
    step: '06',
    icon: '🚀',
    title: 'Scale',
    description: 'Once proven, we scale your systems — expanding reach, automating more, and building sustainable, compounding growth.',
    color: '#F59E0B',
  },
]

export default function HowItWorks() {
  return (
    <section id="process" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F1120]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <span className="text-xs text-teal-400 font-semibold uppercase tracking-widest">Our Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
            How We Build{' '}
            <span className="gradient-text-teal">Your Future</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            A proven 6-step process that takes you from idea to a fully automated,
            growth-ready business system.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1C1F35] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative group">
                <div className="p-7 rounded-2xl bg-[#07080F] border border-[#1C1F35] card-hover h-full">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${step.color}20`, border: `1px solid ${step.color}30` }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="text-5xl font-black opacity-20 leading-none"
                      style={{ color: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                  />
                </div>

                {/* Arrow connector (desktop) */}
                {i < steps.length - 1 && (i + 1) % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-14 -right-4 z-10 text-slate-600 text-xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Ready to start your transformation?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/30"
          >
            Book a Free Strategy Call
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
