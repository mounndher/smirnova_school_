"use client";

import { useEffect, useMemo, useState } from "react";
import { galleryCategories, galleryItems, type GalleryItem } from "@/lib/mock/content";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [category, setCategory] = useState("Tout");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = useMemo(() => (category === "Tout" ? galleryItems : galleryItems.filter((item) => item.category === category)), [category]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-12">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {galleryCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={cn(
              "shrink-0 border px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-500",
              category === item ? "border-ink bg-ink text-milk" : "border-line hover:border-powder hover:bg-blush-deep",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className={cn(
              "zoom-frame group relative overflow-hidden border border-line-soft text-left",
              item.span === "tall" && "row-span-2",
              item.span === "wide" && "col-span-2",
            )}
          >
            <img src={item.src} alt={item.caption} loading="lazy" decoding="async" className="h-full w-full object-cover saturate-[.85] group-hover:saturate-100" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-milk/92 px-4 py-3 backdrop-blur-sm">
              <span className="text-[0.68rem] leading-tight">{item.caption}</span>
              <span className="text-[0.52rem] uppercase tracking-[0.16em] text-deep">{item.category}</span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/92 px-4 py-10"
          style={{ animation: "bms-soft-in .4s ease both" }}
          onClick={() => setActive(null)}
        >
          <img src={active.src} alt={active.caption} className="max-h-[74vh] w-auto max-w-full object-contain" />
          <div className="mt-6 flex items-center gap-5 text-milk">
            <span className="text-[0.58rem] uppercase tracking-[0.2em] text-rose-soft">{active.category}</span>
            <span className="text-[0.85rem]">{active.caption}</span>
          </div>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="mt-7 border border-white/40 px-6 py-3 text-[0.6rem] uppercase tracking-[0.2em] text-milk transition-colors duration-500 hover:bg-white/10"
          >
            Fermer
          </button>
        </div>
      )}
    </section>
  );
}
