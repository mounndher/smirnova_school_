/**
 * NOTE — SMIRNOVA SCHOOL is a FRONTEND-ONLY project.
 * No application code imports this file: there is no database connection, no query,
 * no API and no server-side logic in the product. It is kept solely because the
 * hosting sandbox bootstrap runs `drizzle-kit push` against it.
 * All content shown in the UI comes from local mock data in `src/lib/mock/*`.
 */
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/* ---------------------------------- LOCATIONS --------------------------------- */
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull().default("France"),
  address: text("address"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* --------------------------------- FORMATIONS --------------------------------- */
export const formations = pgTable(
  "formations",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    category: text("category").notNull(), // MANUCURE | WAX | RUSSE | ARCHITECTURE
    level: text("level").notNull(), // DEBUTANT | INTERMEDIAIRE | AVANCE
    shortDescription: text("short_description").notNull(),
    description: text("description"),
    audience: text("audience"),
    prerequisites: text("prerequisites"),
    certification: text("certification"),
    materials: text("materials"),
    durationLabel: text("duration_label"),
    priceCents: integer("price_cents"),
    image: text("image"),
    objectives: jsonb("objectives").$type<string[]>().default([]),
    techniques: jsonb("techniques").$type<string[]>().default([]),
    includes: jsonb("includes").$type<string[]>().default([]),
    program: jsonb("program")
      .$type<{ title: string; items: string[] }[]>()
      .default([]),
    faq: jsonb("faq").$type<{ q: string; a: string }[]>().default([]),
    gallery: jsonb("gallery").$type<string[]>().default([]),
    instructor: text("instructor").default("Elena Smirnova"),
    featured: boolean("featured").notNull().default(false),
    status: text("status").notNull().default("PUBLISHED"), // DRAFT | PUBLISHED | ARCHIVED
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("formations_slug_idx").on(t.slug)],
);

/* ---------------------------------- SESSIONS ---------------------------------- */
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  formationId: integer("formation_id").notNull(),
  locationId: integer("location_id").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  startTime: text("start_time").default("09:30"),
  endTime: text("end_time").default("17:30"),
  capacity: integer("capacity").notNull().default(8),
  booked: integer("booked").notNull().default(0),
  priceCents: integer("price_cents"),
  depositCents: integer("deposit_cents"),
  status: text("status").notNull().default("OPEN"), // DRAFT | OPEN | FULL | CANCELLED | COMPLETED
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ---------------------------------- STUDENTS ---------------------------------- */
export const students = pgTable(
  "students",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    country: text("country"),
    city: text("city"),
    instagram: text("instagram"),
    profession: text("profession"),
    level: text("level"),
    company: text("company"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("students_email_idx").on(t.email)],
);

/* ---------------------------------- BOOKINGS ---------------------------------- */
export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").notNull(),
    studentId: integer("student_id").notNull(),
    sessionId: integer("session_id").notNull(),
    seats: integer("seats").notNull().default(1),
    amountCents: integer("amount_cents").notNull().default(0),
    paidCents: integer("paid_cents").notNull().default(0),
    paymentStatus: text("payment_status").notNull().default("PENDING"), // PENDING | DEPOSIT_PAID | PAID | REFUNDED | FAILED
    status: text("status").notNull().default("PENDING"), // PENDING | CONFIRMED | CANCELLED | REFUNDED | COMPLETED
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("bookings_order_idx").on(t.orderNumber)],
);

/* ---------------------------------- PAYMENTS ---------------------------------- */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  amountCents: integer("amount_cents").notNull(),
  kind: text("kind").notNull().default("FULL"), // FULL | DEPOSIT
  method: text("method").notNull().default("CARD"),
  status: text("status").notNull().default("SUCCEEDED"), // SUCCEEDED | FAILED | PENDING
  reference: text("reference").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ---------------------------------- WAITLIST ---------------------------------- */
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  studentId: integer("student_id").notNull(),
  position: integer("position").notNull().default(1),
  status: text("status").notNull().default("WAITING"), // WAITING | NOTIFIED | CONVERTED | CLOSED
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* -------------------------------- CERTIFICATES -------------------------------- */
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  studentId: integer("student_id").notNull(),
  code: text("code").notNull(),
  issuedAt: timestamp("issued_at").notNull().defaultNow(),
});

/* -------------------------------- TESTIMONIALS -------------------------------- */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  profession: text("profession"),
  city: text("city"),
  instagram: text("instagram"),
  photo: text("photo"),
  text: text("text").notNull(),
  status: text("status").notNull().default("PUBLISHED"), // DRAFT | PUBLISHED
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ---------------------------------- GALLERY ----------------------------------- */
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  category: text("category").notNull().default("RESULTATS"),
  caption: text("caption"),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

/* ------------------------------------ FAQ ------------------------------------- */
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("GENERAL"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* -------------------------------- NOTIFICATIONS ------------------------------- */
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // BOOKING_CONFIRMATION | PAYMENT_CONFIRMATION | REMINDER_7D ...
  toEmail: text("to_email").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("QUEUED"), // QUEUED | SENT | FAILED
  bookingId: integer("booking_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Formation = typeof formations.$inferSelect;
export type SessionRow = typeof sessions.$inferSelect;
export type LocationRow = typeof locations.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Student = typeof students.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
