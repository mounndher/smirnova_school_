import type { Metadata } from "next";
import { ConfirmationView } from "@/components/confirmation/ConfirmationView";

export const metadata: Metadata = {
  title: "Réservation confirmée",
  description: "Confirmation de votre réservation de formation Smirnova School.",
  alternates: { canonical: "/confirmation" },
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return <ConfirmationView />;
}
