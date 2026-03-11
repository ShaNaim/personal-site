import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/pages/portfolio-page";

export const Route = createFileRoute("/")({
  component: Portfolio,
});
