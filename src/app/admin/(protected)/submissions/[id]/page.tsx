export const dynamic = "force-dynamic";
import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, FileText, BookOpen, Clock } from "lucide-react";
import { formatDate, getStatusLabel, getStatusColor, getLanguageLabel } from "@/lib/utils";
import SubmissionStatusUpdater from "./SubmissionStatusUpdater";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

type Submission = {
  id: string;
  type: string;
  fullName: string;
  phone: string;
  email: string;
  workplace: string;
  position: string;
  subject: string;
  title: string;
  language: string;
  journalId: string;
  journalName: string;
  fileUrl: string | null;
  textContent: string | null;
  extraComment: string | null;
  price: number;
  status: string;
  createdAt: string;
  whatsappClickedAt?: string;
};

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let submission: Submission;
  try {
    const raw = await readFile(path.join(DATA_DIR, `${id}.json`), "utf-8");
    submission = JSON.parse(raw);
  } catch {
    notFound();
  }

  const fields: { label: string; value: string | null | undefined }[] = [
    { label: "Аты-жөні", value: submission.fullName },
    { label: "Телефон", value: submission.phone },
    { label: "Email", value: submission.email },
    { label: "Жұмыс орны", value: submission.workplace },
    { label: "Лауазымы", value: submission.position },
    { label: "Пән", value: submission.subject },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/admin/submissions"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Өтінімдерге оралу
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{submission.title}</h1>
            <p className="text-gray-500 text-sm mt-1">ID: {submission.id}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusColor(submission.status)}`}
          >
            {getStatusLabel(submission.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Author info */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" /> Автор туралы
          </h2>
          <dl className="space-y-3">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-gray-400">{f.label}</dt>
                <dd className="text-sm font-medium text-gray-800">{f.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Article info */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Мақала туралы
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-400">Мақала тақырыбы</dt>
              <dd className="text-sm font-medium text-gray-800">{submission.title}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Тіл</dt>
              <dd className="text-sm font-medium text-gray-800">{getLanguageLabel(submission.language)}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Түрі</dt>
              <dd className="text-sm font-medium text-gray-800">
                {submission.type === "own_article" ? "Өз мақаласын жариялау" : "Редакция мақала жазады"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Баға</dt>
              <dd className="text-sm font-semibold text-blue-700">{submission.price.toLocaleString()} тг</dd>
            </div>
          </dl>
        </div>

        {/* Journal */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Журнал
          </h2>
          <p className="text-sm text-gray-800">{submission.journalName}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Уақыт
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-400">Жіберілген күн</dt>
              <dd className="text-sm font-medium text-gray-800">{formatDate(submission.createdAt)}</dd>
            </div>
            {submission.whatsappClickedAt && (
              <div>
                <dt className="text-xs text-gray-400">WhatsApp жіберілді</dt>
                <dd className="text-sm font-medium text-gray-800">
                  {formatDate(submission.whatsappClickedAt)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Extra comment */}
      {submission.extraComment && (
        <div className="mt-5 bg-white rounded-2xl card-shadow p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Қосымша ескертпе
          </h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.extraComment}</p>
        </div>
      )}

      {/* Status updater */}
      <div className="mt-5 bg-white rounded-2xl card-shadow p-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Статусты өзгерту
        </h2>
        <SubmissionStatusUpdater id={submission.id} currentStatus={submission.status} />
      </div>
    </div>
  );
}
