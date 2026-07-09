# Mobaz — Sitio Web Corporativo

Landing page y panel de administración para **Mobaz**, constructora familiar con sede en Guanacaste, Costa Rica (grupo Mobaz-Inge, fundada en 2014).

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) |
| Hosting | [Cloudflare Workers](https://developers.cloudflare.com/workers/) vía [OpenNext](https://opennext.js.org/cloudflare) |
| Auth + DB | [Supabase](https://supabase.com/) (PostgreSQL, solo login admin + metadata de proyectos) |
| Fotos de proyectos | [Cloudflare R2](https://developers.cloudflare.com/r2/) |
| Rate limiting | Cloudflare Rate Limiting API (login) |
| Iconos | [Lucide React](https://lucide.dev/) |

---

## Estructura del proyecto

```
├── public/
│   ├── logo/               ← Logo del sitio (cualquier formato, se sirve como asset estático)
│   ├── brand/               ← Variante blanca del logo (footer/fondos oscuros)
│   ├── icons/               ← Íconos decorativos (partículas del Hero)
│   └── team/                ← Fotos del equipo
├── src/
│   ├── app/
│   │   ├── admin/            ← Panel de administración (login + CRUD de proyectos)
│   │   ├── api/
│   │   │   ├── login/         ← Proxy a Supabase Auth con rate limiting
│   │   │   └── upload/        ← Sube fotos a R2 (requiere sesión válida)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx          ← Acerca de nosotros (misión/visión/valores)
│   │   ├── Team.tsx           ← Conozca a nuestros profesionales
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx      ← Portafolio filtrable con carrusel
│   │   ├── Contact.tsx        ← Formulario WhatsApp (elige a quién enviar)
│   │   ├── Footer.tsx
│   │   ├── BuildingSkyline.tsx    ← Decoración SVG de fondo
│   │   └── ParticleBackground.tsx ← Partículas animadas del Hero
│   └── lib/
│       ├── supabase.ts
│       └── r2.ts
├── supabase-setup.sql        ← Tabla `projects` + RLS
├── supabase-auth-setup.sql   ← Tabla `admin_settings` + políticas con auth
├── wrangler.jsonc            ← Config del Worker (bindings R2, rate limiter, vars públicas)
└── .github/workflows/keep-alive.yml ← Ping a Supabase c/3 días (evita que se pause)
```

---

## Variables de entorno

Ver `.env.example`. Local: crear `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

En producción (Cloudflare): `R2_ACCOUNT_ID`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL` y las de Supabase ya están commiteadas en `wrangler.jsonc` (son públicas/no sensibles). `R2_ACCESS_KEY_ID` y `R2_SECRET_ACCESS_KEY` van como **Secret** en el dashboard del Worker (Settings → Variables and secrets) — no persisten si se agregan como Plaintext sin estar en el archivo. Además, `NEXT_PUBLIC_SUPABASE_URL`/`ANON_KEY` deben estar también en **Settings → Build → Variables and secrets**, ya que ahí es donde se inyectan al `next build`.

---

## Correr en desarrollo

```bash
npm install
npm run dev
```

- Landing: http://localhost:3000
- Panel admin: http://localhost:3000/admin

## Deploy

Conectado a Cloudflare Workers Builds (git push a `main` dispara build + deploy automático). Build command: `npm run build`. Deploy command: `npm run deploy` (corre `opennextjs-cloudflare build && opennextjs-cloudflare deploy`).

---

## Panel de Administración

Accesible en `/admin`, login con Supabase Auth (email + contraseña). Permite crear/editar/eliminar proyectos con fotos (subidas a R2), con estadísticas rápidas por categoría.

---

## Cambiar contactos de WhatsApp

En `src/components/Contact.tsx` y `src/components/Footer.tsx`, array `CONTACTS`:

```ts
const CONTACTS = [
  { name: "Jason Mora", phone: "83276566" },
  { name: "Bryan Mora", phone: "83425820" },
];
```

## Agregar categorías de proyectos

Editar el array `categories` en `src/components/Portfolio.tsx` y `src/app/admin/page.tsx`.
