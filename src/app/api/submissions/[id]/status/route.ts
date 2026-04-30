import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { DATA_DIR } from "@/lib/submissions";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const content = await readFile(filePath, "utf-8");
    const submission = JSON.parse(content);

    submission.status = status;

    if (status === "published" && !submission.publishedAt) {
      submission.publishedAt = new Date().toISOString();
    }
    if (status === "sent_to_whatsapp") {
      submission.whatsappClickedAt = new Date().toISOString();
    }

    await writeFile(filePath, JSON.stringify(submission, null, 2));
    return Response.json(submission);
  } catch {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }
}
