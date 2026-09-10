import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { FormationExplorer } from "@/components/formations/FormationExplorer";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { faqs } from "@/lib/mock/content";
import { formations } from "@/lib/mock/formations";
import { internationalSessions, sessionsByFormation } from "@/lib/mock/planning";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Formations professionnelles en manucure",
  description:
    "Catalogue des formations Smirnova School : manucure à la cire, manucure russe, nail architecture et beauté des mains. Tarifs, niveaux et prochaines dates.",
  alternates: { canonical: "/formations" },
};

export default function FormationsPage() {
  const cheapest = Math.min(...formations.map((formation) => formation.price));
  const sessions = internationalSessions();

  const courses = {
    "@context": "https://schema.org",
    "@graph": formations.map((formation) => ({
      "@type": "Course",
      name: formation.title,
      description: formation.short,
      provider: { "@type": "EducationalOrganization", name: "Smirnova School" },
      offers: { "@type": "Offer", price: formation.price, priceCurrency: "EUR", category: formation.level },
      hasCourseInstance: sessionsByFormation(formation.slug).map((session) => ({
        "@type": "CourseInstance",
        courseMode: "Onsite",
        startDate: session.start,
        location: { "@type": "Place", name: session.venue, address: `${session.city}, ${session.country}` },
      })),
    })),
  };

  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1500px] px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-24 lg:pb-16">
          <Reveal>
            <Eyebrow>Catalogue professionnel</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5.6rem)] leading-[0.9] uppercase">
              Nos
              <em className="block text-deep">formations</em>
            </h1>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl text-[1rem] leading-relaxed text-char">
                Choisissez la formation qui correspond à votre niveau et à vos objectifs. Tarifs à partir de {formatPrice(cheapest)}, sessions en France et à l’international.
              </p>
              <dl className="flex flex-wrap gap-8">
                {[
                  ["Programmes", String(formations.length)],
                  ["Sessions à venir", String(sessionsByFormation(formations[0].slug).length + internationalSessions().length)],
                  ["Groupe", "6 à 8 personnes"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</dt>
                    <dd className="mt-1 font-display text-[1.55rem] leading-none">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mt-12">
        <FormationExplorer formations={formations} />
      </div>

      <section className="border-y border-line-soft bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[0.95] uppercase">Questions avant de réserver</h2>
                <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">
                  Une question sur un prérequis, une session internationale ou un format intra-institut ? L’académie vous répond sous 48 heures.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex min-h-[46px] items-center border border-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:bg-blush-deep"
                >
                  Contacter l’académie
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={80}>
                <Accordion items={faqs.slice(0, 5)} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courses) }} />
    </>
  );
}
