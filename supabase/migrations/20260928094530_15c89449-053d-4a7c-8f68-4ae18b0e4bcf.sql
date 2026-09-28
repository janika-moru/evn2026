create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users see own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  dedupe_key text not null unique,
  fienta_event_id text not null,
  email_normalized text not null,
  attendee_name text,
  fienta_order_id text,
  fienta_ticket_id text,
  status text not null default 'active',
  source text not null default 'webhook',
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index registrations_email_idx on public.registrations (email_normalized);
grant select on public.registrations to authenticated;
grant all on public.registrations to service_role;
alter table public.registrations enable row level security;
create policy "Users see own registrations" on public.registrations for select to authenticated
  using (email_normalized = lower(trim(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Admins see all registrations" on public.registrations for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create table public.webhook_logs (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  source text not null default 'webhook',
  fienta_event_id text,
  email_normalized text,
  event_found boolean,
  error text,
  raw_payload jsonb
);
grant select on public.webhook_logs to authenticated;
grant all on public.webhook_logs to service_role;
alter table public.webhook_logs enable row level security;
create policy "Admins see webhook logs" on public.webhook_logs for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.update_updated_at_column() returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;
create trigger registrations_updated_at before update on public.registrations
  for each row execute function public.update_updated_at_column();