"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const whatsappUrl1 = "https://wa.me/87001810121?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5,%20%D0%BA%D3%A9%D0%BC%D0%B5%D0%BA%D1%82%D0%B5%D1%81%D1%96%D0%B7%20%D0%BA%D0%B5%D1%80%D0%B5%D0%BA";
const whatsappUrl2 = "https://wa.me/87001810131?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5,%20%D0%BA%D3%A9%D0%BC%D0%B5%D0%BA%D1%82%D0%B5%D1%81%D1%96%D0%B7%20%D0%BA%D0%B5%D1%80%D0%B5%D0%BA";

export default function ContactsClient() {
  const { t } = useLanguage();

  const processSteps = [
    t("contacts.process.1"),
    t("contacts.process.2"),
    t("contacts.process.3"),
    t("contacts.process.4"),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: t("contacts.title") }]} />
          <h1 className="text-4xl font-bold mb-4">{t("contacts.title")}</h1>
          <p className="text-blue-200 text-lg">{t("contacts.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Редакция */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("contacts.redaction.title")}</h2>
            <p className="text-gray-500 text-sm mb-1">{t("contacts.redaction.desc")}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">+7 700 181 01 21</p>
            <p className="text-gray-400 text-xs mb-4">{t("contacts.redaction.note")}</p>
            <a
              href={whatsappUrl1}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t("contacts.redaction.btn")}
            </a>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t("contacts.support.title")}</h2>
            <p className="text-gray-500 text-sm mb-1">{t("contacts.support.desc")}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">+7 700 181 01 31</p>
            <p className="text-gray-400 text-xs mb-4">{t("contacts.support.note")}</p>
            <a
              href={whatsappUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t("contacts.support.btn")}
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t("contacts.info.title")}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{t("contacts.info.phone")}</p>
                <a href="tel:+77001810121" className="text-blue-600 hover:text-blue-800 text-sm">+7 700 181 01 21</a>
                <br />
                <a href="tel:+77001810131" className="text-blue-600 hover:text-blue-800 text-sm">+7 700 181 01 31</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Email</p>
                <a href="mailto:info@ustazalemi.kz" className="text-blue-600 hover:text-blue-800 text-sm">
                  info@ustazalemi.kz
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{t("contacts.info.address")}</p>
                <p className="text-gray-500 text-sm">{t("contacts.info.address.val")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{t("contacts.info.hours")}</p>
                <p className="text-gray-500 text-sm">{t("contacts.info.hours.val")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="font-bold text-blue-900 text-lg mb-4">{t("contacts.process.title")}</h2>
          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {i + 1}
                </div>
                <p className="text-blue-800 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
