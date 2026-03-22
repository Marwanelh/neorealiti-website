import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_MEETING_TYPES = ['strategy', 'demo', 'consultation']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, notes, meetingType, date, time } = body

    // Required fields
    if (!name || !email || !meetingType || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Field length limits
    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Name must be 2–100 characters' }, { status: 400 })
    }
    if (company && (typeof company !== 'string' || company.length > 200)) {
      return NextResponse.json({ error: 'Company name too long' }, { status: 400 })
    }
    if (notes && (typeof notes !== 'string' || notes.length > 2000)) {
      return NextResponse.json({ error: 'Notes must be under 2000 characters' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
    if (typeof email !== 'string' || email.length > 254 || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Meeting type whitelist
    if (!ALLOWED_MEETING_TYPES.includes(meetingType)) {
      return NextResponse.json({ error: 'Invalid meeting type' }, { status: 400 })
    }

    // Send confirmation email via Resend if configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_paste_your_key_here') {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const toEmail = process.env.CONTACT_EMAIL || 'info@neorealiti.com'

      await resend.emails.send({
        from: 'Neorealiti Bookings <onboarding@resend.dev>',
        to: toEmail,
        replyTo: email,
        subject: `New Booking: ${meetingType} on ${date} at ${time}`,
        text: [
          'New Meeting Booking',
          '-------------------',
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || 'N/A'}`,
          `Type: ${meetingType}`,
          `Date: ${date}`,
          `Time: ${time}`,
          `Notes: ${notes || 'None'}`,
        ].join('\n'),
      })
    }

    return NextResponse.json({ success: true, message: 'Booking confirmed!' })
  } catch {
    return NextResponse.json({ error: 'Failed to confirm booking' }, { status: 500 })
  }
}
