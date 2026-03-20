-- Discovery Form Submissions Table
-- Run this in your Supabase SQL Editor

create table if not exists discovery_submissions (
  id uuid default gen_random_uuid() primary key,
  client_slug text not null,
  form_data jsonb not null default '{}',
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Index for quick lookups by client
create index if not exists idx_discovery_submissions_client_slug
  on discovery_submissions(client_slug);

-- Enable RLS
alter table discovery_submissions enable row level security;

-- Allow inserts from anon key (form submissions)
create policy "Allow anonymous inserts"
  on discovery_submissions for insert
  with check (true);

-- Allow reads only for authenticated admin users
create policy "Allow admin reads"
  on discovery_submissions for select
  using (auth.role() = 'authenticated');
