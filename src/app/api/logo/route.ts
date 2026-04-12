import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOGO_DIR = path.join(process.cwd(), "public", "logo");

export async function GET() {
  let files: string[] = [];
  try {
    files = fs.readdirSync(LOGO_DIR).filter((f) => !f.startsWith("."));
  } catch {
    return new NextResponse(null, { status: 404 });
  }

  if (files.length === 0) {
    return new NextResponse(null, { status: 404 });
  }

  const logoFile = files[0];
  const filePath = path.join(LOGO_DIR, logoFile);
  const buffer = fs.readFileSync(filePath);

  const ext = path.extname(logoFile).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
  };
  const contentType = mimeTypes[ext] || "application/octet-stream";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
