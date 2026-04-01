import { cn } from "@/lib/utils";
import { memo, type FC, type HTMLAttributes, useEffect, useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

// ── Variants — identical to original FlipClock ──
const flipUnitVariants = cva("relative subpixel-antialiased perspective-[1000px] rounded-md overflow-hidden", {
  variants: {
    size: {
      xs: "w-8 min-w-4 h-6 text-xl",
      sm: "w-10 min-w-10 h-14 text-3xl",
      md: "w-14 min-w-14 h-20 text-5xl",
      lg: "w-17 min-w-17 h-24 text-6xl",
      xl: "w-22 min-w-22 h-32 text-8xl",
    },
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background text-foreground",
      muted: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { size: "md", variant: "default" },
});

const commonCardStyle = cn("absolute inset-x-0 overflow-hidden h-1/2 bg-inherit text-inherit");

// ── FlipUnit — identical to original, reused as-is ──
interface FlipUnitProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof flipUnitVariants> {
  digit: number | string;
}

const FlipUnit: FC<FlipUnitProps> = memo(function FlipUnit({ digit, size, variant, className }: FlipUnitProps) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        setPrevDigit(digit);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div className={cn(flipUnitVariants({ size, variant }), className)}>
      <div className={cn(commonCardStyle, "rounded-t-lg top-0")}>
        <DigitSpan position="top">{digit}</DigitSpan>
      </div>
      <div className={cn(commonCardStyle, "rounded-b-lg translate-y-full")}>
        <DigitSpan position="bottom">{prevDigit}</DigitSpan>
      </div>
      <div className={cn(commonCardStyle, "z-20 origin-bottom backface-hidden rounded-t-lg", flipping && "animate-flip-top")}>
        <DigitSpan position="top">{prevDigit}</DigitSpan>
      </div>
      <div className={cn(commonCardStyle, "z-10 origin-top backface-hidden rounded-b-lg translate-y-full", flipping && "animate-flip-bottom")} style={{ transform: "rotateX(90deg)" }}>
        <DigitSpan position="bottom">{digit}</DigitSpan>
      </div>
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-background/50 z-30" />
    </div>
  );
});

function DigitSpan({ children, position }: { children: ReactNode; position?: "top" | "bottom" }) {
  return (
    <span className="absolute left-0 right-0 w-full flex items-center justify-center h-[200%]" style={{ top: position === "top" ? "0%" : "-100%" }}>
      {children}
    </span>
  );
}

type FlipClockSize = NonNullable<VariantProps<typeof flipUnitVariants>["size"]>;

const heightMap: Record<FlipClockSize, string> = {
  xs: "text-xl",
  sm: "text-4xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

function ClockSeparator({ size }: { size?: FlipClockSize }) {
  return <span className={cn("text-center -translate-y-[8%]", size ? heightMap[size] : heightMap["md"])}>:</span>;
}

// ── ControlledFlipClock — no internal timer, fully prop-driven ──
interface ControlledFlipClockProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof flipUnitVariants> {
  hours: number;
  minutes: number;
  seconds: number;
}

export const ControlledFlipClock = memo(function ControlledFlipClock({ hours, minutes, seconds, size, variant, className, ...props }: ControlledFlipClockProps) {
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative flex justify-center items-center font-mono font-medium",
        size === "xs" && "space-x-1 text-xl",
        size === "sm" && "space-x-1 text-3xl",
        size === "md" && "space-x-2 text-5xl",
        size === "lg" && "space-x-2 text-6xl",
        size === "xl" && "space-x-3 text-8xl",
        className,
      )}
      aria-live="polite"
      {...props}
    >
      <span className="sr-only">{`${hh}:${mm}:${ss}`}</span>

      {hh.split("").map((d, i) => (
        <FlipUnit key={`h-${i}`} digit={d} size={size} variant={variant} />
      ))}
      <ClockSeparator size={size ?? "md"} />

      {mm.split("").map((d, i) => (
        <FlipUnit key={`m-${i}`} digit={d} size={size} variant={variant} />
      ))}
      <ClockSeparator size={size ?? "md"} />

      {ss.split("").map((d, i) => (
        <FlipUnit key={`s-${i}`} digit={d} size={size} variant={variant} />
      ))}

      <style>{`
        .animate-flip-top {
          animation: flip-top-anim 0.6s ease-in forwards;
        }
        .animate-flip-bottom {
          animation: flip-bottom-anim 0.6s ease-out forwards;
        }
        @keyframes flip-top-anim {
          0% { transform: rotateX(0deg); z-index: 30; }
          50%, 100% { transform: rotateX(-90deg); z-index: 10; }
        }
        @keyframes flip-bottom-anim {
          0%, 50% { transform: rotateX(90deg); z-index: 10; }
          100% { transform: rotateX(0deg); z-index: 30; }
        }
      `}</style>
    </div>
  );
});
