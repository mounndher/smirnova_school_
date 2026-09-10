"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, school } from "@/lib/mock/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
          scrolled || open ? "border-b border-line-soft bg-milk/95 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[88px] lg:px-12">
          <Link href="/" className="group flex shrink-0 flex-col leading-[1.05]" aria-label="Smirnova School — accueil">
            <span className="text-[0.66rem] font-semibold tracking-[0.34em] text-ink transition-colors duration-500 group-hover:text-deep">SMIRNOVA</span>
            <span className="text-[0.66rem] font-semibold tracking-[0.34em] text-deep">SCHOOL</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "underline-lux text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                    active ? "text-deep" : "text-char hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={school.storeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-deep xl:block"
            >
              Boutique ↗
            </a>
            <Link
              href="/#formations"
              className="hidden min-h-[42px] items-center border border-ink bg-ink px-6 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep sm:inline-flex"
            >
              Réserver
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border border-line-soft lg:hidden"
            >
              <span className={cn("h-px w-5 bg-ink transition-transform duration-500", open && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("h-px w-5 bg-ink transition-transform duration-500", open && "-translate-y-[3.5px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile navigation */}
      <div
        id="menu-mobile"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-blush pt-[86px] transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-6">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline gap-4 border-b border-line-soft py-4 transition-transform duration-500"
              style={{ transform: open ? "none" : "translateY(14px)", transitionDelay: open ? `${index * 45}ms` : "0ms" }}
            >
              <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-deep">0{index + 1}</span>
              <span className="font-display text-[2.1rem] leading-none uppercase">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-line-soft px-6 py-6">
          <div className="grid grid-cols-1 gap-3">
            <Link href="/faq" className="border border-ink/20 px-4 py-3 text-center text-[0.6rem] font-medium uppercase tracking-[0.18em]">
              FAQ
            </Link>
          </div>
          <div className="mt-5 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.16em] text-muted">
            <span>{school.city} · International</span>
            <a href={school.storeUrl} target="_blank" rel="noreferrer noopener">
              Boutique ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
