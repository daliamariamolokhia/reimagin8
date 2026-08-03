export const site = {
  name: "reimagin8",
  tagline: "Reimagine. Reinvent. Realise.",
  description:
    "Premium strategy, innovation, and leadership advisory for organisations ready to unlock growth and reinvent what's possible.",
  url: "https://www.reimagin8.com",
  email: "hello@reimagin8.com",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/workshops", label: "Workshops" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    title: "Strategy & Advisory",
    description:
      "Board-level counsel on growth, market positioning, and transformation — grounded in rigorous analysis and real-world execution.",
    icon: "compass",
  },
  {
    title: "Innovation Studio",
    description:
      "From opportunity mapping to prototype validation. We help you move from insight to action — closing the gap between knowing and doing.",
    icon: "spark",
  },
  {
    title: "Design & Experience",
    description:
      "Human-centred design for products, services, and organisational change. Clarity in complexity, beauty in purpose.",
    icon: "layers",
  },
  {
    title: "Leadership Development",
    description:
      "Executive coaching, team workshops, and capability building for leaders navigating growth, disruption, and reinvention.",
    icon: "growth",
  },
];

export const approachSteps = [
  {
    step: "01",
    title: "Diagnose",
    description: "Deep discovery into your growth gap — where ambition meets reality, and where opportunity hides in plain sight.",
  },
  {
    step: "02",
    title: "Design",
    description: "Co-create strategy, prototypes, and roadmaps with your leadership team. No ivory-tower decks — actionable from day one.",
  },
  {
    step: "03",
    title: "Deliver",
    description: "Embedded support through implementation. We stay until the change sticks and the results show.",
  },
  {
    step: "04",
    title: "Develop",
    description: "Build lasting capability inside your organisation so reinvention becomes a core competence, not a one-off project.",
  },
];

export const workshops = [
  {
    slug: "growth-gap",
    title: "The Growth Gap Workshop",
    subtitle: "Why knowing isn't doing",
    description:
      "An immersive half-day session for leadership teams stuck between ambition and execution. Explore the Greiner curve, identify your growth ceiling, and leave with a prioritised action plan.",
    duration: "Half day",
    audience: "Leadership teams, C-suite, growth-stage founders",
    outcomes: [
      "Shared language for your current growth stage",
      "Honest diagnosis of the knowing–doing gap",
      "Prioritised initiatives with clear owners",
      "A 90-day activation roadmap",
    ],
    featured: true,
  },
  {
    slug: "level-up",
    title: "Level Up Leadership",
    subtitle: "It's time to level up",
    description:
      "Executive intensive for leaders ready to shift from managing the present to architecting the future. Strategy, self-awareness, and systems thinking in one powerful session.",
    duration: "Full day",
    audience: "Senior executives, emerging C-suite",
    outcomes: [
      "Personal leadership narrative and growth edge",
      "Strategic priorities aligned to business stage",
      "Peer accountability framework",
      "Executive action plan",
    ],
    featured: false,
  },
];

export const stats = [
  { value: "25+", label: "Years collective advisory experience" },
  { value: "40+", label: "Organisations transformed" },
  { value: "92%", label: "Client retention rate" },
  { value: "3×", label: "Average ROI on strategic engagements" },
];

export const clients = [
  "Financial Services",
  "Technology",
  "Healthcare",
  "Professional Services",
  "Retail & Consumer",
  "Public Sector",
];

/** Default workshop session slug — override via ?session= on /commitment */
export const defaultWorkshopSession =
  import.meta.env.PUBLIC_DEFAULT_WORKSHOP_SESSION ?? "growth-gap-2026-08-04";

export const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL ?? "";

export const growthStages = [
  "Stage 1 — Creativity / Crisis of Leadership",
  "Stage 2 — Direction / Crisis of Autonomy",
  "Stage 3 — Delegation / Crisis of Control",
  "Stage 4 — Coordination / Crisis of Red Tape",
  "Stage 5 — Collaboration / Crisis of Growth",
];

export const knowingDoingBlockers = [
  "Talk substitutes for action",
  "Fear prevents action",
  "Measurement gets in the way",
  "Internal competition",
  "Memory substitutes for thinking",
];

/** Items to revisit once the site is further along */
export const backlogReminders = [
  "Case studies page — add 2–3 anonymised client stories",
  "Insights / thought leadership — articles on growth gap, knowing vs doing, Greiner curve",
  "Testimonials — quote strip from past clients",
  "Social / LinkedIn — footer links once profiles exist",
];
