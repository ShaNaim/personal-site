import { createFileRoute } from "@tanstack/react-router";
import { WeightManagerPage } from "@/pages/weight-manager";

export const Route = createFileRoute("/weight/")({
  component: WeightManagerPage,
  head: () => ({
    meta: [{ title: "Weight Manager — Vader" }],
  }),
});
