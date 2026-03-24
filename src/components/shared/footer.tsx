import { Logo } from "@/components/shared/logo";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="landing border-t border-black/8">
      <div className="mx-auto max-w-none px-6 lg:px-10">
        {/* Main footer grid */}
        <div className="grid border-b border-black/8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="border-b border-black/8 p-6 sm:border-b-0 sm:border-r lg:border-r">
            <a href="/" className="text-[#1c1410]">
              <Logo />
            </a>
            <p className="mt-3 font-[family-name:var(--font-outfit)] text-xs leading-relaxed text-[#1c1410]/40">
              Jean-François — votre homme à tout faire à Trois-Rivières.<br />
              Chaque pierre compte.
            </p>
          </div>

          {/* Services */}
          <div className="border-b border-black/8 p-6 sm:border-b-0 lg:border-r">
            <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/40">
              Services
            </p>
            <ul className="mt-3 space-y-2 font-[family-name:var(--font-outfit)] text-xs text-[#1c1410]/55">
              {["Rénovation", "Électricité légère", "Menuiserie", "Entretien saisonnier"].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-cuivre transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="border-b border-black/8 p-6 sm:border-b-0 sm:border-r lg:border-r">
            <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/40">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 font-[family-name:var(--font-outfit)] text-xs text-[#1c1410]/55">
              <li>
                <a href="#services" className="hover:text-cuivre transition-colors">
                  Nos services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cuivre transition-colors">
                  Demander un estimé
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-cuivre transition-colors">
                  Espace admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="p-6">
            <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/40">
              Contact
            </p>
            <ul className="mt-3 space-y-3 font-[family-name:var(--font-outfit)] text-xs text-[#1c1410]/55">
              <li>
                <a href="tel:+18192013214" className="flex items-center gap-2 hover:text-cuivre transition-colors">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-cuivre" />
                  (819) 201-3214
                </a>
              </li>
              <li>
                <a href="mailto:contact@eachstone.store" className="flex items-center gap-2 hover:text-cuivre transition-colors">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-cuivre" />
                  contact@eachstone.store
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-cuivre" />
                Trois-Rivières, QC
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="font-[family-name:var(--font-outfit)] text-[10px] text-[#1c1410]/30">
            &copy; {new Date().getFullYear()} Eachstone — Jean-François. Tous droits réservés.
          </p>
          <a
            href="/login"
            className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-widest text-[#1c1410]/30 hover:text-[#1c1410]/60 transition-colors"
          >
            Admin →
          </a>
        </div>
      </div>
    </footer>
  );
}
