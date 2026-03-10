import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app.store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">
          Sidebar is: <strong>{sidebarOpen ? "Open" : "Closed"}</strong>
        </p>
        <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
      </div>
    </div>
  );
}
