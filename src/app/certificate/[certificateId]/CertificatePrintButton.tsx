"use client";
import { Printer } from "lucide-react";

export default function CertificatePrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 transition-colors"
    >
      <Printer className="w-4 h-4" />
      Басып шығару / PDF
    </button>
  );
}
