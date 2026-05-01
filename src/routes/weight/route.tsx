import { createFileRoute, Outlet } from "@tanstack/react-router";
import { WeightNavBar } from "@/components/modules/weight-manager/nav-bar";
import { CursorOverlay } from "@/components/templates/cursor-overlay";
import { Footer } from "@/components/common/footer";

export const Route = createFileRoute("/weight")({
  component: () => (
    <>
      <CursorOverlay />
      <WeightNavBar />
      <Outlet />
      <Footer />
    </>
  ),
});
