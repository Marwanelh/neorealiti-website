import React from 'react'

const Ico = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {children}
  </svg>
)

const services = [
  {
    icon: <Ico><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Ico>,
    category: 'Digital Presence',
    title: 'Web & Digital Presence',
    description: "From stunning websites to powerful landing pages — we make sure you're found, trusted, and converting online.",
    features: ['Custom Website Design', 'SEO Optimization', 'Landing Pages', 'Brand Identity'],
    accent: '#7C3AED',
  },
  {
    icon: <Ico><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2M20 9h2m-2 6h2" /></Ico>,
    category: 'AI & Automation',
    title: 'AI Systems & Automation',
    description: 'Replace repetitive tasks with intelligent systems. Lead capture, CRM automation, AI chatbots, and full workflow orchestration.',
    features: ['AI Chatbots', 'Lead Automation', 'CRM Integration', 'Workflow Orchestration'],
    accent: '#06B6D4',
  },
  {
    icon: <Ico><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></Ico>,
    category: 'Marketing & Growth',
    title: 'Marketing & Growth Engine',
    description: 'Data-driven marketing that drives real revenue. Paid ads, social media, email sequences, and conversion optimization.',
    features: ['Paid Advertising', 'Social Media', 'Email Sequences', 'Analytics'],
    accent: '#EC4899',
  },
  {
    icon: <Ico><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /><path d="M7 8h10M7 12h6" /></Ico>,
    category: 'Business Systems',
    title: 'Business Systems',
    description: 'Build the operational backbone of your business. Dashboards, reporting systems, and scalable processes that deliver clarity.',
    features: ['KPI Dashboards', 'Process Design', 'Reporting Pipelines', 'CRM Setup'],
    accent: '#F59E0B',
  },
  {
    icon: <Ico><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></Ico>,
    category: 'Immersive Tech',
    title: 'Holographic & AR Solutions',
    description: 'From social AR campaigns to complex holographic command centers — we build multidimensional experiences that captivate.',
    features: ['Holographic Displays', 'AR Campaigns', 'Spatial Computing', 'Command Centers'],
    accent: '#00D4AA',
  },
  {
    icon: <Ico><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></Ico>,
    category: 'Training & Upskilling',
    title: 'Future Tech Upskilling',
    description: "Hands-on training programs that bridge the gap between today's workforce and tomorrow's technology landscape.",
    features: ['AR/VR Training', 'AI Workshops', 'Tech Bootcamps', 'Corporate Programs'],
    accent: '#7C3AED',
  },
  {
    icon: <Ico><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></Ico>,
    category: 'Innovation',
    title: 'Innovation Consulting',
    description: 'Our proven framework helps organizations adopt emerging technologies, embrace change, and stay ahead of the competition.',
    features: ['Innovation Audits', 'Tech Roadmaps', 'Pilot Programs', 'Change Management'],
    accent: '#06B6D4',
  },
  {
    icon: <Ico><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></Ico>,
    category: 'Talent',
    title: 'Talent Development',
    description: "Oman's young population is its greatest asset. We identify, nurture, and catapult hidden talents into industry leaders.",
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
                <div className="w-7 h-7" style={{ color: service.accent }}>
                  {service.icon}
                </div>
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
