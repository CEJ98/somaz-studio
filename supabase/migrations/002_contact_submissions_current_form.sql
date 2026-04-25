alter table contact_submissions
  add column if not exists timeline text;

alter table contact_submissions
  alter column budget drop not null,
  alter column message drop not null;
