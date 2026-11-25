import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createSSRApp, defineComponent, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { version } from '../../package.json';

type ContextModule = typeof import('./createContext');

/**
 * Load a fresh, independent copy of the context module, the way a second
 * install of akar would be loaded next to the first one.
 */
async function loadCopy(): Promise<ContextModule> {
  vi.resetModules();
  return import('./createContext');
}

type ContextPair = readonly [(fallback?: any) => { value: number }, (value: { value: number }) => unknown];

/** Render a provider from one context pair with a child injecting from another. */
async function renderAcross(provider: ContextPair, injector: ContextPair) {
  let injected: { value: number } | null | undefined;
  let error: unknown;
  const Child = defineComponent({
    setup() {
      try {
        injected = injector[0]();
      } catch (e) {
        error = e;
      }
      return () => h('div');
    },
  });
  const App = defineComponent({
    setup() {
      provider[1]({ value: 42 });
      return () => h(Child);
    },
  });
  await renderToString(createSSRApp(App));
  return { injected, error };
}

describe('createAkarContext', () => {
  it('shares contexts across two copies of the same version', async () => {
    const copyA = await loadCopy();
    const copyB = await loadCopy();
    expect(copyA).not.toBe(copyB);

    const { injected, error } = await renderAcross(
      copyA.createAkarContext<{ value: number }>('DialogRoot'),
      copyB.createAkarContext<{ value: number }>('DialogRoot'),
    );
    expect(error).toBeUndefined();
    expect(injected).toEqual({ value: 42 });
  });

  it('keys contexts by the exact package version', async () => {
    const { createAkarContext } = await loadCopy();
    const [injectFoo] = createAkarContext('Foo');
    expect(() => injectFoo()).toThrow(`Symbol(akar@${version}:FooContext)`);
  });

  it('keeps contexts of different versions isolated', async () => {
    const copyA = await loadCopy();
    const copyB = await loadCopy();

    const { injected, error } = await renderAcross(
      copyA.createVersionedContext<{ value: number }>('2.10.0', 'DialogRoot'),
      copyB.createVersionedContext<{ value: number }>('2.11.0', 'DialogRoot'),
    );
    expect(injected).toBeUndefined();
    expect(String(error)).toContain('Symbol(akar@2.11.0:DialogRootContext)');
  });

  it('keeps differently named contexts isolated', async () => {
    const { createAkarContext } = await loadCopy();
    const { error } = await renderAcross(
      createAkarContext<{ value: number }>('Alpha'),
      createAkarContext<{ value: number }>('Beta'),
    );
    expect(String(error)).toMatch(/not found/);
  });
});

describe('createContext (public)', () => {
  it('creates a unique key per call, even with the same name', async () => {
    const { createContext } = await loadCopy();
    const { injected, error } = await renderAcross(
      createContext<{ value: number }>('Foo'),
      createContext<{ value: number }>('Foo'),
    );
    expect(injected).toBeUndefined();
    expect(String(error)).toContain('Symbol(FooContext)');
  });

  it('does not collide with akar internal contexts of the same name', async () => {
    const { createContext, createAkarContext } = await loadCopy();
    const { injected, error } = await renderAcross(
      createAkarContext<{ value: number }>('DialogRoot'),
      createContext<{ value: number }>('DialogRoot'),
    );
    expect(injected).toBeUndefined();
    expect(String(error)).toMatch(/not found/);
  });

  it('still provides and injects within one context', async () => {
    const { createContext } = await loadCopy();
    const pair = createContext<{ value: number }>('Foo');
    const { injected } = await renderAcross(pair, pair);
    expect(injected).toEqual({ value: 42 });
  });
});

describe('internal call sites', () => {
  it('use createAkarContext, never the public createContext', () => {
    const srcDir = join(__dirname, '..');
    const offenders = readdirSync(srcDir, { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.(?:ts|vue)$/.test(file) && !/\.(?:test|story)\./.test(file) && !file.includes('createContext.ts'))
      .filter((file) => /\bcreateContext\s*[<(]/.test(readFileSync(join(srcDir, file), 'utf8')))
      .map((file) => relative(srcDir, join(srcDir, file)));
    expect(offenders).toEqual([]);
  });
});
