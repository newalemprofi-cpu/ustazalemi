"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyCertUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <span className="text-xs text-gray-400 font-mono truncate max-w-[180px]" title={url}>
        {url}
      </span>
      <button
        onClick={handleCopy}
        title="Көшіру"
        className="shrink-0 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
      >
        {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}
