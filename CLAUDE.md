# Project Patterns

## Quick Reference

### Commands

```bash
pnpm dev        # dev server
pnpm build      # production build
pnpm lint       # biome lint --fix
pnpm format     # biome format --write
pnpm exec tsc --noEmit  # typecheck (no emit)
pnpm test:e2e   # E2E tests (requires dev server running)
```

### Tech Stack

Next.js (always latest stable) · App Router · TypeScript strict · Tailwind v4 (CSS-first, no `tailwind.config.ts`) · shadcn/ui · next-intl (default locale: `pt`) · Zod v4 + react-hook-form (`standardSchemaResolver`) · TanStack Query v5 · Biome · pnpm · PostHog · Better Auth (external backend · Google OAuth)

### shadcn/ui References

- **Add component:** `pnpm dlx shadcn@latest add <component-name>`
- **LLM docs (use for component implementation):** https://ui.shadcn.com/llms.txt
- **DataTable:** https://ui.shadcn.com/docs/components/radix/data-table
- **Combobox:** https://ui.shadcn.com/docs/components/radix/combobox

### Environment Variables

```
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

---

## Architecture

### Folder Structure

| Folder                    | Responsibility                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **app/**                  | Routes, layouts, pages, special files. Orchestration only.                                                     |
| **components/**           | Reusable components. **components/ui/**: shadcn-managed, never edit directly.                                  |
| **components/providers/** | React context providers (`QueryProvider`, theme, etc.).                                                        |
| **models/**               | Single source of truth: interfaces, types, enums, constants, schemas, mocks.                                   |
| **config/**               | App config (site, URLs, metadata).                                                                             |
| **lib/**                  | Runtime utilities (utils, fonts).                                                                              |
| **shared/**               | Non-UI shared code (cva variants).                                                                             |
| **hooks/**                | Custom React hooks. One per file, named `useXxx`. Exception: related hooks sharing the same cache may coexist. |
| **services/**             | External API integrations, server actions, email templates.                                                    |
| **i18n/**                 | next-intl config.                                                                                              |
| **locales/**              | Translation files, split by domain/feature per locale.                                                         |

### Scope Rules — no exceptions

| Artifact          | Designated Folder                      |
| ----------------- | -------------------------------------- |
| Interfaces        | `models/interfaces/`                   |
| Types             | `models/types/`                        |
| Enums / Constants | `models/enums/` or `models/constants/` |
| Schemas           | `models/schemas/`                      |
| Hooks             | `hooks/`                               |
| Utility functions | `lib/`                                 |
| Components        | `components/`                          |
| CVA variants      | `shared/variants/`                     |
| Translations      | `locales/{locale}/`                    |
| Configs           | `config/`                              |
| Mocks / test data | `models/mocks/`                        |
| Services          | `services/`                            |

No inline domain types outside `models/`. No inline hooks outside `hooks/`. No inline schemas outside `models/schemas/`. No inline utility functions outside `lib/`. No inline service calls outside `services/`.

### models/ Sub-structure

- **interfaces/** — Interfaces (page props, DTOs, API contracts)
- **enums/** — Domain enums and routes
- **constants/** — Business constants
- **mocks/** — Sample data
- **schemas/** — Zod validation schemas. Direct schemas: export `const xyzSchema` + `export type XyzSchema = z.infer<typeof xyzSchema>`. i18n-dependent schemas: export factory `function createXyzSchema(messages)` + plain type alias `export type XyzSchema = { ... }`.
- **types/** — Utility types, unions, branded types
- **config/** — Derived config (e.g. chart)

### locales/ Structure

- One folder per locale (`pt`, `en`). One JSON file per domain/feature (kebab-case).
- `i18n/request.ts` loads and merges all files. File names map to top-level keys (e.g. `not-found.json` → `messages.notFound`).

### Dependency Direction

- `app/ → components/ → lib/`
- `services/ → lib/`
- Nothing in `lib/` or `models/` imports from `app/`, `components/`, or `services/`.
- Email templates: when added, place in `services/emails/` (not `components/`).

### Domain Scalability

- Each domain has own sub-folders in `components/containers/`, `services/`, `models/`, `locales/`.
- Adding a domain must not touch existing domain files.
- `app/` stays thin — orchestration only, no business logic.

---

## Code Style

### TypeScript

- `strict: true` — never weaken.
- No `any`. Use `unknown` at boundaries and narrow immediately.
- Discriminated unions over optional fields for multi-state objects.
- Branded types for domain IDs.
- Return type annotations on all exported functions.
- No type assertions (`as Foo`) — narrow with guards or schemas. Exceptions: `as CSSProperties` for CSS custom properties (shadcn convention); `as ColumnDef<T>[]` in TanStack Table columnHelper (known variance limitation); `as TData` / `as TItem[]` in `apiClient`/`apiClientPaginated` generic boundary casts after Zod shape validation (Zod validates outer shape, generic type cannot be statically verified — this is the only acceptable location for this pattern).
- **`as Parameters<typeof t>[0]` is strictly forbidden** — this pattern casts strings to next-intl key types, hiding type errors. Use typed `as const` lookup maps, template literals from `as const` source arrays (TypeScript infers the literal union), or type `ExpiringTranslator` as `ReturnType<typeof useTranslations<"namespace">>` and pass `t` directly. The correct approach must be 100% type-safe without any cast.

### Naming Conventions

- **Schemas:** camelCase + suffix `Schema` — `loginSchema`, `contactSchema`.
- **Server actions:** camelCase + suffix `Action` — `loginAction`, `submitContactAction`.
- **Props interfaces:** `{ComponentName}Props` — `HeaderLogoProps`, `HeroSectionProps`.
- **Enums:** PascalCase name, SCREAMING_SNAKE_CASE values.
- **Constants:** SCREAMING_SNAKE_CASE — `MAX_RETRY_COUNT`, `DEFAULT_LOCALE`.
- **Hooks:** always `useXxx` — explicit return type annotation required.
- **Server action files:** `services/{domain}/actions.ts`. Large domains may split into sub-action files (e.g. `clause-actions.ts`, `document-actions.ts`).
- **File naming:** kebab-case (`use-mobile.ts`, `theme-provider.tsx`). Exception: `components/ui/` follows shadcn convention.
- **Routes:** always use `Routes` enum from `@/models/enums/routes` — never hardcode strings like `"/dashboard"`. Use `Routes.DASHBOARD`, `Routes.LOGIN`, etc.

### Code Construction

- Single responsibility per file.
- Pure logic in `lib/`/`models/`; side effects in `services/`.
- No premature abstraction of **logic/functions** — extract only at **3+ usages**. Types, interfaces, schemas, and constants always go in their designated folders regardless of usage count (scope rules override).
- **No duplicated code** — identical logic repeated 2+ times must be extracted into a shared utility in `lib/`. Same pattern across hooks → shared helper (e.g. `unwrapAction`). Same type shape across files → shared type (e.g. `ActionOk`). Same interface shape across 3+ interfaces → base interface with `extends`. Review every new function/type for existing equivalents before creating.
- Max 20 lines per function.
- Declarative over imperative (`map`/`filter`/`reduce` over mutation loops).
- No magic numbers — named constants in `models/constants/`. Time durations in `constants/time.ts`, query staleness in `constants/query.ts`.
- **Prefer battle-tested libraries over hand-rolled logic** for non-trivial operations (formatting, validation, parsing). Example: use `@brazilian-utils/brazilian-utils` for CPF/CNPJ/phone validation and formatting — never write custom regex. Only hand-roll when no library covers the use case or the logic is trivially simple (< 3 lines).
- **Validation strategy:** simple conditions → inline boolean; multiple conditions or swappable logic → strategy object `{ condition: (data) => boolean, ... }`. Never use classes for strategies — plain objects with functions are idiomatic.

### Formatting

- **File size limit:** 300 lines max — hard limit. At 200+ lines start extracting. At 300 lines extraction is mandatory.
- **Biome:** tabs, indent 4, lineWidth 80, double quotes, semicolons always.
- **Commits:** Conventional Commits (commitlint + Husky).

### Language

- All code, comments, variable/function/type names, and **translation keys** in **English**.
- **No Portuguese words anywhere in code** — not in variable names, function names, translation keys, IDs, or object keys. The ONLY place Portuguese is allowed is inside locale JSON **values** (the translated strings themselves) and metadata `title`/`description`/`openGraph`/`twitter` content.
- **Alias locale-specific library imports** to English equivalents: `formatCnpj as formatRegistrationNumberLib`, `formatCpf as formatTaxIdLib`.
- **Exception:** backend API contract values (`"CPF" | "CNPJ" | "PIX"` in union types) must match the backend exactly — these are not renamed.
- No unnecessary comments. Only explain **WHY** for non-obvious decisions.
- No section dividers, decorative comments, JSDoc for self-explanatory code, or commented-out code.

---

## React & Components

### Server vs Client

- **All pages (`page.tsx`) must be Server Components** — `async` function returning `Promise<ReactElement>`. Never use `"use client"` in a page file.
- Server Components by default. `"use client"` only when required (hooks, browser APIs, events).
- i18n + animation split: async Server Component fetches translations → passes as props → sibling Client Component handles animation hooks (e.g. `OnboardingSidePanel` + `OnboardingPanelMetrics`).
- No `JSX.Element` or `React.JSX.Element` — always use `ReactElement` from `react` for all components and pages.
- Hooks in `hooks/`, one per file.

### Component Rules

- **Never modify `components/ui/`** — use shadcn CLI only.
- **One component per file.** No helper components or `renderX()` inside another component's file.
- **MANDATORY: Split large components.** Files approaching 300 lines or components with distinct visual sections must be broken into sibling files. A component that renders multiple independent sections (e.g. a view with a chart, a table, and cards) must extract each section into its own file. The parent file orchestrates; children handle presentation. No exceptions.
- **Container pattern:** `container.tsx` orchestrates, sibling files handle presentation.
- **DRY strictly enforced:**
  - No duplicate constants — inline literals in arrays, don't export individually.
  - Consolidate interfaces with same shape into one in `models/interfaces/`.
  - Extract shared hook logic into generic base hooks.
  - Hardcoded strings (emails, URLs) in `config/`, never inline.
- Composition over inheritance. Use `cn()` for class merging.
- Compound components for complex UIs.

### Imports

- Always use path aliases (`@/components/*`, `@/models/*`, etc.). Never use `@/enums/*` — always `@/models/enums/*`.
- No `import *`. Named exports only. Exception: `app/` pages/layouts use `export default` (required by Next.js).
- No barrel imports — import from direct path.

### Semantic HTML

- Use the correct semantic element everywhere, no exceptions: `<main>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, `<section>`, `<article>`, `<ul>`/`<li>`, `<figure>`/`<figcaption>`, `<time>`, `<address>`, etc.
- Never use `<div>` or `<span>` when a semantic element better describes the content.
- **One `<h1>` per page.** Multi-line styled headings (e.g. brand two-tone title) use a single `<h1>` with styled `<span>` children — never split one logical heading across multiple heading levels (`<h1>` + `<h2>`).
- `<aside>` for supplementary/decorative panels (side panels, callouts, banners).
- `<nav>` must wrap every navigation list.

### Primitives Over Native Elements

- **Always use shadcn/ui and Radix primitives** over raw HTML elements where a component exists (`<Button>`, `<Input>`, `<Label>`, `<Text>`, etc.).
- **`<Text>` from `@/components/ui/text` instead of `<p>`** for all block text. Use `size` prop for sizing. Keep `<span>` for inline text only.
- **`<Text size="sm">` not `className="text-sm"`** — always use the `size` prop for the base text size; never set it via `className` (e.g. `text-sm`, `text-2xl`). Responsive overrides in `className` are fine (e.g. `md:text-2xl`, `lg:text-4xl`).
- **All `<Input>` components must have large sizing** (`py-6 px-4`) — no exceptions. This ensures readability for the target audience. Exception: inputs using `inputStyles()` from `@/shared/variants/input` (compact search/filter inputs in tables) — `inputStyles()` applies `p-3!` intentionally and must not be changed.
- **`buttonStyles` from `@/shared/variants/button`** — all dashboard buttons must use `buttonStyles()`. Use `size: "md"` (`p-3!`) for text buttons. **Icon-only buttons: never use `size="icon"` prop — instead use `buttonStyles({ intent: "X", size: "sm" })` + `aspect-square` in `className`** (`size: "sm"` = `p-2!`). Intent mapping: `variant="ghost"` or `variant="outline"` → `intent: "neutral"`; `variant="destructive"` → `intent: "destructive"`; no variant → default primary.
- **`badgeStyles` from `@/shared/variants/badge`** — all dashboard badges must wrap their className with `cn(badgeStyles(), ...)`. No icons inside badges — text only.
- **Minimum text size is `sm`** — never use `xs` or smaller on `<Text>`. The target audience needs readable text at all times.
- **Maximum font weight is `medium`** — never use `font-bold`, `font-semibold`, `font-extrabold`, or `font-black`. Use `font-medium` at most. This keeps the UI clean and consistent.
- **All buttons have `cursor-pointer` by default** via `globals.css` base layer — never add `cursor-pointer` manually to buttons.
- Only use native HTML elements when no shadcn/Radix primitive covers the use case.

### Interaction Patterns

- **Single-field actions use Dialog, not Sheet.** When a dropdown/action involves only one field (e.g. rename), open a compact `Dialog` with the input field. Sheets are reserved for multi-field forms.
- **All Sheets must be modal (with backdrop blur).** Never use `modal={false}` on `<Sheet>`. The default `modal={true}` renders the `SheetOverlay` with `backdrop-blur`, creating a consistent blur effect behind the panel. This is mandatory for all edit/create sheets across the dashboard.
- **Sheets on mobile become Drawers.** Use `<ResponsiveSheet>` from `@/components/responsive-sheet` instead of `<Sheet>` directly — automatically renders as a bottom Drawer on mobile and a side Sheet on desktop. Exception: `header-mobile-nav.tsx` stays as Sheet (intentional side panel).
- **Selects use Combobox.** All `<Select>` components must use the shadcn Combobox pattern (https://ui.shadcn.com/docs/components/radix/combobox) — searchable, accessible, keyboard-navigable.
- **Data tables use the shadcn DataTable pattern** (https://ui.shadcn.com/docs/components/radix/data-table) with TanStack Table v8 — column definitions, sorting, pagination, row selection all follow this guide.
- **Empty state messages are mandatory.** Every list, table, or data section must handle the empty/no-data case with a translated message (e.g. "Nenhum item encontrado"). Never render a blank area when data is missing or the request returns an empty array.

### Forms

- `react-hook-form` + `standardSchemaResolver` + Zod schema from `models/schemas/`.
- Schema inferred type = form values type. No separate `FormValues`. Exception: factory schemas (`createXxxSchema(messages)`) — export a plain type alias (`XxxSchema = { field: Type }`) alongside the factory, since `z.infer<ReturnType<typeof createXxxSchema>>` is impractical.
- Submit handler calls server action from `services/`.
- **All dropzone inputs must have `cursor-pointer`** — every `<Input>` rendered inside a dropzone area (`getRootProps`/`getInputProps`) must include `className="cursor-pointer"` so the user sees a pointer cursor on hover.

---

## Next.js

### Rendering Strategy

- `cacheComponents: true` in `next.config.ts` — all pages dynamic by default; static opt-in via `"use cache"`.
- With `cacheComponents`, `force-dynamic` and `export const revalidate` are obsolete — do not use.
- Push dynamic boundaries down to components, wrap in `<Suspense>`.
- Each independent fetch gets its own `<Suspense>` — no single global wrapper.
- Skeleton in separate file: `{component}-skeleton.tsx`.
- `generateStaticParams` + `dynamicParams = false` for pre-rendered dynamic routes.
- `"use cache"` on fetch functions, Server Components, or entire files for static/revalidatable data.
- `connection()` from `next/server` to force dynamic rendering without Dynamic APIs (e.g. `Math.random()`, `Date.now()`).

### Data Fetching Strategy

Two strategies — choose based on context:

- **Server Components** → SSR reads (first paint, SEO-critical, cookie-authenticated pages).
- **TanStack Query** → interactive client-side reads (dashboard data, real-time updates, optimistic UI after mutations).

Never mix: Server Components do not use `useQuery`; Client Components do not call `services/{domain}.ts` directly.

### Server Component Fetching

- Fetch in Server Components, not `useEffect + fetch`.
- `React.cache()` for per-request deduplication — scope is a single request, never shared across users.
- `Promise.all`/`Promise.allSettled` for parallel fetching.
- Wrap cache/fetch logic in `services/` — never in components.
- Every `fetch` call must be wrapped in `try/catch` — network errors throw and are not caught by `!response.ok`.
- Use `safeParse` (not `parse`) for all external/boundary data — fetch responses, env vars, translation raw data. Schema mismatches must propagate as explicit thrown errors, never as unhandled Zod exceptions.
- Tag cached data with `cacheTag()` and set lifetime with `cacheLife()` inside `"use cache"` scope.
- `updateTag()` in Server Actions for immediate invalidation (read-your-own-writes). `revalidateTag()` in Route Handlers (stale-while-revalidate).

### "use cache" Directive

- Apply at file level (`"use cache"` at top), function level, or component level.
- `cacheLife(profile)` sets lifetime: `'seconds'` · `'minutes'` · `'hours'` · `'days'` · `'weeks'` · `'max'`.
- `cacheTag(...tags)` marks the cached entry for targeted invalidation.
- **FORBIDDEN inside `"use cache"` scope:** `cookies()`, `headers()`, `auth()`, any Dynamic API.
- For user-specific cached data use `"use cache: private"` — stored in browser cache, never on CDN.
- All function arguments and return values must be serializable (no class instances, functions, Dates).
- Nested `cacheLife`: an explicit outer `cacheLife` always wins; without explicit outer, shortest inner lifetime propagates up.

### after()

- Use `after()` from `next/server` for post-response side effects (analytics, logging, cleanup).
- In **Server Components**: read all Dynamic APIs (`cookies()`, `headers()`, `params`) _before_ the callback and pass values via closure — Dynamic APIs are unavailable inside the callback.
- In **Server Functions / Route Handlers**: Dynamic APIs are available inside the callback.
- Never use `after()` for mutations that affect the response — the response has already been sent.

### Special Files

- `loading.tsx`: Suspense skeleton visually faithful to the real layout.
- `error.tsx`: never expose stack trace — only translated message + retry button.
- `not-found.tsx`: one per route segment — do not reuse across distinct routes.

### Error Handling

- `error.tsx` for route-level boundaries.
- Services return `{ data, error }` or throw typed errors — never `undefined`.
- Never swallow errors silently.
- User-facing error messages from translations only.
- `notFound()` for missing resources — never return `null`.
- **Server actions:** `if (!session) return clearSessionAndRedirect()` — clears the stale Better Auth cookie and redirects to login. Always `return` (not `await`) so execution halts. This is preferred over `unauthorized()` because Better Auth uses HttpOnly cookies that must be cleaned up on session expiry.
- `forbidden()` (403) for authorized-but-forbidden access — when the user is authenticated but lacks permissions.

### Toasts

- **Error toasts:** always use `showErrorToast(message)` from `@/lib/show-error-toast` — never call `toast.error()` directly. It handles multi-line messages (splits on `\n`, uses first line as title and remainder as description).
- **Other toasts (success, info, warning):** use `toast` from `sonner` directly (`toast.success()`, `toast.info()`, etc.).

---

## Services

### Backend as Source of Truth

**The backend is ALWAYS and UNEQUIVOCALLY the source of truth.**

- All business logic, validation, and authorization decisions live in the backend — the frontend never re-implements them.
- Never derive, infer, or assume data shape from frontend state — always reflect what the backend returns.
- Never optimistically mutate local state without reconciling with the backend response.
- Never cache or persist backend data locally (localStorage, sessionStorage, cookies) beyond session scope.
- If the backend says it, the frontend renders it. If the backend rejects it, the frontend surfaces the error as-is.
- Any frontend validation (Zod schemas) is UX-only — it never replaces or overrides backend validation.
- **Zod response schemas must match the backend response exactly** — never add fields the backend doesn't return, never make optional what the backend sends as required. If the schema parse fails, the backend response shape has changed — update the schema to match, never invent fields.

### Backend Service Layer

Each domain has files in `services/{domain}/`:

- `{domain}.ts` — raw HTTP calls to the backend (`fetch` + `Cookie` header). No `"use server"`.
- `actions.ts` — server actions (`"use server"`). Only for mutations triggered by client events (clicks, form submits). Reads in Server Components call `{domain}.ts` directly — no action needed.
- Large domains may split actions into sub-files (e.g. `clause-actions.ts`, `document-actions.ts`, `payment-actions.ts`) for clarity.

All calls go directly to the external backend — Next.js is never a proxy. Auth uses session cookies (HttpOnly, cross-origin). Server Components cannot rely on the browser to send cookies automatically, so the service file reads `cookies()` from Next.js and forwards the `Cookie` header explicitly. Client-side hooks use `apiClient` with `credentials: "include"`, which lets the browser send cookies automatically.

```
// Mutation (client-triggered) → action → service → backend
upload-card.tsx → submitDocumentsAction() → uploadDocument() → POST /v1/...

// Read (Server Component) → service → backend directly
export default async function Page() {
    const cookieHeader = (await cookies()).toString();
    const data = await getContracts(cookieHeader); // services/contracts/contracts.ts
}
```

### TanStack Query (Client-side)

> **MUST follow exactly:** [TanStack Query v5 SSR guide](https://tanstack.com/query/v5/docs/framework/react/guides/ssr)
> Every SSR integration decision must be validated against this documentation. Do not deviate.

- Query client setup: `lib/get-query-client.ts` — singleton on browser, fresh instance on server.
- Provider: `components/providers/query-provider.tsx` — wraps dashboard layout.
- Query keys: `QUERY_KEYS` constant from `models/constants/query-keys.ts` — always spread (`[...QUERY_KEYS.x]`).
- Client fetch: `apiClient<T>(path)` from `lib/api-client.ts` — **browser-only**, uses `credentials: "include"`. Never runs server-side.
- Reads in hooks: `useSuspenseQuery({ queryKey: [...QUERY_KEYS.x], queryFn: () => apiClient<T>("/v1/...") })` for server-prefetched queries. `useQuery` only for lazily-loaded queries without server prefetch.
- **Multiple suspense queries in one component:** never call multiple `useSuspenseQuery` hooks in the same component — they execute serially and cause SSR state update warnings. Use `useSuspenseQueries` (plural) instead to fetch in parallel.
- **SSR pattern (exact, per docs):**
  1. Server Component page: fetch with `await Promise.all([...])`, then call `queryClient.setQueryData(key, data)` only for successful results — never use `prefetchQuery` with a throwing `queryFn`, as Next.js's RSC error tracking intercepts the throw before TanStack Query can swallow it (causes "Recoverable Error" / client rendering fallback).
  2. Wrap with `<HydrationBoundary state={dehydrate(queryClient)}>`
  3. Client component uses `useSuspenseQuery` — data is always defined, never handles `isLoading`
  4. `loading.tsx` in the route segment provides the Suspense fallback
  - On error: `setQueryData` is simply not called → query absent from cache → `useSuspenseQuery` fetches fresh on the client.
- Mutations in hooks: `useMutation` → calls server action → update cache in `onSuccess`:
  - `setQueryData` when the mutation returns the full updated resource (detail queries) — avoids an extra network call.
  - `invalidateQueries` when you don't have complete updated data (list queries, paginated results, create/delete operations).
- Never call `apiClient` directly in components — always through a dedicated hook in `hooks/`.

### Server Actions

- Live in `services/{domain}/actions.ts` with `"use server"` at file top.
- Only for mutations triggered by the client — never for reads in Server Components.
- Primary file per domain: `services/{domain}/actions.ts`. Large domains split into sub-action files.
- Validate input with Zod schema from `models/schemas/`.
- Return `{ data, error }` typed as `Promise<ActionResult<T>>` — never throw to client.
- `ActionResult<T>` lives in `models/types/action-result.ts`.
- Service layer errors use `ServiceResult<T>` + `ServiceError` (discriminated union via `ServiceErrorKind` enum from `models/enums/service-error-kind.ts`). All error messages from the API response always pass through as-is — never substitute with frontend-translated strings.
- Verify auth at top of every action: `if (!session) return clearSessionAndRedirect()`. This pattern clears the stale Better Auth cookie and redirects to login — preferred over `unauthorized()` because it provides complete session cleanup. Always use `return` (not `await`) so execution halts immediately.
- Never call one action from inside another — extract shared logic to `lib/`.
- `updateTag()` for immediate cache invalidation after mutations (read-your-own-writes pattern).
- `revalidatePath` only when tag-based invalidation is insufficient.
- `after()` for post-response side effects (analytics, audit logs) — never for response-affecting mutations.

### Error & Result Utilities

- `unwrapAction<T>(result)` from `lib/unwrap-action` — converts `ActionResult<T>` to `T` or throws. Use in `useMutation.mutationFn`.
- `resolveActionError(error, fallback)` from `lib/resolve-action-error` — extracts message from `ServiceError` or returns fallback. Use in `useMutation.onError`.
- `aggregateBatchResults<T>(results)` from `lib/batch-results` — aggregates `PromiseSettledResult[]` into `{ succeeded, failed }`. Use for bulk operations.

### Real-time Updates (Polling)

- Async polling with exponential backoff — see `hooks/use-payment-polling.ts` as reference.
- Polling hooks must cancel on unmount via cleanup function (`cancelled` flag + `clearTimeout`).

---

## UI

### Styling

- Tailwind v4, CSS-first. Tokens in `app/globals.css`.
- **No arbitrary Tailwind values (`[value]`)** — Tailwind v4 uses an open-ended numeric scale, so classes like `pt-120`, `max-w-100`, `gap-18` are valid and do NOT need to be added to `globals.css`. Only the `[value]` bracket syntax for values is forbidden (e.g. `w-[100px]`). Selector/modifier brackets like `[&>div]` are allowed. Opacity modifiers (`/10`, `/45`) are fine. Tailwind v4 `!` suffix (e.g. `hover:bg-primary-hover!`) is valid — NOT a violation.
- **`cn()` for ALL conditional/merged class names** — never template literals (`` `foo ${bar}` ``) or raw ternaries in `className`. Use `cn("base", condition && "extra")` or `cn(condition ? "a" : "b")`. Every `className` with any logic must go through `cn()`.
- Brand: Primary (#0e220e), Secondary (#f6d045), Tara (#cbeed3), Oasis (#fef2d1), Cyan (#bfe7e6).
- **`h-lvh`** always — never `min-h-screen` or `h-screen`.
- **No `transition-all`** — target specific CSS properties explicitly.
- **No large blur values** — `blur-3xl` and above are forbidden.
- **Mobile-first breakpoints — unified across all pages:**
  - `sm:` and `2xl:` are always forbidden.
  - `md:`, `lg:`, `xl:` allowed and required for all pages (landing and dashboard) for a good responsive experience.
  - Must be consistent across components — use the same grid breakpoints for the same layout tier.
  - Base classes = mobile. `md:` = tablet. `lg:` = small desktop. `xl:` = full desktop.
  - `flex-col` mobile → `md:flex-row` desktop.
  - Responsive max-widths: `md:max-w-md`, not `max-w-md`.
  - Show desktop-only: `hidden md:block`. Never use `md:hidden` alone — always pair with a visible-on-mobile class first: `block md:hidden`, `flex md:hidden`.
- **Mobile/desktop layout split pattern** — when a component needs structurally different HTML for mobile vs desktop (e.g. table → cards):
  - Render both in the same component file, toggled with `block md:hidden` / `hidden overflow-x-auto md:block`.
  - Extract the mobile sub-component to its own file: `{component}-row-card.tsx` or `{component}-mobile.tsx`.
  - Both share the same data/state — no logic duplication, only presentation differs.
  - When only a prop/value differs (not structure), use `useIsMobile()` inline instead of splitting renders.

### Performance

- `useMemo`/`useCallback` only when justified (expensive computation or referential equality).
- Heavy libs via `next/dynamic` with `ssr: false`.
- `next/image`: always `width`/`height` or `fill` + `sizes`.
- `next/font` only — no runtime `@import`.
- Route chunks >100 KB require review.
- Lists >50 items: windowing required.

### Animations

- Always use `motion/react` for animations — never CSS transitions for interactive elements.
- **`useReducedMotion()` required for every animation** — set `duration: 0` when true.
- Project hooks: `useReducedMotion` (reduced-motion detection), `useCountUp<T extends Element>(target: number)` (returns `{ ref }` — attach to element for count-up on enter).
- Multiple `useCountUp` refs: call hook separately for each (`ref0`, `ref1`, `ref2`) — hooks cannot be called inside loops.
- Layout/height transitions: `<motion.div layout>` with `transition={layoutTransition}` — motion handles height via `transform` internally.
- Step/conditional transitions: `<AnimatePresence mode="wait">` + `motion.div` with `variants` and `key={step}`.
- Scroll-triggered: `useInView` from `motion/react` with `once: true`.
- High-frequency animations (e.g. count-up): `animate()` from `motion/react` + direct DOM update via `ref.current.textContent` to avoid React re-renders.
- Import: `import { motion, AnimatePresence } from "motion/react"` or shorthand `import { m } from "motion/react"`.
- `m` shorthand requires `<LazyMotion>` in the tree. Onboarding layout has no `MotionProvider` — use `motion` directly there, never `m`.

---

## i18n & SEO

### Translations

- **All user-visible text from translations.** No hardcoded strings.
- Constants/mocks with user-facing text must use translation keys.
- Split by domain: `locales/{locale}/home.json`, `error.json`, etc.

### SEO

- Every page: **always `generateMetadata()` with `getTranslations()`** — never `export const metadata` with hardcoded strings.
- `metadataBase` from `siteConfig.siteUrl`.
- `openGraph` + `twitter` cards required on public pages.
- `alternates.canonical` for multi-URL pages.
- `robots`: `{ index: true, follow: true }` public, `{ index: false, follow: false }` dashboard.
- JSON-LD in `models/constants/json-ld.ts`.
- Hero images: `priority` prop on `next/image`.

---

## Security

### Route Protection (Two-Layer)

1. `proxy.ts` — optimistic redirect via `getSessionCookie` (cookie existence only, **not secure**).
2. Guard Server Components in layouts — real validation via `getServerSession()` (HTTP to backend).

**`config.matcher`:** plain string literals only — template literals silently ignored.

**Redirect matrix (proxy.ts — optimistic):**

- Auth route (`/login`) + cookie exists → `/dashboard`
- Protected route (`/dashboard`, `/onboarding`) + no cookie → `/login`

**Redirect matrix (guards — real validation):**

- `AuthGuard variant="dashboard"`: no session → `/login`; onboarding not done → `/onboarding`
- `AuthGuard variant="onboarding"`: no session → `/login`; onboarding done → `/dashboard`

Full flow for logged-in user hitting `/login`:
`/login` → proxy redirects → `/dashboard` → `AuthGuard(dashboard)` → `/onboarding` (if onboarding not done)

### Rules

- Security headers in `next.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restricting camera/mic/geo, `Strict-Transport-Security: max-age=31536000; includeSubDomains`.
- No server env vars as `NEXT_PUBLIC_*` unless genuinely client-needed.
- No `process.env` in client components.
- Auth check at top of every server action. Exception: public actions (e.g. lead form submission) don't require auth.
- Rate limiting on public server actions.

---

## Observability

### Analytics (PostHog)

- Every user interaction tracked (autocapture or explicit `trackEvent()`).
- **Never import `posthog-js` directly** — use `trackEvent` from `@/lib/analytics`.
- Event names: `snake_case`. Property keys: `snake_case`.
- New pages: all CTAs, form submissions, navigation tracked. `data-attr` on heatmap-relevant elements.

### Feature Flags

- PostHog only — never env vars as flags.
- New features ship behind a flag; remove after stable.
- Server-side evaluation preferred to avoid layout shift.

---

## Common Gotchas

### Backend price convention

All prices from the backend API are in **centavos** (integer). Always divide by `CENTAVOS_DIVISOR` (from `@/models/constants/plans`) before passing to `formatCurrency()`. Example: `formatCurrency(plan.price / CENTAVOS_DIVISOR)`.

### Agent dispatching caveat

Background subagents (`run_in_background: true`) often lack Write/Edit permissions. For file creation tasks, prefer doing the work directly or use foreground agents.

---

## Anti-patterns (NEVER)

Rules below are NOT covered in earlier sections. For styling, semantic HTML, caching, and import anti-patterns, see their respective sections above.

### Architecture

- No component defined inside another component.
- No inline `renderX()` functions.
- No data passed from Server → Client as non-serializable values (class instances, functions, Date objects — serialize first).
- No full lodash/moment import.
- No heavy library without code splitting.

### TypeScript & Correctness

- No array index as `key` — use stable unique id.
- **List item arrays require `id: string` field** — all domain/UI arrays (metrics, bullets, menu items) must have an `id` field; use it as the React key.
- No `{count && <X />}` — use `{count > 0 && <X />}`.

### State & Effects

- No derived state in `useEffect` — compute directly.
- No `useState` initialized from props — use prop directly or `key` reset.
- No cascading `setState` — use `useReducer` or single update.
- No `useEffect` without cleanup for subscriptions/timers.
- **`useEffect` is forbidden except for:** async polling with cancellation, `setInterval` countdowns, animation triggered by external reactive values, imperative RHF reset with documented WHY, PostHog route tracking. All other cases must use a replacement pattern below.
- **Media query hooks** → `useSyncExternalStore(subscribe, getSnapshot, () => false)`. See `hooks/use-mobile.ts` as reference.
- **Scroll/DOM animations** → callback ref: `useCallback((el) => { controlsRef.current?.stop(); if (!el || guard) return; controlsRef.current = animate(...); }, [deps])`. See `contracts-alerts-card.tsx`.
- **Dialog/sheet state reset on close** → handle in `onOpenChange` when `value === false`, not in `useEffect([open])`.
- **Object URL for file preview** → merge `{ file, url }` into single state; create/revoke URL in drop handler: `setX(prev => { if (prev) URL.revokeObjectURL(prev.url); return { file, url: URL.createObjectURL(file) }; })`.
- **Timer cleanup on unmount** → not needed; React 18+ silently ignores setState on unmounted components.

### Next.js

- No page without metadata.
- No `fill` without `sizes` on `next/image`.
- No async client components.
- No `React.cache` as a cross-request cache — it deduplicates within a single request only.

### Performance & UI

- No animating layout properties — `transform`/`opacity` only.

### Security

- No hardcoded secrets in client code.
- No `eval` or dynamic code evaluation.

---

## Charts (Recharts)

- **Fixed height on `ChartContainer`** — never use `h-full` or `flex-1`; XAxis tick labels render outside the SVG and get clipped by `overflow: hidden`. Always use a fixed Tailwind height (e.g. `h-72`) on `ChartContainer`.
- **pt-BR month labels** — `toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })` returns `"out. de 25"`. For axis labels use `{ month: "short" }` + `.replace(".", "")` only.

---

## CSS Grid Bento

- **`row-span` height fill** — components inside `lg:row-span-2` cells need `h-full flex flex-col` on the root wrapper and `flex-1` on each internal card to fill the allocated row height.
- **Bento hero pattern** — featured card: `lg:col-span-2 lg:row-span-2 lg:h-96`; side column: `lg:row-span-2 lg:h-96`. Fixed heights prevent unbounded growth.

---

## Claude Code Tooling

### Subagents

- **`pattern-enforcer`** — run after implementing features to catch CLAUDE.md violations before committing.

### Skills

- **`/new-domain`** — scaffolds all required files for a new domain (service, actions, hook, schema, interface, locale, components).

---

## Tooling Notes

- **Pre-push hook** — runs `pnpm lint`, `pnpm audit --audit-level=high`, and `commitlint`. A push will fail silently if high-severity vulnerabilities exist; run `pnpm audit` locally to debug.
- **Pre-commit hook** — runs `pnpm format` automatically.
