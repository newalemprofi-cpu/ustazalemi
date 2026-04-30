import { NextRequest } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { articleSlugFor, certIdFor, DATA_DIR } from "@/lib/submissions";
import { generateArticleWithAI } from "@/lib/generateArticle";

const JOURNALS = [
  { id: "j1", name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"' },
  { id: "j2", name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"' },
  { id: "j3", name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"' },
  { id: "j4", name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"' },
  { id: "j5", name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"' },
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const type = formData.get("type") as string;
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const workplace = formData.get("workplace") as string;
    const position = formData.get("position") as string;
    const subject = formData.get("subject") as string;
    const title = formData.get("title") as string;
    const language = formData.get("language") as string;
    const journalId = formData.get("journalId") as string;
    const textContent = (formData.get("textContent") as string) || null;
    const extraComment = (formData.get("extraComment") as string) || null;
    const price = parseInt((formData.get("price") as string) || "3000");
    const file = formData.get("file") as File | null;

    if (!fullName || !phone || !email || !workplace || !position || !subject || !title || !language || !journalId) {
      return Response.json({ error: "Міндетті өрістер толтырылмаған" }, { status: 400 });
    }
    if (type !== "own_article" && type !== "editor_service") {
      return Response.json({ error: "Тип қате" }, { status: 400 });
    }

    const journal = JOURNALS.find((j) => j.id === journalId);
    const journalName = journal?.name ?? journalId;

    let fileUrl: string | null = null;
    if (file && file.size > 0) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== "doc" && ext !== "docx") {
        return Response.json({ error: "Тек .doc немесе .docx форматтары" }, { status: 400 });
      }
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
      await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));
      fileUrl = `/uploads/${fileName}`;
    }

    const id = crypto.randomUUID();
    const articleSlug = articleSlugFor(id);
    const certificateId = certIdFor(id);
    const articleContent = await generateArticleWithAI({
      title, fullName, workplace, position, subject, journalName, language, textContent,
    });

    const submission = {
      id,
      type,
      fullName,
      phone,
      email,
      workplace,
      position,
      subject,
      title,
      language,
      journalId,
      journalName,
      fileUrl,
      textContent: textContent || null,
      extraComment: extraComment || null,
      price,
      status: "waiting_payment",
      createdAt: new Date().toISOString(),
      publishedAt: null,
      articleContent,
      articleSlug,
      certificateId,
    };

    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(path.join(DATA_DIR, `${id}.json`), JSON.stringify(submission, null, 2));

    return Response.json({ id }, { status: 201 });
  } catch (err) {
    console.error("Submission error:", err);
    return Response.json({ error: "Сервер қатесі" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { readdir } = await import("fs/promises");
    await mkdir(DATA_DIR, { recursive: true });
    const files = await readdir(DATA_DIR);
    const submissions = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const content = await readFile(path.join(DATA_DIR, f), "utf-8");
          return JSON.parse(content);
        })
    );
    submissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return Response.json(submissions);
  } catch {
    return Response.json([]);
  }
}
