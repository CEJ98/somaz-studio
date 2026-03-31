import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, project_type, budget, sqft, message } = body

    if (!name || !email || !project_type || !budget || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getSupabase()
    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone: phone || null,
      project_type,
      budget,
      sqft: sqft || null,
      message,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    // Send notification email — non-blocking
    try {
      const resend = getResend()
      if (!resend) throw new Error('RESEND_API_KEY not configured')
      await resend.emails.send({
        from: 'Somaz Studio <hola@somazstudio.com>',
        to: 'hola@somazstudio.com',
        subject: `New lead: ${name} — ${project_type}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || '—'}`,
          `Project Type: ${project_type}`,
          `Budget: ${budget}`,
          `Size (sqft): ${sqft || '—'}`,
          '',
          `Message:`,
          message,
        ].join('\n'),
      })
    } catch (emailErr) {
      console.error('Resend error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
