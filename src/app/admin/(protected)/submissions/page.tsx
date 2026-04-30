export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma";
import { formatDate, getStatusLabel, getStatusColor, getLanguageLabel } from "@/lib/utils";
import Link from "next/link";
import { ClipboardList, Filter } from "lucide-react";

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const statusFilter = typeof sp?.status === "string" ? sp.status : "";
  const typeFilter = typeof sp?.type === "string" ? sp.type : "";

  const submissions = await prisma.submission.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter as "waiting_payment" | "published" } : {}),
      ...(typeFilter ? { type: typeFilter as "own_article" | "editor_service" } : {}),
    },
    include: { journal: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-700" />
            Өтінімдер
          </h1>
          <p className="text-gray-500 text-sm mt-1">{submissions.length} өтінім</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 card-shadow mb-5 flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Барлығы", status: "" },
            { label: "Төлем күтіліде", status: "waiting_payment" },
            { label: "WhatsApp жіберілді", status: "sent_to_whatsapp" },
            { label: "Өңделуде", status: "processing" },
            { label: "Жарияланды", status: "published" },
            { label: "Болдырылмады", status: "cancelled" },
          ].map((f) => (
            <Link
              key={f.status}
              href={`/admin/submissions${f.status ? `?status=${f.status}` : ""}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === f.status
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          {[
            { label: "Барлық түрі", type: "" },
            { label: "Өз мақалалар", type: "own_article" },
            { label: "Редакция", type: "editor_service" },
          ].map((f) => (
            <Link
              key={f.type}
              href={`/admin/submissions${f.type ? `?type=${f.type}` : ""}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === f.type
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Авторы", "Мақала тақырыбы", "Түрі", "Журнал", "Тіл", "Баға", "Статусы", "Күні", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-gray-400">
                    Өтінімдер жоқ
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 whitespace-nowrap">{sub.fullName}</p>
                      <p className="text-gray-400 text-xs">{sub.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800 max-w-xs truncate">{sub.title}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        sub.type === "own_article" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {sub.type === "own_article" ? "Өз мақалалар" : "Редакция"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 text-xs max-w-32 truncate">{sub.journal.name}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                      {getLanguageLabel(sub.language)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-blue-700">
                      {sub.price.toLocaleString()} тг
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                        {getStatusLabel(sub.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                      {formatDate(sub.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/submissions/${sub.id}`}
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

