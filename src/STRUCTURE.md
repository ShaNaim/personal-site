# Source Structure

src/
├── components/
│   ├── ui/          # shadcn/ui auto-generated components (never edit manually)
│   ├── common/      # Shared reusable components (ThemeToggle, Avatar, Logo...)
│   ├── forms/       # Form components tied to specific features
│   └── layouts/     # Page layout wrappers (Sidebar, Header, Shell...)
│
├── routes/          # TanStack Router file-based routes
│
├── pages/           # Page-level components imported by routes
│
├── services/        # API call functions (one file per resource)
│
├── stores/          # Zustand stores (one file per domain)
│
├── hooks/           # Custom React hooks
│
├── lib/             # Third-party config (axios, query-client, utils...)
│
├── types/           # Shared TypeScript interfaces and types
│
├── constants/       # App-wide constants (routes, config values...)
│
└── index.css        # Global styles + Tailwind entry
