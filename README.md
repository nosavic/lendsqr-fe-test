# lendsqr-fe-test

Admin console covering the Login, Dashboard, Users, and User Details screens,
built with React, Next.js, TypeScript, and SCSS.

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

The app runs at `http://localhost:3000` and redirects to `/login`. Any email and
password combination signs in — authentication is out of scope for this build.

## Environment

| Variable | Description |
| --- | --- |
| `USERS_API_URL` | Endpoint returning the users dataset as a JSON array. |

## Mock API

The dataset is 500 generated records committed at `data/users.json` and served
over HTTP, so the app reads it the same way it would read any remote API.

```bash
npm run generate:users
```

This regenerates the file from a fixed seed, so the data is identical on every
run. Records are shaped from the fields the design puts on screen — see
`src/types/user.ts`.

Hosting notes: the free tiers of the usual mock services could not hold this
dataset. mockapi.io caps a resource at 100 records, jsonblob rejects payloads of
this size, and mocky.io currently serves an invalid TLS certificate. Serving the
committed file over a static endpoint avoids all three limits and keeps the
dataset versioned alongside the code.

## Architecture

Requests go through internal API routes rather than the browser calling the mock
endpoint directly. That keeps the upstream URL server-side and puts filtering,
pagination, and stats in one place.

```
browser → /api/users → src/lib/users-api.ts → mock endpoint
```

`src/lib/users-api.ts` fetches the dataset once and caches it for five minutes,
so paging and filtering do not re-fetch. Concurrent requests during a cache miss
share a single in-flight promise rather than each starting their own fetch.

Filtering and pagination run server-side in `/api/users`, so the browser only
ever holds one page of rows.

### Layout

```
src/
  components/
    auth/            login form and illustration
    icons/           grouped by usage: interface, actions, stats, sidebar
    layout/          DashboardLayout, Header, Sidebar, PageTransition
    ui/              generic primitives
    user-details/    user details screen
    users/           users listing screen
  constants/         navigation, stat cards, status config
  hooks/             data fetching, theme, click-outside
  lib/               api client, filtering, formatting, animations
  pages/             routes and API handlers
  types/             shared types
```

Every component lives in its own folder with its stylesheet and an `index.ts`
that re-exports it, and components that own sub-parts keep them in that same
folder:

```
components/ui/Button/
  Button.tsx
  Button.module.scss
  index.ts

components/layout/Header/
  Header.tsx
  Header.module.scss
  SearchBar.tsx          only the header uses these
  SearchBar.module.scss
  ProfileMenu.tsx
  ProfileMenu.module.scss
  index.ts
```

Each group also has a barrel, so `import { Avatar, Popover } from "@/components/ui"`
works from outside the group. Inside a group, components import each other by
their direct path rather than through the barrel, to keep the barrel from
depending on its own members.

### Styling

SCSS modules, one `.module.scss` per component, sitting next to the component it
styles. Shared pieces live under `src/styles`:

```
src/styles/
  abstracts/       breakpoints, layout and shadow variables, mixins
  base/            theme tokens, reset, typography
  globals.scss     entry point
  App.module.scss  font wiring for the app wrapper
```

Colours are CSS custom properties rather than Sass variables, because Sass
resolves at compile time and the theme has to switch at runtime. Sass variables
cover the values that never change: breakpoints, radii, z-index, shadows.
Breakpoints are applied through a `respond-to` mixin instead of repeating media
queries.

Two details worth knowing when editing styles:

- The reset lives in `@layer base`. Unlayered rules outrank layered ones, so an
  unlayered reset would beat component styles.
- The font tokens are declared on the app wrapper, not `:root`, because they
  reference the variables `next/font` puts on that element. Custom properties
  substitute at computed-value time, so declaring them higher up resolves them
  to nothing.

## State handling

Loading, empty, and error states are handled per surface rather than globally.
The users table swaps its body between a spinner, a retryable error row, an
empty-filter message, and rows; the details page covers loading, not-found, and
failed-request separately, and keeps showing a cached user when a refresh fails.

## Data persistence

Selecting a user writes that record to local storage before navigating, so the
details page renders immediately and still works on reload or when the request
fails. `src/lib/user-storage.ts` handles reads and writes.

## Theming

Light and dark themes are driven by a `dark` class on the document root. Light
is the default and the system setting is not consulted, so the app opens light
on a machine set to dark; only an explicit choice in the profile menu switches
it, and that choice is remembered. A small script in `_document.tsx` applies the
stored preference before hydration so there is no flash of the wrong theme.
`useTheme` reads that state through `useSyncExternalStore`.

Because the palette is custom properties, components need no per-theme rules —
the values change at `.dark` scope and everything follows.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |
| `npm run generate:users` | Regenerate `data/users.json` |
