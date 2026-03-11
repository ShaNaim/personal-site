import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { ExampleForm } from "@/components/forms/example-form";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center px-4">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-15 dark:opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Theme toggle — top right */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow behind card */}
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 dark:opacity-20 -z-10" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} />

        <div className="rounded-3xl border border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-medium text-indigo-500 tracking-widest uppercase">Welcome back</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Form */}
          <ExampleForm />

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Don't have an account? <span className="text-indigo-500 hover:underline cursor-pointer font-medium">Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}
