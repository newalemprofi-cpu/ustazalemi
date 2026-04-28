"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { TranslationKey } from "@/lib/i18n";

type NavItem = { key: TranslationKey; href: string };

const navItems: NavItem[] = [
  { key: "nav.home",     href: "/" },
  { key: "nav.about",    href: "/about" },
  { key: "nav.journals", href: "/journals" },
  { key: "nav.services", href: "/services" },
  { key: "nav.archive",  href: "/archive" },
  { key: "nav.verify",   href: "/verify" },
  { key: "nav.contacts", href: "/contacts" },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-blue-800 tracking-tight">USTAZALEMI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setLang("kz")}
                className={`px-3 py-1.5 transition-colors ${lang === "kz" ? "bg-blue-700 text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Қаз
              </button>
              <button
                onClick={() => setLang("ru")}
                className={`px-3 py-1.5 transition-colors ${lang === "ru" ? "bg-blue-700 text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Рус
              </button>
            </div>

            <Link
              href="/services"
              className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              {t("nav.cta")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50"
            aria-label="Меню ашу"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-blue-100 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            {/* Language switcher mobile */}
            <div className="flex gap-2 px-3">
              <button
                onClick={() => setLang("kz")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${lang === "kz" ? "bg-blue-700 text-white" : "border border-gray-200 text-gray-500"}`}
              >
                Қазақша
              </button>
              <button
                onClick={() => setLang("ru")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${lang === "ru" ? "bg-blue-700 text-white" : "border border-gray-200 text-gray-500"}`}
              >
                Русский
              </button>
            </div>
            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
