import { createFileRoute } from "@tanstack/react-router";
import PortfolioPageNew from "@/pages/portfolio-page-source";

export const Route = createFileRoute("/portfolio-source")({
  component: PortfolioPageNew,
});
