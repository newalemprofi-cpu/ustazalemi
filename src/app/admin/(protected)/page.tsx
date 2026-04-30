export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma";
import { ClipboardList, FileText, Award, Clock } from "lucide-react";
import Link from "next/link";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";

export default async function AdminDashboard() {
  const [totalSubmissions, totalArticles, totalCerts, recentSubmissions] = await Promise.all([
    prisma.submission.count().catch(() => 0),
    prisma.article.count().catch(() => 0),
    prisma.certificate.count().catch(() => 0),
    prisma.submission.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { journal: true },
    }).catch(() => []),
  ]);

  const pendingPayment = await prisma.submission.count({ where: { status: "waiting_payment" } }).catch(() => 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Басты бет</h1>
        <p className="text-gray-500 text-sm mt-1">USTAZALEMI Админ Панель</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Барлық өтінімдер", value: totalSubmissions, icon: ClipboardList, color: "blue", href: "/admin/submissions" },
          { label: "Жарияланды", value: totalArticles, icon: FileText, color: "green", href: "/admin/articles" },
          { label: "Сертификаттар", value: totalCerts, icon: Award, color: "amber", href: "/admin/certificates" },
          { label: "Төлем күтіліде", value: pendingPayment, icon: Clock, color: "red", href: "/admin/submissions?status=waiting_payment" },
        ].map((stat) => (
          <Link key={stat.href} href={stat.href} className="bg-white rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-all">
            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
              stat.color === "blue" ? "bg-blue-100" :
              stat.color === "green" ? "bg-green-100" :
              stat.color === "amber" ? "bg-amber-100" : "bg-red-100"
            }`}>
              <stat.icon className={`w-5 h-5 ${
                stat.color === "blue" ? "text-blue-700" :
                stat.color === "green" ? "text-green-700" :
                stat.color === "amber" ? "text-amber-700" : "text-red-700"
              }`} />
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent submissions */}
      <div className="bg-white rounded-2xl card-shadow">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Соңғы өтінімдер</h2>
          <Link href="/admin/submissions" className="text-blue-600 text-sm font-medium hover:text-blue-800">
            Барлығы →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentSubmissions.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400">Өтінім жоқ</div>
          ) : (
            recentSubmissions.map((sub) => (
              <div key={sub.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{sub.fullName}</p>
                  <p className="text-gray-500 text-xs truncate">{sub.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{formatDate(sub.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-gray-500">
                    {sub.type === "own_article" ? "Өз мақалалар" : "Редакция"}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                    {getStatusLabel(sub.status)}
                  </span>
                  <span className="font-bold text-blue-700 text-sm">{sub.price.toLocaleString()} тг</span>
                </div>
                <Link
                  href={`/admin/submissions/${sub.id}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors shrink-0"
                >
                  Ашу
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

