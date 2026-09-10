import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, KeyValue } from "@/components/ui";
import { img } from "@/lib/mock/images";
import { openingNote, contactReasons } from "@/lib/mock/content";
import { school } from "@/lib/mock/site";

export const metadata: Metadata = {
  title: "Contacter l’académie",
  description: "Contactez Smirnova School : demande de programme, inscription à une formation, formation intra-institut ou partenariat institut. Paris et international.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-line-soft bg-milk">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 pt-16 pb-12 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12 lg:pt-24 lg:pb-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Parlons de votre évolution</Eyebrow>
              <h1 className="mt-6 font-display text-[clamp(2.8rem,7.4vw,5rem)] leading-[0.9] uppercase">
                Contacter
                <em className="block text-deep">l’académie</em>
              </h1>
              <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-char">
                Une question sur un programme, un prérequis, une session internationale ou un format intra-institut ? Écrivez-nous : nous vous orientons vers la formation adaptée à votre niveau.
              </p>
              <dl className="mt-9 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                <KeyValue label="Email" value={school.email} />
                <KeyValue label="Téléphone" value={school.phone} />
                <KeyValue label="WhatsApp" value={school.whatsapp} />
                <KeyValue label="Instagram" value={school.instagram} />
              </dl>
              <div className="mt-8 flex flex-wrap gap-2">
                {contactReasons.map((reason) => (
                  <span key={reason} className="border border-line-soft px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-muted">
                    {reason}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal variant="scale" delay={120} className="lg:col-span-6">
            <div className="zoom-frame border border-line-soft">
              <img src={img.lounge} alt="Espace d’accueil de l’académie Smirnova School" className="aspect-4/3 w-full object-cover saturate-[.85]" />
            </div>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3rem)] leading-[0.95] uppercase">Écrivez-nous</h2>
              <p className="mt-4 max-w-lg text-[0.92rem] text-muted">Réponse sous 48 heures ouvrées. Les demandes d’inscription restent prioritaires.</p>
            </Reveal>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={90}>
              <div className="border border-line-soft bg-blush p-7">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted">L’académie</p>
                <p className="mt-4 font-display text-[1.7rem] leading-tight">{school.address}</p>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-char">{openingNote}</p>
                <ul className="mt-6 space-y-2 border-t border-line-soft pt-5 text-[0.8rem]">
                  {school.hours.map((slot) => (
                    <li key={slot.label} className="flex justify-between gap-4">
                      <span className="text-muted">{slot.label}</span>
                      <span>{slot.value}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.75rem] text-muted">Langues parlées : {school.languages.join(" · ")}</p>
              </div>

              <div className="mt-4 grid gap-4">
                {[
                  { title: "Réserver une place", text: "Choisissez une formation puis complétez le formulaire de réservation intégré à sa fiche.", href: "/#formations", cta: "Choisir une formation" },
                  { title: "Consulter le planning", text: "Toutes les dates publiées, en France et à l’international.", href: "/planning", cta: "Voir le planning" },
                  { title: "Questions fréquentes", text: "Niveaux, prérequis, matériel, paiement et annulation.", href: "/faq", cta: "Lire la FAQ" },
                ].map((card) => (
                  <div key={card.title} className="border border-line-soft bg-ivory p-6">
                    <p className="font-display text-[1.3rem] uppercase">{card.title}</p>
                    <p className="mt-2 text-[0.84rem] text-muted">{card.text}</p>
                    <Link href={card.href} className="mt-4 inline-flex text-[0.6rem] font-medium uppercase tracking-[0.16em] text-deep underline decoration-line underline-offset-4">
                      {card.cta}
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-line-soft bg-cream">
        <div className="mx-auto grid max-w-[1500px] gap-3 px-5 py-16 sm:grid-cols-3 sm:px-8 lg:px-12">
          {[img.technician, img.polishChoice, img.care].map((source, index) => (
            <Reveal key={source} variant="scale" delay={index * 70} className="zoom-frame border border-line-soft">
              <img src={source} alt="Intérieur et matériel professionnel de l’académie" loading="lazy" className="aspect-4/3 w-full object-cover saturate-[.85]" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
