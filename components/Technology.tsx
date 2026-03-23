const HoloIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
)
const AiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2M20 9h2m-2 6h2" />
  </svg>
)
const ArIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const BizIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" />
  </svg>
)

const techs = [
  {
    title: 'Holographic Command Centers',
    description: 'Transform how your team interacts with data. Our holographic command center infrastructure turns complex multidimensional data into intuitive, immersive interfaces.',
    Icon: HoloIcon,
    iconColor: '#06B6D4',
    gradient: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/20',
    link: 'https://www.euclideonme.com',
    linkLabel: 'See Euclideon Tech',
  },
  {
    title: 'AI Capture & Lead Automation',
    description: 'Never lose a lead again. Our AI systems capture, qualify, and nurture leads 24/7 — responding in under 60 seconds and routing high-value prospects automatically.',
    Icon: AiIcon,
    iconColor: '#7C3AED',
    gradient: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-500/20',
    link: null,
    linkLabel: null,
  },
  {
    title: 'Augmented Reality Experiences',
    description: 'From social AR filters to enterprise-grade spatial computing — we create AR experiences that connect brands with consumers in ways previously impossible.',
    Icon: ArIcon,
    iconColor: '#00D4AA',
    gradient: 'from-teal-500/20 to-cyan-500/10',
    border: 'border-teal-500/20',
    link: null,
    linkLabel: null,
  },
  {
    title: 'Intelligent Business Systems',
    description: "CRM automation, analytics dashboards, AI-powered reporting — full operational clarity so you always know what's working and where to grow next.",
    Icon: BizIcon,
    iconColor: '#F59E0B',
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
            Built For The{' '}
            <span className="gradient-text-teal">Future Of Business</span>
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
                <div className="flex-shrink-0 mt-1" style={{ color: tech.iconColor }}>
                  <tech.Icon />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{tech.description}</p>
                  {tech.link && (
                    <a
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase border border-cyan-500/50 text-cyan-400 px-4 py-2 hover:bg-cyan-500/10 transition-colors"
                    >
                      {tech.linkLabel}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
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
