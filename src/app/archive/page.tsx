export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ArchiveBody from "./ArchiveBody";

export const metadata: Metadata = {
  title: "Архив — USTAZALEMI",
  description: "Жарияланган макалалар архиви",
};

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const search = typeof sp?.search === "string" ? sp.search : "";
  const journalFilter = typeof sp?.journal === "string" ? sp.journal : "";
  const languageFilter = typeof sp?.language === "string" ? sp.language : "";
  const yearFilter = typeof sp?.year === "string" ? sp.year : "";

  const articles = await prisma.article
    .findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { authorName: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          journalFilter ? { journalId: journalFilter } : {},
          languageFilter
            ? { language: languageFilter as "kazakh" | "russian" | "english" }
            : {},
          yearFilter
            ? {
                publishedAt: {
                  gte: new Date(`${yearFilter}-01-01`),
                  lte: new Date(`${yearFilter}-12-31`),
                },
              }
            : {},
        ],
      },
      include: { journal: true, certificate: true },
      orderBy: { publishedAt: "desc" },
      take: 50,
    })
    .catch(() => []);

  const journals = await prisma.journal
    .findMany({ where: { isActive: true } })
    .catch(() => []);

  const years = Array.from({ length: 5 }, (_, i) =>
    String(new Date().getFullYear() - i)
  );

  const serializedArticles = articles.map((a) => ({
    id: a.id,
    title: a.title,
    authorName: a.authorName,
    language: a.language,
    publishedAt: a.publishedAt.toISOString(),
    slug: a.slug,
    journal: { name: a.journal.name },
    certificate: a.certificate ? { id: a.certificate.id } : null,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <ArchiveBody
        articles={serializedArticles}
        journals={journals.map((j) => ({ id: j.id, name: j.name }))}
        years={years}
        currentSearch={search}
        currentJournal={journalFilter}
        currentLanguage={languageFilter}
        currentYear={yearFilter}
      />
    </div>
  );
}
