"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { school } from "@/lib/mock/site";

export function MobileBar() {
  const pathname = usePathname();
  const hidden = pathname.startsWith("/formations/") || pathname.startsWith("/confirmation");
  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-milk/95 backdrop-blur-md sm:hidden">
      <div className="flex items-stretch">
        <Link href="/#formations" className="flex flex-1 items-center justify-between px-5 py-4">
          <span className="flex flex-col leading-tight">
            <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">Prochaine session</span>
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em]">Réserver une formation</span>
          </span>
          <span aria-hidden className="font-display text-xl text-deep">
            →
          </span>
        </Link>
        <a
          href={`tel:${school.phone.replace(/\s/g, "")}`}
          aria-label={`Appeler l’académie au ${school.phone}`}
          className="flex w-16 items-center justify-center border-l border-line-soft bg-blush-deep text-[0.58rem] font-medium uppercase tracking-[0.14em]"
        >
          Appeler
        </a>
      </div>
    </div>
  );
}
