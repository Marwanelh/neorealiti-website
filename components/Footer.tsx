const footerLinks = {
  Services: [
    'Web & Digital Presence',
    'AI Systems & Automation',
    'Marketing & Growth',
    'Business Systems',
    'Holographic Solutions',
    'Tech Upskilling',
    'Innovation Consulting',
    'Talent Development',
  ],
  Company: [
    'About Us',
    'Our Process',
    'Industries',
    'Technology',
    'Book a Meeting',
  ],
  Contact: [
    'info@neorealiti.com',
    '(+968) 24703844',
    '(+968) 99069082',
    'Ruwi, Sultanate of Oman',
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-[#07080F] border-t border-[#1C1F35]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-6">
              <img
                src="/images/logo-white-clean.svg"
                alt="Neorealiti"
                className="h-10 w-auto"
              />
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
              Redefining technology as a means of engaging audiences through stronger
              communication — building immersive experiences and AI systems that give
              businesses an unfair advantage.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { label: 'LI', href: '#', color: '#0077B5' },
                { label: '𝕏', href: '#', color: '#1DA1F2' },
                { label: 'FB', href: '#', color: '#1877F2' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-xl bg-[#1C1F35] flex items-center justify-center text-sm font-bold text-slate-400 hover:text-white hover:bg-[#252847] transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#1C1F35] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Neorealiti. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
            <a
              href="https://www.euclideonme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
            >
              Holographic Tech ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
