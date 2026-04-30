// Server-only — uses Node.js fs/promises. Do not import from client components.
import { readdir, readFile } from "fs/promises";
import path from "path";

export const DATA_DIR = path.join(process.cwd(), "data", "submissions");

// ── pure helpers (also duplicated in ArticleEditor for client use) ─────────────

export function articleSlugFor(id: string): string {
  return `article-${id.slice(0, 8)}`;
}

export function certIdFor(id: string): string {
  return `CERT-${id.slice(0, 8).toUpperCase()}`;
}

export function buildArticleContent(s: {
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

// ── types ─────────────────────────────────────────────────────────────────────

export type Submission = {
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
  publishedAt?: string | null;
  articleContent?: string | null;
  articleSlug?: string;
  certificateId?: string;
  whatsappClickedAt?: string;
};

// RichSub guarantees articleSlug and certificateId are always present
export type RichSub = Submission & { articleSlug: string; certificateId: string };

function enrich(s: Submission): RichSub {
  return {
    ...s,
    articleSlug: s.articleSlug || articleSlugFor(s.id),
    certificateId: s.certificateId || certIdFor(s.id),
  };
}

// ── file loaders ──────────────────────────────────────────────────────────────

async function readAll(): Promise<Submission[]> {
  try {
    const files = await readdir(DATA_DIR);
    const results = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          try {
            const raw = await readFile(path.join(DATA_DIR, f), "utf-8");
            return JSON.parse(raw) as Submission;
          } catch {
            return null;
          }
        })
    );
    return results.filter((s): s is Submission => s !== null);
  } catch {
    return [];
  }
}

export async function loadPublished(): Promise<RichSub[]> {
  const all = await readAll();
  return all
    .filter((s) => s.status === "published" || s.status === "certificate_generated")
    .map(enrich)
    .sort((a, b) => {
      const ad = a.publishedAt || a.createdAt;
      const bd = b.publishedAt || b.createdAt;
      return new Date(bd).getTime() - new Date(ad).getTime();
    });
}

export async function findBySlug(slug: string): Promise<RichSub | null> {
  const all = await readAll();
  return all.map(enrich).find((s) => s.articleSlug === slug) ?? null;
}

export async function findByCertId(certId: string): Promise<RichSub | null> {
  const upper = certId.toUpperCase();
  const all = await readAll();
  return (
    all.map(enrich).find((s) => {
      if (s.status !== "published" && s.status !== "certificate_generated") return false;
      return s.certificateId.toUpperCase() === upper;
    }) ?? null
  );
}
