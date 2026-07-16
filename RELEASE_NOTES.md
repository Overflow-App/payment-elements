<!-- AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND. -->
<!-- Source: packages/payment-elements-v1/releases/<sdkVersion>.md -->

# 0.1.0-alpha.13

Docs and example alignment for publishable keys and the company name
element. No intentional runtime behavior changes vs `0.1.0-alpha.12`.

## Changes

- Publishable key examples now use `live_pub_...` (production) and
  `test_pub_...` (staging / test) across README, JSDoc, and related
  docs. Pass those prefixes to `new Overflow(...)` or `loadOverflow(...)`.
- Documented the `companyName` element event surface (value shape,
  validation errors, and composition into address / checkout contact
  slots).

## Install

- **CDN (pinned):** `https://cdn.overflow.co/sdk/v1/0.1.0-alpha.13/payment-elements.js`
- **npm (after sync):** `npm install @getoverflow/payment-elements@0.1.0-alpha.13`
  (prerelease dist-tag: `next`)

