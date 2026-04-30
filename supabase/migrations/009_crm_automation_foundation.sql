alter table contact_submissions
  add column if not exists source text,
  add column if not exists reviewed_at timestamptz;

alter table deals
  add column if not exists proposal_variant text,
  add column if not exists closed_at timestamptz;

alter table contact_submissions
  drop constraint if exists contact_submissions_source_check;

alter table contact_submissions
  add constraint contact_submissions_source_check check (
    source is null or source in (
      'website',
      'instagram',
      'linkedin',
      'email_outbound',
      'whatsapp',
      'referral',
      'partner_referral',
      'broker_referral',
      'paid_social',
      'organic_search'
    )
  );

alter table deals
  drop constraint if exists deals_source_check;

alter table deals
  add constraint deals_source_check check (
    source is null or source in (
      'website',
      'instagram',
      'linkedin',
      'email_outbound',
      'whatsapp',
      'referral',
      'partner_referral',
      'broker_referral',
      'paid_social',
      'organic_search'
    )
  );

alter table deals
  drop constraint if exists deals_proposal_variant_check;

alter table deals
  add constraint deals_proposal_variant_check check (
    proposal_variant is null or proposal_variant in (
      'argentina_full_scope',
      'us_international_partner',
      'visualization_consulting'
    )
  );

create index if not exists contact_submissions_source_idx on contact_submissions (source);
create index if not exists contact_submissions_reviewed_at_idx on contact_submissions (reviewed_at);
create index if not exists deals_source_idx on deals (source);
create index if not exists deals_closed_at_idx on deals (closed_at);
create index if not exists deals_proposal_variant_idx on deals (proposal_variant);

create or replace view new_leads as
select
  id,
  created_at,
  reviewed_at,
  source,
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

create or replace view leads_by_source as
select
  coalesce(source, 'website') as source,
  count(*) as leads_count,
  count(*) filter (where lead_score >= 40) as qualified_leads_count,
  count(*) filter (where next_step = 'paid_consult') as paid_consult_routed_count,
  round(avg(lead_score)::numeric, 2) as avg_lead_score,
  max(created_at) as last_lead_at
from contact_submissions
where created_at >= date_trunc('month', now())
group by 1
order by leads_count desc, source asc;

create or replace view paid_consult_pipeline as
select
  d.id,
  d.title,
  d.stage,
  d.owner,
  d.source,
  d.estimated_value_usd,
  d.deposit_required_usd,
  d.next_step,
  d.next_step_due_at,
  d.last_contact_at,
  cs.name as lead_name,
  cs.email as lead_email
from deals d
left join contact_submissions cs on cs.id = d.lead_id
where d.stage in ('paid_consult_offered', 'paid_consult_paid', 'proposal_drafting')
order by d.next_step_due_at nulls first, d.updated_at desc;

create or replace view deals_stalled_over_10_days as
select
  d.id,
  d.title,
  d.stage,
  d.owner,
  d.source,
  d.last_contact_at,
  d.next_step_due_at,
  d.follow_up_count,
  cs.name as lead_name,
  cs.email as lead_email
from deals d
left join contact_submissions cs on cs.id = d.lead_id
where (
  d.stage = 'stalled'
  or (
    d.stage in (
      'triage',
      'discovery_scheduled',
      'discovery_done',
      'paid_consult_offered',
      'paid_consult_paid',
      'proposal_drafting',
      'proposal_sent',
      'follow_up'
    )
    and coalesce(d.last_contact_at, d.created_at) <= now() - interval '10 days'
  )
)
order by coalesce(d.last_contact_at, d.created_at) asc;

create or replace view high_score_unworked_leads as
select
  cs.id,
  cs.created_at,
  cs.reviewed_at,
  cs.source,
  cs.name,
  cs.email,
  cs.company,
  cs.location,
  cs.project_type,
  cs.client_type,
  cs.jurisdiction,
  cs.lead_score,
  cs.next_step
from contact_submissions cs
left join deals d on d.lead_id = cs.id
where cs.lead_score >= 60
  and d.id is null
  and cs.reviewed_at is null
order by cs.created_at asc;

create or replace view referral_candidates as
select
  cp.id,
  cp.project_name,
  cp.client_name,
  cp.project_owner,
  cp.primary_channel,
  cp.partner_required,
  cp.final_approved_at,
  cp.closeout_completed_at
from client_projects cp
where coalesce(cp.nda_required, false) = false
  and (
    cp.status in ('delivered', 'closed')
    or cp.final_approved_at is not null
    or cp.closeout_completed_at is not null
  )
order by cp.closeout_completed_at desc nulls last, cp.final_approved_at desc nulls last;

create or replace view projects_pending_kickoff as
select
  cp.id,
  cp.project_name,
  cp.client_name,
  cp.status,
  cp.project_owner,
  cp.kickoff_owner,
  cp.primary_channel,
  cp.shared_folder_ready,
  cp.partner_required,
  cp.regulatory_path_confirmed,
  cp.kickoff_at,
  cp.delivery_due_at
from client_projects cp
where cp.status in ('intake', 'kickoff')
  and (
    cp.kickoff_at is null
    or cp.shared_folder_ready = false
    or (cp.partner_required = true and coalesce(cp.regulatory_path_confirmed, false) = false)
  )
order by cp.delivery_due_at asc nulls last, cp.created_at asc;

create or replace view monthly_funnel_snapshot as
with lead_metrics as (
  select
    date_trunc('month', created_at)::date as month_start,
    coalesce(source, 'website') as source,
    count(*) as leads_count,
    count(*) filter (where lead_score >= 40) as qualified_leads_count
  from contact_submissions
  group by 1, 2
),
deal_metrics as (
  select
    date_trunc('month', d.created_at)::date as month_start,
    coalesce(d.source, cs.source, 'website') as source,
    count(*) filter (where d.stage = 'discovery_scheduled') as discovery_calls_count,
    count(*) filter (where d.stage = 'paid_consult_paid') as paid_consults_count,
    count(*) filter (where d.proposal_sent_at is not null) as proposals_sent_count,
    count(*) filter (where d.stage = 'won') as deals_won_count,
    count(*) filter (where d.stage = 'lost') as deals_lost_count,
    coalesce(sum(case when d.stage not in ('lost') then (d.estimated_value_usd * d.probability) / 100 else 0 end), 0)::integer as weighted_pipeline_usd
  from deals d
  left join contact_submissions cs on cs.id = d.lead_id
  group by 1, 2
)
select
  coalesce(lm.month_start, dm.month_start) as month_start,
  coalesce(lm.source, dm.source) as source,
  coalesce(lm.leads_count, 0) as leads_count,
  coalesce(lm.qualified_leads_count, 0) as qualified_leads_count,
  coalesce(dm.discovery_calls_count, 0) as discovery_calls_count,
  coalesce(dm.paid_consults_count, 0) as paid_consults_count,
  coalesce(dm.proposals_sent_count, 0) as proposals_sent_count,
  coalesce(dm.deals_won_count, 0) as deals_won_count,
  coalesce(dm.deals_lost_count, 0) as deals_lost_count,
  coalesce(dm.weighted_pipeline_usd, 0) as weighted_pipeline_usd
from lead_metrics lm
full outer join deal_metrics dm
  on lm.month_start = dm.month_start
 and lm.source = dm.source
order by month_start desc, source asc;
