"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Shield, Search, CheckCircle, XCircle, Loader2, Award } from "lucide-react";
import Link from "next/link";
import { formatDate, getLanguageLabel } from "@/lib/utils";

interface CertResult {
  id: string;
  certificateNumber: string;
  issuedAt: string;
  isValid: boolean;
  article: {
    title: string;
    authorName: string;
    language: string;
    publishedAt: string;
    journal: { name: string };
  };
}

export default function VerifyPage() {
  const [certNumber, setCertNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertResult | null | "not_found">(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/certificates/verify?number=${encodeURIComponent(certNumber.trim())}`);
      if (res.status === 404) {
        setResult("not_found");
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch {
      setResult("not_found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Сертификат тексеру" }]} />
          <h1 className="text-4xl font-bold mb-3">Сертификат тексеру</h1>
          <p className="text-blue-200">
            Сертификат нөмірін енгізіп, жарамдылығын тексеріңіз
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="bg-white rounded-2xl p-7 card-shadow mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Сертификат нөмірі</h2>
              <p className="text-gray-500 text-sm">UA-XXXX-XXXXXX форматы</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex gap-3">
            <input
              type="text"
              value={certNumber}
              onChange={(e) => setCertNumber(e.target.value)}
              placeholder="UA-2024-ABCDEF"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-wider uppercase"
            />
            <button
              type="submit"
              disabled={loading || !certNumber.trim()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? "" : "Тексеру"}
            </button>
          </form>
        </div>

        {/* Result */}
        {result === "not_found" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-7 text-center">
            <XCircle className="w-14 h-14 text-red-400 mx-auto mb-3" />
            <h3 className="font-bold text-red-800 text-xl mb-2">Сертификат табылмады</h3>
            <p className="text-red-600 text-sm">
              «{certNumber}» нөмірлі сертификат тіркелмеген немесе нөмір қате енгізілген.
            </p>
          </div>
        )}

        {result && result !== "not_found" && (
          <div className={`rounded-2xl p-7 border-2 ${result.isValid ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-300"}`}>
            <div className="flex items-center gap-3 mb-6">
              {result.isValid ? (
                <CheckCircle className="w-10 h-10 text-green-600 shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-gray-500 shrink-0" />
              )}
              <div>
                <h3 className={`font-bold text-xl ${result.isValid ? "text-green-800" : "text-gray-700"}`}>
                  {result.isValid ? "Сертификат жарамды" : "Сертификат жарамсыз"}
                </h3>
                <p className={`text-sm font-mono ${result.isValid ? "text-green-600" : "text-gray-500"}`}>
                  № {result.certificateNumber}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <InfoItem label="Автор" value={result.article.authorName} />
              <InfoItem label="Тіл" value={getLanguageLabel(result.article.language)} />
              <InfoItem label="Жариялану күні" value={formatDate(result.article.publishedAt)} />
              <InfoItem label="Сертификат берілген күні" value={formatDate(result.issuedAt)} />
              <div className="sm:col-span-2">
                <InfoItem label="Мақала атауы" value={result.article.title} />
              </div>
              <div className="sm:col-span-2">
                <InfoItem label="Журнал" value={result.article.journal.name} />
              </div>
            </div>

            <Link
              href={`/certificate/${result.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 transition-colors"
            >
              <Award className="w-4 h-4" />
              Сертификатты көру
            </Link>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-semibold text-blue-900 mb-2">QR-код арқылы тексеру</h3>
          <p className="text-blue-700 text-sm">
            Сертификатта бар QR-кодты сканерлеп, тікелей осы бетке өтуге болады.
            QR-код автоматты түрде сертификат нөмірін енгізеді.
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-900 text-sm">{value}</p>
    </div>
  );
}
