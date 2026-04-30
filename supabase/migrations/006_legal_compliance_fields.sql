alter table deals
  add column if not exists partner_engagement_model text,
  add column if not exists signoff_required boolean not null default false,
  add column if not exists submission_required boolean not null default false,
  add column if not exists governing_law_profile text,
  add column if not exists nda_required boolean not null default false;

alter table client_projects
  add column if not exists signoff_required boolean not null default false,
  add column if not exists submission_required boolean not null default false,
  add column if not exists governing_law_profile text,
  add column if not exists nda_required boolean not null default false,
  add column if not exists regulatory_path_confirmed boolean not null default false;

alter table deals
  drop constraint if exists deals_partner_engagement_model_check;

alter table deals
  add constraint deals_partner_engagement_model_check check (
    partner_engagement_model is null or partner_engagement_model in ('referral', 'coordinated')
  );

alter table deals
  drop constraint if exists deals_governing_law_profile_check;

alter table deals
  add constraint deals_governing_law_profile_check check (
    governing_law_profile is null or governing_law_profile in ('argentina', 'florida_international')
  );

alter table client_projects
  drop constraint if exists client_projects_governing_law_profile_check;

alter table client_projects
  add constraint client_projects_governing_law_profile_check check (
    governing_law_profile is null or governing_law_profile in ('argentina', 'florida_international')
  );

create index if not exists deals_governing_law_profile_idx on deals (governing_law_profile);
create index if not exists client_projects_governing_law_profile_idx on client_projects (governing_law_profile);
