"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CertificateDownload({ certificateId }: { certificateId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/certificates/${certificateId}/pdf`);
      if (!res.ok) throw new Error("PDF жасау мүмкін болмады");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${certificateId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("PDF жасау қатесі. Кейінірек қайталаңыз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 disabled:opacity-60 transition-colors"
    >
      {loading ? (
        <><Loader2 className="w-4 h-4 animate-spin" /> PDF жасалуда...</>
      ) : (
        <><Download className="w-4 h-4" /> PDF жүктеу</>
      )}
    </button>
  );
}
