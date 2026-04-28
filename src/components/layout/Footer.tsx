import Link from "next/link";
import { BookOpen, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">USTAZALEMI</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Педагогтарға арналған мақала жариялау, редакция арқылы мақала
              жаздыру және сертификат алу платформасы.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Платформа</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "Платформа туралы" },
                { href: "/journals", label: "Журналдар" },
                { href: "/archive", label: "Архив" },
                { href: "/verify", label: "Сертификат тексеру" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Қызметтер</h3>
            <ul className="space-y-2">
              {[
                { href: "/publish", label: "Өз мақаласын жариялау — 3000 тг" },
                { href: "/editor-service", label: "Редакция мақала жазып беру — 5000 тг" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Байланыс</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+77001810121" className="hover:text-white transition-colors">
                  +7 700 181 01 21
                </a>
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+77001810131" className="hover:text-white transition-colors">
                  +7 700 181 01 31
                </a>
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@ustazalemi.kz" className="hover:text-white transition-colors">
                  info@ustazalemi.kz
                </a>
              </li>
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Қазақстан Республикасы</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} USTAZALEMI. Барлық құқықтар қорғалған.
          </p>
          <div className="flex gap-4">
            <Link href="/contacts" className="text-blue-300 hover:text-white text-sm transition-colors">
              Байланыс
            </Link>
            <Link href="/verify" className="text-blue-300 hover:text-white text-sm transition-colors">
              Сертификат тексеру
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
