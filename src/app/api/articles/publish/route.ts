export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify, generateCertificateNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { submissionId, title, authorName, content, journalId, language } = await req.json();

    if (!submissionId || !title || !authorName || !journalId || !language) {
      return Response.json({ error: "Міндетті өрістер жетіспейді" }, { status: 400 });
    }

    const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
    if (!submission) return Response.json({ error: "Өтінім табылмады" }, { status: 404 });

    // Generate unique slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const articleContent = content || submission.textContent || "";

    const article = await prisma.article.create({
      data: {
        submissionId,
        authorName,
        title,
        content: articleContent,
        journalId: journalId || submission.journalId,
        language: (language || submission.language) as "kazakh" | "russian" | "english",
        slug,
        publishedAt: new Date(),
      },
    });

    // Auto-generate certificate
    const certNumber = generateCertificateNumber();
    const certificate = await prisma.certificate.create({
      data: {
        articleId: article.id,
        certificateNumber: certNumber,
        issuedAt: new Date(),
        isValid: true,
      },
    });

    // Update submission status to published
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: "published" },
    });

    return Response.json({ article, certificate }, { status: 201 });
  } catch (err) {
    console.error("Publish error:", err);
    return Response.json({ error: "Жариялау қатесі" }, { status: 500 });
  }
}
