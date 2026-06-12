# Contributing to @getoverflow/payment-elements

Thanks for your interest in Overflow Payment Elements.

## What lives here

This repository is the **public loader** for the Overflow Payment Elements SDK.
It contains:

- the thin async loader (`loadOverflow`, and the `/pure` opt-out), and
- the generated TypeScript declarations (`types/index.d.ts`, `types/global.d.ts`).

The **core SDK** (the bundle served from `cdn.overflow.co`) is closed-source and
lives in a private monorepo. The `types/` files in this repo are **generated**
from that monorepo and synced in automatically on each published release. Do not
hand-edit anything under `types/` -- those changes are overwritten by the next
sync.

## What we welcome

- Loader bug fixes and improvements (`src/`)
- Documentation fixes (`README.md`)
- Test coverage for the loader

Because the loader is the only source we accept changes to, please keep PRs
scoped to `src/`, tests, and docs.

## Development

```bash
pnpm install
pnpm build      # build CJS + ESM into dist/
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest
pnpm attw       # are-the-types-wrong packaging check
```

This repo uses **pnpm v11** (pinned via the `packageManager` field). With
[Corepack](https://nodejs.org/api/corepack.html) enabled (`corepack enable`),
the correct pnpm version is selected automatically.

## Pull requests

1. Fork and create a feature branch.
2. Make your change with tests.
3. Ensure `pnpm build`, `pnpm typecheck`, and `pnpm test` pass.
4. Open a PR. All changes require review from the Giving team (see `CODEOWNERS`).

## Releases

Releases are automated. The npm version is baked in the private monorepo and
mirrors the SDK version 1:1. Maintainers do not publish by hand; merging the
type-sync PR triggers `pnpm publish` with provenance. See PR 14.5.f.

## Security

Do not open public issues for security reports. Email security@overflow.co.
