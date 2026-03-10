import { createFileRoute } from "@tanstack/react-router";
import { ExampleForm } from "@/components/forms/example-form";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ExampleForm />
    </div>
  );
}
