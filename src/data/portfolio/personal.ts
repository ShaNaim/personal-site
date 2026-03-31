import type { HobbyItem, StatItem, PersonalInfo } from "@/types";

export const SECTIONS = ["home", "experience", "skills", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];

// SERVER

export const personalInfo: PersonalInfo = {
  firstName: "SHANAIM",
  lastName: "SHOUROV",
  experience: "3+",
  title: "Full-Stack Developer",
  description: `I build end-to-end web applications — from pixel-precise interfaces to scalable backend integrations. I love minimalism and brutalist design, and I believe the best code is the kind nobody notices.`,
  quote: "If it works on my machine, it's officially your problem now.",
};

export const hobbies: HobbyItem[] = [
  { icon: "🍔", label: "Burgers", desc: "Hardcore enthusiast" },
  { icon: "🎮", label: "Gaming", desc: "Part-time quest taker" },
  { icon: "🔭", label: "Astrophysics", desc: "Black holes & bugs" },
  { icon: "👨‍👩‍👧", label: "Family", desc: "Core side quest" },
];

export const heroStats: StatItem[] = [
  { num: "3+", label: "Years" },
  { num: "4", label: "Products" },
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
