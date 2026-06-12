// Main entry point.
//
// D1 (14.5.d): importing the package eagerly injects the CDN script as a side
// effect (mirrors `@stripe/stripe-js`), so the bundle starts downloading before
// the app mounts. Use `@getoverflow/payment-elements/pure` to opt out and defer
// injection until `loadOverflow()` is first called.
import { loadScript } from './load';

loadScript().catch(() => {
  // Swallow here: any load failure is surfaced to callers when they await
  // `loadOverflow()`. We do not want an unhandled rejection from the eager
  // bare-import side effect.
});

export { loadOverflow } from './load';
export type {
  OverflowConstructor,
  OverflowInstance,
  OverflowOptions,
  PublicKey,
} from '../types';
