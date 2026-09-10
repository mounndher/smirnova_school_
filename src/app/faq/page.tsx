import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { faqs } from "@/lib/mock/content";
import { school } from "@/lib/mock/site";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Niveaux, prérequis, matériel, attestation, paiement et liste d’attente : toutes les réponses sur les formations Smirnova School.",
  alternates: { canonical: "/faq" },
};

const grouped = [
  { title: "Niveaux & prérequis", items: faqs.slice(0, 3) },
  { title: "Matériel & certification", items: faqs.slice(3, 5) },
  { title: "Réservation & paiement", items: faqs.slice(5, 8) },
  { title: "Liste d’attente & annulation", items: faqs.slice(8) },
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1500px] px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-24 lg:pb-16">
          <Reveal>
            <Eyebrow>Nous vous répondons</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5.4rem)] leading-[0.9] uppercase">
              Questions
              <em className="block text-deep">fréquentes</em>
            </h1>
            <p className="mt-8 max-w-2xl text-[1rem] leading-relaxed text-char">
              Tout ce qu’il faut savoir avant de réserver : niveau requis, matériel fourni, déroulé du paiement et gestion des places.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[120px]">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted">Sommaire</p>
              <ul className="mt-5 space-y-3">
                {grouped.map((group) => (
                  <li key={group.title}>
                    <a href={`#${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="text-[0.72rem] uppercase tracking-[0.16em] text-char transition-colors duration-300 hover:text-deep">
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-9 border border-line-soft bg-blush p-6">
                <p className="font-display text-[1.4rem] leading-tight">Une question précise ?</p>
                <p className="mt-3 text-[0.82rem] text-muted">
                  L’équipe répond sous 48 heures ouvrées, par email ou téléphone.
                </p>
                <ul className="mt-4 space-y-2 text-[0.8rem]">
                  <li>
                    <a href={`mailto:${school.email}`} className="text-deep underline decoration-line underline-offset-4">
                      {school.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="text-deep underline decoration-line underline-offset-4">
                      {school.phone}
                    </a>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-[46px] items-center border border-ink bg-ink px-6 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
                >
                  Contacter l’académie
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-14">
            {grouped.map((group, index) => (
              <Reveal key={group.title} delay={index * 70}>
                <section id={group.title.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
                  <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight uppercase">{group.title}</h2>
                  <div className="mt-6">
                    <Accordion items={group.items} defaultOpen={index === 0 ? 0 : null} />
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line-soft bg-blush">
        <div className="mx-auto max-w-[1100px] px-5 py-20 text-center sm:px-8 lg:py-24">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5.4vw,3.8rem)] leading-[0.95] uppercase">Prête à réserver ?</h2>
            <p className="mx-auto mt-5 max-w-xl text-[0.95rem] text-char">
              Les sessions se remplissent vite, notamment les formations avancées limitées à six participantes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#formations"
                className="inline-flex min-h-[50px] items-center justify-center border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-rose hover:bg-rose"
              >
                Réserver une formation
              </Link>
              <Link
                href="/planning"
                className="inline-flex min-h-[50px] items-center justify-center border border-ink/30 px-8 text-[0.64rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-milk"
              >
                Voir le planning
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
