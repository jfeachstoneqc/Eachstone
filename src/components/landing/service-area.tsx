import { SERVICE_AREAS } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function ServiceArea() {
  return (
    <section className="landing">
      <ScrollReveal>
      <div className="mx-auto max-w-none border-b border-black/8 px-6 py-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-[family-name:var(--font-outfit)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1410]/40 shrink-0">
            Zone desservie
          </p>
          <div className="h-4 w-px bg-black/12 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="border border-black/10 bg-white/50 text-[#1c1410]/55 backdrop-blur-sm rounded-full px-3 py-1 font-[family-name:var(--font-outfit)] text-xs font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
