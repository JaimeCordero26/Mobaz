import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
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
