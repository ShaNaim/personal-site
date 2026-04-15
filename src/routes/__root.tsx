import { createRootRoute, Outlet, HeadContent } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HeadContent />
      <Outlet />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  ),
});
