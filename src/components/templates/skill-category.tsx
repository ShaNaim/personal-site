import { AnimatedBar } from "@/components/common/animated-bar";
import type { Skill } from "@/types";

interface SkillCategoryProps {
  category: string;
  items: Skill[];
  animationIndexOffset?: number;
  onSkillHover: (level: number | null) => void;
}

export function SkillCategory({ category, items, animationIndexOffset = 0, onSkillHover }: SkillCategoryProps) {
  const getLevelLabel = (level: number) => {
    if (level >= 101) return "Torvalds";
    if (level >= 90) return "Expert";
    if (level >= 80) return "Pro";
    if (level >= 70) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Familiar";
  };

  return (
    <div>
      <h3 className="text-(--size-section-label) tracking-[0.25em] text-(--color-brand) mb-6 uppercase">{category}</h3>

      <div className="flex flex-col gap-5">
        {items.map((skill, si) => (
          <div key={skill.name} className="group relative flex items-center gap-4" onMouseEnter={() => onSkillHover(skill.level)} onMouseLeave={() => onSkillHover(null)}>
            <div className="min-w-[120px] text-[12px] tracking-wider text-(--color-text-mid) group-hover:text-(--color-brand) transition-colors duration-200">{skill.name}</div>

            <div className="absolute left-[130px] top-[-10px] opacity-0 group-hover:opacity-20 pointer-events-none transition-all duration-500 hidden lg:block translate-x-2 group-hover:translate-x-0">
              <pre className="text-[8px] font-mono text-(--color-text-faint) leading-tight select-none">{`// status: ${getLevelLabel(skill.level).toLowerCase()}\n> latency: 0.2ms`}</pre>
            </div>

            <div className="flex-1">
              <AnimatedBar level={skill.level} color={skill.color} delay={animationIndexOffset * 100 + si * 80} />
            </div>

            <div className="min-w-[70px] text-right tabular-nums">
              <span className="text-(--color-text-mid) uppercase tracking-tighter group-hover:hidden">{getLevelLabel(skill.level)}</span>
              <span className="ml-2 group-hover:hidden text-[11px] text-primary-foreground font-mono">{skill.level}%</span>

              <span className="hidden group-hover:inline text-primary-foreground uppercase tracking-tighter">{getLevelLabel(skill.level)}</span>
              <span className="ml-2 hidden group-hover:inline text-[11px] text-(--color-brand) font-mono">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
