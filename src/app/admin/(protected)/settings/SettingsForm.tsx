"use client";

import { useState } from "react";
import { Loader2, Save, CheckCircle } from "lucide-react";

type SettingsData = {
  id: string;
  kaspiPaymentLink: string;
  whatsappBot: string;
  whatsappSupport: string;
  publishPrice: number;
  editorServicePrice: number;
} | null;

export default function SettingsForm({ settings }: { settings: SettingsData }) {
  const [form, setForm] = useState({
    kaspiPaymentLink: settings?.kaspiPaymentLink || "",
    whatsappBot: settings?.whatsappBot || "",
    whatsappSupport: settings?.whatsappSupport || "",
    publishPrice: String(settings?.publishPrice || 3000),
    editorServicePrice: String(settings?.editorServicePrice || 5000),
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        publishPrice: parseInt(form.publishPrice),
        editorServicePrice: parseInt(form.editorServicePrice),
      }),
    });
    setLoading(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="bg-white rounded-2xl p-6 card-shadow">
        <h2 className="font-bold text-gray-900 mb-5">Төлем баптаулары</h2>
        <div className="space-y-4">
          <Field label="Kaspi төлем сілтемесі" name="kaspiPaymentLink" value={form.kaspiPaymentLink} onChange={handleChange} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Мақала жариялау бағасы (тг)" name="publishPrice" value={form.publishPrice} onChange={handleChange} type="number" />
            <Field label="Редакция қызметі бағасы (тг)" name="editorServicePrice" value={form.editorServicePrice} onChange={handleChange} type="number" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow">
        <h2 className="font-bold text-gray-900 mb-5">WhatsApp баптаулары</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Бот нөмірі" name="whatsappBot" value={form.whatsappBot} onChange={handleChange} placeholder="87001810121" />
          <Field label="WhatsApp Қолдау нөмірі" name="whatsappSupport" value={form.whatsappSupport} onChange={handleChange} placeholder="87001810131" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 disabled:opacity-60 transition-colors"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Сақталуда...</>
        ) : saved ? (
          <><CheckCircle className="w-4 h-4" /> Сақталды!</>
        ) : (
          <><Save className="w-4 h-4" /> Сақтау</>
        )}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
