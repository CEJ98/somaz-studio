alter table contact_submissions
  add column if not exists company text,
  add column if not exists location text,
  add column if not exists project_stage text,
  add column if not exists budget_range text,
  add column if not exists needs_permit text,
  add column if not exists preferred_contact text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text;
