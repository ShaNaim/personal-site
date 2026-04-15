import { createFileRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/common/nav-bar";
import { Footer } from "@/components/common/footer";
import { CursorOverlay } from "@/components/templates/cursor-overlay";
export const Route = createFileRoute("/_portfolio")({
  component: () => (
    <>
      <NavBar />
      <main>
        <CursorOverlay />
        <Outlet />
      </main>
      <Footer />
    </>
  ),
});
