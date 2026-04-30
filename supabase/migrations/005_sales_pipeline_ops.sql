alter table deals
  add column if not exists source text,
  add column if not exists brief_status text,
  add column if not exists proposal_sent_at timestamptz,
  add column if not exists follow_up_count integer not null default 0,
  add column if not exists last_contact_at timestamptz,
  add column if not exists deposit_required_usd integer,
  add column if not exists deposit_paid_at timestamptz,
  add column if not exists loss_reason text;

alter table client_projects
  add column if not exists kickoff_owner text,
  add column if not exists primary_channel text,
  add column if not exists shared_folder_ready boolean not null default false,
  add column if not exists partner_required boolean not null default false,
  add column if not exists partner_role text;

alter table deals
  drop constraint if exists deals_stage_check;

alter table deals
  add constraint deals_stage_check check (
    stage in (
      'new',
      'triage',
      'discovery_scheduled',
      'discovery_done',
      'paid_consult_offered',
      'paid_consult_paid',
      'proposal_drafting',
      'proposal_sent',
      'follow_up',
      'won',
      'lost',
      'stalled'
    )
  );

alter table deals
  drop constraint if exists deals_loss_reason_check;

alter table deals
  add constraint deals_loss_reason_check check (
    loss_reason is null or loss_reason in (
      'budget',
      'timing',
      'no_fit',
      'no_response',
      'went_with_other_firm',
      'jurisdiction_issue'
    )
  );

create index if not exists deals_proposal_sent_at_idx on deals (proposal_sent_at);
create index if not exists deals_last_contact_at_idx on deals (last_contact_at);
create index if not exists deals_loss_reason_idx on deals (loss_reason);

create or replace view new_leads as
select
  id,
  created_at,
  name,
  email,
  company,
  location,
  project_type,
  client_type,
  jurisdiction,
  lead_score,
  next_step
from contact_submissions
where created_at >= now() - interval '7 days'
order by created_at desc;

create or replace view needs_contact_today as
select
  d.id,
  d.title,
  d.stage,
  d.owner,
  d.next_step,
  d.next_step_due_at,
  d.last_contact_at,
  d.follow_up_count,
  cs.name as lead_name,
  cs.email as lead_email
from deals d
left join contact_submissions cs on cs.id = d.lead_id
where d.stage in ('new', 'triage', 'discovery_scheduled', 'follow_up')
  and (
    d.next_step_due_at is null
    or d.next_step_due_at::date <= current_date
  )
order by d.next_step_due_at nulls first, d.created_at asc;

create or replace view proposal_follow_up as
select
  d.id,
  d.title,
  d.stage,
  d.proposal_sent_at,
  d.follow_up_count,
  d.last_contact_at,
  d.next_step_due_at,
  cs.name as lead_name,
  cs.email as lead_email
from deals d
left join contact_submissions cs on cs.id = d.lead_id
where d.stage in ('proposal_sent', 'follow_up')
order by d.proposal_sent_at desc nulls last;

create or replace view won_awaiting_deposit as
select
  d.id,
  d.title,
  d.estimated_value_usd,
  d.deposit_required_usd,
  d.proposal_sent_at,
  d.last_contact_at,
  cs.name as lead_name,
  cs.email as lead_email
from deals d
left join contact_submissions cs on cs.id = d.lead_id
where d.stage = 'won'
  and d.deposit_paid_at is null
order by d.updated_at desc;

create or replace view active_onboarding as
select
  cp.id,
  cp.project_name,
  cp.client_name,
  cp.status,
  cp.kickoff_owner,
  cp.primary_channel,
  cp.shared_folder_ready,
  cp.partner_required,
  cp.partner_role,
  cp.kickoff_at,
  cp.delivery_due_at
from client_projects cp
where cp.status in ('intake', 'kickoff', 'active')
order by cp.created_at desc;
