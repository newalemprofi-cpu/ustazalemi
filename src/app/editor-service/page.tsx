"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import StepIndicator from "@/components/ui/StepIndicator";
import { PenTool, AlertCircle, Loader2, CheckCircle } from "lucide-react";

const journals = [
  { id: "j1", name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"' },
  { id: "j2", name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"' },
  { id: "j3", name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"' },
  { id: "j4", name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"' },
  { id: "j5", name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"' },
];

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  workplace: string;
  position: string;
  subject: string;
  title: string;
  language: string;
  audience: string;
  journalId: string;
  extraComment: string;
};

const initial: FormData = {
  fullName: "", phone: "", email: "", workplace: "", position: "",
  subject: "", title: "", language: "", audience: "", journalId: "", extraComment: "",
};

export default function EditorServicePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = "ФИО міндетті өріс";
    if (!form.phone.trim()) e.phone = "Телефон міндетті өріс";
    if (!form.email.trim()) e.email = "Email міндетті өріс";
    if (!form.workplace.trim()) e.workplace = "Жұмыс орны міндетті өріс";
    if (!form.position.trim()) e.position = "Лауазым міндетті өріс";
    if (!form.subject.trim()) e.subject = "Пән міндетті өріс";
    if (!form.title.trim()) e.title = "Мақала тақырыбы міндетті өріс";
    if (!form.language) e.language = "Тіл таңдаңыз";
    if (!form.audience) e.audience = "Аудитория таңдаңыз";
    if (!form.journalId) e.journalId = "Журнал таңдаңыз";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError("");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      body.append("type", "editor_service");
      body.append("price", "5000");

      const res = await fetch("/api/submissions", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Қате орын алды");
      router.push(`/payment/${data.id}`);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Қате орын алды");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Редакция мақала жазып беру" }]} />
          <h1 className="text-3xl font-bold mb-2">Редакция мақала жазып беру</h1>
          <p className="text-blue-200">
            Тақырыбыңызды жіберіңіз, редакция толыққанды мақала дайындайды — 5 000 тг
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <StepIndicator currentStep={1} />
        </div>

        {/* Info block */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <PenTool className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-900 mb-1">Редакция мақала жазып береді</p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Тақырып пен мәліметтерді толтырыңыз. Редакция барлық талаптарға сай
                толыққанды мақала дайындайды: аннотация, кілт сөздер, кіріспе,
                негізгі бөлім, қорытынды және әдебиет тізімімен (кемінде 5000 сөз).
              </p>
              <ul className="mt-3 space-y-1">
                {[
                  "5000+ сөзден тұратын толық мақала",
                  "Аннотация + кілт сөздер",
                  "Кіріспе, негізгі бөлім, қорытынды",
                  "Кемінде 5 ғылыми дереккөз",
                  "Журналда жариялау + QR сертификат",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-amber-800 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal info */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-sm flex items-center justify-center font-bold">1</span>
              Жеке деректер
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="ФИО" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="Иванов Иван Иванович" required />
              <Field label="Телефон" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+7 700 000 00 00" required type="tel" />
              <Field label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="example@mail.kz" required type="email" />
              <Field label="Жұмыс орны" name="workplace" value={form.workplace} onChange={handleChange} error={errors.workplace} placeholder="№1 мектеп, Алматы" required />
              <Field label="Лауазым" name="position" value={form.position} onChange={handleChange} error={errors.position} placeholder="Математика мұғалімі" required />
              <Field label="Пән" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} placeholder="Математика" required />
            </div>
          </div>

          {/* Article params */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-sm flex items-center justify-center font-bold">2</span>
              Мақала параметрлері
            </h2>
            <div className="space-y-4">
              <Field label="Мақала тақырыбы" name="title" value={form.title} onChange={handleChange} error={errors.title} placeholder="Мысалы: Қазіргі заманғы математиканы оқыту әдістері" required />

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Мақала тілі <span className="text-red-500">*</span>
                  </label>
                  <select name="language" value={form.language} onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.language ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
                    <option value="">Таңдаңыз</option>
                    <option value="kazakh">Қазақ тілі</option>
                    <option value="russian">Русский язык</option>
                    <option value="english">English</option>
                  </select>
                  {errors.language && <p className="mt-1 text-xs text-red-500">{errors.language}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Аудитория <span className="text-red-500">*</span>
                  </label>
                  <select name="audience" value={form.audience} onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.audience ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
                    <option value="">Таңдаңыз</option>
                    <option value="students">Оқушылар</option>
                    <option value="teachers">Мұғалімдер</option>
                    <option value="university_students">Студенттер</option>
                  </select>
                  {errors.audience && <p className="mt-1 text-xs text-red-500">{errors.audience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Журнал <span className="text-red-500">*</span>
                  </label>
                  <select name="journalId" value={form.journalId} onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.journalId ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
                    <option value="">Таңдаңыз</option>
                    {journals.map((j) => (
                      <option key={j.id} value={j.id}>{j.name}</option>
                    ))}
                  </select>
                  {errors.journalId && <p className="mt-1 text-xs text-red-500">{errors.journalId}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Қосымша талаптар (міндетті емес)
                </label>
                <textarea
                  name="extraComment"
                  value={form.extraComment}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Мысалы: жаратылыстану бағыты, STEM тәсілі, нақты мектеп деңгейі, т.б."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Price & Submit */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-gray-900">Редакция мақала жазып беру</p>
                <p className="text-gray-500 text-sm">Толық мақала + журналда жариялау + QR сертификат</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-amber-600">5 000</p>
                <p className="text-gray-500 text-sm">теңге</p>
              </div>
            </div>
            {submitError && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-white font-bold text-base hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Жіберілуде...</>
              ) : (
                <><PenTool className="w-5 h-5" /> Өтінім беру — Төлемге өту</>
              )}
            </button>
            <p className="text-center text-gray-400 text-xs mt-3">
              Форманы жібергеннен кейін Kaspi төлем бетіне өтесіз
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, name, value, onChange, error, placeholder, required, type = "text",
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
