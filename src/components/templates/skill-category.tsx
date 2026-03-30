import { AnimatedBar } from "@/components/common/animated-bar";
import type { Skill } from "@/types";

interface SkillCategoryProps {
  category: string;
  items: Skill[];
  animationIndexOffset?: number;
}

export function SkillCategory({ category, items, animationIndexOffset = 0 }: SkillCategoryProps) {
  // Helper to get labels based on your thresholds
  const getLevelLabel = (level: number) => {
    if (level >= 100) return "Torvalds";
    if (level >= 90) return "Expert";
    if (level >= 80) return "Pro";
    if (level >= 70) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Familiar";
  };

  return (
    <div>
      <h3 className="text-[10px] tracking-[0.25em] text-[var(--color-brand)] mb-6 uppercase">{category}</h3>

      <div className="flex flex-col gap-5">
        {items.map((skill, si) => (
          <div key={skill.name} className="group relative flex items-center gap-4">
            {/* Skill Name */}
            <div className="min-w-[120px] text-[12px] tracking-wider text-[var(--color-text-mid)] group-hover:text-[var(--color-brand)] transition-colors duration-200">{skill.name}</div>

            {/* Ghost Log Code */}
            <div className="absolute left-[130px] top-[-10px] opacity-0 group-hover:opacity-20 pointer-events-none transition-all duration-500 hidden lg:block translate-x-2 group-hover:translate-x-0">
              <pre className="text-[8px] font-mono text-[var(--color-text-faint)] leading-tight select-none">{`// status: ${getLevelLabel(skill.level).toLowerCase()}\n> latency: 0.2ms`}</pre>
            </div>

            {/* Progress Bar */}
            <div className="flex-1">
              <AnimatedBar level={skill.level} color={skill.color} delay={animationIndexOffset * 100 + si * 80} />
            </div>

            {/* Dynamic Label/Percentage */}
            <div className="min-w-[70px] text-right tabular-nums">
              {/* Default: Level Label (Expert/Pro) */}
              <span className="text-[10px] text-[var(--color-text-faint)] uppercase tracking-tighter group-hover:hidden transition-all">{getLevelLabel(skill.level)}</span>
              {/* Hover: Exact Percentage */}
              <span className="hidden group-hover:inline text-[11px] text-[var(--color-brand)] font-mono">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
