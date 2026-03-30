import { useCursor } from "@/hooks/use-cursor";

export function CursorOverlay() {
  const { dotRef, ringRef } = useCursor();
  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-(--color-brand) pointer-events-none z-9999 will-change-transform" />
      <div ref={ringRef} className="fixed top-0 left-0 w-12 h-12 block rounded-full border border-(--color-brand-mid) pointer-events-none z-9998 mix-blend-difference will-change-transform" />
    </>
  );
}
