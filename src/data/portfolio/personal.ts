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
