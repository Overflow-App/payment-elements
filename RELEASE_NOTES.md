<!-- AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND. -->
<!-- Source: packages/payment-elements-v1/releases/<sdkVersion>.md -->

# 0.1.0-beta.1

First **merchant beta** of Overflow Payment Elements. This cut ends the
`0.1.0-alpha.*` series and opens the beta channel (`alpha` → `beta` →
GA). Prefer this pin (or the floating CDN URL) over any alpha.

Public docs and release notes also appear at
[docs.overflow.co/payment-elements](https://docs.overflow.co/payment-elements)
and
[docs.overflow.co/changelog/overflow-payment-elements](https://docs.overflow.co/changelog/overflow-payment-elements).

## What's included

- **Checkout** and standalone elements: email, full name, phone, company
  name, billing and shipping address, card, bank (ACH / Plaid), Apple
  Pay, Google Pay, submit button, and custom fields (text, number,
  select, checkbox)
- **Theming** via `appearance` (size / shadow presets and CSS variables),
  including runtime `overflow.update({ appearance })`
- **Wallets** with live transaction updates and optional contact /
  shipping requirements where configured
- **Pinned CDN URLs** for SRI (`/sdk/v1/<version>/payment-elements.js`)
  plus the floating `/sdk/v1/payment-elements.js` channel
- **npm loader** `@getoverflow/payment-elements` in lockstep with this
  `sdkVersion` (types + CDN pin)

## Changes since `0.1.0-alpha.*`

Highlights from the alpha train that land in this beta, plus beta-readiness
API cleanups:

### Card

- Optional `fields.cardSecurityCode.hidden` for MOTO / virtual-terminal
  flows (skips CVC UI and validation when hidden). Online checkout should
  keep the default (`false`).
- Card validation `FieldError.field` values now match config keys:
  `cardExpiration` and `cardSecurityCode` (previously `expiryDate` and
  `cvc`). Update any error-routing that keyed on the old strings.
- Reserved split-card identifiers (`cardNumber`, `cardExpiry`, `cardCvc`,
  `cardPostalCode`) are no longer part of the creatable `ElementType`
  union. Configure card inputs through `overflow.card({ fields })`.

### Host / lifecycle

- `Overflow` is a page-level singleton: a second `new Overflow(...)`
  returns the existing instance, logs a `console.warn`, and ignores the
  new key and options. Call `overflow.destroy()` before constructing
  again when you need a fresh instance.
- Unmount clears `overflow-element--shadow-*` theme classes (as well as
  size classes and `--overflow-*` CSS variables) so remounts do not keep
  stale shadow chrome.
- Checkbox Escape handling stays attached after a runtime `mode` update
  (`inline` ↔ `stacked`).

### Docs / keys

- Publishable key examples use `live_pub_...` (production) and
  `test_pub_...` (test / staging).
- Curated per-version release notes ship with each `sdkVersion` bump and
  sync to the public changelog.

## Breaking changes for alpha integrators

If you pinned an alpha and are moving to beta:

1. **Card field error keys** — map `expiryDate` → `cardExpiration` and
   `cvc` → `cardSecurityCode` in `onError` / `fieldErrors` handlers.
2. **Split-card `ElementType` members** — remove any
   `create('cardNumber')` (and peers); they were never creatable at
   runtime and are now absent from TypeScript as well.
3. **Singleton re-construct** — if hot reload or key swap relied on a
   silent second `new Overflow(...)`, call `destroy()` first or expect
   a console warning and the original instance.

## Install / upgrade

- **CDN (floating):** `https://cdn.overflow.co/sdk/v1/payment-elements.js`
- **CDN (pinned):** `https://cdn.overflow.co/sdk/v1/0.1.0-beta.1/payment-elements.js`
- **npm (after sync):** `npm install @getoverflow/payment-elements@0.1.0-beta.1`
  (prerelease dist-tag: `next`)

If you were on `0.1.0-alpha.*`, point at `0.1.0-beta.1` (or the floating
URL) and re-test checkout, card, wallets, and ACH in staging before
promoting traffic.

## Beta expectations

APIs may still change before GA (`0.1.0`). Pin explicitly if you need a
stable hash + SRI, or use the floating URL and plan a short retest when
GA ships.

Known limitation: some `card.update(...)` option changes can remount the
secured card iframes and clear shopper-entered PAN / CVC. Prefer setting
card options before mount, or remount deliberately after structural
option changes.

Report issues to your Overflow contact.

