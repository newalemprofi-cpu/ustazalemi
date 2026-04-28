"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Props {
  journals: { id: string; name: string }[];
  years: string[];
  currentSearch: string;
  currentJournal: string;
  currentLanguage: string;
  currentYear: string;
  articleCount: number;
}

export default function ArchiveFilters({
  journals, years, currentSearch, currentJournal, currentLanguage, currentYear, articleCount,
}: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.delete("page");
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="bg-white rounded-2xl p-5 card-shadow">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-blue-600" />
        <h2 className="font-semibold text-gray-900 text-sm">{t("archive.filter.title")}</h2>
        {isPending && (
          <span className="text-xs text-blue-500 ml-auto">{t("archive.filter.loading")}</span>
        )}
        {!isPending && (
          <span className="text-xs text-gray-400 ml-auto">
            {articleCount} {t("archive.found")}
          </span>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("archive.filter.search")}
            defaultValue={currentSearch}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Journal */}
        <select
          defaultValue={currentJournal}
          onChange={(e) => updateParam("journal", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("archive.filter.allJournals")}</option>
          {journals.map((j) => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        {/* Language */}
        <select
          defaultValue={currentLanguage}
          onChange={(e) => updateParam("language", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("archive.filter.allLangs")}</option>
          <option value="kazakh">{t("archive.filter.lang.kz")}</option>
          <option value="russian">{t("archive.filter.lang.ru")}</option>
          <option value="english">{t("archive.filter.lang.en")}</option>
        </select>

        {/* Year */}
        <select
          defaultValue={currentYear}
          onChange={(e) => updateParam("year", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("archive.filter.allYears")}</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
