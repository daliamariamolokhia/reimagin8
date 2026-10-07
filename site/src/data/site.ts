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
      "Experiential programmes for executives and teams: practice in the room, feedback loops, and behavioural change that carries into the business. Grounded in current learning design, not lecture theatre.",
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
  {
    slug: "execution",
    title: "Execution & Delivery",
    description:
      "Embedded support through implementation. We stay with your team until initiatives land, change sticks, and the results are visible.",
    icon: "compass",
    pillar: "realise" as const,
  },
  {
    slug: "transformation",
    title: "Transformation Programmes",
    description:
      "End-to-end programmes that turn strategic bets into organisational change: adoption, governance, capability, and measurable outcomes.",
    icon: "growth",
    pillar: "realise" as const,
  },
];

/** How experiential learning, behaviour change, and learning design show up in delivery */
export const learningApproach = {
  eyebrow: "Learning in practice",
  title: "Designed for behaviour change, not applause",
  intro:
    "Our experiences combine experiential learning with up-to-date learning design principles. We use technology sparingly and deliberately: to extend practice, accountability, and reflection after people leave the room.",
  pillars: [
    {
      title: "Experiential learning",
      description:
        "Leaders learn by diagnosing their own growth gap, making bets under pressure, and practising the conversations they have been avoiding. Insight comes from action, reflection, and peer witness.",
    },
    {
      title: "Behavioural change",
      description:
        "We name knowing–doing blockers, socialise commitments, and design follow-through so new behaviours have a chance to stick. Psychology and organisation design in the same session.",
    },
    {
      title: "Learning design",
      description:
        "Clear outcomes, spaced practice, retrieval, and feedback loops. Formats are built from current evidence on how adults learn at work, not legacy offsite templates.",
    },
    {
      title: "Technology in learning",
      description:
        "Digital touchpoints where they help: pre-work, nudges, check-ins, and capture of commitments. Always in service of the in-room experience, never as a substitute for it.",
    },
  ],
};

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
      "Co-create strategy, prototypes, and roadmaps with your leadership team. Experiential sprints and learning design that favour doing over slides. Actionable from day one.",
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
      "Personal reinvention for leaders. Business reinvention for teams. Experiential workshops, behavioural change in the room, and design-led formats: from individual growth edge to board-ready strategic bets.",
    cta: { label: "Explore Reinvent", href: "/workshops" },
    tracks: [
      { id: "personal", label: "Personal", description: "Leadership, coaching, and individual transformation." },
      { id: "business", label: "Business", description: "Teams, organisations, and strategic reinvention." },
    ],
  },
  {
    id: "realise",
    name: "Realise",
    headline: "Turn decisions into outcomes.",
    description:
      "Build, activate, and embed. Where ideation meets execution and the prototype doesn't die in the deck. Realise is shipped solutions, accountable execution, embedded transformation, and outputs you can measure. Software when the bet demands it. Always more than a build.",
    cta: { label: "Explore Realise", href: "/services#realise" },
  },
] as const;

/** What Realise covers beyond any single deliverable */
export const realiseDimensions = [
  {
    title: "Execution",
    description: "Initiatives owned, milestones hit, momentum kept. We embed until the work is done.",
  },
  {
    title: "Outcomes & outputs",
    description: "Board-ready results, not activity reports. Clear signals that the bet is working.",
  },
  {
    title: "Solutions",
    description: "Products, platforms, operating models, and tools. Built, configured, or delivered to spec.",
  },
  {
    title: "Transformation",
    description: "Behavioural change that sticks: capability, culture, and systems aligned to the new direction.",
  },
  {
    title: "Activation",
    description:
      "Commitments honoured, blockers cleared, next moves named. Follow-through supported with thoughtful use of technology where it reinforces learning, not where it replaces the human work.",
  },
];

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
    { name: "Execution & Delivery", kind: "Service" },
    { name: "Transformation Programmes", kind: "Service" },
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
    subtitle: "Workshop output → working software",
    description:
      "For teams who've named the bet in the room (Growth Gap, Reinvention Sprint, or innovation workshop) and need it live before momentum dies. We take your prioritised initiative and ship a working v1: real users, real data, real feedback loop.",
    audience: "Teams with a clear post-workshop initiative",
    delivery: "Post-experience · tightly scoped",
    pillar: "realise" as const,
    outcomes: [
      "Workshop commitment translated into shipped software",
      "One critical journey end-to-end, not feature soup",
      "Live URL for internal or pilot users when the bet is ready to test",
      "Clear path to MVP Build if the bet validates",
    ],
  },
];

export const bespokeBuildFormats = [
  {
    slug: "proof-of-concept",
    title: "Proof of Concept",
    tagline: "One journey. Real users. Learn before you commit.",
    audience: "Teams testing a bet before full build",
    pillar: "realise" as const,
  },
  {
    slug: "product-partner",
    title: "Product Partner",
    tagline: "Embedded build capacity: roadmap, ship, iterate.",
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
      "One path within Realise. When the bet needs a production web app, we build it: strategy and engineering in one team. Realise is broader than build alone. See services for execution, transformation, and activation.",
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
      "Your team knows what to do and still isn't doing it. Experiential diagnosis on Greiner's curve: knowing–doing blockers, the psychology behind them, and commitments witnessed in the room. Not inspiration. Language, behavioural intent, movement.",
    audience: "Leadership teams, C-suite, growth-stage founders",
    delivery: "Private · your organisation only",
    pillar: "reimagine" as const,
    outcomes: [
      "One shared language for your growth stage and the crisis coming next",
      "Blockers named with evidence, not politeness",
      "Commitments socially witnessed in the room. No hiding.",
      "A prioritised path to activation, not another deck",
    ],
  },
  {
    slug: "reinvention-sprint",
    title: "The Reinvention Sprint",
    subtitle: "Plateau to 90-day bets",
    description:
      "For teams that feel stuck. We clarify where you sit on the curve, what dies, what survives, what gets invented. You leave with three reinvention bets, each with an owner, a success signal, and a first move. Board-ready output. Rigor at Harvard speed. Decisions at studio speed.",
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
    audience: "Boards & executive teams",
    pillar: "reinvent" as const,
    reinventTrack: "business" as const,
  },
  {
    slug: "intersection-lab",
    title: "The Intersection Lab",
    tagline: "Strategy, product, ops, people: mapped where they collide. Growth hides in the friction.",
    audience: "Cross-functional leadership",
    pillar: "reimagine" as const,
  },
  {
    slug: "studio-intensive",
    title: "The Studio Intensive",
    tagline: "Two prototypes. One gets resourced when you leave the room.",
    audience: "12–20 leaders · select cohorts",
    pillar: "reinvent" as const,
    reinventTrack: "business" as const,
  },
  {
    slug: "activation-room",
    title: "The Activation Room",
    tagline: "You committed. Did you move? What stopped you? What's next?",
    audience: "Post–Growth Gap or Sprint teams",
    pillar: "realise" as const,
  },
  {
    slug: "edge-session",
    title: "The Edge Session",
    tagline: "What's about to hit your sector, and who's in this room actually ready.",
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
    oneLiner: "Three bets. Named owners. Urgency in the room, or another quarter of drift.",
    href: "/workshops#reinvention-sprint",
  },
  {
    title: "The Studio Intensive",
    pillar: "reinvent" as const,
    oneLiner: "Two ideas that didn't exist at the start. One is funded when you leave.",
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
      "Private, experiential sessions across insight and reinvention, for leaders who've read the book and still haven't moved. Harvard-grade rigour, behavioural science and learning design in the room, configured for your organisation.",
  },
  signature: {
    eyebrow: "Signature formats",
    title: "Proven. Configured. Delivered in-house.",
    intro:
      "Two flagships with sector-relevant pre-work, in-session practice, and optional digital follow-through. Built on experiential learning and current learning design principles. Scope and fit on enquiry. No price list, no open enrolment.",
  },
  bespoke: {
    eyebrow: "Bespoke formats",
    title: "Your brief. Our methods.",
    intro:
      "Stack formats, extend over time, or design from scratch across strategy, innovation, design, and leadership. Every bespoke brief is shaped for behavioural outcomes and how your people actually learn.",
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
  { value: "execution", label: "Execution & Delivery", group: "Realise" },
  { value: "transformation", label: "Transformation Programmes", group: "Realise" },
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
      "Experiential forcing functions for personal or business reinvention. Learning designed for behavioural change, not theatre. The people who miss the room feel it.",
  },
  approach: {
    eyebrow: "Our approach",
    title: "From insight to impact",
    intro:
      "We don't deliver decks and disappear. Experiential learning, behavioural change, and learning design run through every phase, with technology used only where it strengthens follow-through.",
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

/** Override with PUBLIC_CALENDLY_URL in Netlify for a single event-type link. */
const DEFAULT_CALENDLY_URL = "https://calendly.com/daliamaria-molokhia";

const rawCalendlyUrl = (import.meta.env.PUBLIC_CALENDLY_URL ?? DEFAULT_CALENDLY_URL).trim();

/** Full Calendly event URL — set PUBLIC_CALENDLY_URL in Netlify (and local .env for dev). */
export const calendlyUrl = rawCalendlyUrl;

/** On-site anchor when embed is configured; otherwise general contact. */
export const calendlyBookHref = rawCalendlyUrl ? "/contact#book-a-call" : "/contact";

/** Inline widget URL with brand colours (build-time). */
export function getCalendlyEmbedUrl(baseUrl = rawCalendlyUrl): string {
  if (!baseUrl) return "";
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("hide_event_type_details", "1");
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("primary_color", "FF6B35");
    url.searchParams.set("text_color", "1A2B4A");
    return url.toString();
  } catch {
    return baseUrl;
  }
}

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
