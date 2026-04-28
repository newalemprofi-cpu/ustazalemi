import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Newspaper, Globe, MapPin, FileText, PenTool } from "lucide-react";

export const metadata: Metadata = {
  title: "Журналдар — USTAZALEMI",
  description: "Республикалық және халықаралық ғылыми-әдістемелік журналдар",
};

const journals = [
  {
    id: 1,
    name: 'Республикалық ғылыми-әдістемелік журналы "Жаңа Қазақстанның Ustazalemi"',
    type: "REPUBLICAN",
    description:
      "Қазақстан педагогтарының ғылыми-әдістемелік жетістіктерін республика деңгейінде жариялайтын ресми журнал.",
    languages: ["Қазақ тілі", "Русский язык"],
    frequency: "Ежесайын",
    isActive: true,
  },
  {
    id: 2,
    name: 'Республикалық ғылыми-әдістемелік журналы "Болашаққа Aqniet-пен бірге"',
    type: "REPUBLICAN",
    description:
      "Болашақтың педагогикасы мен тәрбие ісін зерттеуге арналған республикалық журнал.",
    languages: ["Қазақ тілі", "Русский язык"],
    frequency: "Ежесайын",
    isActive: true,
  },
  {
    id: 3,
    name: 'Халықаралық ғылыми-әдістемелік журналы "Mentor Ustaz"',
    type: "INTERNATIONAL",
    description:
      "Халықаралық деңгейде педагогика мен білім беру саласындағы зерттеулерді жариялайтын журнал.",
    languages: ["Қазақ тілі", "Русский язык", "English"],
    frequency: "Ежесайын",
    isActive: true,
  },
  {
    id: 4,
    name: 'Халықаралық ғылыми-әдістемелік журналы "Педагогикалық панорама идеясы"',
    type: "INTERNATIONAL",
    description:
      "Педагогика ғылымының инновациялық бағыттары мен білім беру тәжірибесін зерттеуге арналған халықаралық басылым.",
    languages: ["Қазақ тілі", "Русский язык", "English"],
    frequency: "Ежесайын",
    isActive: true,
  },
  {
    id: 5,
    name: 'Халықаралық ғылыми-әдістемелік журналы "ILIM.KZ"',
    type: "INTERNATIONAL",
    description:
      "Ғылым мен білімнің қиылысуы — ILIM.KZ журналы халықаралық ғылыми қоғамдастықпен байланыс орнатуға мүмкіндік береді.",
    languages: ["Қазақ тілі", "Русский язык", "English"],
    frequency: "Ежесайын",
    isActive: true,
  },
];

export default function JournalsPage() {
  const republican = journals.filter((j) => j.type === "REPUBLICAN");
  const international = journals.filter((j) => j.type === "INTERNATIONAL");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Журналдар" }]} />
          <h1 className="text-4xl font-bold mb-4">Журналдар</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Республикалық және халықаралық ғылыми-әдістемелік журналдар
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-blue-900 text-lg mb-3">
            Мақалаға қойылатын жалпы талаптар
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Кемінде 5000 сөз",
              "Аннотация + кілт сөздер",
              "Кіріспе, негізгі бөлім, қорытынды",
              "Кемінде 5 әдебиет",
              "Қазақстан білім жүйесіне бейімделген",
              "Форматы: .doc немесе .docx",
            ].map((req) => (
              <div key={req} className="flex items-center gap-2 text-sm text-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* Republican */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Республикалық журналдар</h2>
              <p className="text-gray-500 text-sm">{republican.length} журнал</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {republican.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        </div>

        {/* International */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-700 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Халықаралық журналдар</h2>
              <p className="text-gray-500 text-sm">{international.length} журнал</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {international.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Мақалаңызды жариялайық</h2>
          <p className="text-blue-200 mb-6">
            Журналды таңдап, өтінім беріңіз. Kaspi арқылы төлеп, WhatsApp
            ботқа чек жіберсеңіз болды.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/publish"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-800 font-semibold hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Өз мақаласын жариялау — 3 000 тг
            </Link>
            <Link
              href="/editor-service"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-amber-900 font-semibold hover:bg-amber-300 transition-colors"
            >
              <PenTool className="w-4 h-4" />
              Редакция мақала жазып беру — 5 000 тг
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function JournalCard({ journal }: { journal: (typeof journals)[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Newspaper className="w-6 h-6 text-blue-700" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${
            journal.type === "REPUBLICAN"
              ? "bg-blue-100 text-blue-800"
              : "bg-indigo-100 text-indigo-800"
          }`}>
            {journal.type === "REPUBLICAN" ? "Республикалық" : "Халықаралық"}
          </span>
          <h3 className="font-bold text-gray-900 text-sm leading-snug">{journal.name}</h3>
        </div>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {journal.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {journal.languages.map((lang) => (
          <span
            key={lang}
            className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
