"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge, Eyebrow } from "@/components/ui";
import { school } from "@/lib/mock/site";
import { formatDateLong, formatPrice } from "@/lib/utils";

type Confirmation = {
  reference: string;
  status: "confirmed" | "waitlist";
  formationSlug: string;
  formationTitle: string;
  formationDuration: string;
  sessionDate: string;
  venue: string;
  time: string;
  participant: string;
  email: string;
  phone: string;
  note: string;
  formule: string;
  total: number;
  paid: number;
  balance: number;
  paymentMethod: string;
  createdAt: string;
};

function isConfirmation(value: unknown): value is Confirmation {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Confirmation>;
  return (
    typeof item.reference === "string" &&
    (item.status === "confirmed" || item.status === "waitlist") &&
    typeof item.formationSlug === "string" &&
    typeof item.formationTitle === "string" &&
    typeof item.participant === "string" &&
    typeof item.total === "number"
  );
}

export function ConfirmationView() {
  const [confirmation, setConfirmation] = useState<Confirmation | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bms-reservation-confirmation");
      if (!raw) {
        setConfirmation(null);
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      setConfirmation(isConfirmation(parsed) ? parsed : null);
    } catch {
      setConfirmation(null);
    }
  }, []);

  if (confirmation === undefined) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
        <span aria-hidden className="mx-auto block h-7 w-7 animate-spin rounded-full border border-line border-t-deep" />
        <p className="mt-5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted">Préparation de votre confirmation…</p>
      </div>
    );
  }

  if (confirmation === null) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-32">
        <span aria-hidden className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-line bg-blush font-display text-[1.7rem] text-deep">
          !
        </span>
        <Eyebrow className="mt-7 text-center">Confirmation indisponible</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.92] uppercase">Aucune réservation récente</h1>
        <p className="mx-auto mt-6 max-w-xl text-[0.92rem] leading-relaxed text-muted">
          Cette confirmation est temporairement conservée dans votre navigateur après la validation du formulaire. Choisissez une formation pour commencer une nouvelle réservation.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/#formations"
            className="inline-flex min-h-[50px] items-center justify-center border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
          >
            Choisir une formation
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[50px] items-center justify-center border border-ink/25 px-8 text-[0.64rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
          >
            Contacter l’académie
          </Link>
        </div>
      </section>
    );
  }

  const waitlist = confirmation.status === "waitlist";

  return (
    <>
      <header className="relative overflow-hidden border-b border-line-soft bg-blush">
        <div className="pointer-events-none absolute -top-28 right-[-8%] h-80 w-80 rounded-full bg-powder/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24">
          <span aria-hidden className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-deep text-[2rem] text-white shadow-[0_18px_50px_rgba(169,93,107,.24)]">
            {waitlist ? "◷" : "✓"}
          </span>
          <Eyebrow className="mt-7 text-center">
            {waitlist ? "Liste d’attente enregistrée" : "Paiement accepté · inscription validée"}
          </Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(2.7rem,7vw,5rem)] leading-[0.9] uppercase">
            {waitlist ? (
              <>
                Demande
                <em className="block text-deep">enregistrée</em>
              </>
            ) : (
              <>
                Réservation
                <em className="block text-deep">confirmée</em>
              </>
            )}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[0.95rem] leading-relaxed text-char">
            {waitlist
              ? "Votre demande est bien enregistrée. Aucun paiement n’a été effectué : l’académie vous contacte dès qu’une place se libère."
              : `Merci ${confirmation.participant.split(" ")[0]}. Votre place est réservée. Un email récapitulatif serait envoyé à ${confirmation.email}.`}
          </p>
          <Badge tone={waitlist ? "rose" : "success"} className="mt-6">
            Dossier {confirmation.reference}
          </Badge>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-7 lg:grid-cols-12">
          <div className="border border-line-soft bg-ivory p-6 sm:p-9 lg:col-span-8">
            <div className="flex flex-col gap-3 border-b border-line-soft pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">Récapitulatif de réservation</p>
                <h2 className="mt-3 font-display text-[1.9rem] leading-tight">{confirmation.formationTitle}</h2>
              </div>
              <Badge tone={waitlist ? "rose" : "success"}>{waitlist ? "Liste d’attente" : "Confirmée"}</Badge>
            </div>

            <dl className="mt-3 grid gap-x-8 sm:grid-cols-2">
              <Item label="Référence" value={confirmation.reference} />
              <Item label="Formation" value={confirmation.formationTitle} />
              <Item label="Date" value={confirmation.sessionDate ? formatDateLong(confirmation.sessionDate) : "À confirmer"} />
              <Item label="Créneau" value={confirmation.time} />
              <Item label="Durée" value={confirmation.formationDuration} />
              <Item label="Lieu" value={confirmation.venue} />
              <Item label="Participante" value={confirmation.participant} />
              <Item label="Téléphone" value={confirmation.phone} />
              <Item label="Email" value={confirmation.email} />
              <Item label="Formule" value={confirmation.formule} />
              {confirmation.note ? <Item label="Votre note" value={confirmation.note} className="sm:col-span-2" /> : null}
            </dl>

            <div className="mt-8 border border-line-soft bg-blush p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">{waitlist ? "Paiement" : "Règlement"}</p>
                  <p className="mt-2 font-display text-[1.35rem]">{confirmation.paymentMethod}</p>
                </div>
                <dl className="flex gap-8">
                  <div>
                    <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">Réglé</dt>
                    <dd className="mt-1 font-display text-[1.7rem] leading-none">{formatPrice(confirmation.paid)}</dd>
                  </div>
                  {!waitlist && confirmation.balance > 0 ? (
                    <div>
                      <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">Solde restant</dt>
                      <dd className="mt-1 font-display text-[1.7rem] leading-none">{formatPrice(confirmation.balance)}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>

            <p className="mt-5 text-[0.7rem] leading-relaxed text-muted">
              Démonstration frontend : cette confirmation et ce paiement sont simulés. Aucune donnée personnelle ou bancaire n’a été envoyée ni enregistrée.
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-line-soft bg-cream p-6 sm:p-7">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">Prochaines étapes</p>
              <ol className="mt-5 space-y-5">
                {[
                  ["01", waitlist ? "Notification de disponibilité" : "Email de confirmation", waitlist ? "Vous êtes contactée dès qu’une place se libère." : "Récapitulatif, convention et reçu de paiement."],
                  ["02", "Préparer votre session", "Le matériel est fourni. Prévoyez une tenue confortable."],
                  ["03", "Accueil à l’académie", "Arrivez 15 minutes avant le début de votre créneau."],
                ].map(([number, title, text]) => (
                  <li key={number} className="flex gap-4 border-b border-line-soft pb-5 last:border-0 last:pb-0">
                    <span className="font-display text-[1.2rem] text-rose">{number}</span>
                    <div>
                      <p className="text-[0.82rem] font-medium">{title}</p>
                      <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 border border-line-soft bg-ivory p-6 text-[0.78rem]">
              <p className="font-display text-[1.25rem]">Besoin d’aide ?</p>
              <p className="mt-3 leading-relaxed text-muted">
                {school.email}
                <br />
                {school.phone}
              </p>
            </div>
          </aside>
        </div>

        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[50px] items-center justify-center border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
          >
            Télécharger la confirmation
          </button>
          <Link
            href={`/formations/${confirmation.formationSlug}`}
            className="inline-flex min-h-[50px] items-center justify-center border border-ink/25 px-8 text-[0.64rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep"
          >
            Revoir la formation
          </Link>
          <Link
            href="/#formations"
            className="inline-flex min-h-[50px] items-center justify-center px-5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-deep underline decoration-line underline-offset-4"
          >
            Nouvelle réservation
          </Link>
        </div>
      </section>
    </>
  );
}

function Item({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`border-b border-line-soft py-4 ${className ?? ""}`}>
      <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="mt-1.5 font-display text-[1.12rem] leading-tight">{value}</dd>
    </div>
  );
}
