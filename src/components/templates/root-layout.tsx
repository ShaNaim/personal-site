import { Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/common/nav-bar";
import { Footer } from "@/components/common/footer";

export function RootLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
