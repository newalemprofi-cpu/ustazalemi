"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import StepIndicator from "@/components/ui/StepIndicator";
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { countWords } from "@/lib/utils";

const journals = [
  { id: "j1", name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"' },
  { id: "j2", name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"' },
  { id: "j3", name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"' },
  { id: "j4", name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"' },
  { id: "j5", name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"' },
];

const WORD_LIMIT = 5000;

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  workplace: string;
  position: string;
  subject: string;
  title: string;
  language: string;
  journalId: string;
  textContent: string;
  extraComment: string;
};

const initialForm: FormData = {
  fullName: "",
  phone: "",
  email: "",
  workplace: "",
  position: "",
  subject: "",
  title: "",
  language: "",
  journalId: "",
  textContent: "",
  extraComment: "",
};

export default function PublishPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "textContent") {
      setWordCount(countWords(value));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (ext !== "doc" && ext !== "docx") {
      setFileError("Тек .doc немесе .docx форматтары қабылданады");
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(f);
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = "ФИО міндетті өріс";
    if (!form.phone.trim()) e.phone = "Телефон міндетті өріс";
    if (!form.email.trim()) e.email = "Email міндетті өріс";
    if (!form.workplace.trim()) e.workplace = "Жұмыс орны міндетті өріс";
    if (!form.position.trim()) e.position = "Лауазым міндетті өріс";
    if (!form.subject.trim()) e.subject = "Пән міндетті өріс";
    if (!form.title.trim()) e.title = "Мақала атауы міндетті өріс";
    if (!form.language) e.language = "Тіл таңдаңыз";
    if (!form.journalId) e.journalId = "Журнал таңдаңыз";

    if (!file && !form.textContent.trim()) {
      e.textContent = "Файл жүктеңіз немесе мәтін енгізіңіз";
    }
    if (!file && form.textContent.trim() && wordCount < WORD_LIMIT) {
      e.textContent = `Мақала кемінде ${WORD_LIMIT} сөзден тұруы керек. Қазір: ${wordCount} сөз`;
    }

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
      body.append("type", "own_article");
      body.append("price", "3000");
      if (file) body.append("file", file);

      const res = await fetch("/api/submissions", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Қате орын алды");

      router.push(`/payment/${data.id}`);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Қате орын алды. Қайталап көріңіз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Өз мақаласын жариялау" }]} />
          <h1 className="text-3xl font-bold mb-2">Өз мақаласын жариялау</h1>
          <p className="text-blue-200">Дайын мақалаңызды журналда жариялаңыз — 3 000 тг</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <StepIndicator currentStep={1} />
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

          {/* Article info */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-sm flex items-center justify-center font-bold">2</span>
              Мақала туралы
            </h2>
            <div className="space-y-4">
              <Field label="Мақала атауы" name="title" value={form.title} onChange={handleChange} error={errors.title} placeholder="Мақала тақырыбын енгізіңіз" required />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Мақала тілі <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.language ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                  >
                    <option value="">Тіл таңдаңыз</option>
                    <option value="kazakh">Қазақ тілі</option>
                    <option value="russian">Русский язык</option>
                    <option value="english">English</option>
                  </select>
                  {errors.language && <p className="mt-1 text-xs text-red-500">{errors.language}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Журнал <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="journalId"
                    value={form.journalId}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.journalId ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                  >
                    <option value="">Журнал таңдаңыз</option>
                    {journals.map((j) => (
                      <option key={j.id} value={j.id}>{j.name}</option>
                    ))}
                  </select>
                  {errors.journalId && <p className="mt-1 text-xs text-red-500">{errors.journalId}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* File upload or text */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-sm flex items-center justify-center font-bold">3</span>
              Мақала мәтіні
            </h2>

            {/* File upload */}
            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-4 ${file ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"}`}
            >
              <input ref={fileRef} type="file" accept=".doc,.docx" onChange={handleFile} className="hidden" />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-green-800 text-sm">{file.name}</p>
                    <p className="text-green-600 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-700 text-sm">Файл жүктеу үшін басыңыз</p>
                  <p className="text-gray-400 text-xs mt-1">Тек .doc немесе .docx • Максимум 10 MB</p>
                </>
              )}
            </div>
            {fileError && (
              <p className="flex items-center gap-1 text-red-500 text-xs mb-3">
                <AlertCircle className="w-4 h-4" /> {fileError}
              </p>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">немесе мәтін енгізіңіз</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Мақала мәтіні</label>
                <span className={`text-xs font-medium ${wordCount >= WORD_LIMIT ? "text-green-600" : "text-gray-400"}`}>
                  {wordCount} / {WORD_LIMIT} сөз
                </span>
              </div>
              <textarea
                name="textContent"
                value={form.textContent}
                onChange={handleChange}
                rows={10}
                disabled={!!file}
                placeholder={file ? "Файл жүктелді — мәтін енгізу қажет емес" : "Мақала мәтінін осында енгізіңіз (кемінде 5000 сөз)..."}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.textContent ? "border-red-400 bg-red-50" : "border-gray-200"} ${file ? "bg-gray-50 text-gray-400" : ""}`}
              />
              {errors.textContent && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.textContent}
                </p>
              )}
              {!file && wordCount > 0 && wordCount < WORD_LIMIT && (
                <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <p className="text-amber-700 text-xs">
                    Мақала кемінде {WORD_LIMIT} сөзден тұруы керек. Жетіспейтін сөз: {WORD_LIMIT - wordCount}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Extra comment */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-sm flex items-center justify-center font-bold">4</span>
              Қосымша пікір (міндетті емес)
            </h2>
            <textarea
              name="extraComment"
              value={form.extraComment}
              onChange={handleChange}
              rows={3}
              placeholder="Қосымша ескертулер немесе талаптар..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Price & Submit */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-gray-900">Өз мақаласын жариялау</p>
                <p className="text-gray-500 text-sm">Ресми журналда жариялау + QR сертификат</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-blue-700">3 000</p>
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
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700 text-white font-bold text-base hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Жіберілуде...</>
              ) : (
                <><FileText className="w-5 h-5" /> Өтінім беру — Төлемге өту</>
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
