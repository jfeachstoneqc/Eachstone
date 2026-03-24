"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pourquoi nous", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      const el = headerRef.current;
      if (!el) return;
      if (window.scrollY > 50) {
        el.classList.add("nav-scrolled");
      } else {
        el.classList.remove("nav-scrolled");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="landing sticky top-0 z-50 border-b border-black/8 bg-white lg:bg-white/65 lg:backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-none items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="/" className="text-[#1c1410]">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-l border-black/8 px-5 py-4 font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#1c1410]/55 transition-colors hover:text-[#1c1410]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+18192013214"
            className="ml-0 border-l border-black/8 bg-cuivre px-5 py-4 font-[family-name:var(--font-outfit)] text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            819-201-3214
          </a>
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button aria-label="Menu" className="text-[#1c1410] p-1">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 rounded-none bg-white/95 border-l border-black/8 p-0">
            <nav className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/8 px-6 py-5 font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase tracking-widest text-[#1c1410]/60 hover:text-[#1c1410]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+18192013214"
                className="bg-cuivre px-6 py-5 font-[family-name:var(--font-outfit)] text-sm font-bold uppercase tracking-widest text-white"
              >
                819-201-3214
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
