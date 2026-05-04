import { createFileRoute } from "@tanstack/react-router";
import { FinanceCategoriesPage } from "@/pages/finance/categories";

export const Route = createFileRoute("/finance/categories/")({
  component: FinanceCategoriesPage,
  head: () => ({
    meta: [{ title: "Finance · Categories — Vader" }],
  }),
});
