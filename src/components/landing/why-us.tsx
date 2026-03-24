import { ScrollReveal } from "@/components/shared/scroll-reveal";

const reasons = [
  {
    num: "01",
    title: "Fiable",
    description:
      "Je me présente à l'heure, je fais le travail correctement, et je nettoie avant de partir.",
  },
  {
    num: "02",
    title: "Prix honnêtes",
    description:
      "Pas de frais cachés, pas de surprises. Vous savez exactement ce que vous payez.",
  },
  {
    num: "03",
    title: "Service humain",
    description:
      "Je traite votre maison comme si c'était la mienne. Respectueux et attentionné.",
  },
  {
    num: "04",
    title: "Disponible rapidement",
    description:
      "Besoin d'aide? Je m'organise pour vous voir le plus vite possible.",
  },
  {
    num: "05",
    title: "Estimé transparent",
    description:
      "Je passe chez vous, on regarde ensemble, et je vous donne un prix clair. Sans pression.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="landing">
      <ScrollReveal>
      <div className="mx-auto max-w-none px-6 py-20 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-cuivre">
              Pourquoi Eachstone
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight text-[#1c1410] lg:text-5xl">
              Chaque pierre compte.
            </h2>
          </div>
        </div>

        {/* Reasons grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.num}
              className="glass-card glass-hover glass-shimmer rounded-2xl p-6"
            >
              <span className="font-[family-name:var(--font-outfit)] text-xs font-bold tabular-nums text-cuivre">
                {r.num}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-bold text-[#1c1410]">
                {r.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#1c1410]/50">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
