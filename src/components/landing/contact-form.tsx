"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/actions/leads";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const initialState: LeadFormState = { success: false, error: null };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <section id="contact" className="landing">
      <ScrollReveal>
      <div className="mx-auto max-w-none px-6 py-20 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="border-b border-black/10 pb-5">
          <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-cuivre">
            Contactez-moi
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#1c1410] lg:text-5xl">
            Demandez un estimé
          </h2>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[280px_1fr]">
          {/* Left — contact info */}
          <div className="glass-card glass-shimmer rounded-2xl p-6">
            <div className="space-y-6">
              <a
                href="tel:+18192013214"
                className="group flex items-start gap-3 transition-colors"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/50 text-[#1c1410]/35 transition-colors group-hover:border-cuivre/40 group-hover:text-cuivre">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#1c1410]">
                    (819) 201-3214
                  </p>
                  <p className="font-[family-name:var(--font-outfit)] text-xs text-[#1c1410]/35 mt-0.5">
                    Texto bienvenu
                  </p>
                </div>
              </a>

              <a
                href="mailto:contact@eachstone.store"
                className="group flex items-start gap-3 transition-colors"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/50 text-[#1c1410]/35 transition-colors group-hover:border-cuivre/40 group-hover:text-cuivre">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#1c1410]">
                    contact@eachstone.store
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/50 text-[#1c1410]/35">
                  <MessageCircle className="h-3.5 w-3.5" />
                </span>
                <p className="font-[family-name:var(--font-outfit)] text-xs leading-relaxed text-[#1c1410]/35 pt-1">
                  Réponse habituelle en moins de 24 heures.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card glass-shimmer rounded-2xl p-6">
            {state.success ? (
              <div className="flex flex-col items-start justify-center py-8">
                <span className="rounded-full border border-cuivre/50 bg-cuivre/10 px-4 py-1.5 font-[family-name:var(--font-outfit)] text-xs font-bold uppercase tracking-widest text-cuivre">
                  Message reçu
                </span>
                <p className="mt-4 font-[family-name:var(--font-outfit)] text-sm text-[#1c1410]/45">
                  Je vous reviens très bientôt.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1410]/45 mb-1.5">
                      Nom complet *
                    </label>
                    <Input
                      name="name"
                      required
                      placeholder="Votre nom"
                      className="rounded-xl border border-black/12 bg-white/90 text-[#1c1410] placeholder:text-[#1c1410]/30 focus:border-cuivre/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1410]/45 mb-1.5">
                      Téléphone *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      required
                      placeholder="(819) 000-0000"
                      className="rounded-xl border border-black/12 bg-white/90 text-[#1c1410] placeholder:text-[#1c1410]/30 focus:border-cuivre/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1410]/45 mb-1.5">
                      Courriel
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="votre@courriel.ca"
                      className="rounded-xl border border-black/12 bg-white/90 text-[#1c1410] placeholder:text-[#1c1410]/30 focus:border-cuivre/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1410]/45 mb-1.5">
                    Type de service
                  </label>
                  <Select name="service_type">
                    <SelectTrigger className="rounded-xl border border-black/12 bg-white/90 text-[#1c1410]/65 focus:border-cuivre/50 focus:ring-0">
                      <SelectValue placeholder="Choisir un service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-black/12 bg-white text-[#1c1410]">
                      {SERVICE_CATEGORIES.map((s) => (
                        <SelectItem key={s.name} value={s.name} className="focus:bg-black/4 focus:text-[#1c1410]">
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1410]/45 mb-1.5">
                    Décrivez votre besoin
                  </label>
                  <Textarea
                    name="message"
                    rows={4}
                    placeholder="Décrivez le travail que vous aimeriez faire..."
                    className="rounded-xl border border-black/12 bg-white/90 text-[#1c1410] placeholder:text-[#1c1410]/30 focus:border-cuivre/50 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                  />
                </div>

                {state.error && (
                  <p className="font-[family-name:var(--font-outfit)] text-sm text-red-600">
                    {state.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-cuivre px-7 py-3.5 font-[family-name:var(--font-outfit)] text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
