-- ═══════════════════════════════════════════════════════════
-- EJECUTAR ESTO EN EL SQL EDITOR DE SUPABASE
-- ═══════════════════════════════════════════════════════════

-- 1. Tabla para saber si ya existe una cuenta de admin creada
create table if not exists admin_settings (
  id int primary key default 1,
  setup_complete boolean default false,
  constraint only_one_row check (id = 1)
);

insert into admin_settings (id, setup_complete)
values (1, false)
on conflict do nothing;

alter table admin_settings enable row level security;

create policy "Public read settings" on admin_settings
  for select using (true);

create policy "Auth update settings" on admin_settings
  for update using (auth.uid() is not null);

-- 2. Reemplazar políticas de projects — ahora requieren estar logueado
drop policy if exists "Admin insert" on projects;
drop policy if exists "Admin update" on projects;
drop policy if exists "Admin delete" on projects;

create policy "Auth insert projects" on projects
  for insert with check (auth.uid() is not null);

create policy "Auth update projects" on projects
  for update using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Auth delete projects" on projects
  for delete using (auth.uid() is not null);

-- 3. Reemplazar políticas de Storage — ahora requieren estar logueado
drop policy if exists "Anyone can upload images" on storage.objects;
drop policy if exists "Anyone can delete images" on storage.objects;

create policy "Auth upload images" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.uid() is not null);

create policy "Auth delete images" on storage.objects
  for delete using (bucket_id = 'project-images' and auth.uid() is not null);
