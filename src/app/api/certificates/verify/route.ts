export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { readdir, readFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

type Submission = {
  id: string;
  fullName: string;
  title: string;
  language: string;
  journalName: string;
  status: string;
  createdAt: string;
  certificateNumber?: string;
};

function stableNumber(id: string): string {
  return `CERT-${id.slice(0, 8).toUpperCase()}`;
}

async function findByNumber(number: string): Promise<Submission | null> {
  let files: string[];
  try {
    files = await readdir(DATA_DIR);
  } catch {
    return null;
  }
  const upper = number.toUpperCase();
  for (const f of files) {
    if (!f.endsWith(".json")) continue;
    try {
      const raw = await readFile(path.join(DATA_DIR, f), "utf-8");
      const sub = JSON.parse(raw) as Submission;
      if (sub.status !== "published" && sub.status !== "certificate_generated") continue;
      const certNum = sub.certificateNumber || stableNumber(sub.id);
      if (certNum.toUpperCase() === upper) return sub;
    } catch {
      continue;
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get("number");
  if (!number?.trim()) {
    return Response.json({ error: "Нөмір міндетті" }, { status: 400 });
  }

  const sub = await findByNumber(number.trim());
  if (!sub) {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }

  const certNumber = sub.certificateNumber || stableNumber(sub.id);

  // id is the CERT number so /certificate/[certificateId] URLs use the friendly format
  return Response.json({
    id: certNumber,
    certificateNumber: certNumber,
    issuedAt: sub.createdAt,
    isValid: true,
    article: {
      title: sub.title,
      authorName: sub.fullName,
      language: sub.language,
      publishedAt: sub.createdAt,
      journal: { name: sub.journalName },
    },
  });
}
