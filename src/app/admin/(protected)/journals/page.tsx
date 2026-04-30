export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma";
import { Newspaper } from "lucide-react";
import JournalManager from "./JournalManager";

export default async function AdminJournalsPage() {
  const journals = await prisma.journal.findMany({ orderBy: { createdAt: "asc" } }).catch(() => []);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-blue-700" />
          Журналдар
        </h1>
        <p className="text-gray-500 text-sm mt-1">{journals.length} журнал</p>
      </div>
      <JournalManager journals={journals} />
    </div>
  );
}

