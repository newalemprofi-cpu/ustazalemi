export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { loadPublished } from "@/lib/submissions";
import ArchiveBody from "./ArchiveBody";

export const metadata: Metadata = {
  title: "Архив — USTAZALEMI",
  description: "Жарияланған мақалалар архиві",
};

const STATIC_JOURNALS = [
  { id: "j1", name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"' },
  { id: "j2", name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"' },
  { id: "j3", name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"' },
  { id: "j4", name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"' },
  { id: "j5", name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"' },
];

const YEARS = Array.from({ length: 5 }, (_, i) => String(new Date().getFullYear() - i));

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const search = typeof sp?.search === "string" ? sp.search.toLowerCase() : "";
  const journalFilter = typeof sp?.journal === "string" ? sp.journal : "";
  const languageFilter = typeof sp?.language === "string" ? sp.language : "";
  const yearFilter = typeof sp?.year === "string" ? sp.year : "";

  const all = await loadPublished();

  const filtered = all.filter((s) => {
    if (search && !s.title.toLowerCase().includes(search) && !s.fullName.toLowerCase().includes(search)) {
      return false;
    }
    if (journalFilter && s.journalId !== journalFilter) return false;
    if (languageFilter && s.language !== languageFilter) return false;
    if (yearFilter) {
      const year = new Date(s.publishedAt || s.createdAt).getFullYear().toString();
      if (year !== yearFilter) return false;
    }
    return true;
  });

  const articles = filtered.map((s) => ({
    id: s.id,
    title: s.title,
    authorName: s.fullName,
    language: s.language,
    publishedAt: s.publishedAt || s.createdAt,
    slug: s.articleSlug,
    journal: { name: s.journalName },
    certificateId: s.certificateId,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <ArchiveBody
        articles={articles}
        journals={STATIC_JOURNALS}
        years={YEARS}
        currentSearch={search}
        currentJournal={journalFilter}
        currentLanguage={languageFilter}
        currentYear={yearFilter}
      />
    </div>
  );
}
