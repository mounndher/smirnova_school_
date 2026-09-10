import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { galleryItems } from "@/lib/mock/content";

export const metadata: Metadata = {
  title: "Galerie — le geste, la précision",
  description: "Galerie Smirnova School : réalisations d’élèves, avant/après, techniques de manucure russe, nail architecture et ambiances de formation.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1500px] px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-24 lg:pb-16">
          <Reveal>
            <Eyebrow>Image · geste · précision</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5.4rem)] leading-[0.9] uppercase">
              La
              <em className="block text-deep">galerie</em>
            </h1>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl text-[1rem] leading-relaxed text-char">
                Une sélection éditoriale de travaux d’élèves, de démonstrations techniques et d’ambiances de session. Cliquez sur une image pour l’agrandir.
              </p>
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">{galleryItems.length} visuels · 6 catégories</p>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mt-12">
        <GalleryGrid />
      </div>

      <section className="border-t border-line-soft bg-cream">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.95] uppercase">Vos réalisations ont leur place ici</h2>
            <p className="mt-5 max-w-lg text-[0.92rem] leading-relaxed text-muted">
              Les élèves de Smirnova School partagent régulièrement leurs travaux dans le groupe privé. Une sélection est publiée dans cette galerie avec leur accord.
            </p>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Partager un travail", "Envoyez vos photos après la formation, nous les publions à votre nom."],
                ["Avant / après", "Documentez vos progressions techniques sur un même doigt ou une même main."],
              ].map(([title, text]) => (
                <div key={title} className="border border-line-soft bg-ivory p-6">
                  <p className="font-display text-[1.35rem] uppercase">{title}</p>
                  <p className="mt-3 text-[0.85rem] text-muted">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center border border-ink bg-ink px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
              >
                Envoyer mes photos
              </Link>
              <Link href="/formations" className="inline-flex min-h-[48px] items-center border border-ink/25 px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep">
                Se former
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
