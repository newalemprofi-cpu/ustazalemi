import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, getLanguageLabel } from "@/lib/utils";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CertificateDownload from "./CertificateDownload";
import { Award, Shield, CheckCircle, BookOpen, Calendar, User, Globe } from "lucide-react";

export default async function CertificatePage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params;

  const cert = await prisma.certificate.findUnique({
    where: { id: certificateId },
    include: {
      article: {
        include: { journal: true },
      },
    },
  }).catch(() => null);

  if (!cert) notFound();

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://ustazalemi.kz"}/verify?number=${cert.certificateNumber}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Архив", href: "/archive" },
              { label: "Сертификат" },
            ]}
          />
          <h1 className="text-3xl font-bold mb-2">Жариялым сертификаты</h1>
          <p className="text-blue-200">USTAZALEMI ресми платформасы</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Certificate card (printable) */}
        <div
          id="certificate-card"
          className="bg-white rounded-3xl overflow-hidden card-shadow mb-6 border-4 border-blue-700"
        >
          {/* Top accent */}
          <div className="gradient-primary px-8 py-6 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="w-8 h-8 text-amber-300" />
              <h2 className="text-2xl font-black tracking-wide">USTAZALEMI</h2>
            </div>
            <p className="text-blue-200 text-sm">Педагогтарға арналған платформа</p>
          </div>

          <div className="px-8 py-8">
            {/* Certificate title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100 border border-amber-300 mb-4">
                <Award className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-800 text-sm">ЖАРИЯЛЫМ СЕРТИФИКАТЫ</span>
              </div>
              <p className="text-gray-500 text-sm">Осы сертификат берілді</p>
            </div>

            {/* Author name */}
            <div className="text-center mb-8">
              <p className="text-4xl font-black text-blue-800 tracking-tight">{cert.article.authorName}</p>
              <div className="mt-3 w-24 h-1 bg-amber-400 mx-auto rounded-full" />
            </div>

            {/* Article info */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <p className="text-center text-gray-500 text-xs mb-2 uppercase tracking-wider">Мақала</p>
              <p className="text-center font-bold text-gray-900 text-lg leading-snug">
                {cert.article.title}
              </p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <DetailItem icon={<BookOpen className="w-4 h-4" />} label="Журнал" value={cert.article.journal.name} small />
              <DetailItem icon={<Globe className="w-4 h-4" />} label="Тіл" value={getLanguageLabel(cert.article.language)} />
              <DetailItem icon={<Calendar className="w-4 h-4" />} label="Жариялану күні" value={formatDate(cert.article.publishedAt)} />
              <DetailItem icon={<Calendar className="w-4 h-4" />} label="Сертификат берілген" value={formatDate(cert.issuedAt)} />
            </div>

            {/* Certificate number & status */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Сертификат нөмірі</p>
                <p className="font-mono font-bold text-blue-800 text-lg tracking-widest">
                  {cert.certificateNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {cert.isValid ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Жарамды
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                    Жарамсыз
                  </span>
                )}
              </div>
            </div>

            {/* Verify URL */}
            <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600 shrink-0" />
              <p className="text-xs text-gray-500 break-all">
                Тексеру: <span className="text-blue-600 font-medium">{verifyUrl}</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-blue-900 px-8 py-4 flex items-center justify-between">
            <p className="text-blue-200 text-xs">© USTAZALEMI — ustazalemi.kz</p>
            <p className="text-blue-300 text-xs">Ресми жариялым платформасы</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <CertificateDownload certificateId={certificateId} />
          <Link
            href={`/verify?number=${cert.certificateNumber}`}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-blue-700 text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Сертификатты тексеру
          </Link>
        </div>

        {/* Article link */}
        <div className="bg-white rounded-2xl p-5 card-shadow text-center">
          <p className="text-gray-500 text-sm mb-3">Толық мақаланы оқу</p>
          <Link
            href={`/article/${cert.article.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Мақалаға өту
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon, label, value, small,
}: {
  icon: React.ReactNode; label: string; value: string; small?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-blue-500 mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className={`font-semibold text-gray-900 leading-snug ${small ? "text-xs" : "text-sm"}`}>{value}</p>
      </div>
    </div>
  );
}
