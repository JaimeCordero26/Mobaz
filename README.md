# SC Servicios Constructivos — Sitio Web Corporativo

Landing page profesional con portafolio de proyectos y panel de administración para **SC Servicios Constructivos**, empresa constructora con más de 23 años de experiencia en Costa Rica.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) |
| Base de datos | [Supabase](https://supabase.com/) (PostgreSQL) |
| Almacenamiento | Supabase Storage |
| Iconos | [Lucide React](https://lucide.dev/) |
| Deploy | [Vercel](https://vercel.com/) (recomendado) |

---

## Estructura del proyecto

```
sc-constructivos/
├── public/
│   └── logo/              ← Colocar el logo aquí (cualquier formato)
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx   ← Panel de administración
│   │   ├── api/
│   │   │   └── logo/
│   │   │       └── route.ts ← Sirve el logo dinámicamente
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx       ← Landing page principal
│   ├── components/
│   │   ├── Navbar.tsx     ← Navegación fija con logo
│   │   ├── Hero.tsx       ← Sección principal (hero)
│   │   ├── Services.tsx   ← Sección de servicios
│   │   ├── Portfolio.tsx  ← Portafolio con carrusel
│   │   ├── Contact.tsx    ← Formulario de contacto (WhatsApp)
│   │   └── Footer.tsx
│   └── lib/
│       └── supabase.ts    ← Cliente de Supabase
├── supabase-setup.sql     ← Script para configurar la base de datos
└── .env.local             ← Variables de entorno (NO subir a git)
```

---

## Configuración inicial

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd sc-constructivos
npm install
```

### 2. Variables de entorno

Crear el archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
NEXT_PUBLIC_ADMIN_PASSWORD=tu-contraseña-segura
```

> **Importante:** El archivo `.env.local` está en `.gitignore` — nunca subir credenciales al repositorio.

### 3. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **SQL Editor** y ejecutar el contenido de `supabase-setup.sql`
3. Esto crea:
   - Tabla `projects` con RLS habilitado
   - Políticas de seguridad para lectura pública y escritura desde el admin
   - Bucket `project-images` para almacenamiento de fotos

### 4. Logo de la empresa

Colocar el archivo del logo dentro de `public/logo/`:

```
public/logo/logo.png   ← (o .svg, .jpg, .webp — cualquier formato)
```

El sitio lo detecta automáticamente. Si no hay logo, muestra el nombre en texto.

### 5. Correr en desarrollo

```bash
npm run dev
```

- **Landing page:** http://localhost:3000
- **Panel admin:** http://localhost:3000/admin

---

## Panel de Administración

Accesible en `/admin`. Permite:

- **Crear proyectos** con nombre, ubicación, categoría, descripción y múltiples fotos
- **Editar proyectos** existentes — modificar datos y agregar/quitar fotos individualmente
- **Eliminar proyectos**
- **Previsualizar fotos** en carrusel directamente desde el panel
- Ver estadísticas rápidas por categoría

La contraseña se configura en `.env.local` con `NEXT_PUBLIC_ADMIN_PASSWORD`.

---

## Secciones de la landing page

| Sección | Descripción |
|---|---|
| **Hero** | Presentación principal con gradiente azul-verde, estadísticas y CTAs |
| **Servicios** | 6 tarjetas: Casas, Edificios, Remodelaciones, Acabados, Comercial, Mantenimiento |
| **Portafolio** | Grid filtrable por categoría. Cada tarjeta tiene carrusel de fotos con auto-avance al hacer hover. Modal con thumbnails al hacer clic |
| **Contacto** | Formulario que abre WhatsApp con el mensaje prellenado. Botón directo de WhatsApp |
| **Footer** | Links, teléfono y WhatsApp directo |

---

## Deploy en Vercel

```bash
# 1. Instalar Vercel CLI (si no lo tenés)
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variables de entorno en el dashboard de Vercel:
#    NEXT_PUBLIC_SUPABASE_URL
#    NEXT_PUBLIC_SUPABASE_ANON_KEY
#    NEXT_PUBLIC_ADMIN_PASSWORD
```

O conectar el repositorio directamente desde vercel.com para deploy automático en cada push a `main`.

---

## Agregar nuevas categorías de proyectos

Editar el array `categories` en dos archivos:

**`src/components/Portfolio.tsx`**
```ts
const categories = ["Todos", "Residencial", "Comercial", "Apartamentos", "Remodelación", "Nueva Categoría"];
```

**`src/app/admin/page.tsx`**
```ts
const categories = ["Residencial", "Comercial", "Apartamentos", "Remodelación", "Nueva Categoría"];
```

---

## Cambiar número de WhatsApp

En `src/components/Contact.tsx`, línea 6:

```ts
const WHATSAPP_NUMBER = "506XXXXXXXX"; // Formato: código de país + número sin guiones
```

---

## Contacto del proyecto

- **Empresa:** SC Servicios Constructivos
- **Teléfono:** 8803-5690
- **País:** Costa Rica
