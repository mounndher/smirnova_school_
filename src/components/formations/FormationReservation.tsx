"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Field } from "@/components/ui";
import type { Formation } from "@/lib/mock/formations";
import { seatsLeft, sessionsByFormation } from "@/lib/mock/planning";
import { cn, formatDateLong, formatPrice, formatTimeRange } from "@/lib/utils";

type Method = "stripe" | "paypal";
type FormuleKey = "integral" | "acompte";
type Status = "idle" | "processing";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  paypalEmail: string;
  consent: boolean;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  paypalEmail: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormState | "session" | "slot", string>>;

const groupCard = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export function FormationReservation({ formation }: { formation: Formation }) {
  const router = useRouter();
  const sessions = useMemo(() => sessionsByFormation(formation.slug), [formation.slug]);

  const [formule, setFormule] = useState<FormuleKey>("integral");
  const [sessionId, setSessionId] = useState(sessions[0]?.id ?? "");
  const [slotId, setSlotId] = useState(sessions[0]?.slots.find((slot) => slot.seats - slot.taken > 0)?.id ?? "");
  const [method, setMethod] = useState<Method>("stripe");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const session = sessions.find((item) => item.id === sessionId);
  const slots = session?.slots ?? [];
  const slot = slots.find((item) => item.id === slotId);
  const seats = session ? seatsLeft(session) : 0;
  const isWaitlist = Boolean(session) && seats === 0;

  const total = session?.price ?? formation.price;
  const dueToday = isWaitlist ? 0 : formule === "integral" ? total : formation.deposit;
  const balance = Math.max(0, total - dueToday);

  const formules = [
    {
      key: "integral" as const,
      title: "Formule intégrale",
      amount: total,
      caption: "Réglez la totalité et confirmez votre place immédiatement.",
      perks: ["Place confirmée définitivement", "Aucun solde le jour J", "Facture envoyée aussitôt"],
    },
    {
      key: "acompte" as const,
      title: "Formule acompte",
      amount: formation.deposit,
      caption: `Bloquez votre place, réglez le solde de ${formatPrice(Math.max(0, total - formation.deposit))} le premier jour.`,
      perks: ["Place bloquée 14 jours", "Solde réglé sur place", "Report possible une fois"],
    },
  ];

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!session) next.session = "Sélectionnez une session.";
    if (session && !isWaitlist && !slot) next.slot = "Sélectionnez un créneau horaire.";
    if (form.firstName.trim().length < 2) next.firstName = "Prénom requis.";
    if (form.lastName.trim().length < 2) next.lastName = "Nom requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) next.email = "Adresse email invalide.";
    if (form.phone.replace(/\D/g, "").length < 9) next.phone = "Numéro de téléphone invalide.";

    if (!isWaitlist && method === "stripe") {
      if (form.cardName.trim().length < 3) next.cardName = "Nom du titulaire requis.";
      if (form.cardNumber.replace(/\s/g, "").length < 16) next.cardNumber = "Numéro de carte incomplet.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry)) next.cardExpiry = "Format attendu : MM/AA.";
      if (form.cardCvc.replace(/\D/g, "").length < 3) next.cardCvc = "Cryptogramme incomplet.";
    }
    if (!isWaitlist && method === "paypal" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.paypalEmail)) {
      next.paypalEmail = "Email du compte PayPal invalide.";
    }
    if (!form.consent) next.consent = "Merci d’accepter les conditions.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector<HTMLElement>("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const reference = `BMS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`;
    const confirmation = {
      reference,
      status: isWaitlist ? "waitlist" : "confirmed",
      formationSlug: formation.slug,
      formationTitle: formation.title,
      formationDuration: formation.duration,
      sessionDate: session?.start ?? "",
      venue: session ? `${session.venue}, ${session.city}, ${session.country}` : "À confirmer",
      time: slot ? formatTimeRange(slot.start, slot.end) : "Liste d’attente",
      participant: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      note: form.message,
      formule: isWaitlist ? "Sans objet" : formule === "integral" ? "Formule intégrale" : "Formule acompte",
      total,
      paid: dueToday,
      balance: isWaitlist ? 0 : balance,
      paymentMethod: isWaitlist ? "Aucun paiement" : method === "stripe" ? "Carte bancaire · Stripe" : "PayPal",
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("bms-reservation-confirmation", JSON.stringify(confirmation));
    router.push(`/confirmation?reference=${encodeURIComponent(reference)}`);
  };

  /* --------------------------------------------------------------- form */
  return (
    <form onSubmit={submit} noValidate className="border border-line-soft bg-ivory p-6 sm:p-8">
      {/* Formules */}
      <fieldset disabled={isWaitlist}>
        <legend className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">01 · Votre formule</legend>
        <div className={cn("mt-5 grid gap-4 sm:grid-cols-2", isWaitlist && "opacity-50")}>
          {formules.map((item) => (
            <label
              key={item.key}
              className={cn(
                "cursor-pointer border p-5 transition-all duration-500",
                formule === item.key ? "border-deep bg-blush-deep" : "border-line-soft bg-milk hover:border-powder hover:bg-blush/50",
              )}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-3">
                  <input type="radio" name="formule" checked={formule === item.key} onChange={() => setFormule(item.key)} />
                  <span className="font-display text-[1.25rem] leading-tight">{item.title}</span>
                </span>
              </span>
              <span className="mt-4 block font-display text-[1.9rem] leading-none">{formatPrice(item.amount)}</span>
              <span className="mt-2 block text-[0.78rem] text-muted">{item.caption}</span>
              <ul className="mt-4 space-y-1.5 border-t border-line-soft pt-4 text-[0.75rem] text-char">
                {item.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span aria-hidden className="text-deep">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Session */}
      <fieldset className="mt-9 border-t border-line-soft pt-7">
        <legend className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">02 · Date & créneau</legend>
        {sessions.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Session">
              <select
                value={sessionId}
                onChange={(event) => {
                  setSessionId(event.target.value);
                  const nextSession = sessions.find((item) => item.id === event.target.value);
                  setSlotId(nextSession?.slots.find((item) => item.seats - item.taken > 0)?.id ?? "");
                }}
              >
                {sessions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {formatDateLong(item.start)} — {item.city} ({seatsLeft(item) === 0 ? "complet" : `${seatsLeft(item)} places`})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Créneau horaire">
              <select value={slotId} onChange={(event) => setSlotId(event.target.value)} disabled={isWaitlist} aria-invalid={Boolean(errors.slot)}>
                <option value="">{isWaitlist ? "Session complète" : "Sélectionner un créneau"}</option>
                {slots.map((item) => {
                  const remaining = item.seats - item.taken;
                  return (
                    <option key={item.id} value={item.id} disabled={remaining <= 0}>
                      {formatTimeRange(item.start, item.end)} {remaining > 0 ? `— ${remaining} place${remaining > 1 ? "s" : ""}` : "— complet"}
                    </option>
                  );
                })}
              </select>
              {errors.slot && (
                <span data-error="true" className="text-[0.72rem] text-deep">
                  {errors.slot}
                </span>
              )}
            </Field>
          </div>
        ) : (
          <p className="mt-5 text-[0.85rem] text-muted">Aucune date n’est publiée pour cette formation. Contactez l’académie pour être prévenue.</p>
        )}

        {isWaitlist && (
          <p className="mt-5 border border-deep/40 bg-blush px-5 py-4 text-[0.82rem] text-deep">
            Cette session est complète : votre demande sera enregistrée en liste d’attente et aucun paiement ne sera demandé.
          </p>
        )}
      </fieldset>

      {/* Coordonnées */}
      <fieldset className="mt-9 border-t border-line-soft pt-7">
        <legend className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">03 · Vos coordonnées</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Prénom *">
            <input value={form.firstName} onChange={(event) => update("firstName", event.target.value)} autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} />
            {errors.firstName && (
              <span data-error="true" className="text-[0.72rem] text-deep">
                {errors.firstName}
              </span>
            )}
          </Field>
          <Field label="Nom *">
            <input value={form.lastName} onChange={(event) => update("lastName", event.target.value)} autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} />
            {errors.lastName && (
              <span data-error="true" className="text-[0.72rem] text-deep">
                {errors.lastName}
              </span>
            )}
          </Field>
          <Field label="Email *">
            <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" placeholder="prenom@email.com" aria-invalid={Boolean(errors.email)} />
            {errors.email && (
              <span data-error="true" className="text-[0.72rem] text-deep">
                {errors.email}
              </span>
            )}
          </Field>
          <Field label="Téléphone *">
            <input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="+33 6 00 00 00 00" aria-invalid={Boolean(errors.phone)} />
            {errors.phone && (
              <span data-error="true" className="text-[0.72rem] text-deep">
                {errors.phone}
              </span>
            )}
          </Field>
          <Field label="Message / note (optionnel)" className="sm:col-span-2" hint="Niveau, attentes, contraintes horaires, allergies…">
            <textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} />
          </Field>
        </div>
      </fieldset>

      {/* Paiement */}
      <fieldset className="mt-9 border-t border-line-soft pt-7" disabled={isWaitlist}>
        <legend className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">04 · Paiement sécurisé</legend>

        <div className={cn("mt-5 grid gap-4 sm:grid-cols-2", isWaitlist && "opacity-50")}>
          <label
            className={cn(
              "flex cursor-pointer items-center gap-4 border p-5 transition-all duration-500",
              method === "stripe" ? "border-deep bg-blush-deep" : "border-line-soft bg-milk hover:border-powder hover:bg-blush/50",
            )}
          >
            <input type="radio" name="method" checked={method === "stripe"} onChange={() => setMethod("stripe")} />
            <span className="flex-1">
              <StripeMark />
              <span className="mt-2 block text-[0.75rem] text-muted">Carte bancaire · Visa, Mastercard, Amex</span>
            </span>
          </label>

          <label
            className={cn(
              "flex cursor-pointer items-center gap-4 border p-5 transition-all duration-500",
              method === "paypal" ? "border-deep bg-blush-deep" : "border-line-soft bg-milk hover:border-powder hover:bg-blush/50",
            )}
          >
            <input type="radio" name="method" checked={method === "paypal"} onChange={() => setMethod("paypal")} />
            <span className="flex-1">
              <PaypalMark />
              <span className="mt-2 block text-[0.75rem] text-muted">Compte PayPal · paiement en 4x possible</span>
            </span>
          </label>
        </div>

        {!isWaitlist && method === "stripe" && (
          <div className="mt-6 grid gap-5 border border-line-soft bg-milk p-5 sm:grid-cols-2">
            <Field label="Titulaire de la carte *" className="sm:col-span-2">
              <input value={form.cardName} onChange={(event) => update("cardName", event.target.value)} autoComplete="cc-name" placeholder="CAMILLE PERRIN" aria-invalid={Boolean(errors.cardName)} />
              {errors.cardName && (
                <span data-error="true" className="text-[0.72rem] text-deep">
                  {errors.cardName}
                </span>
              )}
            </Field>
            <Field label="Numéro de carte *" className="sm:col-span-2">
              <input
                value={form.cardNumber}
                onChange={(event) => update("cardNumber", groupCard(event.target.value))}
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                aria-invalid={Boolean(errors.cardNumber)}
              />
              {errors.cardNumber && (
                <span data-error="true" className="text-[0.72rem] text-deep">
                  {errors.cardNumber}
                </span>
              )}
            </Field>
            <Field label="Expiration *">
              <input value={form.cardExpiry} onChange={(event) => update("cardExpiry", formatExpiry(event.target.value))} inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" aria-invalid={Boolean(errors.cardExpiry)} />
              {errors.cardExpiry && (
                <span data-error="true" className="text-[0.72rem] text-deep">
                  {errors.cardExpiry}
                </span>
              )}
            </Field>
            <Field label="Cryptogramme *">
              <input
                value={form.cardCvc}
                onChange={(event) => update("cardCvc", event.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                aria-invalid={Boolean(errors.cardCvc)}
              />
              {errors.cardCvc && (
                <span data-error="true" className="text-[0.72rem] text-deep">
                  {errors.cardCvc}
                </span>
              )}
            </Field>
            <p className="text-[0.7rem] text-muted sm:col-span-2">
              🔒 Champs de démonstration : aucune donnée bancaire n’est envoyée, stockée ni traitée.
            </p>
          </div>
        )}

        {!isWaitlist && method === "paypal" && (
          <div className="mt-6 border border-line-soft bg-milk p-5">
            <Field label="Email de votre compte PayPal *">
              <input type="email" value={form.paypalEmail} onChange={(event) => update("paypalEmail", event.target.value)} placeholder="prenom@email.com" aria-invalid={Boolean(errors.paypalEmail)} />
              {errors.paypalEmail && (
                <span data-error="true" className="text-[0.72rem] text-deep">
                  {errors.paypalEmail}
                </span>
              )}
            </Field>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-muted">
              Après validation, vous seriez redirigée vers PayPal pour confirmer le paiement de <strong className="text-char">{formatPrice(dueToday)}</strong>, puis ramenée sur cette page.
            </p>
            <p className="mt-2 text-[0.7rem] text-muted">Démonstration frontend : aucune redirection ni transaction réelle.</p>
          </div>
        )}
      </fieldset>

      {/* Récapitulatif */}
      <div className="mt-9 border border-line-soft bg-blush p-6">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">Récapitulatif</p>
        <dl className="mt-4 space-y-2.5 text-[0.85rem]">
          <SummaryRow label="Formation" value={formation.title} />
          <SummaryRow label="Tarif total" value={formatPrice(total)} />
          <SummaryRow label={isWaitlist ? "À régler" : "À régler aujourd’hui"} value={formatPrice(dueToday)} strong />
          {!isWaitlist && balance > 0 ? <SummaryRow label="Solde le jour 1" value={formatPrice(balance)} /> : null}
        </dl>
        {isWaitlist ? <Badge tone="rose" className="mt-5">Liste d’attente — aucun débit</Badge> : null}
      </div>

      <label className="mt-6 flex items-start gap-3 text-[0.78rem] leading-relaxed text-muted">
        <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1" aria-invalid={Boolean(errors.consent)} />
        <span>
          J’accepte les conditions générales de vente, la politique d’annulation et le traitement de mes informations pour cette inscription. *
        </span>
      </label>
      {errors.consent && (
        <p data-error="true" role="alert" className="mt-2 text-[0.72rem] text-deep">
          {errors.consent}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "processing" || sessions.length === 0}
        className="mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-3 border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "processing" ? (
          <>
            <span aria-hidden className="h-3.5 w-3.5 animate-spin rounded-full border border-milk/40 border-t-milk" />
            Traitement en cours…
          </>
        ) : isWaitlist ? (
          "Rejoindre la liste d’attente"
        ) : method === "stripe" ? (
          `Payer ${formatPrice(dueToday)} par carte`
        ) : (
          `Payer ${formatPrice(dueToday)} avec PayPal`
        )}
      </button>

      <p className="mt-4 text-center text-[0.7rem] text-muted">
        Maquette frontend — aucun paiement n’est réellement traité et aucune donnée n’est transmise.
      </p>
    </form>
  );
}

/* ----------------------------------------------------------- fragments */

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 border-b border-line-soft pb-2 last:border-0", strong && "pt-1")}>
      <dt className="text-muted">{label}</dt>
      <dd className={strong ? "font-display text-[1.4rem] leading-none" : ""}>{value}</dd>
    </div>
  );
}

function StripeMark() {
  return (
    <span className="flex items-center gap-2">
      <span className="inline-flex h-6 items-center rounded-[3px] bg-[#635bff] px-2 text-[0.62rem] font-semibold tracking-[0.06em] text-white">stripe</span>
      <span className="font-display text-[1.15rem] leading-none">Carte bancaire</span>
    </span>
  );
}

function PaypalMark() {
  return (
    <span className="flex items-center gap-2">
      <span className="inline-flex h-6 items-center rounded-[3px] bg-[#003087] px-2 text-[0.62rem] font-semibold tracking-[0.02em] text-white">
        Pay<span className="text-[#009cde]">Pal</span>
      </span>
      <span className="font-display text-[1.15rem] leading-none">PayPal</span>
    </span>
  );
}
