-- Workshop commitment cards (Growth Gap accountability exercise)
create table if not exists public.workshop_commitments (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  name text not null,
  email text not null,
  stage_crisis text not null,
  blocker text not null,
  action_text text not null,
  accountability_note text not null,
  paired_with_id uuid references public.workshop_commitments(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'paired')),
  check_in_token uuid not null default gen_random_uuid(),
  nudge_count int not null default 0,
  last_nudge_at timestamptz,
  welcome_sent boolean not null default false,
  day7_sent boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_commitments_session_pending
  on public.workshop_commitments (session_id, created_at)
  where status = 'pending' and paired_with_id is null;

create index if not exists idx_commitments_active_pairs
  on public.workshop_commitments (created_at)
  where status = 'paired';

-- No public access — all reads/writes go through Netlify Functions (service role)
alter table public.workshop_commitments enable row level security;
