"use client";

import Link from "next/link";
import {
  FileText, PenTool, Award, Archive, BookOpen,
  ArrowRight, CheckCircle, Star, Users, Newspaper,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const journals = [
  { name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"', type: "Республикалық" },
  { name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"',  type: "Республикалық" },
  { name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"',                   type: "Халықаралық" },
  { name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"',  type: "Халықаралық" },
  { name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"',                        type: "Халықаралық" },
];

export default function HomePage() {
  const { t, lang } = useLanguage();

  const features = [
    { icon: FileText, titleKey: "home.feat.publish.title" as const, descKey: "home.feat.publish.desc" as const, href: "/publish",       price: "3 000 тг" },
    { icon: PenTool,  titleKey: "home.feat.editor.title"  as const, descKey: "home.feat.editor.desc"  as const, href: "/editor-service", price: "5 000 тг" },
    { icon: Award,    titleKey: "home.feat.cert.title"    as const, descKey: "home.feat.cert.desc"    as const, href: "/verify",        price: lang === "ru" ? "Бесплатно" : "Тегін" },
    { icon: Archive,  titleKey: "home.feat.archive.title" as const, descKey: "home.feat.archive.desc" as const, href: "/archive",       price: "" },
    { icon: BookOpen, titleKey: "home.feat.journals.title"as const, descKey: "home.feat.journals.desc"as const, href: "/journals",      price: "" },
  ];

  const steps = [
    { num: "01", titleKey: "home.how.s1.title" as const, descKey: "home.how.s1.desc" as const },
    { num: "02", titleKey: "home.how.s2.title" as const, descKey: "home.how.s2.desc" as const },
    { num: "03", titleKey: "home.how.s3.title" as const, descKey: "home.how.s3.desc" as const },
  ];

  const requirements = [
    t("home.req.r1"), t("home.req.r2"), t("home.req.r3"),
    t("home.req.r4"), t("home.req.r5"), t("home.req.r6"),
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              USTAZALEMI —{" "}
              <span className="text-amber-300">{t("home.hero.h1.highlight")}</span>{" "}
              {lang === "ru" ? "платформа для педагогов" : "арналған платформа"}
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              {t("home.hero.desc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-800 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <FileText className="w-5 h-5" />
                {t("home.hero.btn.publish")}
              </Link>
              <Link
                href="/editor-service"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-amber-900 font-semibold hover:bg-amber-300 transition-colors shadow-lg"
              >
                <PenTool className="w-5 h-5" />
                {t("home.hero.btn.editor")}
              </Link>
              <Link
                href="/journals"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <Newspaper className="w-5 h-5" />
                {t("home.hero.btn.journals")}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "5+",   labelKey: "home.stats.journals" as const },
              { value: "3",    labelKey: "home.stats.langs"    as const },
              { value: "100%", labelKey: "home.stats.cert"     as const },
              { value: "24/7", labelKey: "home.stats.support"  as const },
            ].map((s) => (
              <div key={s.labelKey} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-amber-300">{s.value}</div>
                <div className="text-sm text-blue-100 mt-1">{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("home.services.title")}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t("home.services.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <f.icon className="w-6 h-6 text-blue-700" />
                  </div>
                  {f.price && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                      {f.price}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                  {t(f.titleKey)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(f.descKey)}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  {t("home.feat.more")}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("home.how.title")}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t("home.how.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-5 card-shadow h-full">
                  <div className="text-3xl font-black text-blue-100 mb-3">{step.num}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{t(step.titleKey)}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{t(step.descKey)}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journals */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("home.journals.title")}</h2>
              <p className="text-gray-500">{t("home.journals.subtitle")}</p>
            </div>
            <Link
              href="/journals"
              className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              {t("home.journals.all")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {journals.map((j, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm leading-snug">{j.name}</p>
                </div>
                <span className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
                  {j.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("home.req.title")}</h2>
              <p className="text-blue-200 mb-8 leading-relaxed">{t("home.req.subtitle")}</p>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-blue-100">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold">{t("home.req.langs.title")}</h3>
              </div>
              <div className="space-y-3">
                {["🇰🇿 Қазақ тілі", "🇷🇺 Русский язык", "🇬🇧 English"].map((l) => (
                  <div key={l} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                    <span className="text-white font-medium">{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3">
                <Users className="w-5 h-5 text-amber-400" />
                <p className="text-blue-100 text-sm">{t("home.req.audience")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("home.cta.title")}</h2>
          <p className="text-gray-500 mb-8">{t("home.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/publish"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors shadow-lg"
            >
              <FileText className="w-5 h-5" />
              {t("home.cta.btn.publish")}
            </Link>
            <Link
              href="/editor-service"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-blue-700 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
            >
              <PenTool className="w-5 h-5" />
              {t("home.cta.btn.editor")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
