import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      <Link href="/" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Басты бет</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-gray-300" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-blue-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
