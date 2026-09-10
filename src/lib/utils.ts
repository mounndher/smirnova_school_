/** Frontend-only date & formatting utilities. No network, no backend. */

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

export const isoInDays = (days: number, hour = 9, minute = 30) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const LOCALE = "fr-FR";

export const formatPrice = (value?: number | null) =>
  value == null ? "Sur demande" : new Intl.NumberFormat(LOCALE, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

export const formatDateLong = (iso?: string | null, withYear = true) =>
  iso ? new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "long", ...(withYear ? { year: "numeric" } : {}) }).format(new Date(iso)) : "—";

export const formatDateShort = (iso?: string | null) =>
  iso ? new Intl.DateTimeFormat(LOCALE, { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso)) : "—";

export const formatMonthYear = (iso: string) => new Intl.DateTimeFormat(LOCALE, { month: "long", year: "numeric" }).format(new Date(iso));

export const formatWeekday = (iso: string) => new Intl.DateTimeFormat(LOCALE, { weekday: "long" }).format(new Date(iso));

export const formatTimeRange = (start: string, end: string) => `${start} – ${end}`;

export const isUpcoming = (iso: string) => new Date(iso).getTime() >= Date.now();

export const relativeDays = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);

export const slugifyKey = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
