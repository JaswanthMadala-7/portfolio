/**
 * Editable project entries. These are working titles describing areas of work.
 * Rules: no confidential details, no customer or infrastructure names, no private links.
 * Set `published: false` to hide an entry. Leave `links` empty unless a public link exists.
 */
export type ProjectCategory =
  | "Backend Engineering"
  | "AI Agents and MCP"
  | "Telecom and Network Automation"
  | "Developer Tools";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  kind: "professional" | "personal";
  published: boolean;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  decisions: string[];
  challenges: { challenge: string; approach: string }[];
  lessons: string[];
  outcomes: string[]; // only verified outcomes
  links: { demo?: string; source?: string };
  related: string[];
};

export const categories: ProjectCategory[] = [
  "Backend Engineering",
  "AI Agents and MCP",
  "Telecom and Network Automation",
  "Developer Tools",
];

export const projects: Project[] = [
  {
    slug: "ai-telecom-operations-assistant",
    title: "AI-powered Telecom Operations Assistant",
    summary:
      "An agent-based incident triage and alarm correlation assistant that helps network operations teams work with alarms, incidents, and service impact through natural-language requests.",
    category: "Telecom and Network Automation",
    kind: "professional",
    published: true,
    problem:
      "Network operations centers are overwhelmed by thousands of raw alarms during network events, and operators switch between many tools and data sources to understand an alarm or incident. Finding the right data takes time and domain knowledge, delaying root-cause analysis.",
    solution:
      "An AI-driven triage pipeline ingests alarms and correlates related events, while LLM-based agents are given a narrow set of tools per domain, such as alarms, incidents, and service impact. Prompts and tool routing keep each agent focused, and structured outputs keep responses predictable enough for downstream automation such as work-order creation.",
    role: "Backend and AI agent engineering: prompt design, tool routing, and service integration. This was professional work for an employer; the system is not my personal property.",
    stack: ["Java", "Spring Boot", "Spring AI", "LLMs", "Tool calling", "Structured outputs", "MySQL"],
    decisions: [
      "Separate agents per operational domain instead of one general agent.",
      "Constrain tools and request parameters so the model cannot call anything outside its scope.",
      "Prefer structured outputs with strict JSON schema validation so downstream code does not parse free text.",
      "Use asynchronous event ingestion so peak alarm volume does not block core monitoring threads.",
    ],
    challenges: [
      {
        challenge: "Requests that could belong to more than one domain.",
        approach: "Explicit scope and disambiguation rules in prompts and routing.",
      },
      {
        challenge: "Alarm storms producing bursts of correlated noise.",
        approach: "Deterministic rule-based filtering and deduplication before any probabilistic AI analysis.",
      },
    ],
    lessons: [
      "Narrow tool scopes and clear prompts improve reliability more than longer prompts.",
      "Deterministic rule-based filtering must always precede probabilistic AI analysis in mission-critical telecom environments.",
    ],
    outcomes: [],
    links: {},
    related: ["mcp-network-configuration-agent", "configuration-management-work-order-platform"],
  },
  {
    slug: "configuration-management-work-order-platform",
    title: "Configuration Management and Work-Order Platform",
    summary:
      "Spring Boot microservices for tracking configuration changes, validating templates, and orchestrating work-order workflows across network domains.",
    category: "Backend Engineering",
    kind: "professional",
    published: true,
    problem:
      "Manual network configuration changes across distributed devices introduce human error and prolong provisioning times. Changes need to be tracked, validated, and traceable from request to completion.",
    solution:
      "Modular Spring Boot microservices expose REST APIs for configuration and work-order workflows, validate configuration templates, orchestrate multi-step work orders, and audit every deployment state, backed by relational and wide-column storage and deployed on Kubernetes.",
    role: "Backend development on microservices and their deployment. This was professional work for an employer.",
    stack: ["Java", "Spring Boot", "MySQL", "Cassandra", "Docker", "Kubernetes", "Maven"],
    decisions: [
      "Keep services small with clear API contracts, separating template rendering from device execution.",
      "Choose the data store per access pattern rather than using one for everything.",
      "Use a transactional outbox pattern to keep configuration services and audit logs reliably in sync.",
    ],
    challenges: [
      {
        challenge: "Recovering gracefully from transient transport failures mid-workflow.",
        approach: "Idempotent configuration APIs and explicit, resumable state transitions.",
      },
    ],
    lessons: [
      "Idempotency in network configuration APIs is crucial for recovering gracefully from transient failures.",
      "Database constraints and application validation serve different purposes; use both.",
    ],
    outcomes: [],
    links: {},
    related: ["mcp-network-configuration-agent"],
  },
  {
    slug: "mcp-network-configuration-agent",
    title: "MCP-based Network Configuration Agent",
    summary:
      "A Model Context Protocol server exposing secure, capability-limited tools so agents can read and reason about network configuration data.",
    category: "AI Agents and MCP",
    kind: "professional",
    published: true,
    problem:
      "Configuration data lives behind several services, and general-purpose LLMs lack a secure, standardized mechanism to inspect configuration schemas and safely query device state.",
    solution:
      "Configuration capabilities are exposed as MCP tools with typed, constrained inputs, so an agent can discover and call them in a controlled way — querying device configurations, validating syntax, and simulating provisioning changes without touching production parameters.",
    role: "Design and implementation of the agent's tool interface and prompts. This was professional work for an employer.",
    stack: ["Spring AI", "MCP", "Java", "Spring Boot", "REST APIs"],
    decisions: [
      "Expose capabilities as small, well-described tools and validate tool arguments on the server.",
      "Enforce strict sandboxing of tool execution to prevent unauthorized modification of production parameters.",
      "Design clear JSON-RPC interfaces for seamless integration with MCP-compatible clients.",
    ],
    challenges: [],
    lessons: [
      "Standardizing context providers through MCP dramatically simplifies building secure agentic workflows.",
      "Tool schemas are part of the product interface; precise descriptions reduce ambiguity.",
    ],
    outcomes: [],
    links: {},
    related: ["ai-telecom-operations-assistant"],
  },
  {
    slug: "distributed-event-pipeline",
    title: "Distributed Event-Driven Backend Experiments",
    summary:
      "A high-throughput telemetry ingestion and query pipeline prototype built on Cassandra and Java concurrency primitives.",
    category: "Developer Tools",
    kind: "personal",
    published: true,
    problem:
      "High-frequency device telemetry generated write bottlenecks in traditional relational databases.",
    solution:
      "A distributed event ingestion prototype uses Apache Cassandra for horizontal write scalability and custom Java worker pools for batch processing, with backpressure to absorb traffic spikes.",
    role: "Sole author; personal experiment.",
    stack: ["Java", "Cassandra", "Concurrency", "Docker", "Maven"],
    decisions: [
      "Design partition keys around time-series telemetry retrieval patterns.",
      "Implement backpressure in worker queues to handle traffic spikes smoothly.",
    ],
    challenges: [],
    lessons: [
      "Proper data modeling in wide-column stores like Cassandra is paramount before tackling high-volume ingestion.",
    ],
    outcomes: [],
    links: {},
    related: ["configuration-management-work-order-platform"],
  },
  {
    slug: "ai-backend-engineering-experiments",
    title: "AI and Backend Engineering Experiments",
    summary:
      "Personal experiments with LLM tool calling, structured outputs, and backend patterns. Public write-ups will be added here.",
    category: "Developer Tools",
    kind: "personal",
    published: true,
    problem: "Learning agent patterns needs small, safe projects that are not tied to proprietary systems.",
    solution:
      "Small self-contained experiments built on public data and tools, each focused on one engineering question with documented trade-offs. Details will be added as projects are published.",
    role: "Sole author.",
    stack: ["Java", "Spring Boot", "Spring AI", "TypeScript"],
    decisions: [
      "Keep dependencies minimal and measure behavior instead of relying on demos alone.",
    ],
    challenges: [],
    lessons: ["Small experiments expose integration gaps early."],
    outcomes: [],
    links: {},
    related: ["distributed-event-pipeline"],
  },
];

export const publishedProjects = projects.filter((p) => p.published);
export const getProject = (slug: string) => publishedProjects.find((p) => p.slug === slug);
