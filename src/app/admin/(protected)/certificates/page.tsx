export const dynamic = "force-dynamic";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import Link from "next/link";
import { Award } from "lucide-react";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

type Submission = {
  id: string;
  fullName: string;
  title: string;
  status: string;
  createdAt: string;
  certificateId?: string;
  certificateNumber?: string;
};

function stableDisplayId(id: string): string {
  return `CERT-${id.substring(0, 8).toUpperCase()}`;
}

async function loadCertificates(): Promise<Submission[]> {
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

export default async function AdminCertificatesPage() {
  const certs = await loadCertificates();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-600" />
          Сертификаттар
        </h1>
        <p className="text-gray-500 text-sm mt-1">{certs.length} сертификат</p>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Номері", "Авторы", "Мақала", "Статусы", "Берілген күні", ""].map((h) => (
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
              {certs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    Сертификаттар жоқ
                  </td>
                </tr>
              ) : (
                certs.map((c) => {
                  const displayNumber = c.certificateNumber || stableDisplayId(c.id);
                  return (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-mono font-semibold text-blue-800 text-xs">
                          {displayNumber}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.fullName}</td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800 max-w-xs truncate text-xs">{c.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}
                        >
                          {getStatusLabel(c.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/submissions/${c.id}`}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors whitespace-nowrap"
                        >
                          Ашу
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
