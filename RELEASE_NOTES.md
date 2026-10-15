<!-- AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND. -->
<!-- Source: packages/payment-elements-v1/releases/<sdkVersion>.md -->

# Payment Elements 0.1.0-beta.3

## Fixed

- Google Pay `element.update({ transaction })` changes the amount, label, and line items on the button that is already mounted. The button stays in place, and the next payment sheet uses that total.
- Calling `update()` from the Google Pay click handler, before the sheet opens, still returns the encrypted wallet token when the shopper authorizes.

## Integration notes

- Pass the transaction with `update()` while the sheet is closed. That includes the click handler that runs before the sheet opens. You do not need to destroy the element to change the amount.
- Button appearance and `transaction.countryCode` still need a new element. Create one when those change.

## Install / upgrade

- **CDN (floating):** `https://cdn.overflow.co/sdk/v1/payment-elements.js`
- **CDN (pinned):** `https://cdn.overflow.co/sdk/v1/0.1.0-beta.3/payment-elements.js`
- **npm (after sync):** `npm install @getoverflow/payment-elements@0.1.0-beta.3`
  (prerelease dist-tag: `next`)

If you pinned `0.1.0-beta.2`, point at `0.1.0-beta.3` (or the floating URL) and re-test a Google Pay payment where the amount changes before the sheet opens.

