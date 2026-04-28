export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

export function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase().substring(-4);
  return `UA-${year}-${random}${timestamp}`;
}

export function formatDate(date: Date | string, locale = "kk-KZ"): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function getLanguageLabel(lang: string): string {
  const labels: Record<string, string> = {
    kazakh: "Қазақ тілі",
    russian: "Русский язык",
    english: "English",
  };
  return labels[lang] || lang;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Жоба",
    waiting_payment: "Төлем күтілуде",
    sent_to_whatsapp: "WhatsApp жіберілді",
    processing: "Өңделуде",
    published: "Жарияланды",
    cancelled: "Болдырылмады",
    failed: "Қате",
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    waiting_payment: "bg-yellow-100 text-yellow-800",
    sent_to_whatsapp: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    published: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    failed: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

export function getJournalTypeLabel(type: string): string {
  return type === "REPUBLICAN" ? "Республикалық" : "Халықаралық";
}
