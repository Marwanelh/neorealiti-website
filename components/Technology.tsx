const techs = [
  {
    title: 'Holographic Command Centers',
    description:
      'Transform how your team interacts with data. Our holographic command center infrastructure turns complex multidimensional data into intuitive, immersive interfaces.',
    icon: '🔮',
    gradient: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/20',
    link: 'https://www.euclideonme.com',
    linkLabel: 'See Euclideon Tech →',
  },
  {
    title: 'AI Capture & Lead Automation',
    description:
      'Never lose a lead again. Our AI systems capture, qualify, and nurture leads 24/7 — responding in under 60 seconds and routing high-value prospects automatically.',
    icon: '🤖',
    gradient: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-500/20',
    link: null,
    linkLabel: null,
  },
  {
    title: 'Augmented Reality Experiences',
    description:
      'From social AR filters to enterprise-grade spatial computing — we create AR experiences that connect brands with consumers in ways previously impossible.',
    icon: '🥽',
    gradient: 'from-teal-500/20 to-cyan-500/10',
    border: 'border-teal-500/20',
    link: null,
    linkLabel: null,
  },
  {
    title: 'Intelligent Business Systems',
    description:
      'CRM automation, analytics dashboards, AI-powered reporting — full operational clarity so you always know what\'s working and where to grow next.',
    icon: '📊',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/20',
    link: null,
    linkLabel: null,
  },
]

const capabilities = [
  'Holographic Displays', 'AI Chatbots', 'AR/VR Experiences', 'Workflow Automation',
  'Lead Capture AI', 'CRM Integration', 'Spatial Computing', 'Analytics Dashboards',
  'Social AR', 'AI Content Generation', 'Smart Follow-Up', 'Process Orchestration',
]

export default function Technology() {
  return (
    <section id="technology" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#07080F]" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <span className="text-xs text-teal-400 font-semibold uppercase tracking-widest">Our Technology</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
            Built for the{' '}
            <span className="gradient-text-teal">Future of Business</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            We combine breakthrough immersive technologies with AI automation to create
            experiences and systems that didn't exist five years ago.
          </p>
        </div>

        {/* Tech cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {techs.map((tech) => (
            <div
              key={tech.title}
              className={`p-8 rounded-2xl bg-gradient-to-br ${tech.gradient} border ${tech.border} card-hover`}
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{tech.description}</p>
                  {tech.link && (
                    <a
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      {tech.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities tag cloud */}
        <div className="text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-8">Our Full Capability Stack</p>
          <div className="flex flex-wrap justify-center gap-3">
            {capabilities.map((cap, i) => {
              const colors = ['text-purple-400 border-purple-500/20 bg-purple-500/5',
                             'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
                             'text-teal-400 border-teal-500/20 bg-teal-500/5',
                             'text-pink-400 border-pink-500/20 bg-pink-500/5',
                             'text-amber-400 border-amber-500/20 bg-amber-500/5']
              return (
                <span
                  key={cap}
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${colors[i % colors.length]}`}
                >
                  {cap}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
