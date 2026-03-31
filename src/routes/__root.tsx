import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { CursorOverlay } from "@/components/templates/cursor-overlay";
export const Route = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CursorOverlay />
      <Outlet />
      <Toaster richColors position="top-right" />
      {/* <TanStackRouterDevtools /> */}
    </ThemeProvider>
  ),
});
