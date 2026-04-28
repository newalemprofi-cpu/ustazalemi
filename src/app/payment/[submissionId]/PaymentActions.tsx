"use client";

import { useState } from "react";
import { MessageCircle, CreditCard, Phone, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Props {
  submissionId: string;
  kaspiUrl: string;
  whatsappUrl: string;
  whatsappSupportUrl: string;
}

export default function PaymentActions({
  submissionId, kaspiUrl, whatsappUrl, whatsappSupportUrl,
}: Props) {
  const { t } = useLanguage();
  const [whatsappClicked, setWhatsappClicked] = useState(false);

  const handleWhatsappClick = async () => {
    try {
      await fetch(`/api/submissions/${submissionId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "sent_to_whatsapp" }),
      });
    } catch {
      // non-blocking
    }
    setWhatsappClicked(true);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-3">
      {/* Kaspi */}
      <a
        href={kaspiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-red-500 text-white font-bold text-base hover:bg-red-600 transition-colors shadow-lg"
      >
        <CreditCard className="w-5 h-5" />
        {t("payment.btn.kaspi")}
      </a>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsappClick}
        className={`flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl font-bold text-base transition-colors shadow-lg ${
          whatsappClicked
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {whatsappClicked ? (
          <><CheckCircle className="w-5 h-5" /> {t("payment.btn.whatsapp.done")}</>
        ) : (
          <><MessageCircle className="w-5 h-5" /> {t("payment.btn.whatsapp")}</>
        )}
      </button>

      {whatsappClicked && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="font-semibold text-green-800 text-sm mb-1">
            {t("payment.whatsapp.opened")}
          </p>
          <p className="text-green-700 text-xs">{t("payment.whatsapp.desc")}</p>
        </div>
      )}

      {/* Support */}
      <a
        href={whatsappSupportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-green-400 hover:text-green-700 transition-colors"
      >
        <Phone className="w-4 h-4" />
        {t("payment.btn.support")}
      </a>
    </div>
  );
}
