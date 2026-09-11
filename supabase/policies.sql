-- =====================================================================
-- YBG Row Level Security policies
-- =====================================================================
-- The frontend now talks to Supabase directly from the browser using the
-- public "anon" key (see src/supabase.ts). That key is, by design, visible
-- to anyone who loads the site. Without RLS, every row in every table
-- below is fully readable/writable by any anonymous visitor.
--
-- Run this once in the Supabase SQL editor (or via `supabase db push` /
-- the CLI) against your project. It is idempotent-ish: re-running will
-- fail on "policy already exists" — drop the old policy first if you
-- need to change one.
--
-- Model used: any row-owner-agnostic table is split into
--   - a narrow "public" policy (only what the public site truly needs)
--   - a broad "authenticated" policy (the logged-in admin can do the rest)
-- This assumes every Supabase Auth user is an admin (matches the current
-- single-admin-portal design). If you later add non-admin authenticated
-- users, replace `auth.role() = 'authenticated'` below with a proper
-- role/claim check (e.g. a custom `is_admin` claim or an `admins` table).
-- =====================================================================

-- ---------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------
alter table "Blog" enable row level security;

drop policy if exists "Public can read published blogs" on "Blog";
create policy "Public can read published blogs"
  on "Blog" for select
  to anon
  using ("isPublished" = true);

drop policy if exists "Admins can manage blogs" on "Blog";
create policy "Admins can manage blogs"
  on "Blog" for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- GalleryItem
-- ---------------------------------------------------------------------
alter table "GalleryItem" enable row level security;

drop policy if exists "Public can read gallery" on "GalleryItem";
create policy "Public can read gallery"
  on "GalleryItem" for select
  to anon
  using (true);

drop policy if exists "Admins can manage gallery" on "GalleryItem";
create policy "Admins can manage gallery"
  on "GalleryItem" for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- JobPosting
-- ---------------------------------------------------------------------
alter table "JobPosting" enable row level security;

drop policy if exists "Public can read active jobs" on "JobPosting";
create policy "Public can read active jobs"
  on "JobPosting" for select
  to anon
  using ("isActive" = true);

drop policy if exists "Admins can manage jobs" on "JobPosting";
create policy "Admins can manage jobs"
  on "JobPosting" for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- JobApplication (contains applicant PII + resume links)
-- ---------------------------------------------------------------------
alter table "JobApplication" enable row level security;

drop policy if exists "Public can submit applications" on "JobApplication";
create policy "Public can submit applications"
  on "JobApplication" for insert
  to anon
  with check (true);

drop policy if exists "Admins can read applications" on "JobApplication";
create policy "Admins can read applications"
  on "JobApplication" for select
  to authenticated
  using (true);

drop policy if exists "Admins can update applications" on "JobApplication";
create policy "Admins can update applications"
  on "JobApplication" for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete applications" on "JobApplication";
create policy "Admins can delete applications"
  on "JobApplication" for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- ServiceRequest (contains customer PII)
-- ---------------------------------------------------------------------
alter table "ServiceRequest" enable row level security;

drop policy if exists "Public can submit requests" on "ServiceRequest";
create policy "Public can submit requests"
  on "ServiceRequest" for insert
  to anon
  with check (true);

drop policy if exists "Admins can read requests" on "ServiceRequest";
create policy "Admins can read requests"
  on "ServiceRequest" for select
  to authenticated
  using (true);

drop policy if exists "Admins can update requests" on "ServiceRequest";
create policy "Admins can update requests"
  on "ServiceRequest" for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete requests" on "ServiceRequest";
create policy "Admins can delete requests"
  on "ServiceRequest" for delete
  to authenticated
  using (true);

-- =====================================================================
-- Storage buckets
-- =====================================================================
-- "blog-images" holds admin-uploaded cover/gallery images -> public read,
-- writes restricted to logged-in admins.
-- "resumes" holds applicant-uploaded files -> anyone can upload (that's
-- the point of the public job application form), but only admins can
-- list/delete via the API. Note: if the bucket itself is marked "Public"
-- in the dashboard, direct object URLs are always fetchable regardless
-- of these policies — that's inherent to how public buckets work and is
-- fine here since filenames are randomized and not enumerable.
-- ---------------------------------------------------------------------

drop policy if exists "Public can view blog images" on storage.objects;
create policy "Public can view blog images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "Public can upload resumes" on storage.objects;
create policy "Public can upload resumes"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

drop policy if exists "Admins can view resumes" on storage.objects;
create policy "Admins can view resumes"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resumes');

drop policy if exists "Admins can delete resumes" on storage.objects;
create policy "Admins can delete resumes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'resumes');

-- =====================================================================
-- Optional: DB-level input constraints
-- =====================================================================
-- The frontend now trims and length-caps text fields before insert (see
-- src/utils/sanitizeText.ts), but that is client-side JS and only stops
-- the app's own UI — anyone calling the PostgREST API directly with the
-- anon key bypasses it completely. If you want real enforcement, add
-- CHECK constraints in the DB, e.g.:
--
--   alter table "ServiceRequest"
--     add constraint "ServiceRequest_fullName_len" check (char_length("fullName") between 1 and 2000),
--     add constraint "ServiceRequest_email_len" check (char_length(email) between 1 and 2000);
--
-- Repeat per text column per table as needed. Not included here by
-- default since it depends on your exact column names/nullability.
