export const dynamic = "force-dynamic";
import { formatDate, getLanguageLabel } from "@/lib/utils";
import { loadPublished } from "@/lib/submissions";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ustazalemi.kz";

export default async function AdminArticlesPage() {
  const articles = await loadPublished();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-700" />
          Жарияланған мақалалар
        </h1>
        <p className="text-gray-500 text-sm mt-1">{articles.length} мақала</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Атауы", "Авторы", "Журнал", "Тіл", "Сертификат ID", "Жарияланды", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    Мақалалар жоқ
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 max-w-xs truncate">{a.title}</p>
                      <p className="text-gray-400 text-xs font-mono">{a.articleSlug}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.fullName}</td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 text-xs max-w-36 truncate">{a.journalName}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                      {getLanguageLabel(a.language)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-amber-600 text-xs font-mono">{a.certificateId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                      {formatDate(a.publishedAt || a.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`${SITE_URL}/article/${a.articleSlug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors whitespace-nowrap"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Ашу
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
