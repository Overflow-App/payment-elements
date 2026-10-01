<!-- AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND. -->
<!-- Source: packages/payment-elements-v1/releases/<sdkVersion>.md -->

# Payment Elements 0.1.0-beta.2

## Added

- Typed request modes through `SdkRequestMode`, available at runtime as `Overflow.RequestMode` on the loaded constructor.
- Optional request context for approved platform integrations. Standard merchant integrations do not need to configure it.

## Integration Notes

- `Merchant` is the default. `Internal` is reserved for approved platform integrations and does not grant access or enable additional payment methods.
- Call `destroy()` before changing request context, then create a fresh instance. Passing `requestContext` to `update()` throws without applying any updates.
- Existing merchant initialization, payment behavior and lifecycle remain unchanged.
