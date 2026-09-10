"use client";

import { useState } from "react";
import { Field } from "@/components/ui";
import { contactReasons } from "@/lib/mock/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", email: "", phone: "", city: "", reason: contactReasons[0], message: "" });

  const update = (key: keyof typeof values, value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Merci d’indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = "Adresse email invalide.";
    if (values.message.trim().length < 12) next.message = "Quelques mots de plus nous aideront à vous répondre.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-line-soft bg-ivory p-8 sm:p-10">
        <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full bg-deep text-2xl text-white">
          ✓
        </span>
        <h2 className="mt-6 font-display text-[2.1rem] leading-tight">Message transmis — démonstration</h2>
        <p className="mt-4 max-w-lg text-[0.9rem] leading-relaxed text-muted">
          Merci {values.name.split(" ")[0]}. Cette interface est une maquette frontend : aucune donnée n’est envoyée ni enregistrée. En production,
          votre demande serait transmise à l’académie avec un accusé de réception par email.
        </p>
        <dl className="mt-7 grid gap-4 border-t border-line-soft pt-6 sm:grid-cols-2">
          {[
            ["Motif", values.reason],
            ["Email", values.email],
            ["Ville", values.city || "Non précisée"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</dt>
              <dd className="mt-1 text-[0.85rem]">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues({ name: "", email: "", phone: "", city: "", reason: contactReasons[0], message: "" });
          }}
          className="mt-8 inline-flex min-h-[46px] items-center border border-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:bg-blush-deep"
        >
          Rédiger un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="border border-line-soft bg-ivory p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom et prénom *">
          <input value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "err-name" : undefined} />
          {errors.name && (
            <span id="err-name" className="text-[0.72rem] text-deep">
              {errors.name}
            </span>
          )}
        </Field>
        <Field label="Email *">
          <input type="email" value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} />
          {errors.email && (
            <span id="err-email" className="text-[0.72rem] text-deep">
              {errors.email}
            </span>
          )}
        </Field>
        <Field label="Téléphone">
          <input type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" />
        </Field>
        <Field label="Ville">
          <input value={values.city} onChange={(event) => update("city", event.target.value)} autoComplete="address-level2" />
        </Field>
        <Field label="Motif de la demande" className="sm:col-span-2">
          <select value={values.reason} onChange={(event) => update("reason", event.target.value)}>
            {contactReasons.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
        </Field>
        <Field label="Votre message *" className="sm:col-span-2">
          <textarea rows={6} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "err-message" : undefined} />
          {errors.message && (
            <span id="err-message" className="text-[0.72rem] text-deep">
              {errors.message}
            </span>
          )}
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-5 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex max-w-sm items-start gap-3 text-[0.72rem] leading-relaxed text-muted">
          <input type="checkbox" defaultChecked className="mt-1" />
          J’accepte d’être recontactée au sujet de ma demande.
        </label>
        <button
          type="submit"
          className="inline-flex min-h-[50px] items-center justify-center border border-ink bg-ink px-8 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
        >
          Envoyer la demande
        </button>
      </div>
      <p className="mt-4 text-[0.68rem] text-muted">Maquette frontend — aucun envoi réel, aucune donnée conservée.</p>
    </form>
  );
}
