-- Contact form submissions
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  project_type text not null,
  budget      text not null,
  sqft        text,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- Newsletter subscribers
create table if not exists newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);
