import { AnimatedBar } from "@/components/common/animated-bar";
import type { Skill } from "@/types";

interface SkillCategoryProps {
  category: string;
  items: Skill[];
  animationIndexOffset?: number;
}

export function SkillCategory({ category, items, animationIndexOffset = 0 }: SkillCategoryProps) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "var(--color-brand)",
          marginBottom: 24,
          textTransform: "uppercase",
        }}
      >
        {category}
      </div>

      {items.map((skill, si) => (
        <div
          key={skill.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              minWidth: 120,
              fontSize: 12,
              letterSpacing: "0.05em",
              color: "var(--color-text-mid)",
            }}
          >
            {skill.name}
          </div>

          <div style={{ flex: 1 }}>
            <AnimatedBar level={skill.level} color={skill.color} delay={animationIndexOffset * 100 + si * 80} />
          </div>

          <div
            style={{
              fontSize: 11,
              color: "var(--color-text-faint)",
              minWidth: 32,
              textAlign: "right",
            }}
          >
            {skill.level}
          </div>
        </div>
      ))}
    </div>
  );
}
