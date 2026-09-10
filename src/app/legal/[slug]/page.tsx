import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { school } from "@/lib/mock/site";

const documents = {
  "mentions-legales": {
    title: "Mentions légales",
    intro: "Informations relatives à l’éditeur du site et à l’académie Smirnova School.",
    sections: [
      ["Éditeur", `${school.name} — académie de formation professionnelle en manucure.\nAdresse : ${school.address}\nEmail : ${school.email}\nTéléphone : ${school.phone}`],
      ["Direction de la publication", `${school.founder}, ${school.founderRole.toLowerCase()}.`],
      ["Hébergement", "Informations d’hébergement fournies sur demande écrite à l’adresse email de l’académie."],
      ["Propriété intellectuelle", "L’ensemble des contenus (textes, photographies, identité visuelle) est protégé. Toute reproduction sans autorisation écrite est interdite."],
    ],
  },
  cgv: {
    title: "Conditions générales de vente",
    intro: "Cadre applicable aux inscriptions aux formations Smirnova School.",
    sections: [
      ["Inscription", "La réservation est effective après réception du dossier complet. Les places sont attribuées dans l’ordre d’inscription."],
      ["Paiement", "Le règlement peut être effectué en une fois ou par acompte. Le solde est exigible au plus tard le premier jour de la formation."],
      ["Report et annulation", "Toute annulation notifiée plus de 14 jours avant la session donne lieu à un report ou à un remboursement. Passé ce délai, l’acompte reste acquis, sauf cas de force majeure justifié."],
      ["Liste d’attente", "L’inscription sur liste d’attente n’entraîne aucun engagement financier. Elle est confirmée par email dès qu’une place se libère."],
      ["Formations annulées", "En cas d’annulation par l’académie, les sommes versées sont intégralement remboursées ou reportées au choix de la participante."],
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    intro: "Traitement des données transmises lors d’une demande de contact ou d’une inscription.",
    sections: [
      ["Données collectées", "Identité, coordonnées, informations professionnelles et, le cas échéant, préférences alimentaires ou contraintes signalées pour l’organisation de la session."],
      ["Finalités", "Gestion des inscriptions, édition des conventions et attestations, information sur les prochaines sessions et suivi pédagogique."],
      ["Conservation", "Les données sont conservées trois ans après la dernière formation suivie, puis supprimées."],
      ["Vos droits", `Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à ${school.email}.`],
    ],
  },
  cookies: {
    title: "Politique relative aux cookies",
    intro: "Ce site de démonstration n’utilise aucun cookie publicitaire ni outil de suivi marketing.",
    sections: [
      ["Cookies essentiels", "Uniquement les éléments techniques nécessaires au fonctionnement de la navigation."],
      ["Mesure d’audience", "Aucun traceur tiers n’est déposé dans cette version de démonstration."],
      ["Gestion", "Vous pouvez configurer votre navigateur pour refuser les cookies à tout moment."],
    ],
  },
} as const;

type Slug = keyof typeof documents;

export function generateStaticParams() {
  return Object.keys(documents).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const document = documents[slug as Slug];
  if (!document) return {};
  return { title: document.title, description: document.intro, alternates: { canonical: `/legal/${slug}` } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const document = documents[slug as Slug];
  if (!document) notFound();

  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto max-w-[1000px] px-5 pt-16 pb-12 sm:px-8 lg:pt-24 lg:pb-16">
          <Reveal>
            <nav aria-label="Fil d’Ariane" className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              <Link href="/" className="hover:text-deep">
                Accueil
              </Link>
              <span aria-hidden> / </span>
              <span className="text-ink">{document.title}</span>
            </nav>
            <Eyebrow className="mt-8">Informations juridiques</Eyebrow>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.92] uppercase">{document.title}</h1>
            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-char">{document.intro}</p>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="divide-y divide-line-soft border-y border-line-soft">
          {document.sections.map(([title, content], index) => (
            <Reveal key={title} delay={index * 60} className="py-8">
              <h2 className="font-display text-[1.7rem] uppercase">{title}</h2>
              <p className="mt-4 whitespace-pre-line text-[0.92rem] leading-relaxed text-muted">{content}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex min-h-[46px] items-center border border-ink bg-ink px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-milk transition-all duration-500 hover:border-deep hover:bg-deep"
          >
            Une question ? Nous écrire
          </Link>
          <Link href="/faq" className="inline-flex min-h-[46px] items-center border border-ink/25 px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 hover:border-ink hover:bg-blush-deep">
            Consulter la FAQ
          </Link>
        </div>
        <p className="mt-8 text-[0.72rem] text-muted">
          Contenu de démonstration frontend — les textes juridiques définitifs doivent être validés par l’académie avant mise en ligne.
        </p>
      </section>
    </>
  );
}
