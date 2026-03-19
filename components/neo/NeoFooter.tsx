export default function NeoFooter() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-[#1A2035] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home">
              <img src="/images/logo-white-clean.svg" alt="NeoRealiti" className="h-8 w-auto mb-4" />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Pioneering immersive technology across the Middle East — holographic, augmented reality, and AI automation under one roof.
            </p>
            <p className="mt-4 text-xs text-slate-600 uppercase tracking-widest">Sultanate of Oman</p>
          </div>

          {/* Ventures */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Our Ventures</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'NeoRealiti', href: '/', note: 'Immersive Tech' },
                { label: 'FillFlow', href: '/fillflow', note: 'AI Automation' },
                { label: 'Euclideon ME', href: 'https://www.euclideonme.com', note: 'Holographic', external: true },
              ].map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  >
                    {l.label}
                    {l.external && <span className="text-[10px] opacity-40">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Contact', href: '#contact' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1A2035] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} NeoRealiti LLC. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Powered by NeoRealiti · Sultanate of Oman
          </p>
        </div>
      </div>
    </footer>
  )
}
