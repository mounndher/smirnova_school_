"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Subtle scroll-reveal wrapper (IntersectionObserver, respects reduced motion). */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "scale";
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(variant === "scale" ? "reveal-scale" : "reveal", className)}
    >
      {children}
    </Tag>
  );
}
