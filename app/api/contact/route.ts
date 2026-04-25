import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { checkContactRateLimit } from '@/lib/rate-limit'
import { saveContactSubmission } from '@/lib/contact-submissions'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (await checkContactRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()

    // Honeypot: si el campo "website" viene relleno es un bot
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const { name, email, project_type, timeline, message } = body

    if (!name || !email || !project_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (message && message.length > 2000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })
    }

    const saved = await saveContactSubmission({
      name,
      email,
      project_type,
      timeline,
      message,
    })

    if (!saved.ok) console.error('Supabase contact save error:', saved.error)

    let emailSent = false
    try {
      const resend = getResend()
      if (!resend) throw new Error('RESEND_API_KEY not configured')
      const from = process.env.CONTACT_FROM_EMAIL || 'Somaz Studio <hola@somazstudio.com>'
      const to = process.env.CONTACT_TO_EMAIL || 'hola@somazstudio.com'
      const eName = escapeHtml(name)
      const eEmail = escapeHtml(email)
      const eProjectType = escapeHtml(project_type)
      const eTimeline = timeline ? escapeHtml(timeline) : ''
      const eMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : ''
      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New lead: ${eName} — ${eProjectType}`,
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#F8F6F2;color:#1A1A1A;font-family:Georgia,serif"><div style="max-width:600px;margin:0 auto;padding:48px 32px"><div style="border-bottom:1px solid #C8C3B8;padding-bottom:24px;margin-bottom:32px"><img src="https://somazstudio.com/logos/logo-smz.png" alt="Somaz Studio" style="height:32px;width:auto"></div><p style="font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#8B6F47;margin:0 0 16px">New Project Inquiry</p><h1 style="font-size:24px;font-weight:300;margin:0 0 32px;color:#1A1A1A">${eName}</h1><table style="width:100%;border-collapse:collapse"><tr><td style="font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#1A1A1A;opacity:0.3;padding:12px 0 4px">Project Type</td></tr><tr><td style="font-size:15px;color:#1A1A1A;padding-bottom:20px;border-bottom:1px solid #C8C3B8">${eProjectType}</td></tr>${eTimeline ? `<tr><td style="font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#1A1A1A;opacity:0.3;padding:20px 0 4px">Timeline</td></tr><tr><td style="font-size:15px;color:#8B6F47;padding-bottom:20px;border-bottom:1px solid #C8C3B8">${eTimeline}</td></tr>` : ''}<tr><td style="font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#1A1A1A;opacity:0.3;padding:20px 0 4px">Email</td></tr><tr><td style="font-size:15px;color:#1A1A1A;padding-bottom:20px;border-bottom:1px solid #C8C3B8"><a href="mailto:${eEmail}" style="color:#8B6F47;text-decoration:none">${eEmail}</a></td></tr><tr><td style="font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#1A1A1A;opacity:0.3;padding:20px 0 4px">Message</td></tr><tr><td style="font-size:15px;color:#1A1A1A;padding-bottom:20px;line-height:1.7">${eMessage}</td></tr></table><div style="border-top:1px solid #C8C3B8;margin-top:40px;padding-top:24px"><a href="mailto:${eEmail}" style="display:inline-block;background:#8B6F47;color:#F8F6F2;padding:12px 28px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none">Reply to ${eName}</a></div><p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#1A1A1A;opacity:0.2;margin-top:32px">Somaz Studio · Miami, FL · somazstudio.com</p></div></body></html>`,
      })
      emailSent = true
    } catch (emailErr) {
      console.error('Resend error:', emailErr)
    }

    if (!saved.ok && !emailSent) {
      return NextResponse.json({ error: 'Unable to submit contact request' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact request error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
