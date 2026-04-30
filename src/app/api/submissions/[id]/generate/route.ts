import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { DATA_DIR } from "@/lib/submissions";
import { generateArticleWithAI } from "@/lib/generateArticle";
import { getSession } from "@/lib/auth";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Рұқсат жоқ" }, { status: 401 });

  const { id } = await params;
  const filePath = path.join(DATA_DIR, `${id}.json`);

  let submission: {
    title: string; fullName: string; workplace: string; position: string;
    subject: string; journalName: string; language: string; textContent?: string | null;
    [key: string]: unknown;
  };

  try {
    const raw = await readFile(filePath, "utf-8");
    submission = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }

  const articleContent = await generateArticleWithAI({
    title: submission.title,
    fullName: submission.fullName,
    workplace: submission.workplace,
    position: submission.position,
    subject: submission.subject,
    journalName: submission.journalName,
    language: submission.language,
    textContent: submission.textContent ?? null,
  });

  submission.articleContent = articleContent;
  await writeFile(filePath, JSON.stringify(submission, null, 2));

  return Response.json({ articleContent });
}
