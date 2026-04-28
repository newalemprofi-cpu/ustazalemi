"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import StepIndicator from "@/components/ui/StepIndicator";
import { CheckCircle, BookOpen, User } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import PaymentActions from "./PaymentActions";

type Submission = {
  id: string;
  type: string;
  fullName: string;
  title: string;
  journalName: string;
  language: string;
  price: number;
  createdAt: string;
};

export default function PaymentContent({
  submission,
  kaspiUrl,
  whatsappUrl,
  whatsappSupportUrl,
}: {
  submission: Submission;
  kaspiUrl: string;
  whatsappUrl: string;
  whatsappSupportUrl: string;
}) {
  const { t, lang } = useLanguage();

  const serviceLabel =
    submission.type === "own_article" ? t("service.own") : t("service.editor");

  const breadcrumbLabel =
    submission.type === "own_article"
      ? lang === "ru" ? "Публикация статьи" : "Мақала жариялау"
      : lang === "ru" ? "Редакция напишет статью" : "Редакция мақала жазып беру";

  const breadcrumbHref =
    submission.type === "own_article" ? "/publish" : "/editor-service";

  const langLabels: Record<string, string> =
    lang === "ru"
      ? { kazakh: "Казахский язык", russian: "Русский язык", english: "Английский язык" }
      : { kazakh: "Қазақ тілі", russian: "Орыс тілі", english: "Ағылшын тілі" };

  const dateStr = new Date(submission.createdAt).toLocaleDateString(
    lang === "ru" ? "ru-RU" : "kk-KZ",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: breadcrumbLabel, href: breadcrumbHref }, { label: t("payment.title") }]}
          />
          <h1 className="text-3xl font-bold mb-2">{t("payment.title")}</h1>
          <p className="text-blue-200">{t("payment.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <StepIndicator currentStep={2} />
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            {t("payment.summary.title")}
          </h2>
          <div className="space-y-3">
            <Row icon={<BookOpen className="w-4 h-4 text-gray-400" />} label={t("payment.summary.service")}      value={serviceLabel} />
            <Row icon={<User      className="w-4 h-4 text-gray-400" />} label={t("payment.summary.author")}       value={submission.fullName} />
            <Row icon={<BookOpen className="w-4 h-4 text-gray-400" />} label={t("payment.summary.articleTitle")} value={submission.title} />
            <Row icon={<BookOpen className="w-4 h-4 text-gray-400" />} label={t("payment.summary.journal")}      value={submission.journalName} />
            <Row icon={<BookOpen className="w-4 h-4 text-gray-400" />} label={t("payment.summary.lang")}         value={langLabels[submission.language] ?? submission.language} />
            <Row icon={<BookOpen className="w-4 h-4 text-gray-400" />} label={t("payment.summary.date")}         value={dateStr} />
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-700">{t("payment.summary.amount")}</span>
              <span className="text-2xl font-black text-blue-700">
                {submission.price.toLocaleString()} тг
              </span>
            </div>
          </div>
        </div>

        <PaymentActions
          submissionId={submission.id}
          kaspiUrl={kaspiUrl}
          whatsappUrl={whatsappUrl}
          whatsappSupportUrl={whatsappSupportUrl}
        />

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-800 text-sm text-center">{t("payment.warning")}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <span className="text-gray-500 text-xs">{label}</span>
        <p className="font-medium text-gray-900 text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
}
