export const site = {
  name: "reimagin8",
  tagline: "Reimagine. Reinvent. Realise.",
  description:
    "Reimagine. Reinvent. Realise. For founders at an inflection point, boards facing disruption, and businesses ready to turn ambition into action.",
  url: "https://www.reimagin8.com",
  email: "hello@reimagin8.com",
  hero: {
    eyebrow: "Reimagine · Reinvent · Realise",
    headline: "Your transformation partner, from insight to impact.",
    subline:
      "For founders at an inflection point, boards facing disruption, and businesses that feel they've stagnated.",
  },
  credentials:
    "Ex-Harvard · Trusted by FTSE 100 & Fortune 250 leadership teams",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/build", label: "Build" },
  { href: "/workshops", label: "Experiences" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "strategy",
    title: "Strategy & Advisory",
    description:
      "Board-level counsel on growth, market positioning, and transformation. Rigorous analysis paired with real-world execution.",
    icon: "compass",
    pillar: "reimagine" as const,
  },
  {
    slug: "innovation",
    title: "Innovation Studio",
    description:
      "From opportunity mapping to prototype validation. We help you move from insight to action and close the gap between knowing and doing.",
    icon: "spark",
    pillar: "reimagine" as const,
  },
  {
    slug: "design",
    title: "Design & Experience",
    description:
      "Human-centred design for products, services, and organisational change. Clarity in complexity, beauty in purpose.",
    icon: "layers",
    pillar: "reinvent" as const,
    reinventTrack: "business" as const,
  },
  {
    slug: "leadership",
    title: "Leadership Development",
    description:
      "Executive coaching, team workshops, and capability building for leaders navigating growth, disruption, and reinvention.",
    icon: "growth",
    pillar: "reinvent" as const,
    reinventTrack: "personal" as const,
  },
  {
    slug: "product-build",
    title: "Product Build",
    description:
      "Web applications from validated idea to production. Strategy and engineering in one team, so the prototype doesn't die in the deck.",
    icon: "code",
    href: "/build",
    pillar: "realise" as const,
  },
];

export const approachSteps = [
  {
    step: "01",
    title: "Diagnose",
    pillar: "reimagine" as const,
    description:
      "Deep discovery into your growth gap: where ambition meets reality, and where opportunity hides in plain sight.",
  },
  {
    step: "02",
    title: "Design",
    pillar: "reinvent" as const,
    description:
      "Co-create strategy, prototypes, and roadmaps with your leadership team. No ivory-tower decks. Actionable from day one.",
  },
  {
    step: "03",
    title: "Deliver",
    pillar: "realise" as const,
    description: "Embedded support through implementation. We stay until the change sticks and the results show.",
  },
  {
    step: "04",
    title: "Develop",
    pillar: "realise" as const,
    description: "Build lasting capability inside your organisation so reinvention becomes a core competence, not a one-off project.",
  },
];

export const threePillars = [
  {
    id: "reimagine",
    name: "Reimagine",
    headline: "See clearly before you commit.",
    description:
      "Diagnose the growth gap, map opportunity, and create shared language. Insight and strategy before action. Engage here alone, or as the starting point for a longer journey.",
    cta: { label: "Explore Reimagine", href: "/services#reimagine" },
  },
  {
    id: "reinvent",
    name: "Reinvent",
    headline: "Change how you lead and how the business operates.",
    description:
      "Personal reinvention for leaders. Business reinvention for teams. Forcing functions, workshops, and design-led change: from individual growth edge to board-ready strategic bets.",
    cta: { label: "Explore Reinvent", href: "/workshops" },
    tracks: [
      { id: "personal", label: "Personal", description: "Leadership, coaching, and individual transformation." },
      { id: "business", label: "Business", description: "Teams, organisations, and strategic reinvention." },
    ],
  },
  {
    id: "realise",
    name: "Realise",
    headline: "Ship what you decided.",
    description:
      "Build, activate, and embed. Where ideation meets execution and the prototype doesn't die in the deck.",
    cta: { label: "Explore Realise", href: "/build" },
  },
] as const;

export type PillarId = (typeof threePillars)[number]["id"];

export const pillarLabels: Record<PillarId, string> = {
  reimagine: "Reimagine",
  reinvent: "Reinvent",
  realise: "Realise",
};

export const offeringsByPillar = {
  reimagine: [
    { name: "Strategy & Advisory", kind: "Service" },
    { name: "Innovation Studio", kind: "Service" },
    { name: "The Growth Gap", kind: "Experience", href: "/workshops#growth-gap" },
    { name: "The Intersection Lab", kind: "Experience", href: "/workshops#bespoke" },
    { name: "The Edge Session", kind: "Experience", href: "/workshops#bespoke" },
  ],
  reinvent: {
    personal: [{ name: "Leadership Development", kind: "Service" }],
    business: [
      { name: "Design & Experience", kind: "Service" },
      { name: "The Reinvention Sprint", kind: "Experience", href: "/workshops#reinvention-sprint" },
      { name: "The Forcing Function", kind: "Experience", href: "/workshops#bespoke" },
      { name: "The Studio Intensive", kind: "Experience", href: "/workshops#bespoke" },
    ],
  },
  realise: [
    { name: "Product Build", kind: "Service", href: "/build" },
    { name: "MVP Build", kind: "Build format", href: "/build#mvp-build" },
    { name: "Sprint to Ship", kind: "Build format", href: "/build#sprint-to-ship" },
    { name: "The Activation Room", kind: "Experience", href: "/workshops#bespoke" },
    { name: "Proof of Concept", kind: "Build format", href: "/build#bespoke" },
    { name: "Product Partner", kind: "Build format", href: "/build#bespoke" },
  ],
};

export const flagshipBuildFormats = [
  {
    slug: "mvp-build",
    title: "MVP Build",
    subtitle: "Validated idea → production v1",
    description:
      "For founders and leadership teams with a clear problem and no build capacity. We scope ruthlessly, design the core journeys, and ship a production web app: auth, data, deploy, handover. Strategy in the room; code in production. Not a slide-deck prototype.",
    duration: "8–12 weeks",
    audience: "Founders, product leaders, teams post-strategy",
    delivery: "Fixed scope · senior-led delivery",
    pillar: "realise" as const,
    outcomes: [
      "Production web app: deployed, documented, yours to own",
      "Core user journeys live, not a clickable mockup",
      "Technical and product decisions recorded, not tribal knowledge",
      "A codebase and stack chosen for speed now, maintainability later",
    ],
  },
  {
    slug: "sprint-to-ship",
    title: "Sprint to Ship",
    subtitle: "Workshop output → working software in two weeks",
    description:
      "For teams who've named the bet in the room (Growth Gap, Reinvention Sprint, or innovation workshop) and need it live before momentum dies. We take your prioritised initiative and ship a working v1: real users, real data, real feedback loop.",
    duration: "2 weeks",
    audience: "Teams with a clear post-workshop initiative",
    delivery: "Post-experience · tightly scoped",
    pillar: "realise" as const,
    outcomes: [
      "Workshop commitment translated into shipped software",
      "One critical journey end-to-end, not feature soup",
      "Live URL for internal or pilot users within 10 working days",
      "Clear path to MVP Build if the bet validates",
    ],
  },
];

export const bespokeBuildFormats = [
  {
    slug: "proof-of-concept",
    title: "Proof of Concept",
    tagline: "One journey. Real users. Learn before you commit.",
    duration: "2–4 weeks",
    audience: "Teams testing a bet before full build",
    pillar: "realise" as const,
  },
  {
    slug: "product-partner",
    title: "Product Partner",
    tagline: "Embedded build capacity: roadmap, ship, iterate.",
    duration: "Ongoing retainer",
    audience: "Founders with live product, need senior build leadership",
    pillar: "realise" as const,
  },
];

export const buildPortfolio = [
  {
    name: "AgencyLeak",
    category: "Contingent workforce platform",
    description:
      "Web application for businesses managing contingent workforce: scheduling, compliance, and operations in one place. Built as a production platform; scales from MVP to full product.",
  },
];

export const buildEntryPaths = [
  {
    title: "You have an idea",
    description:
      "Standalone enquiry. Bring the problem. We'll help sharpen scope, validate the bet, and ship an MVP or proof of concept.",
    cta: "Discuss an MVP build",
    href: "/contact?interest=mvp-build",
  },
  {
    title: "You named the bet in the room",
    description:
      "Downstream of a workshop or advisory engagement. The initiative is prioritised. We build it before the urgency fades.",
    cta: "Discuss Sprint to Ship",
    href: "/contact?interest=sprint-to-ship",
  },
];

export const buildPage = {
  hero: {
    eyebrow: "Realise",
    title: "Ideation meets execution.",
    intro:
      "Web applications built where strategy and shipping overlap, for founders and teams who've done the thinking (or need a partner who'll do it with them). No agency handoff. No six-month spec before a line of code.",
  },
  signature: {
    eyebrow: "Build formats",
    title: "From bet to browser.",
    intro:
      "Two proven paths: standalone MVP or post-workshop sprint. Scope and fit on enquiry; every build starts with a conversation.",
  },
  bespoke: {
    eyebrow: "Extend the engagement",
    title: "Test first. Partner long-term.",
    intro: "Proof of concept before a full MVP, or embedded product partnership once you're live.",
  },
  proof: {
    eyebrow: "From our portfolio",
    title: "We ship, not just advise.",
  },
  cta: {
    title: "Ready to build?",
    intro:
      "Select engagements each quarter. Bring the problem or the workshop output. We'll tell you honestly if we're the right fit.",
  },
};

export const flagshipExperiences = [
  {
    slug: "growth-gap",
    title: "The Growth Gap",
    subtitle: "Why knowing still isn't doing",
    description:
      "Half a day. Your team knows what to do and still isn't doing it. We place you on Greiner's curve, name the knowing–doing blockers (and the psychology behind them), and lock in 7-day commitments witnessed in the room. Not inspiration. Diagnosis, language, movement.",
    duration: "Half day",
    audience: "Leadership teams, C-suite, growth-stage founders",
    delivery: "Private · your organisation only",
    pillar: "reimagine" as const,
    outcomes: [
      "One shared language for your growth stage and the crisis coming next",
      "Blockers named with evidence, not politeness",
      "7-day commitments, socially witnessed. No hiding.",
      "A prioritised path to activation, not another deck",
    ],
  },
  {
    slug: "reinvention-sprint",
    title: "The Reinvention Sprint",
    subtitle: "Plateau to 90-day bets in one day",
    description:
      "Full day for teams that feel stuck. Morning: where you sit on the curve, what dies, what survives, what gets invented. Afternoon: three reinvention bets, each with an owner, a success signal, and a first move. Board-ready by 5pm. Rigor at Harvard speed. Decisions at studio speed.",
    duration: "Full day",
    audience: "Executive teams, founders, boards at inflection",
    delivery: "Private · configured to your sector",
    pillar: "reinvent" as const,
    reinventTrack: "business" as const,
    outcomes: [
      "An honest read on stagnation. No consensus theatre.",
      "Three bets: kill, keep, invent. Ready for the board.",
      "Owners and 90-day milestones, not 'next steps'",
      "The deferred decision, finally made",
    ],
  },
];

export const bespokeFormats = [
  {
    slug: "forcing-function",
    title: "The Forcing Function",
    tagline: "The decision your board keeps deferring, made before you leave.",
    duration: "2–3 hours",
    audience: "Boards & executive teams",
    pillar: "reinvent" as const,
    reinventTrack: "business" as const,
  },
  {
    slug: "intersection-lab",
    title: "The Intersection Lab",
    tagline: "Strategy, product, ops, people: mapped where they collide. Growth hides in the friction.",
    duration: "Half day",
    audience: "Cross-functional leadership",
    pillar: "reimagine" as const,
  },
  {
    slug: "studio-intensive",
    title: "The Studio Intensive",
    tagline: "48 hours. Two prototypes. One gets resourced Monday.",
    duration: "2 days",
    audience: "12–20 leaders · select cohorts",
    pillar: "reinvent" as const,
    reinventTrack: "business" as const,
  },
  {
    slug: "activation-room",
    title: "The Activation Room",
    tagline: "You committed. Did you move? What stopped you? What's next?",
    duration: "Half day",
    audience: "Post–Growth Gap or Sprint teams",
    pillar: "realise" as const,
  },
  {
    slug: "edge-session",
    title: "The Edge Session",
    tagline: "What's about to hit your sector, and who's in this room actually ready.",
    duration: "Half day · evening",
    audience: "Invite-only · capped seats",
    pillar: "reimagine" as const,
  },
];

/** FOMO one-liners for homepage Experiences section */
export const experienceHighlights = [
  {
    title: "The Growth Gap",
    pillar: "reimagine" as const,
    oneLiner: "Public commitments. Shared language. Everyone who missed the room is already behind.",
    href: "/workshops#growth-gap",
  },
  {
    title: "The Reinvention Sprint",
    pillar: "reinvent" as const,
    oneLiner: "Three bets. Named owners. 5pm, or another quarter of drift.",
    href: "/workshops#reinvention-sprint",
  },
  {
    title: "The Studio Intensive",
    pillar: "reinvent" as const,
    oneLiner: "Two ideas that didn't exist Thursday. One is funded by Monday.",
    href: "/workshops#bespoke",
  },
  {
    title: "The Forcing Function",
    pillar: "reinvent" as const,
    oneLiner: "Most offsites produce actions. This one produces a decision.",
    href: "/workshops#bespoke",
  },
];

export const experiencesPage = {
  hero: {
    eyebrow: "Reimagine & Reinvent",
    title: "Forcing functions. Not away days.",
    intro:
      "Private sessions across insight and reinvention, for leaders who've read the book and still haven't moved. Harvard-grade rigour, psychology in the room, configured for your organisation.",
  },
  signature: {
    eyebrow: "Signature formats",
    title: "Proven. Configured. Delivered in-house.",
    intro:
      "Two flagships with sector-relevant pre-work and examples. Scope and fit on enquiry. No price list, no open enrolment.",
  },
  bespoke: {
    eyebrow: "Bespoke formats",
    title: "Your brief. Our methods.",
    intro:
      "Stack formats, extend over weeks, or design from scratch across strategy, innovation, design, and leadership in one brief.",
  },
  cta: {
    title: "Private delivery only",
    intro:
      "Every session is built for your organisation: your sector, your stage, your leadership challenge. Enquire when you're ready to move.",
  },
};

/** Contact form interest dropdown, grouped by the three pillars */
export const contactInterestOptions = [
  { value: "discovery", label: "Discovery call", group: "General" },
  { value: "strategy", label: "Strategy & Advisory", group: "Reimagine" },
  { value: "innovation", label: "Innovation Studio", group: "Reimagine" },
  { value: "growth-gap", label: "The Growth Gap", group: "Reimagine" },
  { value: "intersection-lab", label: "The Intersection Lab", group: "Reimagine" },
  { value: "edge-session", label: "The Edge Session", group: "Reimagine" },
  { value: "leadership", label: "Leadership Development", group: "Reinvent · personal" },
  { value: "design", label: "Design & Experience", group: "Reinvent · business" },
  { value: "reinvention-sprint", label: "The Reinvention Sprint", group: "Reinvent · business" },
  { value: "forcing-function", label: "The Forcing Function", group: "Reinvent · business" },
  { value: "studio-intensive", label: "The Studio Intensive", group: "Reinvent · business" },
  { value: "bespoke", label: "Custom experience (tell us your brief)", group: "Reinvent · business" },
  { value: "product-build", label: "Product Build (general enquiry)", group: "Realise" },
  { value: "mvp-build", label: "MVP Build", group: "Realise" },
  { value: "sprint-to-ship", label: "Sprint to Ship", group: "Realise" },
  { value: "proof-of-concept", label: "Proof of Concept", group: "Realise" },
  { value: "product-partner", label: "Product Partner", group: "Realise" },
  { value: "activation-room", label: "The Activation Room", group: "Realise" },
];

export const contactInterestValues = new Set<string>(
  contactInterestOptions.map((o) => o.value),
);

/** @deprecated use flagshipExperiences; kept for commitment flow session naming */
export const workshops = flagshipExperiences.map((e) => ({
  ...e,
  featured: e.slug === "growth-gap",
}));

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

export const homeSections = {
  pillars: {
    eyebrow: "How we work",
    title: "Reimagine. Reinvent. Realise.",
    intro:
      "Three clear ways to engage, alone or as a journey. Start where you're stuck; stay as long as you need.",
  },
  services: {
    eyebrow: "By pillar",
    title: "Every offering has a home.",
    intro:
      "Advisory, experiences, and build mapped to the stage you're at, not a laundry list of services.",
  },
  workshop: {
    eyebrow: "Reinvent",
    title: "For teams that can't afford another away day",
    intro:
      "Private forcing functions for personal or business reinvention. The people who miss the room feel it.",
  },
  approach: {
    eyebrow: "Our approach",
    title: "From insight to impact",
    intro:
      "We don't deliver decks and disappear. Every engagement follows a proven path from diagnosis to lasting capability.",
  },
  cta: {
    title: "Ready to reimagine?",
    intro:
      "We work with a select number of clients each quarter. Start with a conversation, or explore our experiences for your team.",
  },
};

/** Default workshop session slug; override via ?session= on /commitment */
export const defaultWorkshopSession =
  import.meta.env.PUBLIC_DEFAULT_WORKSHOP_SESSION ?? "growth-gap-2026-08-04";

export const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL ?? "";

export const growthStages = [
  "Stage 1: Creativity / Crisis of Leadership",
  "Stage 2: Direction / Crisis of Autonomy",
  "Stage 3: Delegation / Crisis of Control",
  "Stage 4: Coordination / Crisis of Red Tape",
  "Stage 5: Collaboration / Crisis of Growth",
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
  "Case studies page: add 2–3 anonymised client stories",
  "Insights / thought leadership: articles on growth gap, knowing vs doing, Greiner curve",
  "Testimonials: quote strip from past clients",
  "Social / LinkedIn: footer links once profiles exist",
];
