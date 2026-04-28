import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json({ error: "Email мен құпия сөз міндетті" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "Email немесе құпия сөз қате" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "Email немесе құпия сөз қате" }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    await setSession(token);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Сервер қатесі" }, { status: 500 });
  }
}
