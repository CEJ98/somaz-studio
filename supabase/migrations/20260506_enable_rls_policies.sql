alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.deals enable row level security;
alter table public.partners enable row level security;
alter table public.client_projects enable row level security;
alter table public.weekly_metrics enable row level security;

alter table public.contact_submissions force row level security;
alter table public.newsletter_subscribers force row level security;
alter table public.deals force row level security;
alter table public.partners force row level security;
alter table public.client_projects force row level security;
alter table public.weekly_metrics force row level security;

drop policy if exists "deny_public_access" on public.contact_submissions;
drop policy if exists "deny_public_access" on public.newsletter_subscribers;
drop policy if exists "deny_public_access" on public.deals;
drop policy if exists "deny_public_access" on public.partners;
drop policy if exists "deny_public_access" on public.client_projects;
drop policy if exists "deny_public_access" on public.weekly_metrics;

create policy "deny_public_access"
  on public.contact_submissions
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "deny_public_access"
  on public.newsletter_subscribers
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "deny_public_access"
  on public.deals
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "deny_public_access"
  on public.partners
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "deny_public_access"
  on public.client_projects
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "deny_public_access"
  on public.weekly_metrics
  for all
  to anon, authenticated
  using (false)
  with check (false);
