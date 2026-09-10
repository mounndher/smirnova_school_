"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: string };

export function Accordion({ items, defaultOpen = 0, className }: { items: AccordionItem[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-line-soft border-y border-line-soft", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start gap-5 py-6 text-left"
              >
                <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] text-deep">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-[1.35rem] leading-snug transition-colors duration-300 group-hover:text-deep">{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-sm transition-all duration-500",
                    isOpen ? "rotate-45 border-deep bg-deep text-white" : "group-hover:border-deep",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={cn("grid transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pl-9 text-[0.92rem] leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
