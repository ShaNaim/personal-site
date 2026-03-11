# Personal Site

A modern, production-ready single-page application built with React, TypeScript, and Vite. Designed for scalability, developer experience, and clean architecture.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture & Conventions](#architecture--conventions)
  - [Routing](#routing)
  - [Data Fetching](#data-fetching)
  - [State Management](#state-management)
  - [Forms & Validation](#forms--validation)
  - [Styling](#styling)
  - [Components](#components)
  - [Error Handling](#error-handling)
- [Contributor Guide: Where Does My Code Go?](#contributor-guide-where-does-my-code-go)
- [Docker](#docker)
- [Deployment](#deployment)
- [Code Style & Linting](#code-style--linting)

---

## Tech Stack

| Layer            | Technology            | Purpose                                |
| ---------------- | --------------------- | -------------------------------------- |
| Framework        | React 19              | UI rendering                           |
| Language         | TypeScript 5          | Type safety                            |
| Build Tool       | Vite 7                | Dev server and bundler                 |
| Routing          | TanStack Router       | File-based, fully type-safe routing    |
| Server State     | TanStack Query        | API data fetching, caching, and sync   |
| Client State     | Zustand               | UI state management                    |
| Forms            | React Hook Form + Zod | Form state and schema validation       |
| Styling          | Tailwind CSS v4       | Utility-first CSS                      |
| Components       | shadcn/ui             | Accessible, customizable UI components |
| HTTP Client      | Axios                 | API communication                      |
| Notifications    | Sonner                | Toast notifications                    |
| Theming          | next-themes           | Dark/light/system mode                 |
| Font             | Inter Variable        | Self-hosted variable font              |
| Dates            | date-fns              | Date formatting and manipulation       |
| Containerization | Docker + nginx        | Local dev and production serving       |

---

## Prerequisites

Make sure you have the following installed before getting started:

- **Node.js** v22 LTS ([install via nvm](https://github.com/nvm-sh/nvm))
- **Docker** and **Docker Compose** ([install Docker Desktop](https://www.docker.com/products/docker-desktop/))
- **make** (comes pre-installed on macOS and Linux)

Verify your setup:

```bash
node -v       # v22.x.x
docker -v     # Docker version 27.x.x
make -v       # GNU Make 3.x.x
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/personal-site.git
cd personal-site

# 2. Copy the example env file
cp .env.example .env

# 3. Install dependencies inside Docker
make install

# 4. Start the development server
make up
```

Visit `http://localhost:3000` in your browser.

> The dev server supports **hot module replacement (HMR)** — changes to source files reflect in the browser instantly without restarting the container.

---

## Available Commands

| Command           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `make install`    | Install npm dependencies inside the Docker container              |
| `make up`         | Start the dev server in the foreground at `http://localhost:3000` |
| `make upd`        | Start the dev server in the background (daemon mode)              |
| `make down`       | Stop all running containers                                       |
| `make clean`      | Stop containers and remove all Docker volumes                     |
| `make build`      | Build the production Docker image                                 |
| `make preview`    | Preview the production build at `http://localhost:8080`           |
| `make dev-shell`  | Open a shell inside the dev container as your current user        |
| `make root-shell` | Open a shell inside the dev container as root                     |
| `make help`       | List all available commands                                       |

> All commands use Docker internally. You do not need to run `npm` directly on your host machine.

---

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser.

| Variable       | Description                 | Example                 |
| -------------- | --------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:8000` |

### Files

| File           | Purpose                                    | Committed? |
| -------------- | ------------------------------------------ | ---------- |
| `.env.example` | Template showing required variables        | ✅ Yes     |
| `.env`         | Your local development values              | ❌ No      |
| `.env.build`   | Values used during Docker production build | ❌ No      |

**Never commit `.env` or `.env.build` to version control.** They may contain secrets.

To add a new environment variable:

1. Add it to `.env.example` with a placeholder value
2. Add it to your local `.env` with the real value
3. Add it to `.env.build` for production
4. Reference it in code as `import.meta.env.VITE_YOUR_VAR`

---

## Project Structure

```
personal-site/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui generated components (do not edit)
│   │   ├── common/          # Shared, reusable UI components
│   │   ├── forms/           # Form components
│   │   └── layouts/         # Page layout wrappers
│   ├── routes/              # TanStack Router file-based routes
│   ├── pages/               # Full page components
│   ├── services/            # API call functions
│   ├── stores/              # Zustand client state stores
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Third-party library configuration
│   ├── types/               # Shared TypeScript types and interfaces
│   ├── constants/           # App-wide constants
│   └── index.css            # Global styles and Tailwind entry
├── public/                  # Static assets (favicon, images, fonts)
├── docker-compose.yml       # Local development Docker setup
├── Dockerfile               # Production multi-stage build
├── nginx.conf               # nginx SPA routing config
├── Makefile                 # Developer convenience commands
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript root config
├── tsconfig.app.json        # TypeScript browser/app config
├── tsconfig.node.json       # TypeScript Node/build-tool config
├── components.json          # shadcn/ui config
├── .env.example             # Environment variable template
└── .env.build               # Production build environment (not committed)
```

---

## Architecture & Conventions

### Routing

Routes live in `src/routes/` and follow TanStack Router's **file-based routing** convention.

```
src/routes/
├── __root.tsx          # Root layout (providers, global UI like Toaster)
├── index.tsx           # Matches "/"
├── dashboard/
│   ├── index.tsx       # Matches "/dashboard"
│   └── $id.tsx         # Matches "/dashboard/:id" (dynamic segment)
└── login.tsx           # Matches "/login"
```

**Rules:**

- Route files only handle routing concerns — they import from `src/pages/`
- Never put business logic directly in route files
- The route tree is auto-generated at `src/routeTree.gen.ts` — never edit this file manually
- Dynamic segments use `$param` naming convention

**Example route file:**

```tsx
// src/routes/dashboard/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/dashboard-page";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});
```

---

### Data Fetching

All server data fetching uses **TanStack Query**. API calls are never made directly inside components.

**The pattern:**

```
Component → Custom Hook → Service → Axios Instance → API
```

**Example:**

```tsx
// src/services/user.service.ts
export const userService = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: number) => api.get<User>(`/users/${id}`),
};

// src/hooks/use-users.ts
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll().then((res) => res.data),
  });
}

// src/components/common/user-list.tsx
export function UserList() {
  const { data, isLoading } = useUsers();
  // ...
}
```

**Query key conventions:**

```ts
["users"][("users", id)][("users", id, "posts")]; // collection // single item // nested resource
```

---

### State Management

Use **Zustand** for client-side UI state only. Never store server data in Zustand — that belongs in TanStack Query.

```
TanStack Query  →  Server state  (API data, loading, errors)
Zustand         →  Client state  (sidebar open, selected tab, modal state)
React Hook Form →  Form state    (field values, validation errors)
```

Stores live in `src/stores/` with one file per domain:

```
src/stores/
├── app.store.ts      # Global UI state (sidebar, theme preferences)
├── auth.store.ts     # Authenticated user session state
└── cart.store.ts     # Example: feature-specific state
```

---

### Forms & Validation

All forms use **React Hook Form** with **Zod** schema validation.

**The pattern:**

```tsx
// 1. Define schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// 2. Infer type from schema — never define form types manually
type FormData = z.infer<typeof schema>;

// 3. Connect to React Hook Form
const { register, handleSubmit, setError, formState } = useForm<FormData>({
  resolver: zodResolver(schema),
});

// 4. Handle submission with centralized error handler
const onSubmit = async (data: FormData) => {
  try {
    await someService.submit(data);
    toast.success("Done!");
  } catch (error) {
    handleError(error, { setError });
  }
};
```

Form components live in `src/components/forms/`.

---

### Styling

This project uses **Tailwind CSS v4** with shadcn/ui's CSS variable theming.

**Rules:**

- Use Tailwind utility classes for all styling
- Use `cn()` from `@/lib/utils` when conditionally merging classes
- Use `bg-background`, `text-foreground`, `border-border` etc. — never hardcode colors
- Dark mode is handled automatically via `next-themes` and Tailwind's `dark:` variant

```tsx
// Good
<div className={cn("rounded-lg p-4", isActive && "bg-primary text-primary-foreground")} />

// Bad — hardcoded colors break dark mode
<div style={{ backgroundColor: '#fff', color: '#000' }} />
```

---

### Components

Components are organized into four categories:

| Folder                | Rule                                                                                     | Example                                       |
| --------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------- |
| `components/ui/`      | Auto-generated by shadcn/ui. **Never edit manually.** Re-run `npx shadcn add` to update. | `Button`, `Input`, `Dialog`                   |
| `components/common/`  | Reusable across the whole app. No business logic. No API calls.                          | `ThemeToggle`, `Avatar`, `Logo`, `PageHeader` |
| `components/forms/`   | Form components. May contain validation logic. Tied to a specific feature or resource.   | `LoginForm`, `CreateUserForm`                 |
| `components/layouts/` | Structural wrappers. Compose the page shell.                                             | `AppShell`, `Sidebar`, `Header`, `AuthLayout` |

**Adding a new shadcn/ui component:**

```bash
npx shadcn@latest add [component-name]
# Example:
npx shadcn@latest add dialog
npx shadcn@latest add data-table
```

---

### Error Handling

All errors from API calls are handled through the centralized `handleError` utility in `src/lib/error-handler.ts`.

It handles:

- **422 Validation errors** — maps field errors back to form fields via `setError`
- **401 Unauthorized** — redirects to `/login`
- **403/404/500** — shows appropriate toast message
- **Network errors** — shows generic error toast

```tsx
// Inside any form submission or mutation
try {
  await someService.doSomething(data);
  toast.success("Success!");
} catch (error) {
  handleError(error, { setError }); // setError is optional — only needed in forms
}
```

---

## Contributor Guide: Where Does My Code Go?

Use this as a quick reference when adding new features.

```
New API endpoint?
└── src/services/[resource].service.ts

New reusable data fetching logic?
└── src/hooks/use-[resource].ts

New page?
├── src/routes/[page].tsx          (routing only, import from pages/)
└── src/pages/[page]-page.tsx      (actual page component)

New form?
└── src/components/forms/[name]-form.tsx

New layout wrapper?
└── src/components/layouts/[name]-layout.tsx

New shared UI component?
└── src/components/common/[name].tsx

New shadcn/ui component?
└── npx shadcn@latest add [name]   (auto-generates in components/ui/)

New global UI state?
└── src/stores/[domain].store.ts

New TypeScript type or interface?
└── src/types/[domain].ts          (export from src/types/index.ts)

New app-wide constant?
└── src/constants/[domain].ts      (export from src/constants/index.ts)

New third-party library config?
└── src/lib/[library].ts
```

---

## Docker

This project uses Docker for both local development and production.

### Local Development

The `app-dev` service mounts your source code as a volume, so edits on your host reflect instantly in the container.

```
Host machine source code
        ↕ (volume mount)
Docker container running Vite dev server
        ↕ (port 3000)
Browser at http://localhost:3000
```

`node_modules` is stored in a **named Docker volume** (`node_modules`) separate from your host. This avoids macOS/Linux binary incompatibility issues.

### Production Build

The `Dockerfile` uses a **multi-stage build**:

- **Stage 1 (builder):** Uses `node:22-alpine` to compile TypeScript and bundle assets with Vite
- **Stage 2 (serve):** Uses `nginx:alpine` to serve the static `dist/` output

The final production image contains **no Node.js** — only nginx and your compiled static files. This keeps the image small and secure.

```bash
# Build production image
make build

# Test production build locally
make preview
# Visit http://localhost:8080
```

---

## Deployment

This app is deployed to **DigitalOcean**. See the deployment guide for full instructions:

- Push your code to GitHub
- DigitalOcean App Platform detects the `Dockerfile` and builds automatically
- Environment variables are configured in the DigitalOcean dashboard
- Every push to `main` triggers a new deployment

> Make sure `.env.build` values are configured as environment variables in your DigitalOcean app settings before deploying.

---

## Code Style & Linting

This project uses **ESLint** with TypeScript and React Hooks rules enforced.

```bash
# Run linter
npm run lint

# Type check
npm run build
```

**Conventions:**

- File names use `kebab-case` — `user-list.tsx`, `auth.service.ts`
- Component names use `PascalCase` — `UserList`, `AuthService`
- Hook names are prefixed with `use` — `useUsers`, `useAuth`
- Store files are suffixed with `.store` — `app.store.ts`
- Service files are suffixed with `.service` — `auth.service.ts`
- Type files group related types — `api.ts`, `user.ts`
- Constants are `SCREAMING_SNAKE_CASE` — `ROUTES.HOME`, `API_TIMEOUT`

---

## License

MIT License. See [LICENSE](./LICENSE) for details.
