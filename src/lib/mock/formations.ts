import { img } from "./images";

export type Level = "Débutant" | "Intermédiaire" | "Avancé";
export type ProgramModule = { title: string; items: string[] };
export type FaqItem = { question: string; answer: string };

export type Formation = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: Level;
  format: string;
  duration: string;
  hours: number;
  price: number;
  deposit: number;
  image: string;
  gallery: string[];
  short: string;
  description: string[];
  certification: string;
  prerequisites: string[];
  objectives: string[];
  techniques: string[];
  materials: string[];
  includes: string[];
  program: ProgramModule[];
  faq: FaqItem[];
  instructor: string;
  featured?: boolean;
};

export const formations: Formation[] = [
  {
    slug: "manucure-a-la-cire",
    title: "Manucure à la cire",
    subtitle: "La formation signature de l’académie",
    category: "Wax Manicure",
    level: "Débutant",
    format: "En présentiel",
    duration: "2 jours · 14 h",
    hours: 14,
    price: 890,
    deposit: 250,
    image: img.manicureSession,
    gallery: [img.manicureSession, img.glovedWork, img.care, img.bareNails],
    short: "Maîtrisez la manucure à la cire : préparation, confort client et finition impeccable sans lame.",
    description: [
      "La manucure à la cire repose sur une idée simple : assouplir avant de nettoyer. La cire tiède enveloppe le pourtour de l’ongle, détend la peau et permet un nettoyage précis sans lame ni geste agressif.",
      "Cette formation complète vous apprend le protocole intégral, du diagnostic de la main jusqu’à la finition polie, avec un travail approfondi sur la posture et le contrôle de l’outil.",
      "Vous repartez avec une méthode reproductible, un temps de service maîtrisé et un rendu net qui fidélise la clientèle.",
    ],
    certification: "Attestation de formation professionnelle Smirnova School remise à l’issue des deux journées.",
    prerequisites: ["Aucun prérequis technique", "Convention de formation acceptée", "Modèle requis pour la 2ᵉ journée"],
    objectives: [
      "Réaliser un diagnostic complet de la main et de l’ongle",
      "Appliquer le protocole de manucure à la cire de A à Z",
      "Travailler le pourtour sans lame ni lésion",
      "Structurer une gestuelle confortable et rapide",
      "Assurer une finition nette et durable",
    ],
    techniques: ["Diagnostic cutané", "Manucure à la cire tiède", "Coupe sèche encadrée", "Limage de forme", "Ponçage de la surface", "Massage des mains", "Vernis semi-permanent"],
    materials: ["Bain de cire et recharges", "Ciseaux et pinces de précision", "Fraises de finition", "Limes et polissoirs", "Cabine et protocoles d’hygiène"],
    includes: ["Support pédagogique imprimé", "Prêt du matériel professionnel", "Modèle fourni le jour 2", "Déjeuner léger les deux jours", "Attestation de fin de formation", "Accès au groupe privé des anciennes élèves"],
    program: [
      { title: "Jour 1 — Fondamentaux", items: ["Anatomie de l’ongle et de la peau", "Hygiène, désinfection et poste de travail", "Diagnostic et lecture de la main", "Protocole de manucure à la cire", "Démonstration commentée puis reproduction guidée"] },
      { title: "Jour 2 — Maîtrise & finition", items: ["Perfectionnement du geste et de la posture", "Gestion des cas difficiles et peaux sensibles", "Finition, polissage et ligne de sourire nette", "Vernis semi-permanent : pose et tenue", "Mise en pratique sur modèle avec correction individuelle"] },
    ],
    faq: [
      { question: "Faut-il déjà savoir poser le semi-permanent ?", answer: "Non. La pose est enseignée en fin de parcours, sur ongles préparés selon notre protocole." },
      { question: "Le modèle est-il obligatoire ?", answer: "Il est demandé pour la deuxième journée afin de travailler en conditions réelles. Nous pouvons vous aider à en trouver un." },
      { question: "Combien de participantes par session ?", answer: "Huit participantes maximum, avec un poste de travail individuel complet." },
    ],
    instructor: "Elena Smirnova",
    featured: true,
  },
  {
    slug: "manucure-russe-technique-avancee",
    title: "Manucure russe",
    subtitle: "Technique avancée au travail du pourtour à sec",
    category: "Manucure russe",
    level: "Intermédiaire",
    format: "En présentiel",
    duration: "2 jours · 14 h",
    hours: 14,
    price: 990,
    deposit: 300,
    image: img.care,
    gallery: [img.care, img.manicureSession, img.glitter, img.technician],
    short: "Le travail à sec à la fraise pour une cuticule parfaitement nette et une repousse impeccable.",
    description: [
      "La manucure russe consiste à travailler le pourtour de l’ongle à sec, à la fraise, pour obtenir une netteté impossible à atteindre à la lame.",
      "Cette session intensive détaille chaque fraise, chaque angle, chaque pression. Vous apprendrez à lire la peau avant d’intervenir, à respecter l’ongle naturel et à gagner en rapidité sans sacrifier la précision.",
      "La formation alterne démonstrations en direct, exercices de précision sur gabarits puis pratique complète sur modèles.",
    ],
    certification: "Attestation de formation professionnelle Smirnova School délivrée après évaluation du geste.",
    prerequisites: ["Maîtriser la pose de semi-permanent", "Pratique régulière en institut ou à domicile", "Modèle requis pour la 2ᵉ journée"],
    objectives: [
      "Choisir la fraise adaptée à chaque zone et chaque peau",
      "Travailler à sec sans chauffer l’ongle",
      "Traiter les cuticules jusqu’à la ligne de sourire",
      "Réduire le temps de service tout en gagnant en netteté",
      "Prévenir les irritations et les rougeurs post-service",
    ],
    techniques: ["Coupe sèche à la fraise", "Traitement du sinus et du sillon", "Ligne de sourire", "Ponçage doux", "Finition mate ou brillante", "Protocole d’hygiène renforcé"],
    materials: ["Pièce à main et micromoteur", "Assortiment de fraises professionnelles", "Embouts diamantés et céramique", "Cabine d’aspiration", "Désinfectants homologués"],
    includes: ["Support pédagogique détaillé", "Assortiment de fraises offert", "Modèles fournis", "Déjeuner léger", "Attestation de fin de formation", "Session de suivi en visio à 30 jours"],
    program: [
      { title: "Jour 1 — Le geste à sec", items: ["Rappel anatomique appliqué au travail à sec", "Éventail complet des fraises et vitesses", "Position des mains et appuis stables", "Traitement du pourtour pas à pas", "Exercices de précision sur gabarits"] },
      { title: "Jour 2 — Vitesse & netteté", items: ["Ligne de sourire parfaite", "Gestion des cuticules fines et des peaux réactives", "Optimisation du temps de service", "Pratique sur deux modèles avec correction individuelle", "Plan de progression pour les 30 jours suivants"] },
    ],
    faq: [
      { question: "La formation convient-elle aux techniciennes nouvellement installées ?", answer: "Oui, si vous pratiquez déjà la manucure semi-permanente régulièrement. Un module de remise à niveau du pourtour peut être ajouté." },
      { question: "Le matériel est-il fourni ?", answer: "Pièce à main, embouts et fraises de travail sont disponibles sur place. Un assortiment de fraises vous est offert à l’issue de la session." },
      { question: "Faut-il prévoir un modèle les deux jours ?", answer: "Un modèle est nécessaire le deuxième jour uniquement." },
    ],
    instructor: "Elena Smirnova",
    featured: true,
  },
  {
    slug: "manucure-russe-perfectionnement",
    title: "Perfectionnement manucure russe",
    subtitle: "Un jour pour corriger et accélérer",
    category: "Manucure russe",
    level: "Avancé",
    format: "Intensif",
    duration: "1 jour · 7 h",
    hours: 7,
    price: 590,
    deposit: 200,
    image: img.glitter,
    gallery: [img.glitter, img.shiny, img.nailArt, img.editorial],
    short: "Diagnostic de votre gestuelle, corrections ciblées et travail de vitesse sur vos points faibles.",
    description: [
      "Ce format court est conçu comme un coaching technique : avant la session, vous transmettez des photos de vos réalisations. Elena prépare un diagnostic personnalisé.",
      "La journée est organisée autour de vos difficultés : tenue du geste, régularité de la ligne de sourire, zones qui rougissent, temps de service trop long.",
      "Objectif : repartir avec deux ou trois corrections concrètes, immédiatement applicables au fauteuil.",
    ],
    certification: "Attestation de perfectionnement Smirnova School.",
    prerequisites: ["Avoir suivi une formation manucure russe", "Minimum un an de pratique régulière"],
    objectives: ["Diagnostiquer ses propres défauts de geste", "Corriger la prise de la pièce à main", "Réduire le temps moyen du service", "Garantir une netteté constante"],
    techniques: ["Auto-diagnostic vidéo", "Optimisation des appuis", "Réglage du micromoteur", "Séquence de travail raccourcie", "Contrôle qualité final"],
    materials: ["Pièce à main personnelle ou prêt possible", "Matériel de précision", "Gabarits d’entraînement"],
    includes: ["Analyse préalable personnalisée", "Support de correction individuel", "Modèle fourni", "Attestation de perfectionnement"],
    program: [
      { title: "Journée intensive", items: ["Restitution du diagnostic personnalisé", "Ateliers ciblés selon les points faibles", "Chronométrage et méthode de gain de temps", "Pratique complète avec observation d’Elena", "Plan de progression sur 90 jours"] },
    ],
    faq: [
      { question: "Puis-je suivre ce module sans avoir été formée chez vous ?", answer: "Oui, à condition d’avoir été formée à la manucure russe ailleurs et de pratiquer régulièrement." },
      { question: "Combien de participantes ?", answer: "Six participantes maximum, afin que chaque geste soit observé individuellement." },
    ],
    instructor: "Elena Smirnova",
  },
  {
    slug: "nail-architecture-gel-chablon",
    title: "Nail Architecture",
    subtitle: "Construction, chablon et rééquilibrage en gel",
    category: "Nail Architecture",
    level: "Intermédiaire",
    format: "En présentiel",
    duration: "3 jours · 21 h",
    hours: 21,
    price: 1490,
    deposit: 450,
    image: img.nailArt,
    gallery: [img.nailArt, img.shiny, img.bridal, img.bronze],
    short: "Construisez une architecture d’ongle solide et naturelle : apex, chablon, encapsulé et rééquilibrage.",
    description: [
      "L’architecture de l’ongle ne s’improvise pas : elle s’apprend par la compréhension des volumes et des points d’appui. Cette formation vous apprend à construire une extension solide, élégante et confortable.",
      "Vous travaillerez le chablon papier, les formes d’entraînement, la construction de l’apex, l’encapsulé décoratif et surtout le rééquilibrage, clé de la fidélisation client.",
      "Trois journées progressives, avec évaluation du geste et pratique intensive sur modèles.",
    ],
    certification: "Attestation de formation Nail Architecture Smirnova School.",
    prerequisites: ["Maîtriser la préparation de l’ongle", "Pratique du limage recommandée"],
    objectives: [
      "Poser un chablon sans fuite ni surépaisseur",
      "Construire un apex adapté à chaque morphologie",
      "Limiter au bon endroit et au bon moment",
      "Réaliser un rééquilibrage propre et rapide",
      "Maîtriser une extension naturelle et résistante",
    ],
    techniques: ["Chablon papier et formes", "Construction en gel", "Apex et courbe C", "Encapsulé et french inversée", "Rééquilibrage", "Limage structurante"],
    materials: ["Gels de construction", "Chablons et formes", "Limes, bloc et polissoirs", "Pinceaux et résine", "Lampe UV/LED professionnelle"],
    includes: ["Kit de construction offert", "Trois modèles fournis", "Support pédagogique complet", "Déjeuner léger les trois jours", "Attestation de fin de formation", "Suivi personnalisé pendant 60 jours"],
    program: [
      { title: "Jour 1 — Bases & préparation", items: ["Anatomie et morphologie de l’ongle", "Préparation et déshydratation", "Pose du chablon sans fuite", "Première extension guidée"] },
      { title: "Jour 2 — Construction", items: ["Volumes, apex et point de stress", "Gel de construction : travail des courbes", "Encapsulé décoratif et french inversée", "Limage structurante expliquée"] },
      { title: "Jour 3 — Rééquilibrage & autonomie", items: ["Rééquilibrage complet en temps réel", "Gestion des décollements et réparations", "Pratique autonome sur modèle", "Évaluation du geste et plan de progression"] },
    ],
    faq: [
      { question: "Peut-on suivre cette formation en débutant ?", answer: "Elle demande une base solide en préparation d’ongle. En dessous, nous recommandons la formation Manucure à la cire en amont." },
      { question: "Quel matériel dois-je apporter ?", answer: "Votre pièce à main et vos pinceaux. Gels, chablons et lampe sont fournis pendant les trois jours." },
      { question: "Le rééquilibrage est-il inclus ?", answer: "Oui, la troisième journée y est entièrement consacrée, car c’est le service le plus rentable en institut." },
    ],
    instructor: "Elena Smirnova",
    featured: true,
  },
  {
    slug: "beaute-des-mains-semi-permanent",
    title: "Beauté des mains & semi-permanent",
    subtitle: "Le socle professionnel de toute carrière",
    category: "Manucure",
    level: "Débutant",
    format: "En présentiel",
    duration: "1 jour · 7 h",
    hours: 7,
    price: 450,
    deposit: 150,
    image: img.handsRings,
    gallery: [img.handsRings, img.bareNails, img.editorial, img.enjoying],
    short: "Une journée pour poser les bons réflexes : hygiène, préparation, forme et vernis semi-permanent durable.",
    description: [
      "Cette journée constitue le point d’entrée idéal pour celles qui débutent ou qui souhaitent reprendre des bases propres.",
      "Vous apprendrez le protocole d’hygiène, la préparation de l’ongle, la création d’une forme harmonieuse et la pose d’un semi-permanent qui tient dans le temps.",
      "Un format court, très pratique, conçu pour être rentable dès le lendemain.",
    ],
    certification: "Attestation de formation Smirnova School.",
    prerequisites: ["Aucun prérequis"],
    objectives: ["Respecter un protocole d’hygiène complet", "Préparer l’ongle pour une tenue maximale", "Créer une forme harmonieuse", "Poser un semi-permanent durable sans coulure"],
    techniques: ["Hygiène et stérilisation", "Préparation de la surface", "Limage de forme", "Ponçage doux", "Pose de semi-permanent", "Finitions et cuticle oil"],
    materials: ["Limes et polissoirs", "Désinfectants homologués", "Gammes de couleurs semi-permanent", "Lampe UV/LED", "Pinceaux de finition"],
    includes: ["Support pédagogique", "Prêt du matériel", "Modèle recommandé", "Attestation de formation", "Accès au groupe privé"],
    program: [
      { title: "Journée fondations", items: ["Hygiène et organisation du poste", "Désinfection et stérilisation du matériel", "Préparation de l’ongle naturel", "Forme et architecture de base", "Pose du semi-permanent et finition"] },
    ],
    faq: [
      { question: "Je débute totalement, est-ce le bon choix ?", answer: "Oui, cette journée a été pensée comme une entrée en matière accessible." },
      { question: "Combien de participantes ?", answer: "Huit participantes maximum, avec matériel individuel." },
    ],
    instructor: "Elena Smirnova",
  },
];

export const formationCategories = ["Toutes", ...Array.from(new Set(formations.map((f) => f.category)))];
export const formationLevels = ["Tous niveaux", "Débutant", "Intermédiaire", "Avancé"];

export const getFormation = (slug: string) => formations.find((f) => f.slug === slug);

export const relatedFormations = (slug: string) => {
  const current = getFormation(slug);
  if (!current) return formations.slice(0, 3);
  return formations.filter((f) => f.slug !== slug && (f.category === current.category || f.level === current.level)).slice(0, 3);
};
