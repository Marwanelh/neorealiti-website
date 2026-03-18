'use client'

import { useState } from 'react'

export default function NeoContact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-[#0F1420] border border-[#1A2035] text-white placeholder-slate-600 focus:outline-none focus:border-[#008197]/60 focus:ring-1 focus:ring-[#008197]/30 transition-all text-sm'

  return (
    <section id="contact" className="py-28 bg-[#07080F] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#008197]/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-[#008197]/30 bg-[#008197]/10 text-[#00C8DC] text-xs font-semibold uppercase tracking-widest mb-5">
              Contact
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Ready to build<br />
              <span className="neo-gradient-text">something extraordinary?</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Tell us about your project. Our team will get back to you within one business day to explore how NeoRealiti can help.
            </p>

            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Location', value: 'Sultanate of Oman, Middle East' },
                { icon: '📧', label: 'Email', value: 'info@neorealiti.com' },
                { icon: '🌐', label: 'Ventures', value: 'FillFlow · Euclideon ME' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#008197]/10 border border-[#008197]/20 flex items-center justify-center text-lg flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{c.label}</p>
                    <p className="text-white font-medium text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8 rounded-3xl border border-[#1A2035] bg-[#0B0F1A]">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">We'll be in touch within one business day.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 rounded-full border border-[#1A2035] text-slate-300 text-sm hover:border-[#008197]/50 hover:text-white transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Name *</label>
                    <input
                      required
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      className={inputClass}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Company</label>
                  <input
                    className={inputClass}
                    placeholder="Your company"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className={inputClass + ' resize-none'}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #008197, #00C8DC)' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
