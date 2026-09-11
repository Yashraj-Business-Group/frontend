-- =====================================================================
-- Rate limiting for public form submissions
-- =====================================================================
-- There is no backend server in this app to put a rate limiter in front
-- of — the browser inserts directly into Postgres via Supabase's REST
-- API using the public anon key. That means the only place rate limiting
-- can be *actually enforced* (not just suggested by the UI, which any
-- bot can ignore by calling the REST API directly) is here, in the
-- database itself, via a trigger that runs on every insert attempt
-- regardless of how it was made.
--
-- Run this once in the Supabase SQL editor, after policies.sql.
--
-- How it identifies a caller: PostgREST forwards the request's IP via
-- the `request.headers` GUC (x-forwarded-for), which Supabase's edge
-- sets on every incoming request. If that's ever unavailable, we fall
-- back to the submitted email so we never accidentally lump every
-- visitor into one shared bucket.
-- =====================================================================

create table if not exists "RateLimitLog" (
  id uuid primary key default gen_random_uuid(),
  identifier text not null,
  action text not null,
  created_at timestamptz not null default now()
);

create index if not exists ratelimitlog_lookup_idx
  on "RateLimitLog" (identifier, action, created_at);

-- Lock the log table down completely from the client — only the
-- SECURITY DEFINER function below (running as the table owner) can
-- read/write it. No policies means no access for anon/authenticated.
alter table "RateLimitLog" enable row level security;

create or replace function get_client_identifier(fallback text)
returns text
language plpgsql
stable
as $$
declare
  ip text;
begin
  ip := nullif(split_part(
    coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for', ''),
    ',', 1
  ), '');
  return coalesce(ip, lower(fallback), 'unknown');
end;
$$;

create or replace function enforce_rate_limit(p_identifier text, p_action text, p_max_count int, p_window_minutes int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count int;
begin
  select count(*) into recent_count
  from "RateLimitLog"
  where identifier = p_identifier
    and action = p_action
    and created_at > now() - (p_window_minutes || ' minutes')::interval;

  if recent_count >= p_max_count then
    raise exception 'RATE_LIMIT_EXCEEDED: too many % submissions, try again later', p_action;
  end if;

  insert into "RateLimitLog" (identifier, action) values (p_identifier, p_action);
end;
$$;

-- ---------------------------------------------------------------------
-- ServiceRequest: max 3 submissions per 60 minutes per caller
-- ---------------------------------------------------------------------
create or replace function trg_rate_limit_service_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform enforce_rate_limit(get_client_identifier(new.email), 'ServiceRequest', 3, 60);
  return new;
end;
$$;

drop trigger if exists rate_limit_service_request on "ServiceRequest";
create trigger rate_limit_service_request
  before insert on "ServiceRequest"
  for each row execute function trg_rate_limit_service_request();

-- ---------------------------------------------------------------------
-- JobApplication: max 5 submissions per 60 minutes per caller
-- ---------------------------------------------------------------------
create or replace function trg_rate_limit_job_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform enforce_rate_limit(get_client_identifier(new.email), 'JobApplication', 5, 60);
  return new;
end;
$$;

drop trigger if exists rate_limit_job_application on "JobApplication";
create trigger rate_limit_job_application
  before insert on "JobApplication"
  for each row execute function trg_rate_limit_job_application();

-- =====================================================================
-- Tuning: adjust the numbers above (max_count, window_minutes) to taste.
-- A genuine customer submitting 3 quote requests in an hour is unlikely;
-- if that's too strict for your traffic, raise it in the SQL editor and
-- re-run just the two `create or replace function trg_rate_limit_*`
-- blocks (or the whole file — it's safe to re-run in full).
-- =====================================================================
