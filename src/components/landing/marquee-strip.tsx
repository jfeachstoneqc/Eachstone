const items = [
  "RÉNOVATION",
  "RÉPARATION",
  "ENTRETIEN",
  "MENUISERIE",
  "ÉLECTRICITÉ",
  "ASSEMBLAGE",
  "URGENCES",
  "10+ ANS D'EXPÉRIENCE",
  "TROIS-RIVIÈRES",
];

export function MarqueeStrip() {
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-black/6 py-4 select-none">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-[family-name:var(--font-syne)] text-sm font-bold uppercase tracking-[0.15em] text-[#1c1410]/12 whitespace-nowrap">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-lapis/20 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
