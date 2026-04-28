import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const content = await readFile(path.join(DATA_DIR, `${id}.json`), "utf-8");
    return Response.json(JSON.parse(content));
  } catch {
    return Response.json({ error: "Табылмады" }, { status: 404 });
  }
}
