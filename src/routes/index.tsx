import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Button variant="secondary" onClick={() => alert("Hello from Shadcn")}>
        Hello shadcn
      </Button>
    </div>
  );
}
