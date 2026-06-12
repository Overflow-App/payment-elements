// AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND.
//
// Source of truth: packages/payment-elements-v1/src/types.ts (private monorepo).
// This file is replaced wholesale on each PUBLISHED SDK release by the
// build:dts rollup (vite-plugin-dts, rollupTypes) + sync-loader-types.yml.
// See PR 14.5.e (GIV-9144) and PR 14.5.f (GIV-9138).
//
// The version checked in here is a PLACEHOLDER so the loader typechecks and
// builds before the first real type sync. It intentionally models only the
// surface the loader depends on. The real synced file flattens src/types.ts and
// its internal imports into a single self-contained module with zero relative
// imports.

/** Publishable key, e.g. `pk_live_...` / `pk_test_...`. */
export type PublicKey = `pk_${string}`;

/** Options forwarded to the runtime `new Overflow(publicKey, options)` constructor. */
export interface OverflowOptions {
  locale?: string;
  [key: string]: unknown;
}

/** The instance returned by the runtime constructor. */
export interface OverflowInstance {
  [key: string]: unknown;
}

/** The global `window.Overflow` constructor exposed by the CDN bundle. */
export interface OverflowConstructor {
  new (publicKey: PublicKey, options?: OverflowOptions): OverflowInstance;
}

declare global {
  interface Window {
    Overflow: OverflowConstructor;
  }
}
