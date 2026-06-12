// AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND.
//
// Ambient companion to ./index.d.ts. This file stays a global SCRIPT (NOT a
// module): it has no top-level import/export, and `import(...)` is a type
// expression (not a top-level import), so TS auto-includes it for script-tag /
// CMS authors who opt in via `@getoverflow/payment-elements/types`.
// See PR 14.5.e (GIV-9144), Notion 6b.
//
// NOTE for the monorepo generator (14.5.e):
//   1. Augment `Window` directly at the top level (do NOT wrap in
//      `declare global`). `declare global` is only valid inside a module, which
//      would make this a module and trip `attw`'s CJSResolvesToESM check on the
//      `./types` entry. A bare top-level `interface Window` merges into the
//      global scope from a script file.
//   2. Emit the `.js` extension on the inner import so it resolves under node16
//      module resolution (the `.js` specifier maps to the sibling `index.d.ts`).

interface Window {
  Overflow: import('./index.js').OverflowConstructor;
}
