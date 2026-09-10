import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge, Eyebrow, KeyValue, SectionHeading } from "@/components/ui";
import { img } from "@/lib/mock/images";
import { academyIntro, figures, founder, guarantees, school, values } from "@/lib/mock/site";

export const metadata: Metadata = {
  title: "L’académie & Elena Smirnova",
  description: "Découvrez Smirnova School, académie professionnelle de manucure fondée par Elena Smirnova : méthode pédagogique, valeurs et encadrement des formations.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-24">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>L’académie</Eyebrow>
              <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.92] uppercase">
                Former des
                <em className="block text-deep">professionnelles</em>
              </h1>
              <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-char">{academyIntro.lead}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/formations"
                  className="inline-flex min-h-[48px] items-center border border-ink bg-ink px-7 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
                >
                  Voir les formations
                </Link>
                <Link href="#fondatrice" className="inline-flex min-h-[48px] items-center border border-ink/25 px-7 text-[0.64rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep">
                  Rencontrer Elena
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal variant="scale" delay={120} className="lg:col-span-6">
            <div className="zoom-frame border border-line-soft">
              <img src={academyIntro.secondaryImage} alt="Sélection de teintes professionnelles pendant une formation" className="aspect-4/3 w-full object-cover saturate-[.85]" />
            </div>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow="Notre histoire" title="Une méthode" accent="transmise" />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {academyIntro.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 70}>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-muted first:mt-0">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 border-t border-line-soft pt-8 sm:grid-cols-4">
                {figures.map((figure) => (
                  <div key={figure.label}>
                    <dt className="font-display text-[1.9rem] leading-none">{figure.value}</dt>
                    <dd className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-muted">{figure.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="fondatrice" className="scroll-mt-28 border-y border-line-soft bg-blush">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-28">
          <Reveal variant="scale" className="lg:col-span-5">
            <img src={founder.portrait} alt={`${founder.name}, fondatrice et éducatrice de Smirnova School`} className="aspect-4/5 w-full border border-line-soft object-cover" loading="lazy" />
            <p className="mt-4 text-[0.68rem] text-muted">Elena Smirnova en démonstration technique — {school.city}</p>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{founder.role}</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4rem)] leading-[0.92] uppercase">{founder.name}</h2>
            </Reveal>
            {founder.bio.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 70}>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-char">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={120}>
              <h3 className="mt-12 font-display text-[1.8rem] uppercase">Son parcours</h3>
              <ol className="mt-6 border-l border-line pl-6">
                {founder.trajectory.map((item) => (
                  <li key={item.year} className="relative pb-7 last:pb-0">
                    <span aria-hidden className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-deep" />
                    <p className="font-display text-[1.2rem] leading-none text-deep">{item.year}</p>
                    <p className="mt-2 text-[0.88rem] font-medium">{item.title}</p>
                    <p className="mt-1 text-[0.85rem] text-muted">{item.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={140}>
              <h3 className="mt-12 font-display text-[1.8rem] uppercase">Sa méthode</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {founder.method.map((step) => (
                  <li key={step.step} className="border border-line-soft bg-milk p-5">
                    <span className="text-[0.58rem] font-semibold tracking-[0.2em] text-deep">{step.step}</span>
                    <p className="mt-2 font-display text-[1.3rem] uppercase">{step.title}</p>
                    <p className="mt-2 text-[0.82rem] text-muted">{step.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values + guarantees */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow="Nos engagements" title="Ce que vous" accent="trouverez" intro="Un cadre professionnel, un groupe limité et du matériel de niveau institut." />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <ul className="divide-y divide-line-soft border-y border-line-soft">
                {guarantees.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-4 text-[0.9rem]">
                    <span aria-hidden className="mt-1 text-deep">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <dl>
                  <KeyValue label="Langues" value={school.languages.join(" · ")} />
                  <KeyValue label="Académie" value={school.address} />
                </dl>
                <dl>
                  <KeyValue label="Horaires" value={`${school.hours[0].value}, ${school.hours[1].value}`} />
                  <KeyValue label="Contact" value={school.email} />
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index * 70} className="border border-line-soft bg-ivory p-6">
              <h3 className="font-display text-[1.4rem] uppercase">{value.title}</h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">{value.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-y border-line-soft bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>Le cadre</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95] uppercase">Un studio pensé pour la pratique</h2>
                <p className="mt-5 max-w-xl text-[0.92rem] leading-relaxed text-muted">
                  Postes individuels, aspiration, lampes professionnelles, cabine d’hygiène et salon d’accueil : l’académie reproduit les conditions réelles d’un institut haut de gamme.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Postes individuels", "Aspiration intégrée", "Matériel fourni", "8 participantes max"].map((tag) => (
                    <Badge key={tag} tone="blush">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Link
                href="/planning"
                className="inline-flex min-h-[48px] items-center border border-ink bg-ink px-7 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
              >
                Voir les prochaines dates
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[img.manicureSession, img.polishChoice, img.care].map((source, index) => (
              <Reveal key={source} variant="scale" delay={index * 80} className="zoom-frame border border-line-soft">
                <img src={source} alt="Poste de travail de l’académie Smirnova School" loading="lazy" className="aspect-4/3 w-full object-cover saturate-[.85]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
