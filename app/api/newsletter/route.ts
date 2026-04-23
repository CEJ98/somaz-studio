import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { checkNewsletterRateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (await checkNewsletterRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const resend = getResend()
    if (resend && process.env.RESEND_AUDIENCE_ID) {
      try {
        const { error } = await resend.contacts.create({
          audienceId: process.env.RESEND_AUDIENCE_ID,
          email,
          unsubscribed: false,
        })
        if (error && (error as { name?: string }).name === 'already_exists') {
          return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
        }
      } catch (audienceErr) {
        console.error('Resend audience error:', audienceErr)
      }
    }

    // Send welcome email — non-blocking
    try {
      const resend = getResend()
      if (resend) {
        await resend.emails.send({
          from: 'Somaz Studio <hola@somazstudio.com>',
          to: email,
          subject: 'Welcome to the Somaz Studio list.',
          html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#F8F6F2;color:#1A1A1A;font-family:Georgia,serif"><div style="max-width:600px;margin:0 auto;padding:48px 32px"><div style="border-bottom:1px solid #C8C3B8;padding-bottom:24px;margin-bottom:40px"><img src="https://somazstudio.com/logos/logo-smz.png" alt="Somaz Studio" style="height:32px;width:auto"></div><p style="font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#8B6F47;margin:0 0 20px">You're on the list.</p><h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:300;margin:0 0 8px;color:#1A1A1A;line-height:1.05"><em style="font-style:italic;color:rgba(26,26,26,0.6)">Welcome to</em></h1><h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:600;margin:0 0 32px;color:#1A1A1A;line-height:1.05">Somaz Studio.</h1><div style="width:40px;height:1px;background:#8B6F47;margin-bottom:32px"></div><p style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:rgba(26,26,26,0.55);line-height:1.8;margin:0 0 40px">Studio updates, project reveals, and design thinking — straight to your inbox.<br>No spam, no noise. Only what matters.</p><div style="border-top:1px solid #C8C3B8;padding-top:32px;margin-top:8px"><a href="https://somazstudio.com/work" style="display:inline-block;border:1px solid rgba(26,26,26,0.2);color:rgba(26,26,26,0.6);padding:12px 28px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none;margin-right:12px">View Our Work</a></div><p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#1A1A1A;opacity:0.2;margin-top:40px">Somaz Studio · Miami, FL<br><a href="https://somazstudio.com" style="color:rgba(26,26,26,0.2);text-decoration:none">somazstudio.com</a> · <a href="mailto:hola@somazstudio.com" style="color:rgba(26,26,26,0.2);text-decoration:none">hola@somazstudio.com</a></p></div></body></html>`,
        })
      }
    } catch (emailErr) {
      console.error('Resend error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
