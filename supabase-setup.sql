-- Ejecutar esto en el SQL Editor de Supabase

-- 1. Crear tabla de proyectos
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text not null,
  description text not null,
  category text not null,
  images text[] default '{}',
  created_at timestamp with time zone default now()
);

-- 2. Habilitar RLS (Row Level Security)
alter table projects enable row level security;

-- 3. Permitir lectura pública (para mostrar en la landing)
create policy "Public read" on projects
  for select using (true);

-- 4. Permitir insertar y eliminar (sin auth, usa la contraseña del admin panel)
create policy "Admin insert" on projects
  for insert with check (true);

create policy "Admin delete" on projects
  for delete using (true);

-- 5. Crear el bucket de imágenes (ejecutar en Storage > New bucket)
-- Nombre: project-images
-- Public: true

-- 6. Política de storage para subir imágenes
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict do nothing;

create policy "Public read images" on storage.objects
  for select using (bucket_id = 'project-images');

create policy "Anyone can upload images" on storage.objects
  for insert with check (bucket_id = 'project-images');

create policy "Anyone can delete images" on storage.objects
  for delete using (bucket_id = 'project-images');
