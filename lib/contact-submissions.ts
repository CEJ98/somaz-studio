type ContactSubmission = {
  name: string
  email: string
  phone?: string
  company?: string
  location?: string
  project_type: string
  client_type?: string
  project_stage?: string
  budget_range?: string
  timeline?: string
  needs_permit?: string
  preferred_contact?: string
  jurisdiction?: string
  lead_score?: number
  next_step?: string
  source?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

type SaveResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; error: string }

export async function saveContactSubmission(submission: ContactSubmission): Promise<SaveResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) return { ok: true, skipped: true }

  try {
    const headers = {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      'content-type': 'application/json',
      prefer: 'return=minimal',
    }

    const currentSchemaRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        company: submission.company || null,
        location: submission.location || null,
        project_type: submission.project_type,
        client_type: submission.client_type || null,
        project_stage: submission.project_stage || null,
        budget_range: submission.budget_range || null,
        timeline: submission.timeline || null,
        needs_permit: submission.needs_permit || null,
        preferred_contact: submission.preferred_contact || null,
        jurisdiction: submission.jurisdiction || null,
        lead_score: submission.lead_score ?? null,
        next_step: submission.next_step || null,
        source: submission.source || null,
        message: submission.message || null,
        utm_source: submission.utm_source || null,
        utm_medium: submission.utm_medium || null,
        utm_campaign: submission.utm_campaign || null,
        utm_content: submission.utm_content || null,
        utm_term: submission.utm_term || null,
      }),
    })

    if (currentSchemaRes.ok) return { ok: true }

    const legacySchemaRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        project_type: submission.project_type,
        budget: submission.budget_range || submission.timeline || 'not-specified',
        message: submission.message || '',
      }),
    })

    if (legacySchemaRes.ok) return { ok: true }

    const error = await legacySchemaRes.text().catch(() => 'Unknown Supabase error')
    return { ok: false, error }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown Supabase error' }
  }
}
