export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { findByCertId } from "@/lib/submissions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get("number");
  if (!number?.trim()) {
    return Response.json({ error: "Нөмір міндетті" }, { status: 400 });
  }

  const sub = await findByCertId(number.trim());
  if (!sub) {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }

  // id is the certificateId (CERT-XXXXXXXX) so /certificate/[certificateId] uses the friendly format
  return Response.json({
    id: sub.certificateId,
    certificateNumber: sub.certificateId,
    issuedAt: sub.publishedAt || sub.createdAt,
    isValid: true,
    article: {
      title: sub.title,
      authorName: sub.fullName,
      language: sub.language,
      publishedAt: sub.publishedAt || sub.createdAt,
      journal: { name: sub.journalName },
    },
  });
}
