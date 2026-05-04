import { createFileRoute } from "@tanstack/react-router";
import { FinanceBudgetPage } from "@/pages/finance/budget";

export const Route = createFileRoute("/finance/budget/")({
  component: FinanceBudgetPage,
  head: () => ({
    meta: [{ title: "Finance · Budget — Vader" }],
  }),
});
