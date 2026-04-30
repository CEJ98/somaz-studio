alter table client_projects
  add column if not exists project_type text,
  add column if not exists current_phase text,
  add column if not exists project_owner text,
  add column if not exists qa_owner text,
  add column if not exists client_feedback_due_at timestamptz,
  add column if not exists internal_review_due_at timestamptz,
  add column if not exists deliverable_type text,
  add column if not exists handoff_type text,
  add column if not exists consultant_count integer not null default 0,
  add column if not exists change_order_required boolean not null default false,
  add column if not exists change_order_status text,
  add column if not exists final_approved_at timestamptz,
  add column if not exists closeout_completed_at timestamptz;

update client_projects
set status = 'in_progress'
where status = 'active';

alter table client_projects
  drop constraint if exists client_projects_status_check;

alter table client_projects
  add constraint client_projects_status_check check (
    status in (
      'intake',
      'kickoff',
      'inputs_pending',
      'in_progress',
      'internal_qa',
      'client_review',
      'revisions',
      'handoff',
      'delivered',
      'closed',
      'on_hold'
    )
  );

alter table client_projects
  drop constraint if exists client_projects_current_phase_check;

alter table client_projects
  add constraint client_projects_current_phase_check check (
    current_phase is null or current_phase in (
      'brief_ready',
      'kickoff',
      'inputs_collected',
      'concept_design_sprint',
      'internal_qa',
      'client_review',
      'revision_cycle',
      'final_delivery_handoff',
      'closeout'
    )
  );

alter table client_projects
  drop constraint if exists client_projects_deliverable_type_check;

alter table client_projects
  add constraint client_projects_deliverable_type_check check (
    deliverable_type is null or deliverable_type in (
      'architecture',
      'interiors',
      'visualization',
      'consulting'
    )
  );

alter table client_projects
  drop constraint if exists client_projects_handoff_type_check;

alter table client_projects
  add constraint client_projects_handoff_type_check check (
    handoff_type is null or handoff_type in (
      'final_deliverable',
      'client_facing_package',
      'partner_coordination_package',
      'non_submittable_base_package'
    )
  );

alter table client_projects
  drop constraint if exists client_projects_change_order_status_check;

alter table client_projects
  add constraint client_projects_change_order_status_check check (
    change_order_status is null or change_order_status in (
      'not_needed',
      'pending',
      'approved',
      'rejected'
    )
  );

create index if not exists client_projects_current_phase_idx on client_projects (current_phase);
create index if not exists client_projects_internal_review_due_at_idx on client_projects (internal_review_due_at);
create index if not exists client_projects_client_feedback_due_at_idx on client_projects (client_feedback_due_at);
create index if not exists client_projects_change_order_required_idx on client_projects (change_order_required);

create or replace view projects_needing_inputs as
select
  id,
  project_name,
  client_name,
  status,
  project_owner,
  primary_channel,
  created_at,
  delivery_due_at
from client_projects
where status = 'inputs_pending'
order by created_at asc;

create or replace view projects_in_internal_qa as
select
  id,
  project_name,
  client_name,
  current_phase,
  qa_owner,
  internal_review_due_at,
  delivery_due_at
from client_projects
where status = 'internal_qa'
order by internal_review_due_at nulls first, delivery_due_at asc;

create or replace view projects_waiting_client_feedback as
select
  id,
  project_name,
  client_name,
  project_owner,
  client_feedback_due_at,
  delivery_due_at,
  change_order_required
from client_projects
where status in ('client_review', 'revisions')
order by client_feedback_due_at nulls first, delivery_due_at asc;

create or replace view projects_ready_for_handoff as
select
  id,
  project_name,
  client_name,
  handoff_type,
  partner_required,
  partner_role,
  delivery_due_at
from client_projects
where status = 'handoff'
order by delivery_due_at asc nulls last;

create or replace view projects_at_risk as
select
  id,
  project_name,
  client_name,
  status,
  current_phase,
  project_owner,
  partner_required,
  signoff_required,
  submission_required,
  delivery_due_at,
  client_feedback_due_at,
  internal_review_due_at,
  change_order_required
from client_projects
where
  (
    status = 'inputs_pending' and created_at <= now() - interval '3 days'
  ) or (
    status in ('client_review', 'revisions') and client_feedback_due_at is not null and client_feedback_due_at < now()
  ) or (
    status = 'internal_qa' and internal_review_due_at is not null and internal_review_due_at < now()
  ) or (
    partner_required = true and regulatory_path_confirmed = false
  ) or (
    signoff_required = true and partner_required = false
  )
order by delivery_due_at asc nulls last, created_at asc;

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
where cp.status in ('intake', 'kickoff', 'inputs_pending')
order by cp.created_at desc;
