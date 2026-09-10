export const school = {
  name: "Smirnova School",
  displayName: "SMIRNOVA",
  displayNameAccent: "SCHOOL",
  founder: "Elena Smirnova",
  founderRole: "Fondatrice · Éducatrice · Experte ongulaire",
  tagline: "Académie professionnelle de manucure",
  city: "Paris",
  address: "12 rue de Turenne, 75003 Paris, France",
  email: "bonjour@smirnovaschool.fr",
  phone: "+33 1 84 00 12 40",
  whatsapp: "+33 6 45 12 88 07",
  instagram: "@smirnovaschool",
  storeUrl: "https://smirnova-school.fr",
  hours: [
    { label: "Lundi – Vendredi", value: "09h30 – 19h00" },
    { label: "Samedi", value: "09h00 – 17h00" },
    { label: "Dimanche", value: "Fermé" },
  ],
  languages: ["Français", "English"],
} as const;

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Formations", href: "/formations" },
  { label: "Planning", href: "/planning" },
  { label: "Galerie", href: "/gallery" },
  { label: "Académie", href: "/academy" },
  { label: "Témoignages", href: "/testimonials" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Formations",
    links: [
      { label: "Toutes les formations", href: "/formations" },
      { label: "Planning des sessions", href: "/planning" },
      { label: "Réserver", href: "/#formations" },
    ],
  },
  {
    title: "Académie",
    links: [
      { label: "L’académie", href: "/academy" },
      { label: "Elena Smirnova", href: "/academy#fondatrice" },
      { label: "Galerie", href: "/gallery" },
      { label: "Témoignages", href: "/testimonials" },
    ],
  },
  {
    title: "Pratique",
    links: [
      { label: "Questions fréquentes", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const academyIntro = {
  eyebrow: "L’académie",
  title: "PLUS QU’UNE",
  titleAccent: "FORMATION.",
  lead: "Smirnova School accompagne les professionnelles de l’onglerie dans leur progression technique grâce à une approche centrée sur la précision, la pratique et la maîtrise du geste.",
  body: [
    "Créée à Paris, l’académie reçoit des techniciennes venues de toute la France et de l’international pour approfondir la manucure à la cire, la manucure russe et l’architecture de l’ongle.",
    "Chaque session est volontairement limitée en nombre de participantes afin de garantir un accompagnement individualisé : observation du geste, correction immédiate, pratique encadrée sur modèles puis autonomie complète.",
  ],
  image: "/images/training.jpg",
  secondaryImage: "https://images.pexels.com/photos/7755235/pexels-photo-7755235.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1500",
};

export const founder = {
  name: "Elena Smirnova",
  role: "Fondatrice · Éducatrice · Experte ongulaire",
  portrait: "/images/training.jpg",
  signatureQuote: "Le geste juste se construit par la répétition consciente, jamais par la précipitation.",
  bio: [
    "Elena Smirnova forme depuis plus de douze ans des techniciennes ongulaires en France et à l’international. Formée aux protocoles de manucure à la cire et à la technique russe, elle a développé une pédagogie fondée sur la lecture du geste.",
    "Elle enseigne une manucure respectueuse de l’ongle naturel : préparation méthodique, travail du pourtour sans agression, finitions nettes et tenue durable.",
    "Aujourd’hui installée à Paris, elle partage son temps entre les formations en présentiel dans l’académie et les sessions internationales.",
  ],
  trajectory: [
    { year: "2012", title: "Débuts en institut", text: "Spécialisation manucure et prothésie ongulaire à Moscou, puis installation à Paris." },
    { year: "2016", title: "Transmission", text: "Premières formations professionnelles en institut auprès d’équipes de techniciennes." },
    { year: "2019", title: "Smirnova School", text: "Création de l’académie et de la méthode signature de formation." },
    { year: "2024", title: "Sessions internationales", text: "Ouverture du planning aux sessions en Suisse, Belgique et Italie." },
  ],
  method: [
    { step: "01", title: "Observer", text: "Analyse de la main, de la peau et de l’ongle avant toute intervention." },
    { step: "02", title: "Reproduire", text: "Démonstration commentée puis reproduction guidée pas à pas." },
    { step: "03", title: "Corriger", text: "Retour individualisé sur la posture, l’angle et la pression de l’outil." },
    { step: "04", title: "Autonomiser", text: "Pratique en conditions réelles jusqu’à l’exécution autonome et propre." },
  ],
};

export const values = [
  { title: "Expertise", text: "Des protocoles enseignés tels qu’ils sont pratiqués au fauteuil, sans approximation." },
  { title: "Pratique", text: "Jusqu’à 70 % du temps de formation consacré au geste et aux modèles." },
  { title: "Précision", text: "Un travail exigeant sur la netteté, la symétrie et la ligne de sourire." },
  { title: "Évolution", text: "Un accompagnement pensé pour progresser, se spécialiser et se démarquer." },
];

export const figures = [
  { value: "12", label: "ans d’enseignement", hint: "Formation continue de techniciennes" },
  { value: "1 400+", label: "élèves accompagnées", hint: "France et sessions internationales" },
  { value: "8", label: "modules de formation", hint: "Du socle débutant à la spécialisation avancée" },
  { value: "4,9/5", label: "satisfaction moyenne", hint: "Évaluations post-formation" },
];

export const guarantees = [
  "Petit groupe : 6 à 8 participantes maximum",
  "Prêt du matériel professionnel pendant la formation",
  "Modèles et supports de travail fournis",
  "Attestation de fin de formation remise sur place",
  "Accès à un groupe privé d’anciennes élèves",
  "Tarif préférentiel sur la boutique Smirnova France",
];

export const legalLinks: NavItem[] = [
  { label: "Mentions légales", href: "/legal/mentions-legales" },
  { label: "CGV", href: "/legal/cgv" },
  { label: "Confidentialité", href: "/legal/confidentialite" },
  { label: "Cookies", href: "/legal/cookies" },
];
