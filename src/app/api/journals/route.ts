import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const journals = await prisma.journal.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
  return Response.json(journals);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Рұқсат жоқ" }, { status: 401 });

  const { name, type, description } = await req.json();
  if (!name || !type) return Response.json({ error: "Атау және тип міндетті" }, { status: 400 });

  const journal = await prisma.journal.create({
    data: { name, type, description: description || null },
  });
  return Response.json(journal, { status: 201 });
}
