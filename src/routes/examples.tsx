import { createFileRoute } from "@tanstack/react-router";
import Examples from "@/pages/examples";

export const Route = createFileRoute("/examples")({
  component: Examples,
});
