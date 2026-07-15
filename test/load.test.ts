import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const SDK_URL = 'https://cdn.overflow.co/sdk/v1/payment-elements.js';

// Each test imports a fresh module so the memoized in-flight promise in load.ts
// is reset between cases.
const freshLoad = async () => {
  vi.resetModules();
  return import('../src/load');
};

const lastScript = (): HTMLScriptElement | null =>
  document.querySelector<HTMLScriptElement>(`script[src="${SDK_URL}"]`);

class FakeOverflow {
  constructor(
    public publicKey: string,
    public options?: unknown,
  ) {}
}

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  // @ts-expect-error -- test cleanup of the ambient global
  delete window.Overflow;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('loadScript', () => {
  it('injects a single async script tag with the floating v1 URL', async () => {
    const { loadScript } = await freshLoad();
    void loadScript();

    const script = lastScript();
    expect(script).not.toBeNull();
    expect(script?.src).toBe(SDK_URL);
    expect(script?.async).toBe(true);
  });

  it('dedupes: a second call reuses the in-flight promise and one script tag', async () => {
    const { loadScript } = await freshLoad();
    const first = loadScript();
    const second = loadScript();

    expect(first).toBe(second);
    expect(document.querySelectorAll(`script[src="${SDK_URL}"]`)).toHaveLength(1);
  });

  it('resolves the constructor once the script loads and window.Overflow is set', async () => {
    const { loadScript } = await freshLoad();
    const promise = loadScript();

    // @ts-expect-error -- simulate the CDN bundle attaching the global
    window.Overflow = FakeOverflow;
    lastScript()?.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBe(FakeOverflow);
  });

  it('rejects when the script fails to load', async () => {
    const { loadScript } = await freshLoad();
    const promise = loadScript();

    lastScript()?.dispatchEvent(new Event('error'));

    await expect(promise).rejects.toThrow(/Failed to load Overflow Payment Elements/);
  });

  it('reuses an existing script tag instead of injecting a duplicate', async () => {
    const existing = document.createElement('script');
    existing.src = SDK_URL;
    document.head.appendChild(existing);

    const { loadScript } = await freshLoad();
    void loadScript();

    expect(document.querySelectorAll(`script[src="${SDK_URL}"]`)).toHaveLength(1);
  });
});

describe('loadOverflow', () => {
  it('constructs an instance via new window.Overflow(publicKey, options)', async () => {
    const { loadOverflow } = await freshLoad();
    const promise = loadOverflow('test_pub_123', { locale: 'en' });

    // @ts-expect-error -- simulate the CDN bundle attaching the global
    window.Overflow = FakeOverflow;
    lastScript()?.dispatchEvent(new Event('load'));

    const instance = (await promise) as FakeOverflow;
    expect(instance).toBeInstanceOf(FakeOverflow);
    expect(instance.publicKey).toBe('test_pub_123');
    expect(instance.options).toEqual({ locale: 'en' });
  });
});
