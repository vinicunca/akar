import type { ComponentResolverObject } from 'unplugin-vue-components';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { components } from 'akar/constant';
import { describe, expect, it } from 'vitest';
import AkarResolver from '.';
import { toKebabCase } from '../../../core/scripts/families';
import { getComponentSource } from '../shared';

const require = createRequire(import.meta.url);
const corePackage = JSON.parse(readFileSync(require.resolve('akar/package.json'), 'utf8'));
const allComponents = Object.values(components).flat();

function resolve(name: string, options: Parameters<typeof AkarResolver>[0] = { subpaths: true }) {
  return (AkarResolver(options) as ComponentResolverObject).resolve(name);
}

describe('akar/resolver', () => {
  it('imports components from the package root by default', () => {
    for (const name of allComponents) {
      expect((AkarResolver() as ComponentResolverObject).resolve(name)).toEqual({ name, from: 'akar' });
    }
  });

  it('imports components from their family entry point with `subpaths: true`', () => {
    expect(resolve('DialogRoot')).toEqual({ name: 'DialogRoot', from: 'akar/dialog' });
    expect(resolve('AlertDialogAction')).toEqual({ name: 'AlertDialogAction', from: 'akar/alert-dialog' });
    expect(resolve('ColorSwatchPickerItem')).toEqual({ name: 'ColorSwatchPickerItem', from: 'akar/color-swatch-picker' });
    expect(resolve('Slot')).toEqual({ name: 'Slot', from: 'akar/primitive' });
  });

  it('imports components from the package root with `subpaths: false`', () => {
    for (const name of allComponents) {
      expect(resolve(name, { subpaths: false })).toEqual({ name, from: 'akar' });
    }
  });

  it('strips the prefix', () => {
    expect(resolve('AkarDialogRoot', { prefix: 'Akar', subpaths: true })).toEqual({ name: 'DialogRoot', from: 'akar/dialog' });
    expect(resolve('DialogRoot', { prefix: 'Akar', subpaths: true })).toBeUndefined();
  });

  it('ignores components that are not part of akar', () => {
    expect(resolve('RouterLink')).toBeUndefined();
    expect(resolve('useForwardProps')).toBeUndefined();
  });

  it.each(allComponents)('resolves %s to an entry point that exports it', async (name) => {
    const { from } = resolve(name) as { from: string };
    expect(Object.keys(corePackage.exports)).toContain(`./${from.slice('akar/'.length)}`);
    const entry = await import(/* @vite-ignore */ from);
    expect(entry[name], `${from} exports ${name}`).toBeDefined();
  });

  // `shared.ts` cannot import the core build script, so check that both name the same subpath
  it.each(Object.keys(components))('maps the %s group like the core exports generator', (group) => {
    expect(getComponentSource(group as keyof typeof components, true)).toBe(`akar/${toKebabCase(group)}`);
  });
});
