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

Releases are automated and lockstep with the private monorepo SDK version.

1. A human publishes the draft GitHub Release for `payment-elements-v1@<version>`
   in the monorepo (that is also the prod CDN promote).
2. `sync-loader-types.yml` opens a bot PR here: regenerated `types/` +
   `package.json` `version` bump.
3. A Giving reviewer merges the sync PR.
4. `release.yml` on `main` (paths: `package.json`) runs typecheck → test →
   build → `attw`, then **`npm publish` via OIDC trusted publishing**
   (no `NPM_TOKEN`), then cuts a matching GitHub Release `v<version>`.

### Publish details (maintainers)

- **Auth:** npm Trusted Publisher → GitHub Actions on this repo / workflow
  `release.yml`. Package policy is "Require 2FA and disallow tokens" — do not
  add an `NPM_TOKEN` secret.
- **Dist-tags:** versions with a semver prerelease hyphen (e.g.
  `0.1.0-alpha.10`) publish under `next`. Bare
  `npm install @getoverflow/payment-elements` resolves `latest` only.
- **`latest` flip:** the first non-prerelease (`x.y.z`) CI publish replaces
  the bootstrap `0.0.0-bootstrap.0` currently on `latest`.
- **Idempotent:** if `${name}@${version}` already exists on the registry, the
  workflow skips publish.
- Do not run `npm publish` from a laptop; OIDC is the only publish path.

## Security

Do not open public issues for security reports. Email security@overflow.co.
