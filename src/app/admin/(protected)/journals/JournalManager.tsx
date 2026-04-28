"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, ToggleLeft, ToggleRight } from "lucide-react";

interface Journal { id: string; name: string; type: string; description: string | null; isActive: boolean; }

export default function JournalManager({ journals: initial }: { journals: Journal[] }) {
  const router = useRouter();
  const [journals, setJournals] = useState(initial);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", type: "REPUBLICAN", description: "" });
  const [loading, setLoading] = useState(false);

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/journals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    setJournals((prev) => prev.map((j) => j.id === id ? { ...j, isActive: !isActive } : j));
  };

  const addJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/journals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) { setAdding(false); setForm({ name: "", type: "REPUBLICAN", description: "" }); router.refresh(); }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setAdding((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Журнал қосу
      </button>

      {adding && (
        <form onSubmit={addJournal} className="bg-white rounded-2xl p-5 card-shadow space-y-3">
          <h2 className="font-bold text-gray-900">Жаңа журнал</h2>
          <input
            required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Журнал атауы"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="REPUBLICAN">Республикалық</option>
            <option value="INTERNATIONAL">Халықаралық</option>
          </select>
          <textarea
            value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Сипаттама (міндетті емес)" rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Сақталуда</> : "Сақтау"}
            </button>
            <button type="button" onClick={() => setAdding(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
              Болдырмау
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="divide-y divide-gray-50">
          {journals.map((j) => (
            <div key={j.id} className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm leading-snug">{j.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${j.type === "REPUBLICAN" ? "bg-blue-100 text-blue-800" : "bg-indigo-100 text-indigo-800"}`}>
                  {j.type === "REPUBLICAN" ? "Республикалық" : "Халықаралық"}
                </span>
              </div>
              <button onClick={() => toggleActive(j.id, j.isActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${j.isActive ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                {j.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                {j.isActive ? "Белсенді" : "Белсенді емес"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
