export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { formatDate, getLanguageLabel } from "@/lib/utils";

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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let sub: Submission;
  try {
    const raw = await readFile(path.join(DATA_DIR, `${id}.json`), "utf-8");
    sub = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }

  if (sub.status !== "published" && sub.status !== "certificate_generated") {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }

  const certNumber = sub.certificateNumber || stableNumber(sub.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ustazalemi.kz";
  const verifyUrl = `${siteUrl}/verify?number=${certNumber}`;

  const html = `<!DOCTYPE html>
<html lang="kk">
<head>
  <meta charset="UTF-8" />
  <title>Сертификат — ${certNumber}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f0f4ff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .cert { width: 794px; background: #fff; border: 6px solid #1565c0; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1565c0, #1976d2); color: white; padding: 28px 40px; text-align: center; }
    .header h1 { font-size: 28px; font-weight: 900; letter-spacing: 2px; }
    .header p { font-size: 13px; color: #bbdefb; margin-top: 4px; }
    .body { padding: 36px 48px; }
    .cert-title { text-align: center; font-size: 18px; font-weight: 700; color: #1565c0; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
    .cert-subtitle { text-align: center; font-size: 13px; color: #666; margin-bottom: 28px; }
    .author { text-align: center; font-size: 36px; font-weight: 900; color: #1565c0; margin-bottom: 8px; }
    .divider { width: 80px; height: 4px; background: #f5a623; margin: 0 auto 24px; border-radius: 2px; }
    .article-box { background: #e3f2fd; border-radius: 12px; padding: 18px 24px; text-align: center; margin-bottom: 24px; }
    .article-box p { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .article-box h2 { font-size: 17px; font-weight: 700; color: #1a2332; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .grid-item p { font-size: 11px; color: #999; }
    .grid-item span { font-size: 14px; font-weight: 600; color: #1a2332; display: block; margin-top: 2px; }
    .footer-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e0e0e0; padding-top: 16px; }
    .cert-num { font-family: monospace; font-size: 18px; font-weight: 700; color: #1565c0; letter-spacing: 2px; }
    .badge { padding: 4px 14px; background: #e8f5e9; color: #2e7d32; border-radius: 99px; font-size: 12px; font-weight: 700; }
    .verify { font-size: 10px; color: #999; margin-top: 8px; }
    .footer { background: #1565c0; padding: 12px 40px; display: flex; justify-content: space-between; }
    .footer p { color: #bbdefb; font-size: 11px; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="header">
      <h1>USTAZALEMI</h1>
      <p>Педагогтарға арналған платформа</p>
    </div>
    <div class="body">
      <div class="cert-title">Жариялым сертификаты</div>
      <div class="cert-subtitle">Осы сертификат берілді</div>
      <div class="author">${sub.fullName}</div>
      <div class="divider"></div>
      <div class="article-box">
        <p>Мақала</p>
        <h2>${sub.title}</h2>
      </div>
      <div class="grid">
        <div class="grid-item"><p>Журнал</p><span>${sub.journalName}</span></div>
        <div class="grid-item"><p>Тіл</p><span>${getLanguageLabel(sub.language)}</span></div>
        <div class="grid-item"><p>Жариялану күні</p><span>${formatDate(sub.createdAt)}</span></div>
        <div class="grid-item"><p>Сертификат берілген</p><span>${formatDate(sub.createdAt)}</span></div>
      </div>
      <div class="footer-row">
        <div>
          <div class="cert-num">${certNumber}</div>
          <div class="verify">Тексеру: ${verifyUrl}</div>
        </div>
        <div class="badge">✓ Жарамды</div>
      </div>
    </div>
    <div class="footer">
      <p>© USTAZALEMI — ustazalemi.kz</p>
      <p>Ресми жариялым платформасы</p>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="certificate-${certNumber}.html"`,
    },
  });
}
