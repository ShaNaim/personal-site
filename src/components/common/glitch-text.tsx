import { useRef, useEffect } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;':,./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface GlitchTextProps {
  text: string;
}

export function GlitchText({ text }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);

  const scramble = () => {
    let iteration = 0;
    const totalFrames = text.length * 3;

    cancelAnimationFrame(frameRef.current);

    const animate = () => {
      if (!ref.current) return;

      ref.current.innerText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration / 3) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        ref.current.innerText = text;
      }
    };

    animate();
  };

  useEffect(() => {
    scramble();
    return () => cancelAnimationFrame(frameRef.current);
  }, [text]);

  return (
    <span ref={ref} onMouseEnter={scramble}>
      {text}
    </span>
  );
}
