export const dynamic = "force-dynamic";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import { loadPublished } from "@/lib/submissions";
import Link from "next/link";
import { Award, ExternalLink } from "lucide-react";
import CopyDelivery from "./CopyDelivery";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ustazalemi.kz";

export default async function AdminCertificatesPage() {
  const certs = await loadPublished();

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
                {["Номері", "Авторы", "Мақала", "Статусы", "Берілген күні", "Сертификат", "Клиентке жіберу"].map((h) => (
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
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    Сертификаттар жоқ
                  </td>
                </tr>
              ) : (
                certs.map((c) => {
                  const certUrl = `${SITE_URL}/certificate/${c.certificateId}`;
                  const articleUrl = `${SITE_URL}/article/${c.articleSlug}`;
                  return (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-mono font-semibold text-blue-800 text-xs">{c.certificateId}</p>
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
                        {formatDate(c.publishedAt || c.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={certUrl}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors whitespace-nowrap"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Ашу
                        </Link>
                      </td>
                      <td className="px-4 py-3 min-w-[220px]">
                        <CopyDelivery articleUrl={articleUrl} certUrl={certUrl} />
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
