"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui";
import { formations } from "@/lib/mock/formations";
import { groupByMonth, openSlots, seatsLeft, sessions, totalSeats, type Session } from "@/lib/mock/planning";
import { cn, formatDateLong, formatPrice, formatTimeRange, formatWeekday, relativeDays } from "@/lib/utils";

const formationTitle = (slug: string) => formations.find((f) => f.slug === slug)?.title ?? slug;
const formationCategory = (slug: string) => formations.find((f) => f.slug === slug)?.category ?? "Formation";

export function PlanningBoard({ initialFormation }: { initialFormation?: string }) {
  const [formationFilter, setFormationFilter] = useState(initialFormation ?? "Toutes");
  const [cityFilter, setCityFilter] = useState("Toutes les villes");
  const [international, setInternational] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);

  const upcoming = useMemo(() => [...sessions].sort((a, b) => +new Date(a.start) - +new Date(b.start)), []);
  const cities = useMemo(() => ["Toutes les villes", ...Array.from(new Set(upcoming.map((s) => s.city)))], [upcoming]);

  const filtered = useMemo(
    () =>
      upcoming.filter((session) => {
        if (formationFilter !== "Toutes" && session.slug !== formationFilter) return false;
        if (cityFilter !== "Toutes les villes" && session.city !== cityFilter) return false;
        if (international && session.country === "France") return false;
        if (openOnly && seatsLeft(session) === 0) return false;
        return true;
      }),
    [upcoming, formationFilter, cityFilter, international, openOnly],
  );

  const grouped = groupByMonth(filtered);

  return (
    <section className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-12">
      <div className="border border-line-soft bg-ivory p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">Formation</span>
            <select value={formationFilter} onChange={(event) => setFormationFilter(event.target.value)} className="min-h-[46px] text-[0.82rem]">
              <option value="Toutes">Toutes les formations</option>
              {formations.map((formation) => (
                <option key={formation.slug} value={formation.slug}>
                  {formation.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">Ville</span>
            <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} className="min-h-[46px] text-[0.82rem]">
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end gap-3 lg:col-span-2">
            <button
              type="button"
              onClick={() => setInternational((value) => !value)}
              aria-pressed={international}
              className={cn(
                "min-h-[46px] flex-1 border px-4 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-500",
                international ? "border-deep bg-deep text-white" : "border-line hover:border-powder hover:bg-blush-deep",
              )}
            >
              Sessions internationales
            </button>
            <button
              type="button"
              onClick={() => setOpenOnly((value) => !value)}
              aria-pressed={openOnly}
              className={cn(
                "min-h-[46px] flex-1 border px-4 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-500",
                openOnly ? "border-deep bg-deep text-white" : "border-line hover:border-powder hover:bg-blush-deep",
              )}
            >
              Places disponibles
            </button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[0.72rem] uppercase tracking-[0.18em] text-muted">
        {filtered.length} session{filtered.length > 1 ? "s" : ""} programmée{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 border border-line-soft bg-ivory px-6 py-16 text-center">
          <p className="font-display text-[2rem]">Aucune session pour ces critères</p>
          <p className="mx-auto mt-3 max-w-md text-[0.88rem] text-muted">
            Élargissez la recherche ou inscrivez-vous sur la liste d’attente : les sessions sont ajoutées en continu.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-[46px] items-center border border-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:bg-blush-deep"
          >
            Être informée des nouvelles dates
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-14">
          {Object.entries(grouped).map(([month, list]) => (
            <div key={month}>
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 className="font-display text-[2.1rem] capitalize leading-none">{month}</h2>
                <span className="text-[0.6rem] uppercase tracking-[0.18em] text-muted">{list.length} session(s)</span>
              </div>
              <ul className="divide-y divide-line-soft">
                {list.map((session) => (
                  <SessionLine key={session.id} session={session} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function SessionLine({ session }: { session: Session }) {
  const seats = seatsLeft(session);
  const slots = openSlots(session);
  const soon = relativeDays(session.start) <= 10;

  return (
    <li className="group grid gap-6 py-7 transition-colors duration-500 hover:bg-blush/40 lg:grid-cols-12 lg:items-center lg:gap-6 lg:px-4">
      <div className="lg:col-span-2">
        <p className="font-display text-[1.5rem] leading-none">{formatDateLong(session.start, false)}</p>
        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-muted">{formatWeekday(session.start)}</p>
      </div>

      <div className="lg:col-span-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blush">{formationCategory(session.slug)}</Badge>
          {soon && <Badge tone="rose">Bientôt complet</Badge>}
        </div>
        <p className="mt-3 font-display text-[1.4rem] leading-tight">
          <Link href={`/formations/${session.slug}`} className="transition-colors duration-300 hover:text-deep">
            {formationTitle(session.slug)}
          </Link>
        </p>
        <p className="mt-1 text-[0.8rem] text-muted">
          {session.venue} · {session.city}, {session.country}
        </p>
      </div>

      <div className="lg:col-span-2">
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">Créneaux</p>
        <ul className="mt-1.5 space-y-0.5 text-[0.8rem]">
          {session.slots.map((slot) => (
            <li key={slot.id} className={slot.seats - slot.taken > 0 ? "" : "text-muted line-through"}>
              {formatTimeRange(slot.start, slot.end)}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2">
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">{seats > 0 ? "Places disponibles" : "Session"}</p>
        <p className={cn("mt-1.5 font-display text-[1.35rem] leading-none", seats === 0 && "text-deep")}>
          {seats === 0 ? "Complet" : `${seats} / ${totalSeats(session)}`}
        </p>
        <p className="mt-1 text-[0.72rem] text-muted">{formatPrice(session.price)}</p>
      </div>

      <div className="flex gap-3 lg:col-span-2 lg:justify-end">
        {slots.length > 0 ? (
          <>
            <Link
              href={`/formations/${session.slug}#reservation`}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center border border-ink bg-ink px-5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep lg:flex-none"
            >
              Réserver
            </Link>
            <Link
              href={`/formations/${session.slug}`}
              className="inline-flex min-h-[44px] items-center border border-ink/25 px-4 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
            >
              Détails
            </Link>
          </>
        ) : (
          <Link
            href={`/formations/${session.slug}#reservation`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center border border-deep px-5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-deep transition-all duration-500 hover:bg-deep hover:text-white lg:flex-none"
          >
            Liste d’attente
          </Link>
        )}
      </div>
    </li>
  );
}
