-- ============================================================
-- Ananthamurthy International School: database schema (Supabase / Postgres)
-- Phase 1: admissions inquiries + staff accounts (the foundation for portals)
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE where possible.
-- ============================================================

-- ---------- Profiles: one row per signed-in person, with a role ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  full_name   text,
  -- 'pending' = signed up but not yet approved by the school. Nobody can
  -- give themselves a role; only an admin can change it.
  role        text not null default 'pending'
              check (role in ('pending','parent','student','teacher','staff','admin'))
);

-- Create a 'pending' profile automatically whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper checks used by the security rules below.
create or replace function public.current_role_name()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() in ('staff','admin'), false)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() = 'admin', false)
$$;

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());

drop policy if exists "staff read all profiles" on public.profiles;
create policy "staff read all profiles" on public.profiles
  for select to authenticated using (public.is_staff());

drop policy if exists "admin manage profiles" on public.profiles;
create policy "admin manage profiles" on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Inquiries: the admissions form ----------
create table if not exists public.inquiries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  parent_name      text not null check (char_length(parent_name)    between 1 and 200),
  student_name     text not null check (char_length(student_name)  between 1 and 200),
  date_of_birth    date,
  class_applying   text not null check (char_length(class_applying) between 1 and 100),
  phone            text not null check (char_length(phone) between 5 and 30),
  email            text not null check (char_length(email) <= 254
                                        and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  referral_source  text check (char_length(referral_source) <= 100),
  message          text check (char_length(message) <= 2000),
  consent          boolean not null check (consent = true),   -- ticked on the form
  -- Staff-only fields. The public form cannot set these (see policy below).
  status           text not null default 'new'
                   check (status in ('new','contacted','visit_scheduled','offered','enrolled','declined','closed')),
  staff_notes      text
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx  on public.inquiries (status);

alter table public.inquiries enable row level security;

-- The public website may ONLY add a new inquiry. It can never read, edit or delete.
drop policy if exists "public can submit inquiry" on public.inquiries;
create policy "public can submit inquiry" on public.inquiries
  for insert to anon, authenticated
  with check (status = 'new' and staff_notes is null);

-- Staff can read and update inquiries.
drop policy if exists "staff read inquiries" on public.inquiries;
create policy "staff read inquiries" on public.inquiries
  for select to authenticated using (public.is_staff());

drop policy if exists "staff update inquiries" on public.inquiries;
create policy "staff update inquiries" on public.inquiries
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

-- Deleting personal data is an admin-only action (e.g. a parent asks for erasure).
drop policy if exists "admin delete inquiries" on public.inquiries;
create policy "admin delete inquiries" on public.inquiries
  for delete to authenticated using (public.is_admin());

-- ============================================================
-- After running this:
--   1. Sign up once on your own (Authentication -> Users -> Add user).
--   2. Make yourself admin (replace the email):
--        update public.profiles set role = 'admin'
--        where id = (select id from auth.users where email = 'YOU@example.com');
-- ============================================================
