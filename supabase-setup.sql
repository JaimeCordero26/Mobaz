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

-- Nota: las fotos de proyectos ya NO se guardan en Supabase Storage.
-- Se suben a Cloudflare R2 (ver src/lib/r2.ts y /api/upload).
-- Supabase acá solo guarda: la tabla "projects" (metadata) y el login del admin.
