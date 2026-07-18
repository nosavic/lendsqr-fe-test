# lendsqr-fe-test

Admin console covering the Login, Dashboard, Users, and User Details screens,
built with Next.js and TypeScript.

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
| `USERS_API_URL` | Endpoint returning the users dataset as a JSON array. Accepts a comma-separated list, in which case the responses are merged. |

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

`npm run seed:mockapi` remains available for pushing records into mockapi.io
resources, splitting the dataset across however many URLs `USERS_API_URL` lists.

## Architecture

Requests go through internal API routes rather than the browser calling the mock
endpoint directly. That keeps the upstream URL server-side and puts filtering,
pagination, and stats in one place.

```
browser → /api/users → src/lib/users-api.ts → mock endpoint
```

`src/lib/users-api.ts` fetches the dataset once, caches it for five minutes, and
merges multiple endpoints when several are configured. Because each upstream
resource numbers its records independently, ids are reassigned across the merged
set so they stay unique and stable — the details page relies on that when it
caches a user in local storage.

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

Components that own sub-parts live in a folder with them and re-export through
an `index.ts`, so imports stay at folder level. Standalone components stay as
single files.

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

Light and dark themes are driven by a `dark` class on the document root. A small
script in `_document.tsx` applies the stored or system preference before
hydration so there is no flash of the wrong theme. `useTheme` reads that state
through `useSyncExternalStore`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |
| `npm run generate:users` | Regenerate `data/users.json` |
| `npm run seed:mockapi` | Push the dataset into mockapi.io resources |
