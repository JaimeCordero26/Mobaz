import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function getR2Client(): S3Client | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) return null;

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getPublicUrl(): string {
  return (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
}

export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<string | null> {
  const client = getR2Client();
  const bucket = process.env.R2_BUCKET_NAME || "";
  const publicUrl = getPublicUrl();
  if (!client || !bucket || !publicUrl) return null;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return `${publicUrl}/${key}`;
}
