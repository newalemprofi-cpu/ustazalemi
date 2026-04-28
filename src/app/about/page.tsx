import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { BookOpen, Target, Shield, Award, Users, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Платформа туралы — USTAZALEMI",
  description: "USTAZALEMI платформасы туралы толық ақпарат",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="gradient-hero text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Платформа туралы" }]} />
          <h1 className="text-4xl font-bold mb-4">Платформа туралы</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            USTAZALEMI — Қазақстан педагогтарына арналған мақала жариялау
            платформасы
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Платформаның мақсаты</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            USTAZALEMI — Қазақстан педагогтарының ғылыми-әдістемелік
            мақалаларын республикалық және халықаралық журналдарда жариялауға
            жәрдемдесетін заманауи цифрлық платформа.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Платформамыз арқылы мұғалімдер, оқытушылар мен педагогтар өз
            тәжірибесін, зерттеулері мен әдістемелік материалдарын ресми
            журналдарда жариялап, QR-коды бар ресми сертификат ала алады.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Shield,
              title: "Сенімділік",
              desc: "Барлық жарияланымдар ресми журналдарда жарияланады. Сертификаттарды платформа арқылы тексеруге болады.",
            },
            {
              icon: Award,
              title: "Сапа",
              desc: "Редакция материалдары ғылыми-әдістемелік талаптарға толық сай келеді. Академиялық стандарт сақталады.",
            },
            {
              icon: Users,
              title: "Қолжетімділік",
              desc: "Платформа барлық педагогтарға қолжетімді. Kaspi арқылы ыңғайлы және жылдам төлем мүмкіндігі.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Платформаның қызметтері
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-blue-100 rounded-xl p-6 bg-blue-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-blue-900 text-lg">
                  Өз мақаласын жариялау
                </h3>
                <span className="px-3 py-1 rounded-full bg-blue-700 text-white text-sm font-bold">
                  3 000 тг
                </span>
              </div>
              <ul className="space-y-2">
                {[
                  "Дайын мақалаңызды жүктейсіз",
                  "Редакция тексеріп, форматтайды",
                  "Журналда жарияланады",
                  "Сертификат беріледі",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/publish"
                className="mt-4 inline-block px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Өтінім беру
              </Link>
            </div>
            <div className="border border-amber-200 rounded-xl p-6 bg-amber-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-amber-900 text-lg">
                  Редакция мақала жазып беру
                </h3>
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-bold">
                  5 000 тг
                </span>
              </div>
              <ul className="space-y-2">
                {[
                  "Тақырып пен мәліметтерді жіберіңіз",
                  "Редакция материалды дайындайды",
                  "5000 сөздік толыққанды мақала",
                  "Журналда жарияланып, сертификат беріледі",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-amber-800">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/editor-service"
                className="mt-4 inline-block px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
              >
                Өтінім беру
              </Link>
            </div>
          </div>
        </div>

        {/* Team note */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white text-center">
          <BookOpen className="w-12 h-12 text-amber-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">
            Педагогтарды қолдаймыз
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto leading-relaxed">
            Қазақстан мұғалімдерінің кәсіби дамуына ықпал ету — біздің
            басты мақсатымыз. Ресми журнал жарияланымы — мансаптық портфолиоңыздың
            маңызды бөлігі.
          </p>
        </div>
      </div>
    </div>
  );
}
