import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import PaymentContent from "./PaymentContent";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;

  let submission: {
    id: string;
    type: string;
    fullName: string;
    title: string;
    journalName: string;
    language: string;
    price: number;
    createdAt: string;
  } | null = null;

  try {
    const content = await readFile(
      path.join(DATA_DIR, `${submissionId}.json`),
      "utf-8"
    );
    submission = JSON.parse(content);
  } catch {
    notFound();
  }

  if (!submission) notFound();

  const whatsappText = encodeURIComponent(
    `Саламетсиз бе, толем жасадым, чек жиберемин. Отиним №: ${submission.id}`
  );
  const kaspiUrl = "https://pay.kaspi.kz/pay/h2f46ids";
  const whatsappUrl = `https://wa.me/87001810121?text=${whatsappText}`;
  const whatsappSupportUrl = `https://wa.me/87001810131?text=${encodeURIComponent("Саламетсиз бе, комектесинизши")}`;

  return (
    <PaymentContent
      submission={submission}
      kaspiUrl={kaspiUrl}
      whatsappUrl={whatsappUrl}
      whatsappSupportUrl={whatsappSupportUrl}
    />
  );
}
