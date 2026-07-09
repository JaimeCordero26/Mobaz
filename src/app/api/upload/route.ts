import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";

async function isAuthenticated(req: Request): Promise<boolean> {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token || !url || !anonKey) return false;

  const res = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
  });
  return res.ok;
}

export async function POST(req: Request) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "El archivo supera el límite de 10MB." }, { status: 413 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const url = await uploadToR2(key, buffer, file.type || "application/octet-stream");
  if (!url) {
    return NextResponse.json({ error: "Error de configuración de Cloudflare R2." }, { status: 500 });
  }

  return NextResponse.json({ url });
}
