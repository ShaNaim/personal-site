import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FinanceNavBar } from "@/components/modules/finance/nav-bar";
import { CursorOverlay } from "@/components/templates/cursor-overlay";
import { Footer } from "@/components/common/footer";

export const Route = createFileRoute("/finance")({
  component: () => (
    <>
      <CursorOverlay />
      <FinanceNavBar />
      <div className="mt-6">
        <Outlet />
      </div>
      <Footer />
    </>
  ),
});
