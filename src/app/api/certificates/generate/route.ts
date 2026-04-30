export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCertificateNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { articleId } = await req.json();
    if (!articleId) return Response.json({ error: "articleId міндетті" }, { status: 400 });

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) return Response.json({ error: "Мақала табылмады" }, { status: 404 });

    // Upsert certificate
    const existing = await prisma.certificate.findUnique({ where: { articleId } });
    const certNumber = generateCertificateNumber();

    let cert;
    if (existing) {
      cert = await prisma.certificate.update({
        where: { articleId },
        data: { certificateNumber: certNumber, issuedAt: new Date(), isValid: true },
      });
    } else {
      cert = await prisma.certificate.create({
        data: { articleId, certificateNumber: certNumber, issuedAt: new Date(), isValid: true },
      });
    }

    return Response.json(cert, { status: 201 });
  } catch {
    return Response.json({ error: "Сертификат қатесі" }, { status: 500 });
  }
}
