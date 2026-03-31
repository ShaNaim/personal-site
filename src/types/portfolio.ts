export type Direction = "up" | "down" | "left" | "right";

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface SkillsMap {
  [category: string]: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  current: boolean;
  points: string[];
}

export interface HobbyItem {
  icon: string;
  label: string;
  desc: string;
}

export interface StatItem {
  num: string;
  label: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  experience: string;
  title: string;
  description: string;
  quote: string;
}
