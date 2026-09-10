import Link from "next/link";
import { footerColumns, legalLinks, school } from "@/lib/mock/site";

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-cream">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex flex-col leading-[1.05]">
              <span className="text-[0.7rem] font-semibold tracking-[0.34em]">SMIRNOVA</span>
              <span className="text-[0.7rem] font-semibold tracking-[0.34em] text-deep">SCHOOL</span>
            </Link>
            <p className="mt-7 max-w-sm font-display text-[1.6rem] leading-tight">
              Académie professionnelle de manucure, à {school.city} et à l’international.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#formations"
                className="inline-flex min-h-[46px] items-center border border-ink bg-ink px-6 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
              >
                Réserver une formation
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center border border-ink/25 px-6 text-[0.64rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
              >
                Contacter l’académie
              </Link>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-[0.82rem] text-char transition-colors duration-300 hover:text-deep">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted">Académie</p>
            <ul className="mt-5 space-y-3 text-[0.82rem] text-char">
              <li>{school.address}</li>
              <li>
                <a href={`mailto:${school.email}`} className="transition-colors duration-300 hover:text-deep">
                  {school.email}
                </a>
              </li>
              <li>
                <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="transition-colors duration-300 hover:text-deep">
                  {school.phone}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${school.instagram.replace("@", "")}`} target="_blank" rel="noreferrer noopener" className="transition-colors duration-300 hover:text-deep">
                  Instagram {school.instagram}
                </a>
              </li>
            </ul>
            <ul className="mt-6 space-y-2 border-t border-line-soft pt-5 text-[0.72rem] text-muted">
              {school.hours.map((slot) => (
                <li key={slot.label} className="flex justify-between gap-4">
                  <span>{slot.label}</span>
                  <span>{slot.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line-soft pt-8 text-[0.62rem] uppercase tracking-[0.16em] text-muted lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Smirnova School · Tous droits réservés</p>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors duration-300 hover:text-deep">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="flex gap-3">
            {school.languages.map((language, index) => (
              <span key={language} className={index === 0 ? "text-ink" : ""}>
                {language}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
