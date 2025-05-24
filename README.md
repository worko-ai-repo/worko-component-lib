

#  Multi-App Dev Setup with Shared Library (No Monorepo Tools)

This project simulates a monorepo-like environment using **plain `npm`**, allowing you to run multiple apps with a shared component library using **Hot Module Replacement (HMR)** — all without using `pnpm`, `turbo`, or similar tools.

---

##  Project Structure

```
your-project/
├── apps/
│   ├── main-app/
│   │   ├── package.json
│   │   ├── tsconfig.app.json      # For setting up aliases
│   │   ├── vite.config.ts         # Vite alias config for HMR
│   └── dashboard-app/
│       ├── package.json
│       ├── tsconfig.app.json
│       ├── vite.config.ts
├── packages/
│   └── lib-worko-ai/
│       ├── src/
│       │   └── index.ts           # Shared modules/components/hooks
│       └── package.json           # Exports and metadata
├── package.json                   # Root-level scripts (e.g. dev)
```

---

##  Step-by-Step Setup

### 1.  Create the Shared Library (`lib-worko-ai`)

**Path:** `packages/lib-worko-ai/`

#### `package.json`

```json
{
  "name": "lib-worko-ai",
  "version": "1.0.0",
  "main": "src/index.ts",
  "module": "src/index.ts",
  "types": "src/index.ts"
}
```

#### `src/index.ts`

Export your reusable modules here:

```ts
export const sayHello = () => 'Hello from lib!';
```

#### 1.1 Link the Package

At the root of `lib-worko-ai`, run:

```bash
npm install
npm link
```

This broadcasts the library globally for local linking.

---

### 2.  Set Up Each App to Use the Library

Inside each app (`apps/main-app`, `apps/dashboard-app`):

#### 2.1 Install dependencies

```bash
npm install
```

#### 2.2 Link the shared library

```bash
npm link lib-worko-ai
```

#### 2.3 Example `package.json`

```json
{
  "name": "main-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "lib-worko-ai": "file:../../packages/lib-worko-ai"
  }
}
```

> If you see `file:...` under `dependencies`, the link is working.

Repeat the same for `dashboard-app`.

---

### 3. Enable HMR with Vite Aliasing

Edit `vite.config.ts` in each app:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@LibWorko': path.resolve(__dirname, '../../packages/lib-worko-ai/src')
    }
  },
  optimizeDeps: {
    exclude: ['lib-worko-ai'],
  },
  server: {
    fs: {
      allow: ['..'], // Allow access to shared packages
    },
  },
});
```

> You can now import shared modules using `@LibWorko`:

```ts
import { sayHello } from '@LibWorko';
```

>  Make sure to **remove the alias before production builds**, or handle it via `tsconfig`/`paths`.

---

### 4.  Add a Root Script to Run Both Apps

In the root `package.json`:

```json
{
  "name": "dev-root",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm --prefix apps/main-app run dev\" \"npm --prefix apps/dashboard-app run dev\""
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

Then install:

```bash
npm install --save-dev concurrently
```

---

### 5.  Run Both Apps in Parallel

From the root folder, run:

```bash
npm run dev
```

This will launch both `main-app` and `dashboard-app` with full HMR support for the shared `lib-worko-ai`.

---

##  Tips & Gotchas

*  Changes in `lib-worko-ai/src` will hot-reload in both apps.
*  After editing exports in the shared lib, restart the dev servers.
*  Aliasing should only be used for dev — avoid it in production unless mapped via build config.
*  Avoid compiling or bundling the shared lib during development — HMR works directly off source.

---
