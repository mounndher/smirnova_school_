import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Eyebrow>Erreur 404</Eyebrow>
        <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5rem)] leading-[0.9] uppercase">
          Page
          <em className="block text-deep">introuvable</em>
        </h1>
        <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-char">
          La page demandée n’existe plus ou a été déplacée. Retrouvez les formations, le planning des sessions ou contactez directement l’académie.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/formations"
            className="inline-flex min-h-[48px] items-center justify-center border border-ink bg-ink px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
          >
            Voir les formations
          </Link>
          <Link href="/" className="inline-flex min-h-[48px] items-center justify-center border border-ink/25 px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep">
            Retour à l’accueil
          </Link>
        </div>
      </div>
      <ul className="grid gap-3 lg:col-span-5 lg:col-start-8">
        {[
          { href: "/planning", label: "Planning des sessions" },
          { href: "/academy", label: "L’académie" },
          { href: "/gallery", label: "Galerie de réalisations" },
          { href: "/faq", label: "Questions fréquentes" },
          { href: "/contact", label: "Contacter l’académie" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-between border border-line-soft bg-ivory px-5 py-4 text-[0.72rem] uppercase tracking-[0.16em] transition-all duration-500 hover:border-powder hover:bg-blush"
            >
              {link.label}
              <span aria-hidden className="text-deep">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
