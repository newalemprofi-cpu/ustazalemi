"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Lang, type TranslationKey, getDict } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "kz",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("kz");

  useEffect(() => {
    const saved = localStorage.getItem("ua_lang") as Lang | null;
    if (saved === "kz" || saved === "ru") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ua_lang", l);
  };

  const t = (key: TranslationKey): string => getDict(lang)[key] as string;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
