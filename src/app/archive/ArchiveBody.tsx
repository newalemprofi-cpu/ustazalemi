"use client";

import Link from "next/link";
import { BookOpen, Award, Search } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import ArchiveFilters from "./ArchiveFilters";

type Article = {
  id: string;
  title: string;
  authorName: string;
  language: string;
  publishedAt: string;
  slug: string;
  journal: { name: string };
  certificateId?: string;
};

interface Props {
  articles: Article[];
  journals: { id: string; name: string }[];
  years: string[];
  currentSearch: string;
  currentJournal: string;
  currentLanguage: string;
  currentYear: string;
}

const LANG_LABELS: Record<string, Record<string, string>> = {
  kz: { kazakh: "Қазақ тілі", russian: "Орыс тілі", english: "Ағылшын тілі" },
  ru: { kazakh: "Казахский язык", russian: "Русский язык", english: "Английский язык" },
};

function formatDateSimple(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArchiveBody({
  articles, journals, years,
  currentSearch, currentJournal, currentLanguage, currentYear,
}: Props) {
  const { t, lang } = useLanguage();
  const langLabels = LANG_LABELS[lang] ?? LANG_LABELS.kz;

  return (
    <>
      {/* Page header */}
      <div className="gradient-hero text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">{t("archive.title")}</h1>
          <p className="text-blue-200">{t("archive.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArchiveFilters
          journals={journals}
          years={years}
          currentSearch={currentSearch}
          currentJournal={currentJournal}
          currentLanguage={currentLanguage}
          currentYear={currentYear}
          articleCount={articles.length}
        />

        <div className="mt-6">
          {articles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center card-shadow">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-500">{t("archive.empty.title")}</p>
              <p className="text-gray-400 text-sm mt-1">{t("archive.empty.desc")}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl p-5 card-shadow border border-gray-100 flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-blue-600 font-medium">
                        {langLabels[article.language] ?? article.language}
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mt-0.5 line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-gray-500 mb-4 flex-1">
                    <p>
                      <span className="font-medium text-gray-700">{t("archive.card.author")}:</span>{" "}
                      {article.authorName}
                    </p>
                    <p className="line-clamp-1">
                      <span className="font-medium text-gray-700">{t("archive.card.journal")}:</span>{" "}
                      {article.journal.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">{t("archive.card.date")}:</span>{" "}
                      {formatDateSimple(article.publishedAt)}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/article/${article.slug}`}
                      className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
                    >
                      {t("archive.card.open")}
                    </Link>
                    {article.certificateId && (
                      <Link
                        href={`/certificate/${article.certificateId}`}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-amber-300 text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-colors"
                      >
                        <Award className="w-3.5 h-3.5" />
                        {t("archive.card.cert")}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
