<!-- AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND. -->
<!-- Source: packages/payment-elements-v1/releases/<sdkVersion>.md -->

# 0.1.0-alpha.14

Optional security code on the card element for mail-order /
telephone-order (MOTO) and virtual-terminal flows.

## Changes

- `fields.cardSecurityCode.hidden` hides the CVC / CVV / CID field and
  skips its validation. Defaults to `false` (security code still
  required when shown). Same pattern as `fields.holderName.hidden` and
  `fields.postalCode.hidden`.
- When hidden, the security-code input is not shown, card validation
  no longer requires CVC, and `encryptedSecurityCode` on the submitted
  value is an empty string. Remount the element to toggle (for example,
  when a "Use CVC?" checkbox changes). Online checkout should keep the
  default.

```ts
overflow.card({
  fields: {
    cardSecurityCode: { hidden: true },
  },
});
```

## Install

- **CDN (pinned):** `https://cdn.overflow.co/sdk/v1/0.1.0-alpha.14/payment-elements.js`
- **npm (after sync):** `npm install @getoverflow/payment-elements@0.1.0-alpha.14`
  (prerelease dist-tag: `next`)

