import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Formation } from "@/lib/mock/formations";
import { isFull, seatsLeft, sessionsByFormation, type Session } from "@/lib/mock/planning";
import { formatDateLong, formatPrice } from "@/lib/utils";

export function FormationCard({ formation, priority = false }: { formation: Formation; priority?: boolean }) {
  const next: Session | undefined = sessionsByFormation(formation.slug)[0];
  const seats = next ? seatsLeft(next) : null;

  return (
    <article className="group flex h-full flex-col border border-line-soft bg-ivory transition-colors duration-500 hover:border-powder hover:bg-blush/40">
      <Link href={`/formations/${formation.slug}`} className="zoom-frame relative block overflow-hidden" tabIndex={-1} aria-hidden>
        <img
          src={formation.image}
          alt={`Formation ${formation.title} — ${formation.category}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="aspect-4/3 w-full object-cover saturate-[.85] transition-[filter] duration-700 group-hover:saturate-100"
        />
        <span className="absolute top-0 left-0 bg-milk/95 px-3 py-2 text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-char">{formation.category}</span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="muted">{formation.level}</Badge>
          <Badge tone="blush">{formation.duration}</Badge>
        </div>

        <h3 className="mt-5 font-display text-[1.85rem] leading-[1.05] uppercase">
          <Link href={`/formations/${formation.slug}`} className="transition-colors duration-300 hover:text-deep">
            {formation.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-muted">{formation.short}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line-soft pt-5">
          <div>
            <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted">Prochaine session</dt>
            <dd className="mt-1 text-[0.82rem] leading-snug">{next ? formatDateLong(next.start, false) : "À programmer"}</dd>
          </div>
          <div>
            <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted">Lieu</dt>
            <dd className="mt-1 text-[0.82rem] leading-snug">{next ? `${next.city} · ${next.country}` : "—"}</dd>
          </div>
          <div>
            <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted">Tarif</dt>
            <dd className="mt-1 font-display text-[1.15rem] leading-none">{formatPrice(next?.price ?? formation.price)}</dd>
          </div>
          <div>
            <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted">Disponibilité</dt>
            <dd className="mt-1 text-[0.82rem] leading-snug">
              {seats == null ? (
                <span className="text-muted">Inscriptions fermées</span>
              ) : seats === 0 || isFull(next as Session) ? (
                <span className="text-deep">Complet · liste d’attente</span>
              ) : (
                <span>
                  {seats} place{seats > 1 ? "s" : ""} disponible{seats > 1 ? "s" : ""}
                </span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/formations/${formation.slug}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center border border-ink/25 px-5 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
          >
            Découvrir la formation
          </Link>
          <Link
            href={`/formations/${formation.slug}#reservation`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center border border-ink bg-ink px-5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
          >
            Réserver
          </Link>
        </div>
      </div>
    </article>
  );
}
