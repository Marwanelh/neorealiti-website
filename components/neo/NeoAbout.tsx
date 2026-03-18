export default function NeoAbout() {
  const pillars = [
    {
      icon: '🔮',
      title: 'Holographic Reality',
      desc: 'Delivering volumetric 3D displays and spatial computing experiences that go far beyond traditional screens.',
    },
    {
      icon: '🤖',
      title: 'AI Automation',
      desc: 'Intelligent systems that streamline workflows, reduce overhead, and let your team focus on what matters most.',
    },
    {
      icon: '🌐',
      title: 'Immersive Engagement',
      desc: 'Augmented and mixed reality applications that transform how customers discover, explore and buy.',
    },
    {
      icon: '📍',
      title: 'Regional Expertise',
      desc: "Deep roots in the Sultanate of Oman, with experience navigating the Gulf's unique enterprise landscape.",
    },
  ]

  return (
    <section id="about" className="py-28 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-[#008197]/30 bg-[#008197]/10 text-[#00C8DC] text-xs font-semibold uppercase tracking-widest mb-5">
              About NeoRealiti
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Technology that<br />
              <span className="neo-gradient-text">closes the gap</span><br />
              between digital and real.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              We are an immersive technology company headquartered in Oman, building the bridge between digital innovation and real-world business impact. From bespoke holographic installations to AI-driven process automation, every solution we deliver is engineered for measurable results.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our multi-disciplinary team combines hardware expertise, software craftsmanship, and strategic consulting — so you get not just a product, but a competitive advantage.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#services"
                className="px-6 py-3 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #008197, #00C8DC)' }}
              >
                See Our Services
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-[#1A2035] text-slate-300 font-semibold text-sm hover:border-[#008197]/50 hover:text-white transition-all"
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
                className="p-6 rounded-2xl border border-[#1A2035] bg-[#0F1420] card-hover"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="text-white font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
