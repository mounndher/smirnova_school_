import { isoInDays } from "../utils";
import { getFormation } from "./formations";

export type SessionSlot = { id: string; start: string; end: string; seats: number; taken: number };

export type Session = {
  id: string;
  slug: string;
  start: string;
  end: string;
  city: string;
  country: string;
  venue: string;
  type: "Présentiel" | "Intensif";
  price: number;
  slots: SessionSlot[];
};

const slot = (id: string, start: string, end: string, seats: number, taken: number): SessionSlot => ({ id, start, end, seats, taken });

export const sessions: Session[] = [
  {
    id: "S-1042", slug: "beaute-des-mains-semi-permanent", start: isoInDays(7, 9), end: isoInDays(7, 17), city: "Paris", country: "France",
    venue: "Académie Smirnova · Le Marais", type: "Présentiel", price: 450,
    slots: [slot("S-1042-A", "09:00", "12:30", 8, 7), slot("S-1042-B", "13:30", "17:00", 8, 5)],
  },
  {
    id: "S-1055", slug: "manucure-a-la-cire", start: isoInDays(14, 9), end: isoInDays(15, 17), city: "Paris", country: "France",
    venue: "Académie Smirnova · Le Marais", type: "Présentiel", price: 890,
    slots: [slot("S-1055-A", "09:00", "17:30", 8, 6), slot("S-1055-B", "14:00", "18:00", 8, 8)],
  },
  {
    id: "S-1063", slug: "manucure-russe-technique-avancee", start: isoInDays(21, 9), end: isoInDays(22, 17), city: "Paris", country: "France",
    venue: "Académie Smirnova · Le Marais", type: "Présentiel", price: 990,
    slots: [slot("S-1063-A", "09:00", "17:00", 6, 5), slot("S-1063-B", "13:30", "18:00", 6, 2)],
  },
  {
    id: "S-1079", slug: "manucure-russe-perfectionnement", start: isoInDays(30, 9), end: isoInDays(30, 17), city: "Paris", country: "France",
    venue: "Académie Smirnova · Le Marais", type: "Intensif", price: 590,
    slots: [slot("S-1079-A", "09:00", "16:30", 6, 4)],
  },
  {
    id: "S-1086", slug: "nail-architecture-gel-chablon", start: isoInDays(35, 9), end: isoInDays(37, 17), city: "Paris", country: "France",
    venue: "Académie Smirnova · Le Marais", type: "Présentiel", price: 1490,
    slots: [slot("S-1086-A", "09:00", "17:30", 6, 5), slot("S-1086-B", "13:30", "18:00", 6, 1)],
  },
  {
    id: "S-1094", slug: "manucure-a-la-cire", start: isoInDays(42, 9), end: isoInDays(43, 17), city: "Lyon", country: "France",
    venue: "Académie partenaire · Presqu’île", type: "Présentiel", price: 890,
    slots: [slot("S-1094-A", "09:00", "17:30", 8, 3), slot("S-1094-B", "14:00", "18:00", 8, 1)],
  },
  {
    id: "S-1101", slug: "beaute-des-mains-semi-permanent", start: isoInDays(49, 9), end: isoInDays(49, 17), city: "Lyon", country: "France",
    venue: "Académie partenaire · Presqu’île", type: "Présentiel", price: 450,
    slots: [slot("S-1101-A", "09:00", "12:30", 8, 2), slot("S-1101-B", "13:30", "17:00", 8, 0)],
  },
  {
    id: "S-1108", slug: "beaute-des-mains-semi-permanent", start: isoInDays(56, 9), end: isoInDays(56, 17), city: "Bruxelles", country: "Belgique",
    venue: "Studio partenaire · Ixelles", type: "Présentiel", price: 490,
    slots: [slot("S-1108-A", "09:00", "12:30", 8, 4), slot("S-1108-B", "13:30", "17:00", 8, 2)],
  },
  {
    id: "S-1115", slug: "manucure-russe-technique-avancee", start: isoInDays(63, 9), end: isoInDays(64, 17), city: "Genève", country: "Suisse",
    venue: "Studio partenaire · Rive", type: "Présentiel", price: 1090,
    slots: [slot("S-1115-A", "09:30", "17:00", 6, 0), slot("S-1115-B", "13:30", "18:00", 6, 0)],
  },
  {
    id: "S-1122", slug: "nail-architecture-gel-chablon", start: isoInDays(70, 9), end: isoInDays(72, 17), city: "Bordeaux", country: "France",
    venue: "Académie partenaire · Chartrons", type: "Présentiel", price: 1490,
    slots: [slot("S-1122-A", "09:00", "17:30", 6, 1), slot("S-1122-B", "13:30", "18:00", 6, 0)],
  },
  {
    id: "S-1136", slug: "manucure-a-la-cire", start: isoInDays(84, 9), end: isoInDays(85, 17), city: "Bruxelles", country: "Belgique",
    venue: "Studio partenaire · Ixelles", type: "Présentiel", price: 940,
    slots: [slot("S-1136-A", "09:00", "17:30", 8, 2), slot("S-1136-B", "14:00", "18:00", 8, 0)],
  },
  {
    id: "S-1143", slug: "nail-architecture-gel-chablon", start: isoInDays(91, 9), end: isoInDays(93, 17), city: "Genève", country: "Suisse",
    venue: "Studio partenaire · Rive", type: "Présentiel", price: 1590,
    slots: [slot("S-1143-A", "09:00", "17:30", 6, 0), slot("S-1143-B", "13:30", "18:00", 6, 0)],
  },
];

export const seatsLeft = (session: Session) => session.slots.reduce((total, s) => total + Math.max(0, s.seats - s.taken), 0);
export const totalSeats = (session: Session) => session.slots.reduce((total, s) => total + s.seats, 0);
export const isFull = (session: Session) => seatsLeft(session) === 0;
export const openSlots = (session: Session) => session.slots.filter((s) => s.seats - s.taken > 0);

export const upcomingSessions = () =>
  [...sessions].filter((s) => new Date(s.start).getTime() >= Date.now()).sort((a, b) => +new Date(a.start) - +new Date(b.start));

export const sessionsByFormation = (slug: string) => upcomingSessions().filter((s) => s.slug === slug);

export const sessionWithFormation = (session: Session) => ({ session, formation: getFormation(session.slug) });

export const planningCities = ["Toutes les villes", ...Array.from(new Set(upcomingSessions().map((s) => s.city)))];
export const internationalSessions = () => upcomingSessions().filter((s) => s.country !== "France");

export const groupByMonth = (list: Session[]) =>
  list.reduce<Record<string, Session[]>>((acc, item) => {
    const key = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(item.start));
    acc[key] = [...(acc[key] ?? []), item];
    return acc;
  }, {});

export const findSession = (id: string) => sessions.find((s) => s.id === id);
export const findSlot = (sessionId: string, slotId: string) => findSession(sessionId)?.slots.find((s) => s.id === slotId);
