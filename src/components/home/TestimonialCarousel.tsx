"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui";
import type { Testimonial } from "@/lib/mock/content";
import { cn, initials } from "@/lib/utils";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(items.length - 1, next));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setIndex(clamped);
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const closest = children.reduce((best, child, i) => (Math.abs(child.offsetLeft - track.scrollLeft - track.offsetLeft) < best.distance ? { i, distance: Math.abs(child.offsetLeft - track.scrollLeft - track.offsetLeft) } : best), { i: 0, distance: Number.POSITIVE_INFINITY });
      setIndex(closest.i);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <ul
        ref={trackRef}
        className="no-scrollbar snap-row -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[85vw] shrink-0 border border-line-soft bg-ivory p-7 sm:w-[60vw] lg:w-[calc((100%-3.75rem)/3.4)]"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-blush-deep font-display text-[1.05rem] text-deep">
                {initials(item.name)}
              </span>
              <div>
                <p className="font-display text-[1.2rem] leading-tight">{item.name}</p>
                <p className="text-[0.72rem] text-muted">
                  {item.role} · {item.city}
                </p>
              </div>
            </div>
            <p className="mt-6 text-[0.92rem] leading-relaxed text-char">“{item.quote}”</p>
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line-soft pt-5">
              <Badge tone="blush">{item.formation}</Badge>
              <span className="text-[0.7rem] text-muted">{item.instagram}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Témoignage ${i + 1}`}
              aria-current={i === index}
              onClick={() => scrollTo(i)}
              className={cn("h-[3px] transition-all duration-500", i === index ? "w-10 bg-deep" : "w-5 bg-line hover:bg-powder")}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollTo(index - 1)}
            aria-label="Témoignage précédent"
            className="grid h-11 w-11 place-items-center border border-line transition-all duration-500 hover:border-ink hover:bg-blush-deep"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollTo(index + 1)}
            aria-label="Témoignage suivant"
            className="grid h-11 w-11 place-items-center border border-line transition-all duration-500 hover:border-ink hover:bg-blush-deep"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
