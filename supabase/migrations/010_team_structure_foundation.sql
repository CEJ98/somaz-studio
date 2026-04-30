alter table partners
  drop constraint if exists partners_partner_type_check;

alter table partners
  add constraint partners_partner_type_check check (
    partner_type in (
      'architect_of_record',
      'render_support',
      'documentation_support',
      'interior_support',
      'engineering_consultant',
      'permit_consultant',
      'builder_coordination',
      'graphic_presentation_support'
    )
  );

create index if not exists partners_licensed_region_idx on partners (licensed_region);

create or replace view preferred_partner_network as
select
  id,
  name,
  partner_type,
  company,
  email,
  phone,
  location,
  licensed_region,
  scope,
  status,
  notes,
  created_at
from partners
where status = 'active'
order by partner_type asc, created_at asc;
