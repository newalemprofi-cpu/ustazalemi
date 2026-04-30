import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { DATA_DIR } from "@/lib/submissions";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const content = await readFile(path.join(DATA_DIR, `${id}.json`), "utf-8");
    return Response.json(JSON.parse(content));
  } catch {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const raw = await readFile(filePath, "utf-8");
    const submission = JSON.parse(raw);

    const body = await req.json();
    // Only allow safe fields to be updated this way
    const allowed = ["articleContent"] as const;
    for (const key of allowed) {
      if (key in body) submission[key] = body[key];
    }

    await writeFile(filePath, JSON.stringify(submission, null, 2));
    return Response.json(submission);
  } catch {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }
}
