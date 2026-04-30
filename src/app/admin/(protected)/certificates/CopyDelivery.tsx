"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyDelivery({ articleUrl, certUrl }: { articleUrl: string; certUrl: string }) {
  const [copied, setCopied] = useState(false);

  const text = `Мақалаңыз жарияланды: ${articleUrl}\nСертификатыңыз дайын: ${certUrl}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="text-xs text-gray-500 space-y-0.5 mb-1.5">
        <p className="truncate max-w-[200px]" title={articleUrl}>
          <span className="text-gray-400">Мақала:</span>{" "}
          <span className="font-mono">{articleUrl}</span>
        </p>
        <p className="truncate max-w-[200px]" title={certUrl}>
          <span className="text-gray-400">Сертификат:</span>{" "}
          <span className="font-mono">{certUrl}</span>
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-colors"
      >
        {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
        {copied ? "Көшірілді!" : "Хабарды көшіру"}
      </button>
    </div>
  );
}
