/**
 * Central profile configuration. Edit this file to update the site.
 */
export type SocialLink = { label: string; href: string };

export const site = {
  name: "Jaswanth Madala",
  shortName: "Jaswanth",
  monogram: "JM",
  title: "Software Engineer | Backend Developer | AI Systems Engineer",
  // NEXT_PUBLIC_SITE_URL overrides this; the canonical domain is the fallback.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaswanthmadala.com").replace(/\/$/, ""),
  description:
    "Software engineer working across backend systems, AI agents, and telecom automation with Java and Spring Boot.",
  hero: {
    eyebrow: "Software engineer · AI systems",
    headline: "Building reliable backend systems and intelligent AI-powered applications.",
    description:
      "I'm a software engineer interested in backend architecture, distributed systems, and AI agents. I work across Java, Spring Boot, and data platforms while exploring how LLMs and tool-enabled agents can solve real-world engineering problems.",
    aside: {
      availability: "Focused on building & learning",
      exploring:
        "Agent workflows, tool calling, and practical AI systems built on reliable backend foundations.",
      coreStack: "Java · Spring Boot · SQL · AI tooling",
    },
  },
  location: "India / Remote",
  email: "jassumadala21@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/JaswanthMadala-7" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jaswanthmadala" },
  ] as SocialLink[],
  // Place your PDF at public/resume.pdf, then set available: true.
  resume: { path: "/resume.pdf", available: false },
  education: [{ degree: "B.Tech in Computer Science and Engineering", institution: "", years: "" }],
  about: {
    intro: [
      "I'm a software engineer focused on backend development and AI systems. My work sits where backend engineering, telecom, and AI meet.",
      "I build services with Java and Spring Boot, and I'm interested in how large language models, tool calling, and structured outputs can automate real operational workflows such as configuration management, alarms, incidents, and work orders.",
    ],
    interests: [
      "Backend architecture and microservices",
      "AI agents, tool calling, and Model Context Protocol (MCP)",
      "Telecom network management and automation",
      "Databases and distributed systems",
    ],
    philosophy: [
      {
        title: "Reliability first",
        desc: "Fault-tolerant systems with clean architecture, strict error handling, and robust testing.",
      },
      {
        title: "Pragmatic AI",
        desc: "LLMs, tool calling, and structured outputs applied to concrete workflow automation problems — constrained, observable, and testable.",
      },
      {
        title: "Scalable design",
        desc: "High-throughput REST APIs and event-driven pipelines with clear contracts between small, dependable components.",
      },
    ],
    learning:
      "Spring AI, Model Context Protocol (MCP), multi-agent workflows, and patterns for making LLM-driven agents reliable in production.",
    goals:
      "To bridge large-scale telecom infrastructure and intelligent autonomous agents, building agent-based software that is dependable enough for real operations teams.",
  },
  skills: [
    {
      group: "Backend & systems",
      items: ["Java", "Spring Boot", "REST APIs", "Microservices", "Maven", "Git", "Concurrency"],
    },
    {
      group: "AI & agent engineering",
      items: ["Spring AI", "Model Context Protocol (MCP)", "LLMs & tool calling", "Structured outputs", "Prompt engineering"],
    },
    {
      group: "Databases & storage",
      items: ["MySQL", "Cassandra", "Relational modeling", "Distributed storage", "Query optimization"],
    },
    {
      group: "Infrastructure & telecom",
      items: ["Docker", "Kubernetes", "Network management", "Alarm correlation", "Work-order workflows"],
    },
  ],
  seo: { ogImageAlt: "Jaswanth Madala, software engineer" },
  contact: {
    intro:
      "Have a project in mind, a backend engineering role, or want to discuss AI agents? Send a message and I'll reply by email — typically within 24 hours.",
  },
};

export type Site = typeof site;

export function validateSiteConfig(s: Site = site): string[] {
  const problems: string[] = [];
  if (!s.name) problems.push("name is required");
  if (!/^https?:\/\//.test(s.url)) problems.push("url must start with http(s)://");
  if (s.resume.available && !s.resume.path.startsWith("/")) problems.push("resume.path must start with /");
  return problems;
}

export const isPlaceholderUrl = site.url.includes("YOUR_DOMAIN");

/** Opens Gmail's compose window in the browser, pre-addressed to the given email. */
export function gmailComposeUrl(email: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}
export const activeSocials = site.socials.filter((s) => s.href.trim() !== "");
