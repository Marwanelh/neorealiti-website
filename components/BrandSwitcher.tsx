'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const brands = [
  {
    name: 'Neorealiti',
    href: '/',
    description: 'Immersive Technology',
    icon: '🌐',
    external: false,
    color: '#008197',
  },
  {
    name: 'FillFlow',
    href: '/fillflow',
    description: 'AI & Automation',
    icon: '⚡',
    external: false,
    color: '#7C3AED',
    badge: 'New',
  },
  {
    name: 'Euclideon',
    href: 'https://www.euclideonme.com',
    description: 'Holographic Tech',
    icon: '🔮',
    external: true,
    color: '#00C8DC',
  },
]

export default function BrandSwitcher() {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#07080F]/95 backdrop-blur-xl border-b border-[#1A2035]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Brand tabs */}
          <div className="flex items-center gap-1">
            {brands.map((brand) => {
              const isActive =
                brand.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(brand.href) && !brand.external

              const Tag = brand.external ? 'a' : Link
              const props = brand.external
                ? { href: brand.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: brand.href }

              return (
                <Tag
                  key={brand.name}
                  {...(props as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  style={isActive ? { color: brand.color } : {}}
                >
                  <span>{brand.icon}</span>
                  <span className="hidden sm:inline">{brand.name}</span>
                  {brand.badge && !isActive && (
                    <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {brand.badge}
                    </span>
                  )}
                  {brand.external && (
                    <span className="text-[10px] opacity-50">↗</span>
                  )}
                  {isActive && (
                    <span
                      className="hidden sm:inline text-[9px] font-medium opacity-60"
                      style={{ color: brand.color }}
                    >
                      — {brand.description}
                    </span>
                  )}
                </Tag>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#008197] animate-pulse" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                Sultanate of Oman
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
