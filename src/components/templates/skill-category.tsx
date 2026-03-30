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
      {/* Category Header */}
      <h3 className="text-[10px] tracking-[0.25em] text-[var(--color-brand)] mb-6 uppercase font-medium">{category}</h3>

      <div className="flex flex-col gap-5">
        {items.map((skill, si) => (
          <div key={skill.name} className="flex items-center gap-4 group">
            {/* Skill Name */}
            <div className="min-w-[120px] text-[12px] tracking-wider text-[var(--color-text-mid)] group-hover:text-[var(--color-text)] transition-colors duration-200">{skill.name}</div>

            {/* Progress Bar Container */}
            <div className="flex-1">
              <AnimatedBar level={skill.level} color={skill.color} delay={animationIndexOffset * 100 + si * 80} />
            </div>

            {/* Percentage/Level Label */}
            <div className="min-w-[32px] text-[11px] text-[var(--color-text-faint)] text-right font-mono">{skill.level}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
