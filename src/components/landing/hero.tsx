import { ArrowRight, Banknote, CreditCard, Smartphone } from "lucide-react";

export function Hero() {
  return (
    <section className="landing relative overflow-hidden">
      {/* CSS-only floating shapes — zero JS, zero lag */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {/* Large lapis circle — slow drift */}
        <div className="absolute right-[8%] top-[12%] h-[340px] w-[340px] rounded-full bg-lapis/[0.07] blur-[1px] animate-[hero-float_14s_ease-in-out_infinite]" />
        {/* Medium ring */}
        <div className="absolute right-[5%] top-[8%] h-[420px] w-[420px] rounded-full border border-lapis/[0.12] animate-[hero-float_18s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative z-10 mx-auto max-w-none px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-20">
          {/* Left — main content */}
          <div className="hero-stagger">
            {/* Eyebrow */}
            <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-cuivre">
              Trois-Rivières &amp; environs
            </p>

            {/* Heading */}
            <h1 className="mt-5 font-[family-name:var(--font-syne)] text-5xl font-bold leading-[1.05] tracking-tight text-[#1c1410] sm:text-6xl lg:text-7xl xl:text-8xl">
              Jean-François,{" "}
              <em className="not-italic text-cuivre">votre homme</em>{" "}
              à tout faire.
            </h1>

            {/* Sub */}
            <p className="mt-6 max-w-xl font-[family-name:var(--font-outfit)] text-base leading-relaxed text-[#1c1410]/55 lg:text-lg">
              Plus de 10 ans d&apos;expérience en rénovation, réparation et entretien.
              Travail soigné, prix honnêtes. Écrivez-moi — je vous reviens rapidement.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-cuivre px-7 py-4 font-[family-name:var(--font-outfit)] text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              >
                Demandez un estimé
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border-2 border-black/20 px-7 py-4 font-[family-name:var(--font-outfit)] text-sm font-bold uppercase tracking-widest text-[#1c1410]/60 transition-colors hover:border-black/40 hover:text-[#1c1410]"
              >
                Nos services
              </a>
            </div>

            {/* Payment */}
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-black/8 pt-6">
              <span className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/35">
                Paiement
              </span>
              {[
                { icon: Banknote, label: "Comptant" },
                { icon: CreditCard, label: "Chèque" },
                { icon: Smartphone, label: "Interac" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 font-[family-name:var(--font-outfit)] text-xs font-medium text-[#1c1410]/55"
                >
                  <Icon className="h-3.5 w-3.5 text-cuivre" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — info panel (desktop only) */}
          <div className="hidden lg:flex lg:flex-col lg:justify-between lg:pl-10">
            {/* Info panel */}
            <div className="rounded-2xl border border-black/8 bg-white/70 p-6 shadow-lg backdrop-blur-md">
              <div className="space-y-6">
                <div>
                  <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/35">
                    Services
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-syne)] text-4xl font-bold text-lapis">
                    7
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/35">
                    Zone
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-outfit)] text-sm font-semibold leading-snug text-[#1c1410]/70">
                    Trois-Rivières<br />et environs
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/35">
                    Réponse
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#1c1410]/70">
                    En moins de 24 h
                  </p>
                </div>
              </div>

              <a
                href="tel:+18192013214"
                className="mt-6 block rounded-xl border border-lapis/30 bg-lapis/10 px-4 py-3 text-center font-[family-name:var(--font-outfit)] text-sm font-bold tracking-wider text-lapis backdrop-blur-md transition-colors hover:bg-lapis hover:text-white"
              >
                819-201-3214
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
