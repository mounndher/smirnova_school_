import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/Accordion";
import { FormationCard } from "@/components/formations/FormationCard";
import { FormationReservation } from "@/components/formations/FormationReservation";
import { Reveal } from "@/components/Reveal";
import { Badge, Eyebrow, KeyValue } from "@/components/ui";
import { formations, getFormation, relatedFormations } from "@/lib/mock/formations";
import { isFull, seatsLeft, sessionsByFormation, totalSeats } from "@/lib/mock/planning";
import { school } from "@/lib/mock/site";
import { formatDateLong, formatPrice, formatTimeRange, formatWeekday } from "@/lib/utils";

export function generateStaticParams() {
  return formations.map((formation) => ({ slug: formation.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formation = getFormation(slug);
  if (!formation) return {};
  return {
    title: `Formation ${formation.title}`,
    description: formation.short,
    alternates: { canonical: `/formations/${formation.slug}` },
    openGraph: { title: `${formation.title} · Smirnova School`, description: formation.short, images: [{ url: formation.image }] },
  };
}

const sectionNav = [
  ["#description", "Description"],
  ["#programme", "Programme"],
  ["#objectifs", "Objectifs"],
  ["#materiel", "Matériel"],
  ["#pratique", "Informations pratiques"],
  ["#sessions", "Sessions"],
  ["#reservation", "Réservation & paiement"],
  ["#faq", "FAQ"],
] as const;

export default async function FormationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formation = getFormation(slug);
  if (!formation) notFound();

  const sessions = sessionsByFormation(formation.slug);
  const next = sessions[0];
  const related = relatedFormations(formation.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formation.title,
    description: formation.short,
    provider: { "@type": "EducationalOrganization", name: "Smirnova School", founder: { "@type": "Person", name: school.founder } },
    timeRequired: `PT${formation.hours}H`,
    educationalLevel: formation.level,
    offers: { "@type": "Offer", price: formation.price, priceCurrency: "EUR", availability: next && seatsLeft(next) > 0 ? "https://schema.org/InStock" : "https://schema.org/Waitlist" },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
      { "@type": "ListItem", position: 2, name: "Formations", item: "/formations" },
      { "@type": "ListItem", position: 3, name: formation.title, item: `/formations/${formation.slug}` },
    ],
  };

  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1500px] px-5 pt-10 sm:px-8 lg:px-12">
          <nav aria-label="Fil d’Ariane" className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="hover:text-deep">
              Accueil
            </Link>
            <span aria-hidden> / </span>
            <Link href="/formations" className="hover:text-deep">
              Formations
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ink">{formation.title}</span>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12 lg:py-16">
          <Reveal variant="scale" className="lg:col-span-6">
            <div className="zoom-frame border border-line-soft">
              <img src={formation.image} alt={`Formation ${formation.title} — ${formation.category}`} className="aspect-4/3 w-full object-cover saturate-[.9]" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {formation.gallery.slice(1, 4).map((source) => (
                <div key={source} className="zoom-frame border border-line-soft">
                  <img src={source} alt={`Détail de la formation ${formation.title}`} loading="lazy" className="aspect-4/3 w-full object-cover saturate-[.85]" />
                </div>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{formation.category} · {formation.format}</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92] uppercase">{formation.title}</h1>
              <p className="mt-5 text-[1rem] leading-relaxed text-char">{formation.short}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Badge tone="blush">{formation.level}</Badge>
                <Badge tone="blush">{formation.duration}</Badge>
                <Badge tone="muted">{formation.instructor}</Badge>
              </div>

              <dl className="mt-9 grid grid-cols-2 gap-x-8 border-t border-line-soft">
                <KeyValue label="Tarif" value={formatPrice(next?.price ?? formation.price)} />
                <KeyValue label="Acompte" value={formatPrice(formation.deposit)} />
                <KeyValue label="Prochaine session" value={next ? formatDateLong(next.start) : "À programmer"} />
                <KeyValue label="Lieu" value={next ? `${next.city}, ${next.country}` : "À confirmer"} />
                <KeyValue
                  label="Places disponibles"
                  value={next ? (seatsLeft(next) === 0 ? "Complet — liste d’attente" : `${seatsLeft(next)} sur ${totalSeats(next)}`) : "—"}
                />
                <KeyValue label="Attestation" value="Remise sur place" />
              </dl>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {next ? (
                  <>
                    <Link
                      href="#reservation"
                      className="inline-flex min-h-[52px] items-center justify-center border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
                    >
                      {isFull(next) ? "Rejoindre la liste d’attente" : "Réserver ma place"}
                    </Link>
                    <Link
                      href={`/planning?formation=${formation.slug}`}
                      className="inline-flex min-h-[52px] items-center justify-center border border-ink/25 px-8 text-[0.64rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
                    >
                      Autres dates
                    </Link>
                  </>
                ) : (
                  <Link href="/contact" className="inline-flex min-h-[52px] items-center justify-center border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-milk">
                    Être informée des dates
                  </Link>
                )}
              </div>
              <p className="mt-5 flex flex-wrap items-center gap-2 text-[0.72rem] text-muted">
                <span>Paiement intégral ou acompte ·</span>
                <span className="inline-flex h-5 items-center rounded-[3px] bg-[#635bff] px-1.5 text-[0.55rem] font-semibold text-white">stripe</span>
                <span className="inline-flex h-5 items-center rounded-[3px] bg-[#003087] px-1.5 text-[0.55rem] font-semibold text-white">
                  Pay<span className="text-[#009cde]">Pal</span>
                </span>
                <span>· annulation gratuite jusqu’à 14 jours</span>
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Sommaire de la formation" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[120px]">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted">Sommaire</p>
              <ul className="mt-5 space-y-3">
                {sectionNav.map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-[0.7rem] uppercase tracking-[0.16em] text-char transition-colors duration-300 hover:text-deep">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border border-line-soft bg-blush p-5 text-[0.75rem] text-char">
                <p className="font-medium">Groupe limité</p>
                <p className="mt-2 text-muted">6 à 8 participantes par session, avec poste de travail individuel.</p>
              </div>
            </div>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            <section id="description" className="scroll-mt-28 border-t border-line-soft py-10 first:border-0 first:pt-0">
              <h2 className="font-display text-[2rem] uppercase">Description</h2>
              {formation.description.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>

            <section id="programme" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Programme</h2>
              <ol className="mt-7 space-y-8">
                {formation.program.map((module, index) => (
                  <li key={module.title} className="relative border-l border-line pl-7">
                    <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-deep" />
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-deep">Module {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-[1.5rem] leading-tight">{module.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {module.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.88rem] text-char">
                          <span aria-hidden className="text-rose">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section id="objectifs" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Objectifs pédagogiques</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {formation.objectives.map((objective) => (
                  <li key={objective} className="border border-line-soft bg-ivory p-4 text-[0.86rem]">
                    {objective}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-display text-[1.6rem] uppercase">Techniques enseignées</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {formation.techniques.map((technique) => (
                  <li key={technique}>
                    <Badge tone="blush">{technique}</Badge>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-[1.6rem] uppercase">Prérequis</h3>
                  <ul className="mt-4 space-y-2 text-[0.88rem] text-char">
                    {formation.prerequisites.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="text-rose">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-[1.6rem] uppercase">Ce que vous recevez</h3>
                  <ul className="mt-4 space-y-2 text-[0.88rem] text-char">
                    {formation.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="text-deep">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="materiel" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Matériel</h2>
              <p className="mt-4 text-[0.92rem] text-muted">Le matériel professionnel est prêté pendant la formation. Les éléments ci-dessous sont utilisés et expliqués en détail.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {formation.materials.map((item) => (
                  <li key={item} className="border border-line-soft bg-ivory p-4 text-[0.86rem]">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border border-line-soft bg-blush p-6">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">Certification</p>
                <p className="mt-3 text-[0.92rem] text-char">{formation.certification}</p>
              </div>
            </section>

            <section id="pratique" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Informations pratiques</h2>
              <dl className="mt-6">
                <KeyValue label="Formatrice" value={formation.instructor} />
                <KeyValue label="Format" value={formation.format} />
                <KeyValue label="Durée" value={formation.duration} />
                <KeyValue label="Adresse de l’académie" value={school.address} />
                <KeyValue label="Accueil" value="15 minutes avant le début de la session" />
                <KeyValue label="Contact" value={`${school.email} · ${school.phone}`} />
              </dl>
            </section>

            <section id="sessions" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Sessions programmées</h2>
              {sessions.length ? (
                <ul className="mt-7 space-y-4">
                  {sessions.map((session) => {
                    const seats = seatsLeft(session);
                    return (
                      <li key={session.id} className="grid gap-4 border border-line-soft bg-ivory p-5 sm:grid-cols-12 sm:items-center">
                        <div className="sm:col-span-4">
                          <p className="font-display text-[1.3rem] leading-tight">{formatDateLong(session.start)}</p>
                          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                            {formatWeekday(session.start)} · {session.type}
                          </p>
                        </div>
                        <div className="text-[0.82rem] sm:col-span-4">
                          {session.venue}
                          <span className="mt-0.5 block text-muted">
                            {session.city}, {session.country}
                          </span>
                          <span className="mt-1 block text-muted">
                            {session.slots.map((slot) => formatTimeRange(slot.start, slot.end)).join(" · ")}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <p className={seats === 0 ? "font-display text-[1.1rem] text-deep" : "font-display text-[1.1rem]"}>{seats === 0 ? "Complet" : `${seats} places`}</p>
                          <p className="mt-1 text-[0.72rem] text-muted">{formatPrice(session.price)}</p>
                        </div>
                        <div className="sm:col-span-2 sm:text-right">
                          <Link
                            href="#reservation"
                            className="inline-flex min-h-[44px] items-center justify-center border border-ink bg-ink px-5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
                          >
                            {seats === 0 ? "Liste d’attente" : "Réserver"}
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-5 border border-line-soft bg-ivory p-6 text-[0.88rem] text-muted">
                  Aucune session n’est publiée pour cette formation. Contactez l’académie pour être prévenue de la prochaine date.
                </p>
              )}
            </section>

            <section id="reservation" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Réservation & paiement</h2>
              <p className="mt-4 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
                Choisissez votre formule, votre date et votre créneau, renseignez vos coordonnées puis réglez par carte bancaire (Stripe) ou PayPal.
                Si la session est complète, le formulaire bascule automatiquement en liste d’attente, sans paiement.
              </p>
              <div className="mt-7">
                <FormationReservation formation={formation} />
              </div>
            </section>

            <section id="faq" className="scroll-mt-28 border-t border-line-soft py-10">
              <h2 className="font-display text-[2rem] uppercase">Questions fréquentes</h2>
              <div className="mt-6">
                <Accordion items={formation.faq} defaultOpen={0} />
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="border-t border-line-soft bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.95] uppercase">Formations associées</h2>
            <Link href="/formations" className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-deep underline decoration-line underline-offset-4">
              Tout le catalogue
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {related.map((item) => (
              <FormationCard key={item.slug} formation={item} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
