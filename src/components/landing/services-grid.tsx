"use client";

import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/* Custom SVG icons — more refined than Lucide defaults */
const serviceIcons: Record<string, ReactNode> = {
  Paintbrush: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M18.37 2.63a1.5 1.5 0 0 1 2.12 0l.88.88a1.5 1.5 0 0 1 0 2.12L14 13 11 10l7.37-7.37Z" />
      <path d="M11 10L9.5 11.5c-1.5 1.5-4 1.5-4 1.5s0-2.5 1.5-4L8.5 7.5" />
      <path d="M5 16l-2.5 2.5a2 2 0 0 0 2.83 2.83L8 18.83" />
    </svg>
  ),
  Home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h3v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5h3a1 1 0 0 0 1-1V9.5" />
    </svg>
  ),
  Zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  ),
  Hammer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
      <path d="M17.64 15L22 10.64" />
      <path d="m20.91 11.7-1.25-1.25a2 2 0 0 0-1.4-.59H16.5l-2-2 1.5-1.5a2 2 0 0 0 0-2.83l-1-1" />
      <path d="m8 8 3 3" />
    </svg>
  ),
  Wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </svg>
  ),
  Snowflake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 2v20M17 7l-5 5-5-5M17 17l-5-5-5 5M2 12h20M7 7l5 5 5-5" opacity="0" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <polyline points="16 6 12 2 8 6" />
      <polyline points="8 18 12 22 16 18" />
      <polyline points="2 12 6 8" />
      <polyline points="22 12 18 8" />
      <polyline points="2 12 6 16" />
      <polyline points="22 12 18 16" />
    </svg>
  ),
  AlertTriangle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

function handleServiceClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ServicesGrid() {
  return (
    <section id="services" className="landing">
      <ScrollReveal>
      <div className="mx-auto max-w-none px-6 py-20 lg:px-10 lg:py-24">
        {/* Header row */}
        <div className="flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-cuivre">
              Ce qu&apos;on fait
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight text-[#1c1410] lg:text-5xl">
              Nos services
            </h2>
          </div>
          <p className="hidden font-[family-name:var(--font-outfit)] text-sm text-[#1c1410]/35 sm:block">
            7 spécialités
          </p>
        </div>

        {/* Service rows */}
        <div>
          {SERVICE_CATEGORIES.map((service, i) => {
            const icon = serviceIcons[service.icon];
            const num = String(i + 1).padStart(2, "0");
            return (
              <a
                key={service.name}
                href="#contact"
                onClick={handleServiceClick}
                className="service-row group flex items-center gap-6 border-b border-black/6 px-0 py-5 last:border-b last:border-black/10 sm:gap-8 transition-all duration-200"
              >
                {/* Number */}
                <span className="row-num shrink-0 font-[family-name:var(--font-outfit)] text-sm font-bold tabular-nums text-[#1c1410]/22 transition-colors duration-200">
                  {num}
                </span>

                {/* Icon */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/50 text-[#1c1410]/35 transition-all duration-200 group-hover:border-cuivre/40 group-hover:text-cuivre group-hover:bg-cuivre/5 group-hover:scale-110">
                  {icon}
                </span>

                {/* Name + description */}
                <div className="min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1">
                  <p className="font-[family-name:var(--font-outfit)] text-base font-semibold text-[#1c1410] sm:text-lg">
                    {service.name}
                  </p>
                  <p className="font-[family-name:var(--font-outfit)] text-sm text-[#1c1410]/45">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="row-arrow h-4 w-4 shrink-0 text-[#1c1410]/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cuivre" />
              </a>
            );
          })}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
