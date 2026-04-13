import { createRootRoute, Outlet, HeadContent } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { CursorOverlay } from "@/components/templates/cursor-overlay";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HeadContent />
      <CursorOverlay />
      <Outlet />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  ),
});
