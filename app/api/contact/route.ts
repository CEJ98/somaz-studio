import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

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

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
