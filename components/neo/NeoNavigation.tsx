'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#ventures', label: 'Our Ventures' },
  { href: '#contact', label: 'Contact' },
]

export default function NeoNavigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s)
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(s); break }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        'fixed top-10 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#07080F]/90 backdrop-blur-xl border-b border-[#1A2035]' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo — green (teal) on dark bg */}
            <a href="#home" className="flex items-center">
              <img src="/images/logo-white-clean.svg" alt="NeoRealiti" className="h-7 lg:h-9 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    active === link.href.replace('#', '')
                      ? 'text-white bg-[#008197]/20 border border-[#008197]/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#1A2035]/60'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                className="px-5 py-2.5 border border-white/70 text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-[#07080F] transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={cn('block w-6 h-0.5 bg-white transition-all', menuOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block w-6 h-0.5 bg-white transition-all', menuOpen && 'opacity-0')} />
              <span className={cn('block w-6 h-0.5 bg-white transition-all', menuOpen && '-rotate-45 -translate-y-2')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden transition-all duration-300',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-[#07080F]/96 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <nav className="absolute top-28 left-0 right-0 px-6 py-6 flex flex-col gap-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 rounded-xl text-lg font-medium text-slate-300 hover:text-white hover:bg-[#1A2035] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-6 py-4 border border-white/70 text-white text-sm font-semibold tracking-[0.2em] uppercase text-center hover:bg-white hover:text-[#07080F] transition-all duration-300"
          >
            Get In Touch
          </a>
        </nav>
      </div>
    </>
  )
}
