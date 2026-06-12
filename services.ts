// Single source of truth for the service-detail pages (`/service-detail/[slug]`).
//
// Content reflects DevInvicta's real offering — an AI-focused software house
// (per the company presentation): custom, scalable software with responsible AI,
// end-to-end delivery and EU AI Act compliance. The six services mirror the ones
// surfaced on the home page.

const CDN = 'https://cdn.prod.website-files.com'

// Shared looping video assets for the in-page video card + media band.
const VIDEO = {
  mp4: `${CDN}/691d92c72b801c04cbc08bec/694a4265ca26a17c56fab6fc_8303104-hd_1920_1080_24fps_mp4.mp4`,
  webm: `${CDN}/691d92c72b801c04cbc08bec/694a4265ca26a17c56fab6fc_8303104-hd_1920_1080_24fps_webm.webm`,
}

export interface ServiceFeature {
  num: string
  title: string
  desc: string
}

export interface ServiceBullet {
  label: string
  text: string
}

export interface Service {
  slug: string
  title: string
  /** wide hero banner */
  heroImage: string
  years: string
  intro: string
  introParas: string[]
  subHeading: string
  subPara: string
  videoHeading: string
  video: { mp4: string; webm: string; poster: string }
  bullets: ServiceBullet[]
  features: ServiceFeature[]
  closingHeading: string
  closingPara: string
}

type ServiceSeed = Omit<Service, 'years' | 'video'> & { poster: string }

const SEED: ServiceSeed[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    heroImage:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=70',
    intro: 'Custom web platforms engineered to scale with your business',
    introParas: [
      'We start by understanding the problem before shaping the solution, so every platform we build is grounded in real business needs rather than assumptions.',
      'From clean front-end interfaces to robust APIs and data layers, we build web systems that are fast, maintainable and ready for production.',
      'Our goal is software that evolves gracefully — supporting growth while keeping performance, security and code quality intact.',
    ],
    subHeading: 'From architecture to deployment, built to last',
    subPara:
      'We design the architecture with scalability at its core, so your platform grows with you instead of being rebuilt from scratch.',
    videoHeading: 'Engineered to perform',
    bullets: [
      {
        label: 'Strategy and architecture',
        text: 'We map goals, users and constraints to define an architecture that supports clarity, performance and long-term scalability across devices.',
      },
      {
        label: 'Build and delivery',
        text: 'Through iterative development and continuous testing, we ship reliable, well-documented code and stay on through maintenance and evolution.',
      },
    ],
    features: [
      {
        num: '01',
        title: 'Front-end engineering',
        desc: 'Responsive, accessible interfaces built with React and modern tooling.',
      },
      {
        num: '02',
        title: 'Backend & APIs',
        desc: 'Secure, well-structured APIs and data models with Node.js and Python.',
      },
      {
        num: '03',
        title: 'Performance',
        desc: 'Speed optimization and clean architecture for fast, stable platforms.',
      },
      {
        num: '04',
        title: 'Scalable foundations',
        desc: 'Architecture designed to grow with your business without rework.',
      },
    ],
    closingHeading: 'Robust web software, delivered end-to-end',
    closingPara:
      'From the first diagnostic to deployment and ongoing maintenance, we deliver web platforms that are purposeful, refined and built to perform across evolving needs — transforming ideas into cohesive systems that remain adaptable, consistent and effective as your business grows.',
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    heroImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=70',
    intro: 'Native-grade mobile experiences your users will love',
    introParas: [
      'We design mobile products around real user journeys, so the experience feels natural, fast and dependable from the very first launch.',
      'Whether iOS, Android or cross-platform, we build apps with clean architecture, offline-ready data and smooth, intentional interactions.',
      'Our goal is mobile software that earns daily use — reliable, polished and ready to scale with your audience.',
    ],
    subHeading: 'Thoughtful mobile products, end-to-end',
    subPara:
      'From prototype to store release and beyond, we own the full lifecycle so your app stays stable, secure and current.',
    videoHeading: 'Built for the pocket',
    bullets: [
      {
        label: 'Product and experience',
        text: 'We align flows, performance and platform conventions so the app feels intuitive, responsive and consistent on every device.',
      },
      {
        label: 'Engineering and release',
        text: 'Through testing and continuous delivery, we ship resilient apps and support them through updates and store compliance.',
      },
    ],
    features: [
      {
        num: '01',
        title: 'iOS & Android',
        desc: 'Native and cross-platform apps tuned for each ecosystem.',
      },
      {
        num: '02',
        title: 'Offline-ready data',
        desc: 'Reliable sync and local-first state for real-world conditions.',
      },
      {
        num: '03',
        title: 'Smooth interactions',
        desc: 'Fluid motion and micro-interactions that feel premium.',
      },
      {
        num: '04',
        title: 'Store & lifecycle',
        desc: 'Release, monitoring and ongoing maintenance handled for you.',
      },
    ],
    closingHeading: 'Mobile software that scales with your audience',
    closingPara:
      'We craft mobile experiences that feel purposeful and refined, built to perform across devices and evolving user needs. From diagnostic to launch and continuous improvement, we transform ideas into cohesive products that stay adaptable, consistent and effective over time.',
  },
  {
    slug: 'ai-agents-llm',
    title: 'AI Agents & LLM Integration',
    heroImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=70',
    intro: 'Intelligent agents and LLM integrations that automate real work',
    introParas: [
      'We begin by understanding where AI can create measurable value in your operation, then design agents that act on it — not hype, but useful automation.',
      'From document understanding and triage to retrieval-augmented assistants, we integrate LLMs into your products and workflows with the right guardrails.',
      'Every solution is built for responsible AI: aligned with the EU AI Act, secure with your data, and designed to keep humans in control.',
    ],
    subHeading: 'Responsible AI, grounded in your data',
    subPara:
      'We combine modern AI frameworks with rigorous engineering, so your agents are accurate, observable and compliant by design.',
    videoHeading: 'Intelligence that ships',
    bullets: [
      {
        label: 'Use-case and design',
        text: 'We identify high-value tasks and design agents around real data, ensuring accuracy, safety and measurable outcomes across your workflows.',
      },
      {
        label: 'Integration and evolution',
        text: 'Through evaluation and iteration, we embed LLMs into production systems and improve them continuously with monitoring and feedback.',
      },
    ],
    features: [
      {
        num: '01',
        title: 'LLM integration',
        desc: 'Assistants and copilots built on LangChain and modern model APIs.',
      },
      {
        num: '02',
        title: 'Document AI',
        desc: 'Reading, categorising and processing documents and invoices automatically.',
      },
      {
        num: '03',
        title: 'Fraud & detection',
        desc: 'AI models that improve precision in detection and decisioning.',
      },
      {
        num: '04',
        title: 'AI Act compliance',
        desc: 'Risk-aware design aligned with EU regulation from day one.',
      },
    ],
    closingHeading: 'AI that creates real, compliant value',
    closingPara:
      'We turn AI from a buzzword into dependable systems — categorising invoices, triaging requests, improving fraud detection and powering assistants. Built responsibly and aligned with the AI Act, our solutions remain adaptable, transparent and effective while supporting long-term growth.',
  },
  {
    slug: 'ux-ui-design',
    title: 'UX/UI Design',
    heroImage:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=70',
    intro: 'Interfaces that feel intuitive, polished and on-brand',
    introParas: [
      'We start with the user and the problem, designing experiences that feel natural and remove friction instead of adding it.',
      'Through clear structure and considered visual systems, we communicate effectively without unnecessary complexity.',
      'Our goal is design that scales — consistent components and patterns that keep products coherent as they grow.',
    ],
    subHeading: 'Design decisions that create clarity and balance',
    subPara:
      'Through careful refinement and collaboration, we produce interfaces that balance creativity with practical performance.',
    videoHeading: 'Designed with intention',
    bullets: [
      {
        label: 'Research and structure',
        text: 'We align user needs, flows and information architecture so every screen supports clarity, usability and confident decisions.',
      },
      {
        label: 'Systems and handoff',
        text: 'We build scalable design systems and collaborate closely with engineering for a faithful, efficient build.',
      },
    ],
    features: [
      {
        num: '01',
        title: 'UX research',
        desc: 'Flows and journeys grounded in real user behaviour.',
      },
      {
        num: '02',
        title: 'Interface design',
        desc: 'Polished, accessible UI that strengthens your brand.',
      },
      {
        num: '03',
        title: 'Design systems',
        desc: 'Reusable components that keep products consistent at scale.',
      },
      {
        num: '04',
        title: 'Prototyping',
        desc: 'Interactive prototypes to validate before you build.',
      },
    ],
    closingHeading: 'Design that makes products feel effortless',
    closingPara:
      'Intentional design decisions create clarity, balance and stronger digital experiences. We craft interfaces that feel purposeful and refined, transforming ideas into cohesive systems that remain adaptable, consistent and effective while supporting long-term engagement.',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation & Workflows',
    heroImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
    intro: 'Automate operations with AI-driven workflows',
    introParas: [
      'We look at where your team loses time to manual, repetitive work, then design automation that gives that time back with confidence.',
      'From real-time monitoring to automatic notifications and intelligent routing, we connect your systems and let AI handle the busywork.',
      'Every workflow is built to be observable and reliable, so automation increases efficiency without removing control.',
    ],
    subHeading: 'Less manual work, more measurable output',
    subPara:
      'We design automations that surface real-time data and act on it, improving speed, accuracy and decision-making across the operation.',
    videoHeading: 'Operations on autopilot',
    bullets: [
      {
        label: 'Process mapping',
        text: 'We map your operation to find high-impact automations that reduce manual effort and produce measurable, consistent outcomes.',
      },
      {
        label: 'Build and monitor',
        text: 'Through integration and testing, we deliver reliable workflows and keep them observable, adaptable and aligned with the business.',
      },
    ],
    features: [
      {
        num: '01',
        title: 'Workflow automation',
        desc: 'Connect systems and remove repetitive manual steps.',
      },
      {
        num: '02',
        title: 'Real-time monitoring',
        desc: 'Live data and insight into what is happening across operations.',
      },
      {
        num: '03',
        title: 'Smart notifications',
        desc: 'Automatic alerts and routing driven by AI signals.',
      },
      { num: '04', title: 'Forecasting', desc: 'Anticipate demand and act before issues arise.' },
    ],
    closingHeading: 'Automation that scales the operation',
    closingPara:
      'By aligning data, systems and intelligent logic, we craft automations that feel purposeful and reliable — giving teams real-time visibility and freeing them from busywork. The result is an operation that stays adaptable, efficient and effective as it grows.',
  },
  {
    slug: 'cloud-backend',
    title: 'Cloud & Backend',
    heroImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70',
    poster:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70',
    intro: 'Reliable cloud infrastructure and backend systems',
    introParas: [
      'We design backends and infrastructure around how your product actually runs, so the foundation is secure, observable and ready to scale.',
      'From APIs and databases to cloud architecture and CI/CD, we build the systems that keep everything else fast and dependable.',
      'Our goal is infrastructure that you can trust — resilient, cost-aware and prepared for growth and AI workloads.',
    ],
    subHeading: 'Architecture designed for scale and resilience',
    subPara:
      'We build cloud systems with scalability and security at the core, so your platform stays stable as traffic and data grow.',
    videoHeading: 'Foundations you can trust',
    bullets: [
      {
        label: 'Architecture and data',
        text: 'We design APIs, data models and cloud architecture that support performance, security and seamless integration across systems.',
      },
      {
        label: 'Operate and scale',
        text: 'Through automation and monitoring, we keep infrastructure reliable, cost-aware and ready to scale with the business.',
      },
    ],
    features: [
      {
        num: '01',
        title: 'APIs & databases',
        desc: 'Well-structured, secure backends with dedicated data layers.',
      },
      {
        num: '02',
        title: 'Cloud architecture',
        desc: 'Scalable, resilient infrastructure on modern cloud platforms.',
      },
      {
        num: '03',
        title: 'CI/CD & DevOps',
        desc: 'Automated pipelines for fast, safe, repeatable delivery.',
      },
      {
        num: '04',
        title: 'Security & compliance',
        desc: 'GDPR-aligned data handling and security by design.',
      },
    ],
    closingHeading: 'Backends built to keep everything running',
    closingPara:
      'From the first architecture decision to deployment and continuous operation, we build cloud and backend systems that are resilient, secure and prepared for growth — transforming requirements into foundations that stay adaptable, consistent and effective while supporting AI-ready workloads.',
  },
]

export const SERVICES: Service[] = SEED.map(({ poster, ...s }) => ({
  ...s,
  years: '2023 — 2025',
  video: { ...VIDEO, poster },
}))

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug)

export const serviceSlugs = (): string[] => SERVICES.map((s) => s.slug)
