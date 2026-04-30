"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Save, CheckCircle2, Loader2 } from "lucide-react";

// Duplicated from src/lib/submissions.ts — must stay in sync (pure function, no Node imports)
function buildArticleContent(s: {
  title: string;
  fullName: string;
  workplace: string;
  position: string;
  subject: string;
  journalName: string;
  language: string;
  textContent?: string | null;
}): string {
  const lang =
    s.language === "kazakh" ? "Қазақ тілі"
    : s.language === "russian" ? "Орыс тілі"
    : "English";

  const lines = [
    s.title,
    "",
    `Автор: ${s.fullName}`,
    `Жұмыс орны: ${s.workplace}`,
    `Лауазымы: ${s.position}`,
    `Пән: ${s.subject}`,
    "",
    `Журнал: ${s.journalName}`,
    `Тіл: ${lang}`,
  ];

  if (s.textContent) {
    lines.push("", "---", "", s.textContent);
  }

  return lines.join("\n");
}

type SubmissionFields = {
  title: string;
  fullName: string;
  workplace: string;
  position: string;
  subject: string;
  journalName: string;
  language: string;
  textContent: string | null;
};

export default function ArticleEditor({
  id,
  fields,
  initialContent,
  isPublished,
  articleSlug,
  certificateId,
}: {
  id: string;
  fields: SubmissionFields;
  initialContent: string;
  isPublished: boolean;
  articleSlug: string;
  certificateId: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  function handleRegenerate() {
    setContent(buildArticleContent(fields));
  }

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleContent: content }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handlePublish() {
    setPublishing(true);
    // Save content first, then publish
    await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleContent: content }),
    });
    await fetch(`/api/submissions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
    setPublishing(false);
    router.refresh();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ustazalemi.kz";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleRegenerate}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Мақала мәтінін қайта дайындау
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={14}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : saved ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {saving ? "Сақталуда..." : saved ? "Сақталды!" : "Сақтау"}
        </button>

        {!isPublished && (
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-green-700 text-white text-xs font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {publishing ? "Жариялануда..." : "Жариялау"}
          </button>
        )}

        {isPublished && (
          <span className="text-xs text-green-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Жарияланды
          </span>
        )}
      </div>

      {isPublished && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-xs space-y-1.5">
          <p className="font-semibold text-green-800 mb-2">Клиентке жіберуге арналған сілтемелер:</p>
          <p className="text-green-700">
            Мақалаңыз жарияланды:{" "}
            <span className="font-mono text-green-900">
              {siteUrl}/article/{articleSlug}
            </span>
          </p>
          <p className="text-green-700">
            Сертификатыңыз дайын:{" "}
            <span className="font-mono text-green-900">
              {siteUrl}/certificate/{certificateId}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
