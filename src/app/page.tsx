import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { FormationCard } from "@/components/formations/FormationCard";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { Badge, Eyebrow, SectionHeading } from "@/components/ui";
import { faqs, galleryItems, publishedTestimonials } from "@/lib/mock/content";
import { formations } from "@/lib/mock/formations";
import { img } from "@/lib/mock/images";
import { academyIntro, figures, founder, values } from "@/lib/mock/site";
import { seatsLeft, sessionsByFormation, upcomingSessions } from "@/lib/mock/planning";
import { formatDateLong, formatPrice, formatWeekday } from "@/lib/utils";

const authority = ["Formation professionnelle", "Techniques avancées", "Approche pratique", "Accompagnement personnalisé"];

export default function HomePage() {
  const featured = formations.filter((formation) => formation.featured).slice(0, 3);
  const next = upcomingSessions().slice(0, 4);
  const testimonials = publishedTestimonials();
  const featuredNames = featured.map((formation) => formation.title);

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-line-soft bg-milk">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[70%] w-[55%] bg-blush-deep/70 blur-[2px]" aria-hidden />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-12 lg:py-24">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Smirnova School · by Elena Smirnova</Eyebrow>
              <h1 className="mt-7 font-display text-[clamp(3rem,8vw,5.6rem)] leading-[0.9] uppercase">
                Maîtrisez
                <span className="block">l’art de la</span>
                <em className="text-deep">manucure.</em>
              </h1>
              <p className="mt-8 max-w-lg text-[1rem] leading-relaxed text-char">
                Des formations professionnelles pour développer votre technique, votre précision et votre expertise — en petit groupe, à Paris et à l’international.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/formations"
                  className="inline-flex min-h-[52px] items-center justify-center border border-ink bg-ink px-8 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
                >
                  Découvrir les formations
                </Link>
                <Link
                  href="/planning"
                  className="inline-flex min-h-[52px] items-center justify-center border border-ink/25 px-8 text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
                >
                  Voir le planning
                </Link>
              </div>
              <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-line-soft pt-8 sm:grid-cols-4">
                {figures.map((figure) => (
                  <div key={figure.label}>
                    <dt className="font-display text-[1.7rem] leading-none">{figure.value}</dt>
                    <dd className="mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-muted">{figure.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal variant="scale" delay={120}>
              <div className="relative">
                <div className="zoom-frame border border-line-soft">
                  <img src={img.hero} alt="Manucure professionnelle nude lacté réalisée à l’académie Smirnova School" className="aspect-4/5 w-full object-cover lg:aspect-4/3" />
                </div>
                <div className="absolute -bottom-6 left-0 hidden max-w-[15rem] border border-line-soft bg-milk p-5 sm:block">
                  <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-deep">Prochaine session</p>
                  <p className="mt-2 font-display text-[1.3rem] leading-tight">
                    {next[0] ? formatDateLong(next[0].start, false) : "Planning en préparation"}
                  </p>
                  <p className="mt-1 text-[0.72rem] text-muted">{next[0] ? `${next[0].city} · ${seatsLeft(next[0])} places` : "—"}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="grid border-t border-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {authority.map((item, index) => (
            <Reveal as="li" key={item} delay={index * 70} className="border-b border-line-soft px-5 py-7 sm:px-8 lg:border-r lg:border-b-0 lg:px-10 lg:last:border-r-0">
              <span className="text-[0.58rem] font-semibold tracking-[0.2em] text-deep">0{index + 1}</span>
              <p className="mt-3 font-display text-[1.25rem] leading-tight">{item}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------- INTRODUCTION */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow={academyIntro.eyebrow} title={academyIntro.title} accent={academyIntro.titleAccent} />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug">{academyIntro.lead}</p>
              {academyIntro.body.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-[0.92rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/academy"
                  className="inline-flex min-h-[46px] items-center border border-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:bg-blush-deep"
                >
                  Découvrir l’académie
                </Link>
                <Link href="/gallery" className="inline-flex min-h-[46px] items-center px-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-deep underline decoration-line underline-offset-4">
                  Voir nos réalisations
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ FORMATIONS */}
      <section id="formations" className="scroll-mt-[68px] border-y border-line-soft bg-cream lg:scroll-mt-[88px]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Nos programmes" title="Nos" accent="formations" className="max-w-2xl" />
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-sm text-[0.9rem] leading-relaxed text-muted">
                Choisissez la formation qui correspond à votre niveau et à vos objectifs. Programme, prérequis, matériel et attestation sont détaillés sur chaque fiche.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featured.map((formation, index) => (
              <Reveal key={formation.slug} delay={index * 90}>
                <FormationCard formation={formation} priority={index === 0} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/formations"
              className="inline-flex min-h-[48px] items-center border border-ink bg-ink px-7 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
            >
              Toutes les formations
            </Link>
            <p className="text-[0.75rem] text-muted">
              Formations également disponibles à {featuredNames.length ? "Lyon, Bordeaux, Genève et Bruxelles" : "l’international"}.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- VALUES */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <SectionHeading eyebrow="Pourquoi Smirnova School" title="Une pédagogie" accent="exigeante" intro="Quatre engagements appliqués à chaque session, quel que soit le niveau du groupe." />
        </Reveal>
        <ul className="mt-12 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index * 80} className="flex min-h-[250px] flex-col bg-ivory p-7">
              <span className="font-display text-[2.2rem] leading-none text-rose">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-auto font-display text-[1.6rem] uppercase">{value.title}</h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">{value.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- FOUNDER */}
      <section className="grid border-y border-line-soft bg-blush lg:grid-cols-2">
        <Reveal variant="scale" className="order-2 lg:order-1">
          <img src={img.training} alt="Elena Smirnova en démonstration pendant une formation professionnelle" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
        </Reveal>
        <div className="order-1 p-8 sm:p-12 lg:order-2 lg:p-20">
          <Reveal>
            <Eyebrow>{founder.role}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[0.92] uppercase">{founder.name}</h2>
            <p className="mt-7 font-display text-[1.5rem] leading-snug">« {founder.signatureQuote} »</p>
            <p className="mt-6 max-w-xl text-[0.92rem] leading-relaxed text-char">{founder.bio[0]}</p>
            <Link
              href="/academy#fondatrice"
              className="mt-9 inline-flex min-h-[46px] items-center border border-ink bg-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-rose hover:bg-rose"
            >
              Découvrir son approche
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- GALLERY */}
      <section className="border-y border-line-soft bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Le geste, la précision" title="Le travail de" accent="nos élèves" />
            </Reveal>
            <Link href="/gallery" className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-deep underline decoration-line underline-offset-4">
              Toute la galerie
            </Link>
          </div>
          <div className="mt-11 grid auto-rows-[180px] grid-cols-2 gap-3 lg:auto-rows-[220px] lg:grid-cols-4">
            {galleryItems.slice(0, 6).map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 60}
                variant="scale"
                className={`zoom-frame relative overflow-hidden border border-line-soft ${index === 0 ? "row-span-2" : ""} ${index === 3 ? "col-span-2" : ""}`}
              >
                <img src={item.src} alt={item.caption} loading="lazy" className="h-full w-full object-cover saturate-[.85]" />
                <span className="absolute bottom-0 left-0 bg-milk/95 px-3 py-2 text-[0.55rem] uppercase tracking-[0.16em]">{item.category}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- PLANNING */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow="Prochaines dates" title="Planning" accent="des sessions" />
          </Reveal>
          <Link href="/planning" className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-deep underline decoration-line underline-offset-4">
            Planning complet
          </Link>
        </div>

        <ul className="mt-11 divide-y divide-line-soft border-y border-line-soft">
          {next.map((session) => {
            const formation = formations.find((item) => item.slug === session.slug);
            const seats = seatsLeft(session);
            return (
              <li key={session.id} className="grid gap-5 py-6 transition-colors duration-500 hover:bg-blush/40 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-2">
                  <p className="font-display text-[1.45rem] leading-none">{formatDateLong(session.start, false)}</p>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-muted">{formatWeekday(session.start)}</p>
                </div>
                <div className="lg:col-span-4">
                  <Link href={`/formations/${session.slug}`} className="font-display text-[1.35rem] leading-tight transition-colors duration-300 hover:text-deep">
                    {formation?.title}
                  </Link>
                  <p className="mt-1 text-[0.78rem] text-muted">
                    {session.city}, {session.country} · {session.type}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <Badge tone={seats === 0 ? "rose" : "blush"}>{seats === 0 ? "Complet" : `${seats} places`}</Badge>
                </div>
                <div className="lg:col-span-2">
                  <p className="font-display text-[1.25rem] leading-none">{formatPrice(session.price)}</p>
                  <p className="text-[0.68rem] text-muted">{formation?.duration}</p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <Link
                    href={`/formations/${session.slug}#reservation`}
                    className="inline-flex min-h-[44px] items-center border border-ink bg-ink px-6 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
                  >
                    {seats === 0 ? "Liste d’attente" : "Réserver"}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------------ TESTIMONIALS */}
      <section className="border-y border-line-soft bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <Reveal>
            <SectionHeading eyebrow="Elles parlent de leur expérience" title="Des élèves" accent="qui progressent" />
          </Reveal>
          <div className="mt-11">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- FAQ */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading eyebrow="Questions fréquentes" title="Tout" accent="savoir" intro="Niveau requis, matériel, attestation, paiement : les réponses aux questions les plus posées." />
              <Link href="/faq" className="mt-8 inline-flex text-[0.62rem] font-medium uppercase tracking-[0.18em] text-deep underline decoration-line underline-offset-4">
                Voir toutes les questions
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <Accordion items={faqs.slice(0, 6)} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FINAL CTA */}
      <section className="border-t border-line-soft bg-blush">
        <div className="mx-auto max-w-[1100px] px-5 py-20 text-center sm:px-8 lg:py-28">
          <Reveal>
            <Eyebrow className="text-center">Votre prochaine étape</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.92] uppercase">
              Prête à élever
              <em className="block text-deep">votre technique ?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-char">
              Découvrez les prochaines formations Smirnova School et réservez votre place en quelques minutes.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/formations"
                className="inline-flex min-h-[52px] items-center justify-center border border-ink bg-ink px-8 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-rose hover:bg-rose"
              >
                Voir les formations
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center border border-ink/30 px-8 text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-ink hover:bg-milk"
              >
                Contacter l’académie
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
