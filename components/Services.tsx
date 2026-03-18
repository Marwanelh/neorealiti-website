const services = [
  {
    icon: '🌐',
    category: 'Digital Presence',
    title: 'Web & Digital Presence',
    description:
      'From stunning websites to powerful landing pages — we make sure you\'re found, trusted, and converting online.',
    features: ['Custom Website Design', 'SEO Optimization', 'Landing Pages', 'Brand Identity'],
    accent: '#7C3AED',
  },
  {
    icon: '🤖',
    category: 'AI & Automation',
    title: 'AI Systems & Automation',
    description:
      'Replace repetitive tasks with intelligent systems. Lead capture, CRM automation, AI chatbots, and full workflow orchestration.',
    features: ['AI Chatbots', 'Lead Automation', 'CRM Integration', 'Workflow Orchestration'],
    accent: '#06B6D4',
  },
  {
    icon: '📈',
    category: 'Marketing & Growth',
    title: 'Marketing & Growth Engine',
    description:
      'Data-driven marketing that drives real revenue. Paid ads, social media, email sequences, and conversion optimization.',
    features: ['Paid Advertising', 'Social Media', 'Email Sequences', 'Analytics'],
    accent: '#EC4899',
  },
  {
    icon: '⚙️',
    category: 'Business Systems',
    title: 'Business Systems',
    description:
      'Build the operational backbone of your business. Dashboards, reporting systems, and scalable processes that deliver clarity.',
    features: ['KPI Dashboards', 'Process Design', 'Reporting Pipelines', 'CRM Setup'],
    accent: '#F59E0B',
  },
  {
    icon: '🔮',
    category: 'Immersive Tech',
    title: 'Holographic & AR Solutions',
    description:
      'From social AR campaigns to complex holographic command centers — we build multidimensional experiences that captivate.',
    features: ['Holographic Displays', 'AR Campaigns', 'Spatial Computing', 'Command Centers'],
    accent: '#00D4AA',
  },
  {
    icon: '🎓',
    category: 'Training & Upskilling',
    title: 'Future Tech Upskilling',
    description:
      'Hands-on training programs that bridge the gap between today\'s workforce and tomorrow\'s technology landscape.',
    features: ['AR/VR Training', 'AI Workshops', 'Tech Bootcamps', 'Corporate Programs'],
    accent: '#7C3AED',
  },
  {
    icon: '💡',
    category: 'Innovation',
    title: 'Innovation Consulting',
    description:
      'Our proven framework helps organizations adopt emerging technologies, embrace change, and stay ahead of the competition.',
    features: ['Innovation Audits', 'Tech Roadmaps', 'Pilot Programs', 'Change Management'],
    accent: '#06B6D4',
  },
  {
    icon: '🌟',
    category: 'Talent',
    title: 'Talent Development',
    description:
      'Oman\'s young population is its greatest asset. We identify, nurture, and catapult hidden talents into industry leaders.',
    features: ['Talent Scouting', 'Mentorship Programs', 'Career Pathways', 'Ecosystem Building'],
    accent: '#00D4AA',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#07080F]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-widest">What We Do</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
            Everything Your Business{' '}
            <span className="gradient-text">Needs to Win</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Eight powerful service areas covering AI, automation, immersive experiences,
            digital growth, and human potential.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-6 rounded-2xl bg-[#0F1120] border border-[#1C1F35] card-hover overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
              />

              {/* Icon */}
              <div className="mb-5">
                <span
                  className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${service.accent}20` }}
                >
                  {service.icon}
                </span>
              </div>

              <div
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: service.accent }}
              >
                {service.category}
              </div>
              <h3 className="text-base font-bold mb-3 leading-snug">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.description}</p>

              {/* Features */}
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: service.accent }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
