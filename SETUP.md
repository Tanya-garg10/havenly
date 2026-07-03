# Local Setup (ELUSOC / New Contributors)

This guide is the single source of truth for running Havenly locally.

## Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **pnpm**: v9+ (this repo uses `pnpm-lock.yaml`)

## 1) Install & Run

```sh
git clone https://github.com/akshay0611/havenly.git
cd havenly
pnpm install
pnpm dev
```

App runs at `http://localhost:3000`.

## 2) Useful Commands

```sh
pnpm dev      # start dev server
pnpm build    # production build
pnpm start    # start production build locally
```

## Troubleshooting

- **Build Failures**: If you see `ERR_PNPM_OUTDATED_LOCKFILE`, run `pnpm install` locally to update the lockfile.
- **Node Version**: Ensure you are using a compatible Node.js version (`node -v`).

## FAQ

- **Is a database required?** By default, Havenly runs in offline demo mode using browser `localStorage` to save hosts' listings. However, the app includes a pluggable storage adapter pattern supporting a **shared backend** (e.g., Supabase or a custom REST API) to persist listings server-side so they are visible to all users.
- **Why pnpm?** pnpm is faster and more disk-efficient than npm. If you don't have it, install it via `npm install -g pnpm`.

## Shared Backend Setup

To enable server-side database persistence for properties, configure **one** of the following sets of environment variables in a `.env.local` file at the root of the project:

### Option A: Supabase
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Option B: Custom REST API
```env
NEXT_PUBLIC_BACKEND_URL=https://your-api-endpoint.com
```

*Note: When environment variables are configured, the app uses a Stale-While-Revalidate (SWR) approach. It instantly displays listings from local cache, retrieves updates from the backend in the background, and dynamically updates the UI upon sync completion.*

