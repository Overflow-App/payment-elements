import type {
  OverflowConstructor,
  OverflowInstance,
  OverflowOptions,
  PublicKey,
} from '../types';

// D3 (14.5.d): latest-only by policy. The loader always injects the floating
// `v1` build. Pinning to an immutable per-version URL is deliberately NOT
// exposed -- serving only the latest build is a compliance + security
// requirement. There is no `setLoadParameters` / SRI / pinned-URL escape hatch.
const SDK_URL = 'https://cdn.overflow.co/sdk/v1/payment-elements.js';

const SCRIPT_SELECTOR = `script[src="${SDK_URL}"]`;

/**
 * Memoized in-flight (or settled) load. Reused across every `loadOverflow` call
 * and the bare-import side effect so the script is only injected once. Reset to
 * `null` on failure so a later call can retry.
 */
let overflowPromise: Promise<OverflowConstructor | null> | null = null;

const isBrowser = (): boolean =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

const findExistingScript = (): HTMLScriptElement | null =>
  document.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);

const injectScript = (): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = SDK_URL;
  script.async = true;

  const parent = document.head ?? document.body;
  if (!parent) {
    throw new Error(
      'Expected document.head or document.body to be present in order to load Overflow Payment Elements',
    );
  }
  parent.appendChild(script);
  return script;
};

/**
 * Inject the CDN bundle (once) and resolve the global `window.Overflow`
 * constructor. Resolves `null` in non-browser / SSR contexts.
 */
export const loadScript = (): Promise<OverflowConstructor | null> => {
  if (overflowPromise !== null) {
    return overflowPromise;
  }

  overflowPromise = new Promise<OverflowConstructor | null>((resolve, reject) => {
    if (!isBrowser()) {
      // SSR / non-browser: resolve null. Do not cache, so a later client-side
      // call can still load.
      resolve(null);
      overflowPromise = null;
      return;
    }

    if (window.Overflow) {
      resolve(window.Overflow);
      return;
    }

    let script: HTMLScriptElement;
    try {
      script = findExistingScript() ?? injectScript();
    } catch (error) {
      reject(error as Error);
      return;
    }

    script.addEventListener('load', () => {
      if (window.Overflow) {
        resolve(window.Overflow);
      } else {
        reject(new Error('Overflow Payment Elements not available'));
      }
    });

    script.addEventListener('error', () => {
      // Allow a future call to retry a transient network failure.
      overflowPromise = null;
      reject(new Error('Failed to load Overflow Payment Elements'));
    });
  });

  return overflowPromise;
};

/**
 * Load the Overflow Payment Elements SDK and construct an instance.
 *
 * Mirrors the runtime constructor `new Overflow(publicKey, options?)` as an
 * async wrapper. Resolves `null` in non-browser / SSR contexts; guard before
 * use on the client.
 */
export const loadOverflow = async (
  publicKey: PublicKey,
  options?: OverflowOptions,
): Promise<OverflowInstance | null> => {
  const Overflow = await loadScript();
  if (!Overflow) {
    return null;
  }
  return new Overflow(publicKey, options);
};
