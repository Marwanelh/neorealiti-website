'use client'

import { useState } from 'react'

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM',
]

const MEETING_TYPES = [
  {
    id: 'strategy', label: 'Free Discovery Call', duration: '30 min',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'demo', label: 'Technology Demo', duration: '45 min',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'consultation', label: 'Full Consultation', duration: '60 min',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

type Step = 'type' | 'date' | 'time' | 'details' | 'confirmed'

export default function NeoBookingCalendar() {
  const today = new Date()
  const [step, setStep] = useState<Step>('type')
  const [meetingType, setMeetingType] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [form, setForm] = useState({ name: '', email: '', company: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return isWeekend || isPast
  }

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const canGoPrev = () => {
    return currentYear > today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonth > today.getMonth())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          meetingType,
          date: selectedDate?.toISOString(),
          time: selectedTime,
        }),
      })
    } catch {}
    setSubmitting(false)
    setStep('confirmed')
  }

  const selectedMeeting = MEETING_TYPES.find(m => m.id === meetingType)

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section id="booking" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#050C0D]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#008197]/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00C8DC]/8 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#008197]/30 mb-6">
            <span className="text-xs text-[#00C8DC] font-semibold uppercase tracking-widest">Schedule a Meeting</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white">
            Book a <span style={{ color: '#008197' }}>Free Discovery Call</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400 leading-relaxed">
            Pick a time that works for you. No commitment — just a conversation about
            how we can transform your business with immersive technology.
          </p>
        </div>

        {/* Progress steps */}
        {step !== 'confirmed' && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {(['type', 'date', 'time', 'details'] as Step[]).map((s, i) => {
              const steps: Step[] = ['type', 'date', 'time', 'details']
              const currentIdx = steps.indexOf(step)
              const stepIdx = steps.indexOf(s)
              const labels = ['Meeting Type', 'Pick a Date', 'Pick a Time', 'Your Details']
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      stepIdx < currentIdx
                        ? 'text-white'
                        : stepIdx === currentIdx
                        ? 'text-white border border-[#008197]'
                        : 'text-slate-500 border border-slate-700'
                    }`} style={stepIdx < currentIdx ? { background: 'linear-gradient(to right, #008197, #00C8DC)' } : {}}>
                      {stepIdx < currentIdx ? '✓' : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${stepIdx <= currentIdx ? 'text-white' : 'text-slate-500'}`}>
                      {labels[i]}
                    </span>
                  </div>
                  {i < 3 && <div className={`w-8 h-px ${stepIdx < currentIdx ? 'bg-[#008197]' : 'bg-slate-800'}`} />}
                </div>
              )
            })}
          </div>
        )}

        {/* Card */}
        <div className="border border-[#008197]/20 bg-black/40 overflow-hidden">

          {/* Step 1: Meeting Type */}
          {step === 'type' && (
            <div className="p-8 lg:p-12">
              <h3 className="text-xl font-bold mb-8 text-white">What type of meeting would you like?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MEETING_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { setMeetingType(type.id); setStep('date') }}
                    className={`p-6 border text-left transition-all duration-200 hover:-translate-y-1 ${
                      meetingType === type.id
                        ? 'border-[#008197] bg-[#008197]/10'
                        : 'border-slate-800 bg-black/40 hover:border-[#008197]/40'
                    }`}
                  >
                    <div className="mb-4" style={{ color: '#008197' }}>{type.icon}</div>
                    <div className="font-bold mb-1 text-white">{type.label}</div>
                    <div className="text-sm text-slate-400">{type.duration}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date Picker */}
          {step === 'date' && (
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Select a Date</h3>
                <button onClick={() => setStep('type')} className="text-sm text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
                  ← Back
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  disabled={!canGoPrev()}
                  className="w-10 h-10 border border-slate-800 flex items-center justify-center text-white hover:border-[#008197]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <span className="text-lg font-bold text-white">
                  {MONTHS[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-10 h-10 border border-slate-800 flex items-center justify-center text-white hover:border-[#008197]/50 transition-colors"
                >
                  →
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs text-slate-500 font-semibold py-2">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const disabled = isDateDisabled(day)
                  const date = new Date(currentYear, currentMonth, day)
                  const isSelected = selectedDate?.toDateString() === date.toDateString()
                  const isToday = date.toDateString() === today.toDateString()

                  return (
                    <button
                      key={day}
                      onClick={() => { if (!disabled) { setSelectedDate(date); setStep('time') } }}
                      disabled={disabled}
                      style={isSelected ? { background: 'linear-gradient(to bottom right, #008197, #00C8DC)' } : {}}
                      className={`aspect-square text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'text-white'
                          : isToday
                          ? 'border border-[#008197]/50 text-white hover:bg-[#008197]/20'
                          : disabled
                          ? 'text-slate-700 cursor-not-allowed'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer'
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              <p className="text-xs text-slate-500 mt-4 text-center">
                Weekends are unavailable. Times shown in GST (Gulf Standard Time).
              </p>
            </div>
          )}

          {/* Step 3: Time Picker */}
          {step === 'time' && (
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Select a Time</h3>
                <button onClick={() => setStep('date')} className="text-sm text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
                  ← Back
                </button>
              </div>
              {selectedDate && (
                <p className="text-slate-400 text-sm mb-8">{formatDate(selectedDate)}</p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => { setSelectedTime(slot); setStep('details') }}
                    style={selectedTime === slot ? { background: 'linear-gradient(to right, #008197, #00C8DC)' } : {}}
                    className={`py-3 px-4 text-sm font-medium transition-all duration-200 border uppercase tracking-wider ${
                      selectedTime === slot
                        ? 'text-white border-transparent'
                        : 'bg-transparent border-slate-800 text-slate-300 hover:border-[#008197]/40 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Details Form */}
          {step === 'details' && (
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Your Details</h3>
                <button onClick={() => setStep('time')} className="text-sm text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
                  ← Back
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 border border-[#008197]/30 text-sm text-[#00C8DC]">
                  {selectedMeeting?.icon} {selectedMeeting?.label} · {selectedMeeting?.duration}
                </div>
                {selectedDate && (
                  <div className="flex items-center gap-2 px-4 py-2 border border-slate-800 text-sm text-slate-300">
                    {formatDate(selectedDate)}
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 border border-slate-800 text-sm text-slate-300">
                  {selectedTime}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-2 uppercase tracking-widest">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-[#008197] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-2 uppercase tracking-widest">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-[#008197] transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-2 uppercase tracking-widest">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-[#008197] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-2 uppercase tracking-widest">What would you like to discuss?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us briefly about your business and goals..."
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-[#008197] transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 border border-white/70 text-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirming your booking...
                    </span>
                  ) : (
                    'Confirm Meeting →'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 5: Confirmed */}
          {step === 'confirmed' && (
            <div className="p-12 lg:p-16 text-center">
              <div
                className="w-20 h-20 flex items-center justify-center text-4xl mx-auto mb-6 border border-[#008197]/40"
                style={{ background: 'linear-gradient(to bottom right, #008197, #00C8DC)' }}
              >
                ✓
              </div>
              <h3 className="text-3xl font-black mb-4 text-white">
                You&apos;re <span style={{ color: '#008197' }}>All Set!</span>
              </h3>
              <p className="text-slate-400 text-lg mb-6 max-w-md mx-auto">
                Your meeting has been confirmed. Check your email for the calendar invite and meeting details.
              </p>

              <div className="inline-flex flex-col gap-3 items-center p-6 border border-[#008197]/20 mb-8">
                <div className="text-sm text-slate-400">
                  <span className="text-white font-semibold">{selectedMeeting?.label}</span>
                  {' · '}{selectedMeeting?.duration}
                </div>
                {selectedDate && (
                  <div className="text-sm text-slate-400">{formatDate(selectedDate)}</div>
                )}
                <div className="text-sm text-slate-400">{selectedTime} <span className="text-slate-500">(GST)</span></div>
                <div className="text-sm font-semibold" style={{ color: '#00C8DC' }}>
                  A confirmation will be sent to {form.email}
                </div>
              </div>

              <button
                onClick={() => {
                  setStep('type'); setMeetingType(''); setSelectedDate(null)
                  setSelectedTime(''); setForm({ name: '', email: '', company: '', notes: '' })
                }}
                className="px-8 py-3 border border-white/30 text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                Book Another Meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
