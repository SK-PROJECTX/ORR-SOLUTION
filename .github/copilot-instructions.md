# Project Guidelines

## Code Style
- **Language**: TypeScript with Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming (dark theme defaults)
- **Linting**: ESLint with Next.js config
- **Naming**: PascalCase for components, camelCase for stores/hooks/utils, kebab-case for lib files
- Reference: [components/ProtectedRoute.tsx](client/components/ProtectedRoute.tsx) for component patterns, [store/authStore.ts](client/store/authStore.ts) for store patterns

## Architecture
- **Framework**: Next.js App Router with route groups for organization
- **State Management**: Zustand stores with localStorage persistence (13 stores for different domains)
- **API Layer**: Axios with interceptors for authentication and CSRF tokens
- **Auth Pattern**: JWT tokens in localStorage + CSRF cookies
- **Build Mode**: Static export (no SSR or API routes)
- Key boundaries: `(client_dashboard)` for protected user areas, `(landing)` for public pages, `admin/` for admin portal
- Reference: [lib/axios.ts](client/lib/axios.ts) for API setup, [app/(client_dashboard)/layout.tsx](client/app/(client_dashboard)/layout.tsx) for protected routing

## Build and Test
- **Install**: `pnpm install` (preferred) or `npm install`
- **Dev Server**: `pnpm dev` (runs on localhost:3000)
- **Build**: `pnpm build` (static export)
- **Start**: `pnpm start` (production server)
- **Lint**: `pnpm lint` or `eslint`
- **Node Version**: Requires Node 24.x (see .nvmrc)
- Environment: Set `NEXT_PUBLIC_API_URL` for backend API (defaults to production if unset)

## Conventions
- **API Responses**: Backend wraps data in `{ data: { ... } }` structure; use fallback `response.data?.data || response.data`
- **Error Handling**: Store methods follow `set({ isLoading: true }) → try { ... } catch { set({ error }); toastStore.addToast(error) }`
- **Auth Flow**: Bearer token auto-injected via axios interceptors; 401 responses clear tokens and redirect
- **Styling**: Use CSS variables like `--color-primary` (#0EC277), utility classes like `.glass-panel`
- **Data Fetching**: Custom hooks with localStorage caching (e.g., [hooks/useCachedData.ts](client/hooks/useCachedData.ts))
- Reference: [lib/rich-text-utils.ts](client/lib/rich-text-utils.ts) for content parsing, [SITEMAP_SETUP.md](client/SITEMAP_SETUP.md) for SEO setup