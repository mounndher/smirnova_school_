import type { Metadata } from "next";
import Link from "next/link";
import { PlanningBoard } from "@/components/planning/PlanningBoard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { upcomingSessions } from "@/lib/mock/planning";
import { formatDateLong } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Planning des formations",
  description: "Calendrier des sessions Smirnova School : dates, villes, créneaux horaires et places disponibles en France et à l’international.",
  alternates: { canonical: "/planning" },
};

export default async function PlanningPage({ searchParams }: { searchParams: Promise<{ formation?: string }> }) {
  const { formation } = await searchParams;
  const sessions = upcomingSessions();
  const international = sessions.filter((session) => session.country !== "France");

  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1500px] px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-24 lg:pb-16">
          <Reveal>
            <Eyebrow>Calendrier des sessions</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5.4rem)] leading-[0.9] uppercase">
              Planning
              <em className="block text-deep">des formations</em>
            </h1>
            <p className="mt-8 max-w-2xl text-[1rem] leading-relaxed text-char">
              Sélectionnez une formation, une ville ou affichez uniquement les sessions internationales. Les places disponibles correspondent au nombre réel de postes restants par créneau.
            </p>
            <dl className="mt-10 flex flex-wrap gap-10 border-t border-line-soft pt-8">
              {[
                ["Sessions à venir", String(sessions.length)],
                ["Villes", String(new Set(sessions.map((session) => session.city)).size)],
                ["Sessions internationales", String(international.length)],
                ["Prochaine date", sessions[0] ? formatDateLong(sessions[0].start) : "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</dt>
                  <dd className="mt-1.5 font-display text-[1.6rem] leading-none">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-2">
              {Array.from(new Set(sessions.map((session) => session.city))).map((city) => (
                <span key={city} className="border border-line-soft px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-muted">
                  {city}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mt-12">
        <PlanningBoard initialFormation={formation} />
      </div>

      <section className="border-t border-line-soft bg-cream">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.95] uppercase">Comment se déroule une session</h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-line-soft border-y border-line-soft">
              {[
                ["Réservation", "Choisissez la formation, la date et votre créneau d’arrivée. Un dossier de référence est généré immédiatement."],
                ["Confirmation", "Vous recevez le récapitulatif, la convention de formation et les informations d’accès à l’académie."],
                ["Jour de formation", "Accueil 15 minutes avant le début, poste individuel attribué, matériel prêt sur place."],
                ["Après la session", "Attestation remise sur place, accès au groupe privé des anciennes élèves et suivi de progression."],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-5 py-5">
                  <span className="font-display text-[1.4rem] leading-none text-rose">0{index + 1}</span>
                  <div>
                    <p className="font-display text-[1.25rem] uppercase">{title}</p>
                    <p className="mt-1.5 text-[0.85rem] text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#formations"
                className="inline-flex min-h-[48px] items-center border border-ink bg-ink px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
              >
                Réserver une formation
              </Link>
              <Link href="/faq" className="inline-flex min-h-[48px] items-center border border-ink/25 px-7 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep">
                Consulter la FAQ
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
