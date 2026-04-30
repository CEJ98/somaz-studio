alter table deals
  add column if not exists expected_partner_cost_usd integer,
  add column if not exists expected_internal_hours numeric(6,2),
  add column if not exists minimum_viable_fee_usd integer,
  add column if not exists target_gross_margin_pct numeric(5,2);

alter table client_projects
  add column if not exists actual_partner_cost_usd integer,
  add column if not exists actual_external_cost_usd integer,
  add column if not exists actual_cash_collected_usd integer,
  add column if not exists gross_margin_pct numeric(5,2),
  add column if not exists founder_time_band text;

alter table client_projects
  drop constraint if exists client_projects_founder_time_band_check;

alter table client_projects
  add constraint client_projects_founder_time_band_check check (
    founder_time_band is null or founder_time_band in ('4-8h', '8-16h', '16-30h', '30-50h', '50h+')
  );

alter table weekly_metrics
  add column if not exists booked_revenue_usd integer not null default 0,
  add column if not exists average_ticket_usd integer not null default 0,
  add column if not exists gross_margin_avg_pct numeric(5,2) not null default 0,
  add column if not exists active_capacity_load_pct numeric(5,2) not null default 0;

create index if not exists deals_expected_partner_cost_usd_idx on deals (expected_partner_cost_usd);
create index if not exists deals_minimum_viable_fee_usd_idx on deals (minimum_viable_fee_usd);
create index if not exists client_projects_gross_margin_pct_idx on client_projects (gross_margin_pct);

create or replace view financial_pipeline_snapshot as
select
  d.id,
  d.title,
  d.stage,
  d.service_line,
  d.estimated_value_usd,
  d.expected_partner_cost_usd,
  d.minimum_viable_fee_usd,
  d.target_gross_margin_pct,
  d.probability,
  round(((coalesce(d.estimated_value_usd, 0) * coalesce(d.probability, 0)) / 100.0), 2) as weighted_value_usd
from deals d
where d.stage not in ('lost', 'stalled');

create or replace view project_margin_snapshot as
select
  cp.id,
  cp.project_name,
  cp.client_name,
  cp.service_line,
  cp.status,
  cp.actual_cash_collected_usd,
  cp.actual_partner_cost_usd,
  cp.actual_external_cost_usd,
  cp.gross_margin_pct,
  cp.founder_time_band
from client_projects cp
where cp.status in ('delivered', 'closed', 'in_progress', 'internal_qa', 'client_review', 'revisions', 'handoff');

create or replace view weekly_financial_dashboard as
select
  wm.week_start,
  wm.cash_collected_usd,
  wm.booked_revenue_usd,
  wm.average_ticket_usd,
  wm.gross_margin_avg_pct,
  wm.weighted_pipeline_usd,
  wm.active_capacity_load_pct,
  wm.notes
from weekly_metrics wm
order by wm.week_start desc;
