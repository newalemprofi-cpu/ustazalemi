import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "USTAZALEMI — педагогтарға арналған мақала жариялау платформасы",
  description:
    "Мақала жариялау, редакция арқылы мақала жаздыру, сертификат алу және педагогтарға арналған журналдар платформасы.",
  keywords: [
    "ustazalemi",
    "педагог",
    "мақала жариялау",
    "ғылыми журнал",
    "сертификат",
    "Қазақстан",
  ],
  openGraph: {
    title: "USTAZALEMI — педагогтарға арналған платформа",
    description:
      "Мақала жариялау, редакция арқылы мақала жаздыру, сертификат алу және педагогтарға арналған журналдар платформасы.",
    locale: "kk_KZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
