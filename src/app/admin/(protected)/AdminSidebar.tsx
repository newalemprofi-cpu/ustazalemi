"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, BookOpen, Award, Settings,
  Newspaper, LogOut, ClipboardList,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Басты бет", icon: LayoutDashboard, exact: true },
  { href: "/admin/submissions", label: "Өтінімдер", icon: ClipboardList },
  { href: "/admin/articles", label: "Мақалалар", icon: FileText },
  { href: "/admin/certificates", label: "Сертификаттар", icon: Award },
  { href: "/admin/journals", label: "Журналдар", icon: Newspaper },
  { href: "/admin/settings", label: "Баптаулар", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-60 shrink-0 bg-blue-900 text-white flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-blue-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-300" />
          <span className="font-bold text-lg">USTAZALEMI</span>
        </div>
        <p className="text-blue-300 text-xs mt-1">Админ панель</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(item.href, item.exact)
                ? "bg-white/20 text-white"
                : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-blue-800">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Шығу
          </button>
        </form>
      </div>
    </aside>
  );
}
