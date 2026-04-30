alter table contact_submissions
  add column if not exists client_type text,
  add column if not exists jurisdiction text,
  add column if not exists lead_score integer,
  add column if not exists next_step text;

create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);
create index if not exists contact_submissions_next_step_idx on contact_submissions (next_step);
create index if not exists contact_submissions_jurisdiction_idx on contact_submissions (jurisdiction);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references contact_submissions(id) on delete set null,
  title text not null,
  stage text not null default 'new',
  service_line text not null,
  jurisdiction text,
  estimated_value_usd integer,
  probability integer not null default 10 check (probability >= 0 and probability <= 100),
  owner text not null default 'Sofia',
  next_step text,
  next_step_due_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deals_stage_idx on deals (stage);
create index if not exists deals_next_step_due_at_idx on deals (next_step_due_at);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  partner_type text not null,
  company text,
  email text,
  phone text,
  location text,
  licensed_region text,
  scope text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists partners_partner_type_idx on partners (partner_type);
create index if not exists partners_status_idx on partners (status);

create table if not exists client_projects (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references contact_submissions(id) on delete set null,
  deal_id uuid references deals(id) on delete set null,
  partner_id uuid references partners(id) on delete set null,
  project_name text not null,
  client_name text not null,
  service_line text not null,
  jurisdiction text,
  status text not null default 'intake',
  scope_summary text,
  rounds_included integer not null default 2,
  timeline_summary text,
  folder_url text,
  contract_signed boolean not null default false,
  kickoff_at timestamptz,
  delivery_due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_projects_status_idx on client_projects (status);
create index if not exists client_projects_delivery_due_at_idx on client_projects (delivery_due_at);

create table if not exists weekly_metrics (
  id uuid primary key default gen_random_uuid(),
  week_start date not null unique,
  leads_count integer not null default 0,
  qualified_leads_count integer not null default 0,
  paid_consults_count integer not null default 0,
  proposals_sent_count integer not null default 0,
  deals_closed_count integer not null default 0,
  cash_collected_usd integer not null default 0,
  weighted_pipeline_usd integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);
