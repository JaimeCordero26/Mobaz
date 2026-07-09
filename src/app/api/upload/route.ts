import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { uploadToR2 } from "@/lib/r2";

export async function POST(req: Request) {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";

  try {
    const { env } = await getCloudflareContext({ async: true });
    const { success } = await env.UPLOAD_RATE_LIMITER.limit({ key: ip });
    if (!success) {
      return NextResponse.json(
        { error: "Demasiadas subidas. Esperá un minuto e intentá de nuevo." },
        { status: 429 }
      );
    }
  } catch (e) {
    console.error("rate limiter unavailable:", e);
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
