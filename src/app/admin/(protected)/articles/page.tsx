export const dynamic = "force-dynamic";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { formatDate, getLanguageLabel } from "@/lib/utils";
import Link from "next/link";
import { FileText } from "lucide-react";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

type Submission = {
  id: string;
  fullName: string;
  title: string;
  language: string;
  journalName: string;
  status: string;
  createdAt: string;
  certificateId?: string;
  certificateNumber?: string;
};

async function loadPublished(): Promise<Submission[]> {
  try {
    const files = await readdir(DATA_DIR);
    const results = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          try {
            const raw = await readFile(path.join(DATA_DIR, f), "utf-8");
            return JSON.parse(raw) as Submission;
          } catch {
            return null;
          }
        })
    );
    return results
      .filter(
        (s): s is Submission =>
          s !== null && (s.status === "published" || s.status === "certificate_generated")
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

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
                {["Атауы", "Авторы", "Журнал", "Тіл", "Сертификат", "Күні", ""].map((h) => (
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
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.fullName}</td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 text-xs max-w-36 truncate">{a.journalName}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                      {getLanguageLabel(a.language)}
                    </td>
                    <td className="px-4 py-3">
                      {a.certificateNumber ? (
                        <span className="text-amber-600 text-xs font-medium font-mono">
                          {a.certificateNumber}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                      {formatDate(a.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/submissions/${a.id}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors whitespace-nowrap"
                      >
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
