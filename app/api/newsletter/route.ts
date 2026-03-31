import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const supabase = getSupabase()
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })

    if (error) {
      // Unique constraint violation — already subscribed
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
      }
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
