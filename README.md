# @getoverflow/payment-elements

Thin async loader for the [Overflow Payment Elements](https://overflow.co) SDK.
It injects the Overflow.js bundle from Overflow's CDN and gives you a typed,
promise-based handle to the SDK -- the same idea as `@stripe/stripe-js`.

- Tiny, dependency-free loader (the SDK itself is served from the CDN)
- First-class TypeScript types, generated from the SDK's source of truth
- SSR-safe: `loadOverflow(...)` resolves `null` in non-browser environments
- Loads the latest, always-patched build by policy (see [Latest-only](#latest-only-policy))

Full docs: https://docs.overflow.co · npm: https://www.npmjs.com/package/@getoverflow/payment-elements

## Install

```bash
npm install @getoverflow/payment-elements
```

## Quickstart (npm / bundler)

```ts
import { loadOverflow } from '@getoverflow/payment-elements';

const overflow = await loadOverflow('pk_live_...');

// `overflow` is null in SSR / non-browser contexts -- guard before use.
overflow?.card().mount('#card');
```

Importing the package eagerly starts downloading the CDN bundle (a side effect,
mirroring `@stripe/stripe-js`), so the SDK is in flight before your app mounts.

### Defer the fetch with `/pure`

If you want to control exactly when the CDN request happens (for example, defer
it until the checkout screen mounts), import from the `/pure` subpath. It has the
same API with **no import side effect** -- nothing loads until you call
`loadOverflow()`.

```ts
import { loadOverflow } from '@getoverflow/payment-elements/pure';

async function mountCheckout() {
  const overflow = await loadOverflow('pk_live_...');
  overflow?.card().mount('#card');
}
```

This works the same way in React, Vue, Next.js, and other frameworks. In SSR
frameworks, remember that `loadOverflow(...)` resolves `null` on the server, so
call it from client-side code (an effect / event handler) and guard the result.

## Script tag (no install)

You can also drop the SDK in directly with a script tag, then use the global
`Overflow` constructor:

```html
<script src="https://cdn.overflow.co/sdk/v1/payment-elements.js"></script>
<script>
  const overflow = new Overflow('pk_live_...');
  overflow.card().mount('#card');
</script>
```

### Types for script-tag / CMS authors

A bare script tag gives you **zero** editor types. If you author in a CMS
(WordPress, Drupal) or a plain HTML project and want `window.Overflow` typed,
opt into the ambient declarations without bundling anything:

- Add `@getoverflow/payment-elements` as a **dev-only** dependency and reference
  the ambient types from a `*.d.ts` (or the top of a TS file):

  ```ts
  /// <reference types="@getoverflow/payment-elements/types" />
  ```

- Or download `global.d.ts` and reference it from a local `*.d.ts` file in your
  project.

The ambient `./types` entry is the opt-in that makes `window.Overflow` typed; it
ships no JavaScript.

## Latest-only policy

The loader and the documented script URL always point at the floating latest
`v1` build (`https://cdn.overflow.co/sdk/v1/payment-elements.js`). Pinning to a
specific immutable version URL is **deliberately not supported**: serving only
the latest build is a compliance and security requirement, so that no integrator
can pin themselves onto a stale bundle that misses a security fix. There is no
SRI / pinned-URL / `setLoadParameters` API.

If you have a hard requirement to self-host or pin a specific build, you do so on
your own, outside this loader.

## TypeScript

Types ship with the package. The SDK types (`PublicKey`, `OverflowOptions`,
`OverflowInstance`, etc.) are **generated** from the SDK's single source of truth
and kept in lockstep with each release, so the loader argument and return types
always match the runtime constructor.

## Versioning

The npm version mirrors the Overflow Payment Elements SDK version 1:1. Every
published SDK release becomes a matching npm version and GitHub Release.
Prereleases publish under the `next` dist-tag, so a bare
`npm install @getoverflow/payment-elements` never resolves to a prerelease.

## Contributing

The loader in this repo is open source (MIT). The core SDK served from the CDN is
closed-source. Loader bug fixes, docs, and tests are welcome -- see
[CONTRIBUTING.md](./CONTRIBUTING.md). Files under `types/` are generated and
should not be hand-edited.

## License

[MIT](./LICENSE)
