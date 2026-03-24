import { Phone, FileText, Hammer, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const steps = [
  {
    icon: Phone,
    num: "01",
    title: "Appelez ou écrivez",
    description:
      "Texto, courriel ou formulaire — décrivez-moi ce dont vous avez besoin.",
  },
  {
    icon: FileText,
    num: "02",
    title: "Visite d'estimé",
    description:
      "Je passe chez vous, on regarde ensemble, et je vous donne un prix clair.",
  },
  {
    icon: Hammer,
    num: "03",
    title: "Travail effectué",
    description:
      "Je fais le travail proprement, dans les délais convenus.",
  },
  {
    icon: CreditCard,
    num: "04",
    title: "Payez comme vous voulez",
    description:
      "Comptant, chèque ou virement Interac — c'est vous qui choisissez.",
  },
];

export function HowItWorks() {
  return (
    <section className="landing">
      <ScrollReveal>
      <div className="mx-auto max-w-none px-6 py-20 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="border-b border-black/10 pb-5">
          <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-cuivre">
            Le processus
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#1c1410] lg:text-5xl">
            Comment ça marche
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`glass-card glass-hover glass-shimmer rounded-2xl p-6 ${["anim-in", "anim-in-2", "anim-in-3", "anim-in-3"][i]}`}
            >
              <step.icon className="h-5 w-5 text-cuivre" />
              <p className="mt-4 font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/35">
                Étape {step.num}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-outfit)] text-base font-semibold text-[#1c1410]">
                {step.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#1c1410]/50">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
