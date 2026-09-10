"use client";

import { useMemo, useState } from "react";
import { FormationCard } from "@/components/formations/FormationCard";
import { Badge } from "@/components/ui";
import { formationLevels, type Formation } from "@/lib/mock/formations";
import { planningCities, sessionsByFormation } from "@/lib/mock/planning";
import { cn, formatPrice } from "@/lib/utils";

type SortKey = "pertinence" | "prix-croissant" | "prix-decroissant" | "duree";

const durationValue = (formation: Formation) => formation.hours;

export function FormationExplorer({ formations }: { formations: Formation[] }) {
  const categories = useMemo(() => ["Toutes", ...Array.from(new Set(formations.map((f) => f.category)))], [formations]);
  const cities = useMemo(() => planningCities, []);

  const [category, setCategory] = useState("Toutes");
  const [level, setLevel] = useState("Tous niveaux");
  const [city, setCity] = useState("Toutes les villes");
  const [sort, setSort] = useState<SortKey>("pertinence");
  const [onlySeats, setOnlySeats] = useState(false);

  const results = useMemo(() => {
    const filtered = formations.filter((formation) => {
      if (category !== "Toutes" && formation.category !== category) return false;
      if (level !== "Tous niveaux" && formation.level !== level) return false;
      const sessions = sessionsByFormation(formation.slug);
      if (city !== "Toutes les villes" && !sessions.some((session) => session.city === city)) return false;
      if (onlySeats) {
        const hasSeats = sessions.some((session) => session.slots.some((slot) => slot.seats - slot.taken > 0));
        if (!hasSeats) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    if (sort === "prix-croissant") sorted.sort((a, b) => a.price - b.price);
    if (sort === "prix-decroissant") sorted.sort((a, b) => b.price - a.price);
    if (sort === "duree") sorted.sort((a, b) => durationValue(b) - durationValue(a));
    return sorted;
  }, [formations, category, level, city, sort, onlySeats]);

  const reset = () => {
    setCategory("Toutes");
    setLevel("Tous niveaux");
    setCity("Toutes les villes");
    setSort("pertinence");
    setOnlySeats(false);
  };

  return (
    <section className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-12">
      {/* Filters */}
      <div className="sticky top-[68px] z-30 -mx-5 border-y border-line-soft bg-milk/95 px-5 py-5 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-[88px] lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-5">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  "shrink-0 border px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-500",
                  category === item ? "border-ink bg-ink text-milk" : "border-line bg-transparent text-char hover:border-powder hover:bg-blush-deep",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">Niveau</span>
              <select value={level} onChange={(event) => setLevel(event.target.value)} className="min-h-[44px] text-[0.8rem]">
                {formationLevels.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">Ville</span>
              <select value={city} onChange={(event) => setCity(event.target.value)} className="min-h-[44px] text-[0.8rem]">
                {cities.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">Trier par</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="min-h-[44px] text-[0.8rem]">
                <option value="pertinence">Pertinence</option>
                <option value="prix-croissant">Tarif croissant</option>
                <option value="prix-decroissant">Tarif décroissant</option>
                <option value="duree">Durée</option>
              </select>
            </label>
            <div className="flex items-end gap-3">
              <button
                type="button"
                onClick={() => setOnlySeats((value) => !value)}
                aria-pressed={onlySeats}
                className={cn(
                  "min-h-[44px] flex-1 border px-4 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-500",
                  onlySeats ? "border-deep bg-deep text-white" : "border-line hover:border-powder hover:bg-blush-deep",
                )}
              >
                Places disponibles
              </button>
              <button type="button" onClick={reset} className="min-h-[44px] px-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-muted underline decoration-line underline-offset-4 hover:text-deep">
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted">
          {results.length} formation{results.length > 1 ? "s" : ""} · tarifs à partir de{" "}
          {results.length ? formatPrice(Math.min(...results.map((r) => r.price))) : "—"}
        </p>
        <div className="flex flex-wrap gap-2">
          {category !== "Toutes" && <Badge tone="blush">{category}</Badge>}
          {level !== "Tous niveaux" && <Badge tone="blush">{level}</Badge>}
          {city !== "Toutes les villes" && <Badge tone="blush">{city}</Badge>}
          {onlySeats && <Badge tone="rose">Places disponibles</Badge>}
        </div>
      </div>

      {results.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((formation, index) => (
            <FormationCard key={formation.slug} formation={formation} priority={index < 2} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-line-soft bg-ivory px-6 py-16 text-center">
          <p className="font-display text-[2rem]">Aucune formation ne correspond</p>
          <p className="mx-auto mt-3 max-w-md text-[0.88rem] text-muted">
            Ajustez les filtres ou contactez l’académie : un format sur mesure peut être organisé pour votre institut.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 inline-flex min-h-[44px] items-center border border-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:bg-blush-deep"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
}
