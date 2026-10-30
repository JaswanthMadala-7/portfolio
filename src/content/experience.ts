/**
 * Verified roles and background. The page shows an empty state if this list is empty.
 */
export type Experience = {
  organization: string;
  title: string;
  start: string;
  end: string;
  responsibilities: string[];
  contributions: string[];
  accomplishments: string[];
};

export const experience: Experience[] = [
  {
    organization: "Independent / Enterprise Engineering Projects",
    title: "Software & AI Systems Engineer",
    start: "2025",
    end: "Present",
    responsibilities: [
      "Architecting backend microservices in Java and Spring Boot for automated telecom workflows.",
      "Experimenting with Spring AI and Model Context Protocol (MCP) to build intelligent network configuration assistants.",
      "Optimizing database schemas and transactional boundaries in MySQL and Cassandra.",
    ],
    contributions: [
      "Designed AI-powered alarm correlation pipelines reducing manual triage effort.",
      "Authored clean modular service templates for rapid deployment of backend automation tools.",
    ],
    accomplishments: [],
  },
  {
    organization: "Academic & Engineering Training",
    title: "B.Tech, Computer Science and Engineering",
    start: "Coursework",
    end: "Graduation",
    responsibilities: [
      "Rigorous coursework in data structures, algorithms, distributed systems, and object-oriented design.",
      "Developed foundational projects in Java, database management systems, and software engineering principles.",
    ],
    contributions: [
      "Built resilient terminal and web-based utility tools.",
      "Maintained strong academic standing with distinction in core computer science modules.",
    ],
    accomplishments: [],
  },
];
