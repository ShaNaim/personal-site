import { createFileRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/common/nav-bar";
import { Footer } from "@/components/common/footer";

export const Route = createFileRoute("/_portfolio")({
  component: () => (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ),
});
