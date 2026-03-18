'use client'

import { useState } from 'react'

const contactInfo = [
  {
    icon: '📍',
    label: 'Our Office',
    value: '4th Floor, Hormuz Building\nWay No.: 3106, PO Box 488, PC 112\nRuwi, Sultanate of Oman',
  },
  {
    icon: '📧',
    label: 'Email Us',
    value: 'info@neorealiti.com',
  },
  {
    icon: '📞',
    label: 'Call Us',
    value: 'Phone: (+968) 24703844\nMobile: (+968) 99069082',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#07080F]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-widest">Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
            Technologies for{' '}
            <span className="gradient-text">Forward Thinking</span>
            <br />
            Businesses
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Our website is a teaser to everything we are building. Reach out now and
            let's discuss how we can transform your business together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="p-8 lg:p-10 rounded-3xl bg-[#0F1120] border border-[#1C1F35]">
              <h3 className="text-xl font-bold mb-8">Send Us A Message</h3>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-3xl mx-auto mb-4">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-slate-400">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 px-6 py-3 rounded-full bg-[#1C1F35] text-sm font-medium hover:bg-[#252847] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      minLength={2}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-[#07080F] border border-[#1C1F35] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-[#07080F] border border-[#1C1F35] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-[#07080F] border border-[#1C1F35] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>

                  <textarea
                    placeholder="Tell us about your project..."
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-[#07080F] border border-[#1C1F35] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                  />

                  {status === 'error' && (
                    <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-base hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="p-6 rounded-2xl bg-[#0F1120] border border-[#1C1F35]"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl w-12 h-12 rounded-xl bg-[#1C1F35] flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-1">
                      {info.label}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {info.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-6 rounded-2xl bg-[#0F1120] border border-[#1C1F35]">
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-4">Follow Us</div>
              <div className="flex flex-col gap-2">
                {[
                  { platform: 'LinkedIn', icon: '💼', href: '#' },
                  { platform: 'Twitter / X', icon: '𝕏', href: '#' },
                  { platform: 'Facebook', icon: '📘', href: '#' },
                ].map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#1C1F35] transition-colors text-slate-400 hover:text-white text-sm"
                  >
                    <span>{s.icon}</span>
                    <span>{s.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/15 to-cyan-500/10 border border-purple-500/20">
              <h4 className="font-bold mb-2">Get Notified</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Subscribe to our newsletter on trending technologies, entrepreneurship, and innovation.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#07080F] border border-[#1C1F35] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm min-w-0"
                />
                <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 transition-opacity flex-shrink-0">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
