type ContactSubmission = {
  name: string
  email: string
  project_type: string
  timeline?: string
  message?: string
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
        project_type: submission.project_type,
        timeline: submission.timeline || null,
        message: submission.message || null,
      }),
    })

    if (currentSchemaRes.ok) return { ok: true }

    const legacySchemaRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: submission.name,
        email: submission.email,
        project_type: submission.project_type,
        budget: submission.timeline || 'not-specified',
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
