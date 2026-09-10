import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "rose" | "ghost" | "light";

const base =
  "inline-flex items-center justify-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "border border-ink bg-ink text-milk hover:border-deep hover:bg-deep",
  outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-blush-deep",
  rose: "border border-deep bg-deep text-white hover:border-ink hover:bg-ink",
  ghost: "border border-transparent text-ink hover:border-line hover:bg-blush",
  light: "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10",
};

const sizes = {
  sm: "min-h-[38px] px-4",
  md: "min-h-[46px] px-6",
  lg: "min-h-[52px] px-8",
} as const;

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Button({ children, href, variant = "primary", size = "md", className, type = "button", disabled, onClick, ariaLabel }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href && !disabled) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function Eyebrow({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <p className={cn("text-[0.62rem] font-semibold uppercase tracking-[0.28em]", tone === "light" ? "text-white/70" : "text-muted", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-5 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92] uppercase",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
        {accent ? (
          <>
            {" "}
            <em className={cn("italic", tone === "light" ? "text-rose-soft" : "text-deep")}>{accent}</em>
          </>
        ) : null}
      </h2>
      {intro ? <p className={cn("mt-6 text-[0.95rem] leading-relaxed", tone === "light" ? "text-white/70" : "text-muted")}>{intro}</p> : null}
    </div>
  );
}

export function Badge({ children, tone = "blush", className }: { children: ReactNode; tone?: "blush" | "ink" | "rose" | "muted" | "success"; className?: string }) {
  const tones = {
    blush: "bg-blush-deep text-char",
    ink: "bg-ink text-milk",
    rose: "bg-deep text-white",
    muted: "border border-line text-muted",
    success: "bg-[#e4efe7] text-[#2f5741]",
  } as const;
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em]", tones[tone], className)}>{children}</span>;
}

export function KeyValue({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className={cn("border-b border-line-soft py-4", className)}>
      <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="mt-1.5 font-display text-[1.15rem] leading-tight">{value}</dd>
    </div>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} />;
}

export function Field({ label, children, hint, className }: { label: string; children: ReactNode; hint?: string; className?: string }) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">{label}</span>
      {children}
      {hint ? <span className="text-[0.7rem] text-muted">{hint}</span> : null}
    </label>
  );
}

export function Paper({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border border-line-soft bg-ivory p-7 sm:p-9", className)}>{children}</div>;
}
