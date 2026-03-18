'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#technology', label: 'Technology' },
  { href: '#industries', label: 'Industries' },
  { href: '#booking', label: 'Book a Meeting' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-10 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#07080F]/90 backdrop-blur-xl border-b border-[#1C1F35]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center">
              <img
                src="/images/logo-white-clean.svg"
                alt="NeoRealiti"
                className="h-8 lg:h-10 w-auto"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    activeSection === link.href.replace('#', '')
                      ? 'text-white bg-[#1C1F35]'
                      : 'text-slate-400 hover:text-white hover:bg-[#1C1F35]/50'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#booking"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Book a Meeting
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
              <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-[#07080F]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <nav className="absolute top-28 left-0 right-0 px-6 py-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 rounded-xl text-lg font-medium text-slate-300 hover:text-white hover:bg-[#1C1F35] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-lg font-semibold text-center"
          >
            Book a Meeting
          </a>
        </nav>
      </div>
    </>
  )
}
