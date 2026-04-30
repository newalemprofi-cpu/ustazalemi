export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get("number");
  if (!number) return Response.json({ error: "Нөмір міндетті" }, { status: 400 });

  const cert = await prisma.certificate.findUnique({
    where: { certificateNumber: number.toUpperCase() },
    include: {
      article: { include: { journal: true } },
    },
  });

  if (!cert) return Response.json({ error: "Табылмады" }, { status: 404 });

  return Response.json({
    id: cert.id,
    certificateNumber: cert.certificateNumber,
    issuedAt: cert.issuedAt,
    isValid: cert.isValid,
    article: {
      title: cert.article.title,
      authorName: cert.article.authorName,
      language: cert.article.language,
      publishedAt: cert.article.publishedAt,
      slug: cert.article.slug,
      journal: { name: cert.article.journal.name },
    },
  });
}
