import { createFileRoute } from "@tanstack/react-router";
import ClockPage from "@/pages/clock";

export const Route = createFileRoute("/clock/")({
  head: () => ({
    meta: [{ title: "SS - Clock" }],
  }),
  component: ClockPage,
});
