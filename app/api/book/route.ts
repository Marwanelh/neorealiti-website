import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, notes, meetingType, date, time } = body

    if (!name || !email || !meetingType || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // ---------------------------------------------------------
    // TO SEND REAL BOOKING EMAILS:
    //
    // Option A — Resend:
    //   const { Resend } = await import('resend')
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({
    //     from: 'bookings@neorealiti.com',
    //     to: ['info@neorealiti.com', email],
    //     subject: `Meeting Booked: ${meetingType} on ${date} at ${time}`,
    //     text: `
    //       New Meeting Booking
    //       -------------------
    //       Name: ${name}
    //       Email: ${email}
    //       Company: ${company || 'N/A'}
    //       Type: ${meetingType}
    //       Date: ${date}
    //       Time: ${time}
    //       Notes: ${notes || 'None'}
    //     `,
    //   })
    //
    // Option B — Connect to Google Calendar API
    // Option C — Connect to Calendly API
    // ---------------------------------------------------------

    console.log('📅 New booking:', { name, email, company, meetingType, date, time, notes })

    return NextResponse.json({ success: true, message: 'Booking confirmed!' })
  } catch {
    return NextResponse.json({ error: 'Failed to confirm booking' }, { status: 500 })
  }
}
