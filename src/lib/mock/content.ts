import { img } from "./images";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  city: string;
  instagram: string;
  formation: string;
  quote: string;
  published: boolean;
};

export const testimonials: Testimonial[] = [
  { id: "T-01", name: "Camille Perrin", role: "Prothésiste ongulaire", city: "Paris 11ᵉ", instagram: "@camille.ongles", formation: "Manucure russe", published: true, quote: "J’ai compris en deux jours ce que je ratais depuis trois ans. La correction du geste était immédiate, précise et jamais culpabilisante. Mon temps de pose a diminué de vingt minutes." },
  { id: "T-02", name: "Sofia Benali", role: "Gérante d’institut", city: "Lyon", instagram: "@institut.sofia", formation: "Manucure à la cire", published: true, quote: "Mes clientes me disent enfin que la manucure est confortable. La méthode à la cire a changé l’expérience en cabine, et la tenue du semi-permanent a nettement progressé." },
  { id: "T-03", name: "Anna Kovalenko", role: "Nail artist", city: "Genève", instagram: "@anna.nailartist", formation: "Manucure russe", published: true, quote: "Le travail à sec à la fraise a complètement changé ma vitesse en cabine. Observation du geste, exercices guidés puis pratique complète : mes finitions sont nettes pour la première fois." },
  { id: "T-04", name: "Élodie Marchetti", role: "Technicienne indépendante", city: "Bordeaux", instagram: "@elodie.beautyroom", formation: "Nail Architecture", published: true, quote: "Le module rééquilibrage vaut à lui seul le déplacement. Je facture désormais ce service sereinement, avec des ongles solides et un contact client plus simple." },
  { id: "T-05", name: "Yasmine Cherif", role: "Débutante reconvertie", city: "Marseille", instagram: "@yas.onglerie", formation: "Beauté des mains & semi-permanent", published: true, quote: "Je partais de zéro. Protocole, hygiène, préparation : tout était structuré. Trois semaines après, je prenais mes premières clientes avec confiance." },
  { id: "T-06", name: "Inès Lefort", role: "Éducatrice indépendante", city: "Bruxelles", instagram: "@ines.formation", formation: "Perfectionnement manucure russe", published: false, quote: "Le diagnostic personnalisé transmis avant la session m’a fait gagner un temps précieux. Je suis repartie avec un plan de progression très concret." },
];

export const publishedTestimonials = () => testimonials.filter((t) => t.published);

export type GalleryItem = { id: string; src: string; category: string; caption: string; span?: "tall" | "wide" | "normal" };

export const galleryCategories = ["Tout", "Formation", "Résultats", "Avant / Après", "Élèves", "Techniques"];

export const galleryItems: GalleryItem[] = [
  { id: "G-01", src: img.hero, category: "Résultats", caption: "Nude lacté, finition brillante", span: "tall" },
  { id: "G-02", src: img.training, category: "Formation", caption: "Démonstration en petit groupe" },
  { id: "G-03", src: img.glitter, category: "Résultats", caption: "Finition pailletée rose poudré" },
  { id: "G-04", src: img.care, category: "Techniques", caption: "Travail à sec du pourtour" },
  { id: "G-05", src: img.polishChoice, category: "Élèves", caption: "Travail d’élève — manucure russe" },
  { id: "G-06", src: img.nailArt, category: "Avant / Après", caption: "Reconstruction de l’architecture", span: "wide" },
  { id: "G-07", src: img.manicureSession, category: "Formation", caption: "Postes de travail individuels" },
  { id: "G-08", src: img.bronze, category: "Résultats", caption: "French inversée encapsulée" },
  { id: "G-09", src: img.editorial, category: "Techniques", caption: "Préparation de la ligne de sourire" },
  { id: "G-10", src: img.bareNails, category: "Techniques", caption: "Préparation sans agression" },
  { id: "G-11", src: img.bridal, category: "Élèves", caption: "Projet mariée d’une ancienne élève" },
  { id: "G-12", src: img.shiny, category: "Résultats", caption: "Dégradé blush sur ongles naturels" },
];

export const faqs = [
  { question: "Quel niveau faut-il avoir pour se former chez Smirnova School ?", answer: "Chaque formation affiche son niveau d’entrée. Les modules « Débutant » ne demandent aucun prérequis technique, tandis que les sessions « Intermédiaire » et « Avancé » supposent une pratique régulière en institut ou à domicile." },
  { question: "Les formations sont-elles adaptées aux débutantes ?", answer: "Oui. La Manucure à la cire et la Beauté des mains & semi-permanent ont été conçues comme des parcours d’entrée : protocole complet, hygiène, préparation et finition, avec beaucoup de pratique encadrée." },
  { question: "Quels sont les prérequis exacts ?", answer: "Ils sont listés sur chaque fiche formation. Pour les modules avancés, une expérience minimale et des modèles sont demandés afin que le groupe travaille au même rythme." },
  { question: "Le matériel est-il fourni pendant la formation ?", answer: "Oui. Pièce à main, fraises de travail, gels, chablons, lampes et consommables sont disponibles sur place. Certains modules incluent un kit offert, indiqué dans la section « Ce que vous recevez »." },
  { question: "La formation est-elle certifiante ?", answer: "Chaque participant reçoit une attestation de formation professionnelle Smirnova School, remise sur place après évaluation du geste. Ce n’est pas un diplôme d’État." },
  { question: "Comment réserver ma place ?", answer: "Choisissez la formation, la date, votre créneau horaire puis validez vos informations. Le parcours de réservation se termine par un récapitulatif et un écran de confirmation avec votre numéro de dossier." },
  { question: "Comment se déroule le paiement ?", answer: "Vous pouvez régler l’intégralité du montant ou verser un acompte pour bloquer votre place. Le solde est réglé au plus tard le premier jour de la formation, sur présentation de votre dossier." },
  { question: "Puis-je modifier ou annuler ma réservation ?", answer: "Une modification de créneau reste possible tant que la session n’est pas complète. Les conditions d’annulation et de report figurent dans les CGV et dans votre espace élève." },
  { question: "Que se passe-t-il si la formation est complète ?", answer: "Le bouton de réservation bascule automatiquement en inscription sur liste d’attente. Vous êtes contactée dès qu’une place se libère, dans l’ordre d’inscription." },
  { question: "Comment fonctionne la liste d’attente ?", answer: "Votre position est enregistrée et visible dans votre espace élève. Aucun paiement n’est demandé tant que la place n’est pas confirmée." },
];

export const contactReasons = ["Inscription à une formation", "Demande de programme détaillé", "Formation intra-institut", "Devenir partenaire", "Autre demande"];

export const openingNote = "L’académie reçoit sur rendez-vous du lundi au samedi. Les sessions se déroulent en petit groupe, dans un studio équipé de postes individuels.";
