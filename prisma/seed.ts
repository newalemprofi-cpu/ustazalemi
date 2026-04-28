import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed басталды...");

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@ustazalemi.kz";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashed },
    create: { email: adminEmail, password: hashed, role: "ADMIN" },
  });
  console.log(`Admin жасалды: ${adminEmail}`);

  // Journals
  const journals = [
    {
      name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"',
      type: "REPUBLICAN" as const,
      description: "Қазақстан педагогтарының ғылыми-әдістемелік жетістіктерін республика деңгейінде жариялайтын ресми журнал.",
    },
    {
      name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"',
      type: "REPUBLICAN" as const,
      description: "Болашақтың педагогикасы мен тәрбие ісін зерттеуге арналған республикалық журнал.",
    },
    {
      name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"',
      type: "INTERNATIONAL" as const,
      description: "Халықаралық деңгейде педагогика мен білім беру саласындағы зерттеулерді жариялайтын журнал.",
    },
    {
      name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"',
      type: "INTERNATIONAL" as const,
      description: "Педагогика ғылымының инновациялық бағыттары мен білім беру тәжірибесін зерттеуге арналған халықаралық басылым.",
    },
    {
      name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"',
      type: "INTERNATIONAL" as const,
      description: "Ғылым мен білімнің қиылысуы — ILIM.KZ журналы халықаралық ғылыми қоғамдастықпен байланыс орнатуға мүмкіндік береді.",
    },
  ];

  for (const journal of journals) {
    const existing = await prisma.journal.findFirst({ where: { name: journal.name } });
    if (!existing) {
      await prisma.journal.create({ data: { ...journal, isActive: true } });
    }
  }
  console.log("5 журнал жасалды");

  // Default settings
  const existingSettings = await prisma.settings.findFirst();
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        kaspiPaymentLink: process.env.KASPI_PAYMENT_LINK || "https://pay.kaspi.kz/pay/h2f46ids",
        whatsappBot: process.env.WHATSAPP_BOT || "87001810121",
        whatsappSupport: process.env.WHATSAPP_SUPPORT || "87001810131",
        publishPrice: parseInt(process.env.PUBLISH_PRICE || "3000"),
        editorServicePrice: parseInt(process.env.EDITOR_SERVICE_PRICE || "5000"),
      },
    });
    console.log("Баптаулар жасалды");
  }

  console.log("Seed аяқталды ✓");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
