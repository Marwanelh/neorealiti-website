import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Field length limits
    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Name must be 2–100 characters' }, { status: 400 })
    }
    if (typeof message !== 'string' || message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: 'Message must be 10–5000 characters' }, { status: 400 })
    }
    if (subject && (typeof subject !== 'string' || subject.length > 200)) {
      return NextResponse.json({ error: 'Subject must be under 200 characters' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
    if (typeof email !== 'string' || email.length > 254 || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Send email via Resend if API key is configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_paste_your_key_here') {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const toEmail = process.env.CONTACT_EMAIL || 'info@neorealiti.com'

      await resend.emails.send({
        from: 'NeoRealiti Website <onboarding@resend.dev>',
        to: toEmail,
        replyTo: email,
        subject: `New message: ${subject || 'Contact Form'}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
      })
    }

    return NextResponse.json({ success: true, message: 'Message received!' })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
