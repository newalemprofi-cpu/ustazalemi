export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { findBySlug } from "@/lib/submissions";
import { formatDate, getLanguageLabel } from "@/lib/utils";
import { BookOpen, Award, Calendar, User, Globe, Shield } from "lucide-react";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await findBySlug(slug);
  if (!article) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ustazalemi.kz";
  const verifyUrl = `${siteUrl}/verify?number=${article.certificateId}`;
  const certUrl = `${siteUrl}/certificate/${article.certificateId}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Архив", href: "/archive" },
              { label: article.title },
            ]}
          />
          <h1 className="text-3xl font-bold mb-4 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {article.fullName}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> {getLanguageLabel(article.language)}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(article.publishedAt || article.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Article content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-7 card-shadow">
              <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                {article.articleContent || article.textContent || "Мақала мәтіні қосылмаған."}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Info */}
            <div className="bg-white rounded-2xl p-5 card-shadow">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Мақала туралы
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Автор</p>
                  <p className="font-medium text-gray-900">{article.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Жұмыс орны</p>
                  <p className="font-medium text-gray-900 text-xs">{article.workplace}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Журнал</p>
                  <p className="font-medium text-gray-900 text-xs leading-snug">{article.journalName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Тіл</p>
                  <p className="font-medium text-gray-900">{getLanguageLabel(article.language)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Жариялану күні</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-amber-900">Сертификат</h3>
              </div>
              <p className="text-amber-700 text-xs mb-4 font-mono">{article.certificateId}</p>
              <div className="space-y-2">
                <Link
                  href={certUrl}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  Сертификатты көру
                </Link>
                <Link
                  href={verifyUrl}
                  className="flex items-center justify-center w-full px-4 py-2 rounded-xl border border-amber-300 text-amber-700 font-medium text-xs hover:bg-amber-100 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  Сертификатты тексеру
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
