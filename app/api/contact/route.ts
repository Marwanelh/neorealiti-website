import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
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
    } else {
      // Dev mode — log to console until Resend key is configured
      console.log('📧 Contact form submission:', { name, email, subject, message })
    }

    return NextResponse.json({ success: true, message: 'Message received!' })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
