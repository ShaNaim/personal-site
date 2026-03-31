import type { HobbyItem, StatItem } from "@/types";

export const SECTIONS = ["home", "experience", "skills", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];

export const hobbies: HobbyItem[] = [
  { icon: "🍔", label: "Burgers", desc: "Hardcore enthusiast" },
  { icon: "🎮", label: "Gaming", desc: "Part-time quest taker" },
  { icon: "🔭", label: "Astrophysics", desc: "Black holes & bugs" },
  { icon: "👨‍👩‍👧", label: "Family", desc: "Core side quest" },
];

export const heroStats: StatItem[] = [
  { num: "2+", label: "Years" },
  { num: "3", label: "Products" },
  { num: "10+", label: "Tech Used" },
];

export const techStack = [
  { label: "JavaScript" },
  { label: "TypeScript" },
  { label: "React" },
  { label: "Next.js" },
  { label: "Vue.js" },
  { label: "Node.js" },
  { label: "PostgreSQL" },
  { label: "Prisma" },
  { label: "Docker" },
  { label: "Tailwind" },
];
