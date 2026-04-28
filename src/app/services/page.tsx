"use client";

import Link from "next/link";
import { FileText, PenTool, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: FileText,
      titleKey: "services.own.title" as const,
      descKey: "services.own.desc" as const,
      priceKey: "services.own.price" as const,
      btnKey: "services.own.btn" as const,
      href: "/publish",
      color: "blue",
      includes: [
        "Журналда ресми жариялау",
        "QR сертификат",
        "Мақала архивте сақталады",
      ],
      includesRu: [
        "Официальная публикация в журнале",
        "QR-сертификат",
        "Статья сохраняется в архиве",
      ],
    },
    {
      icon: PenTool,
      titleKey: "services.editor.title" as const,
      descKey: "services.editor.desc" as const,
      priceKey: "services.editor.price" as const,
      btnKey: "services.editor.btn" as const,
      href: "/editor-service",
      color: "amber",
      includes: [
        "5000+ сөзден тұратын толық мақала",
        "Аннотация + кілт сөздер",
        "Журналда жариялау + QR сертификат",
      ],
      includesRu: [
        "Полная статья от 5000+ слов",
        "Аннотация + ключевые слова",
        "Публикация в журнале + QR-сертификат",
      ],
    },
  ];

  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="gradient-hero text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-3">{t("services.title")}</h1>
          <p className="text-blue-200 text-lg">{t("services.subtitle")}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc) => {
            const isBlue = svc.color === "blue";
            const includesList = lang === "ru" ? svc.includesRu : svc.includes;

            return (
              <div
                key={svc.href}
                className={`bg-white rounded-2xl p-7 card-shadow border-2 flex flex-col ${
                  isBlue ? "border-blue-200" : "border-amber-200"
                }`}
              >
                {/* Icon + price */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isBlue ? "bg-blue-100" : "bg-amber-100"
                    }`}
                  >
                    <svc.icon
                      className={`w-7 h-7 ${isBlue ? "text-blue-700" : "text-amber-600"}`}
                    />
                  </div>
                  <span
                    className={`text-2xl font-black ${isBlue ? "text-blue-700" : "text-amber-600"}`}
                  >
                    {t(svc.priceKey)}
                  </span>
                </div>

                {/* Title + desc */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t(svc.titleKey)}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{t(svc.descKey)}</p>

                {/* Includes */}
                <ul className="space-y-2 mb-7 flex-1">
                  {includesList.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 ${isBlue ? "text-blue-600" : "text-amber-500"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={svc.href}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-base transition-colors ${
                    isBlue
                      ? "bg-blue-700 text-white hover:bg-blue-800"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {t(svc.btnKey)}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-sm mt-8">
          {lang === "ru"
            ? "После оплаты отправьте чек редактору в WhatsApp (+7 700 181 01 21)"
            : "Төлемнен кейін чекті WhatsApp арқылы редакторға жіберіңіз (+7 700 181 01 21)"}
        </p>
      </div>
    </div>
  );
}
