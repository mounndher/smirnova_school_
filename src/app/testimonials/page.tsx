import type { Metadata } from "next";
import Link from "next/link";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { Reveal } from "@/components/Reveal";
import { Badge, Eyebrow } from "@/components/ui";
import { publishedTestimonials, testimonials } from "@/lib/mock/content";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Témoignages des élèves",
  description: "Témoignages d’élèves formées par Smirnova School : manucure russe, manucure à la cire et nail architecture.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const published = publishedTestimonials();
  const rating = 4.9;
  const cities = Array.from(new Set(published.map((item) => item.city.split(" ")[0])));

  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1500px] px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-24 lg:pb-16">
          <Reveal>
            <Eyebrow>Elles parlent de leur expérience</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5.4rem)] leading-[0.9] uppercase">
              Des retours
              <em className="block text-deep">de professionnelles</em>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <div>
                <p className="font-display text-[2.6rem] leading-none">{rating}/5</p>
                <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-muted">Évaluation moyenne</p>
              </div>
              <div>
                <p className="font-display text-[2.6rem] leading-none">{published.length}</p>
                <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-muted">Avis publiés</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Badge key={city} tone="blush">
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-char">
              Chaque témoignage est publié après accord de l’élève. Les retours non validés restent en brouillon dans l’interface d’administration.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <TestimonialCarousel items={published} />
      </section>

      <section className="border-y border-line-soft bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.95] uppercase">Toutes les expériences</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 60} className={`border p-7 ${item.published ? "border-line-soft bg-ivory" : "border-dashed border-line bg-milk"}`}>
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-blush-deep font-display text-[1.05rem] text-deep">
                      {initials(item.name)}
                    </span>
                    <div>
                      <p className="font-display text-[1.3rem] leading-tight">{item.name}</p>
                      <p className="text-[0.75rem] text-muted">
                        {item.role} · {item.city}
                      </p>
                    </div>
                  </div>
                  <Badge tone={item.published ? "success" : "muted"}>{item.published ? "Publié" : "Brouillon"}</Badge>
                </div>
                <p className="mt-6 text-[0.92rem] leading-relaxed text-char">“{item.quote}”</p>
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line-soft pt-5 text-[0.72rem] text-muted">
                  <span>{item.instagram}</span>
                  <span aria-hidden>·</span>
                  <span>{item.formation}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-col items-start gap-5 border border-line-soft bg-ivory p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-[1.6rem] leading-tight">Vous avez suivi une formation chez nous ?</p>
                <p className="mt-2 text-[0.88rem] text-muted">Partagez votre retour : il aidera d’autres professionnelles à choisir leur parcours.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center border border-ink bg-ink px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
              >
                Laisser un témoignage
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
