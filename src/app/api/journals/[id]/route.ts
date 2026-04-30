export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Рұқсат жоқ" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const journal = await prisma.journal.update({ where: { id }, data });
  return Response.json(journal);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Рұқсат жоқ" }, { status: 401 });

  const { id } = await params;
  await prisma.journal.delete({ where: { id } });
  return Response.json({ ok: true });
}
