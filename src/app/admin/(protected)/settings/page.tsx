export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma";
import { Settings } from "lucide-react";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  let settings = await prisma.settings.findFirst().catch(() => null);

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        kaspiPaymentLink: process.env.KASPI_PAYMENT_LINK || "https://pay.kaspi.kz/pay/h2f46ids",
        whatsappBot: process.env.WHATSAPP_BOT || "87001810121",
        whatsappSupport: process.env.WHATSAPP_SUPPORT || "87001810131",
        publishPrice: parseInt(process.env.PUBLISH_PRICE || "3000"),
        editorServicePrice: parseInt(process.env.EDITOR_SERVICE_PRICE || "5000"),
      },
    }).catch(() => null);
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-700" />
          Ð‘Ð°Ð¿Ñ‚Ð°ÑƒÐ»Ð°Ñ€
        </h1>
        <p className="text-gray-500 text-sm mt-1">ÐŸÐ»Ð°Ñ‚Ñ„Ð¾Ñ€Ð¼Ð° Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð»ÐµÑ€Ñ–Ð½ Ð±Ð°ÑÒ›Ð°Ñ€Ñƒ</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}

