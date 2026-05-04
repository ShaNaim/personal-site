import { createFileRoute } from "@tanstack/react-router";
import { FinanceDashboardPage } from "@/pages/finance";

export const Route = createFileRoute("/finance/")({
  component: FinanceDashboardPage,
  head: () => ({
    meta: [{ title: "Finance — Vader" }],
  }),
});
