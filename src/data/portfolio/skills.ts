import type { SkillsMap } from "@/types";

export const skills: SkillsMap = {
  Languages: [
    { name: "TypeScript", level: 92, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
  ],
  "Libraries & Frameworks": [
    { name: "React", level: 94, color: "#61DAFB" },
    { name: "Next.js", level: 80, color: "#ffffff" },
    { name: "Vue.js", level: 72, color: "#4FC08D" },
    { name: "Node.js", level: 88, color: "#339933" },
    { name: "Express.js", level: 82, color: "#aaaaaa" },
  ],
  "Styling & UI": [
    { name: "Tailwind CSS", level: 93, color: "#38B2AC" },
    { name: "ShadCN/UI", level: 90, color: "#ffffff" },
  ],
  "Databases & Tools": [
    { name: "PostgreSQL", level: 76, color: "#4169E1" },
    { name: "MongoDB", level: 70, color: "#47A248" },
    { name: "Prisma", level: 80, color: "#a78bfa" },
    { name: "Zod", level: 88, color: "#3178C6" },
  ],
};

export const SKILL_LEGEND = [
  { range: "101+", fun: "Torvalds 🧙", pro: "Torvalds" },
  { range: "90+", fun: "Wizard 🧙", pro: "Expert" },
  { range: "80+", fun: "Veteran 🎖️", pro: "Pro" },
  { range: "70+", fun: "Adventurer ⚔️", pro: "Advanced" },
  { range: "60+", fun: "Adventurer ⚔️", pro: "Intermediate" },
  { range: "<50", fun: "Apprentice 🌱", pro: "Familiar" },
];
