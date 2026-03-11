import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    title: "Software Developer",
    company: "LocalStaffing",
    period: "May 2025 – Present",
    current: true,
    points: [
      "Develop and maintain an advertising campaign management dashboard using React and TypeScript, implementing real-time filtering, scheduling, and budget tracking with TanStack Query for efficient server state synchronization.",
      "Engineer an AI-powered content generation feature within the email builder, leveraging the Anthropic API to dynamically suggest subject lines and body copy based on campaign context.",
      "Design and maintain reusable email templates using MJML, ensuring rendering consistency across major clients including Gmail and Outlook.",
      "Build and maintain a job recruitment platform, developing candidate-facing job listing interfaces with advanced search, filtering, and pagination, ensuring minimal re-fetches and optimistic UI updates.",
      "Implement a commission calculation and payment management module for recruitment workflows, handling complex multi-tier fee structures with real-time earnings breakdowns.",
      "Collaborate with backend developers to integrate REST APIs efficiently across multiple platforms, ensuring smooth data flow, real-time updates, and optimistic UI interactions.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Jukto Digital",
    period: "August 2023 – February 2026",
    current: false,
    points: [
      "Developed and maintained a Learning Management System (LMS) and a Student Management System (SMS) using React, ensuring seamless user experiences.",
      "Implemented minimalist and brutalist UI designs, balancing aesthetics with usability to create intuitive interfaces.",
      "Optimized application performance by improving load times, reducing render-blocking resources, and enhancing accessibility.",
      "Worked closely with backend developers to integrate APIs efficiently, ensuring smooth data flow and real-time updates.",
      "Designed and developed reusable React components, improving development efficiency and consistency across projects.",
      "Debugged and resolved UI/UX issues, enhancing responsiveness and cross-browser compatibility.",
      "Collaborated with product teams to refine user journeys, aligning development with business objectives.",
    ],
  },
];
