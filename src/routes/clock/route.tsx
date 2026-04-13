import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ClockNavBar } from "@/components/modules/clock/nav-bar";
import { Footer } from "@/components/common/footer";

export const Route = createFileRoute("/clock")({
  component: () => (
    <>
      <ClockNavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ),
});
