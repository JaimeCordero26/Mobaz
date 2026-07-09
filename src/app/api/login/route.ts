import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: Request) {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";

  try {
    const { env } = await getCloudflareContext({ async: true });
    const { success } = await env.LOGIN_RATE_LIMITER.limit({ key: ip });
    if (!success) {
      return NextResponse.json(
        { error: "Demasiados intentos. Esperá un minuto e intentá de nuevo." },
        { status: 429 }
      );
    }
  } catch (e) {
    console.error("rate limiter unavailable:", e);
  }

  const { email, password } = (await req.json()) as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ error: "Correo y contraseña requeridos." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json({ error: "Error de configuración." }, { status: 500 });
  }

  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: anonKey },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    error_description?: string;
    msg?: string;
  };

  if (!res.ok || !data.access_token) {
    return NextResponse.json(
      { error: "Correo o contraseña incorrectos." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  });
}
