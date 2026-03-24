import { ScrollReveal } from "@/components/shared/scroll-reveal";

const testimonials = [
  {
    name: "Marie-Josée Bélanger",
    location: "Trois-Rivières",
    text: "Jean-François a refait le plancher de ma cuisine pis il a réparé les moulures en même temps. Propre, pas de dégât, il a même protégé mes meubles. Le prix qu'il m'a donné au début, c'est exactement ce que j'ai payé. Ça fait du bien de tomber sur quelqu'un d'honnête.",
  },
  {
    name: "Stéphane Marchand",
    location: "Trois-Rivières",
    text: "Ma terrasse avait des planches pourries depuis deux étés. Il est venu voir, m'a donné un prix le jour même, et c'était fini en trois jours. Ça paraît neuf. Ma femme capotait tellement c'était beau. On va le rappeler pour le calfeutrage cet automne.",
  },
  {
    name: "Isabelle Roy",
    location: "Trois-Rivières",
    text: "J'avais une prise qui faisait des étincelles dans la chambre de mon gars. Jean-François est passé le lendemain matin, a tout vérifié, changé ce qu'il fallait. Il m'a expliqué le problème clairement. Vraiment rassurant, surtout quand c'est une urgence.",
  },
  {
    name: "Luc Tanguay",
    location: "Trois-Rivières",
    text: "Honnêtement, c'est rare de trouver quelqu'un qui se présente à l'heure et qui nettoie en partant. Il m'a installé trois supports TV, monté un meuble IKEA et ajusté une porte qui fermait mal. Tout ça dans le même avant-midi. Je le recommande les yeux fermés.",
  },
];

export function Testimonials() {
  return (
    <section className="landing">
      <ScrollReveal>
      <div className="mx-auto max-w-none px-6 py-20 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="border-b border-black/10 pb-5">
          <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-cuivre">
            Témoignages
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight text-[#1c1410] lg:text-5xl">
            Ce que les clients disent
          </h2>
        </div>

        {/* Quote grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card glass-hover glass-shimmer rounded-2xl p-6"
            >
              {/* Big quote mark */}
              <span
                className="font-[family-name:var(--font-syne)] text-5xl leading-none text-cuivre"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#1c1410]/60">
                {t.text}
              </blockquote>
              <div className="mt-4 border-t border-black/8 pt-4">
                <p className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#1c1410]">
                  {t.name}
                </p>
                <p className="font-[family-name:var(--font-outfit)] text-xs text-[#1c1410]/35 mt-0.5">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
