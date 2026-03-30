import { createFileRoute } from "@tanstack/react-router";
import PortfolioPageNew from "@/pages/portfolio-page-2";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPageNew,
});
