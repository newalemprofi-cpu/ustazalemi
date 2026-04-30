export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Рұқсат жоқ" }, { status: 401 });

  const settings = await prisma.settings.findFirst();
  return Response.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Рұқсат жоқ" }, { status: 401 });

  const data = await req.json();
  const existing = await prisma.settings.findFirst();

  let settings;
  if (existing) {
    settings = await prisma.settings.update({ where: { id: existing.id }, data });
  } else {
    settings = await prisma.settings.create({ data });
  }
  return Response.json(settings);
}
