import type { ModuleOptions } from '.';
import { addComponent, addVitePlugin } from '@nuxt/kit';
import { components } from 'akar/constant';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AkarModule from '.';

vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: (definition: unknown) => definition,
  addComponent: vi.fn(),
  addVitePlugin: vi.fn(),
}));

interface Definition {
  defaults: ModuleOptions;
  setup: (options: ModuleOptions, nuxt: unknown) => void;
}
const definition = AkarModule as unknown as Definition;

function setup(options: Partial<ModuleOptions> = {}) {
  definition.setup({
    ...definition.defaults,
    ...options,
  }, {});
}

function registered() {
  return vi.mocked(addComponent).mock.calls.map(([options]) => options);
}

interface ConfigPlugin { name: string; config: (config: Record<string, any>) => void }

function viteConfig(config: Record<string, any> = {}) {
  expect(addVitePlugin).toHaveBeenCalledTimes(1);
  const [plugin, options] = vi.mocked(addVitePlugin).mock.calls[0] as unknown as [ConfigPlugin, unknown];
  plugin.config(config);
  return { config, options, plugin };
}

const allComponents = Object.values(components).flat();

describe('akar/nuxt', () => {
  beforeEach(() => {
    vi.mocked(addComponent).mockClear();
    vi.mocked(addVitePlugin).mockClear();
  });

  it('registers every component from its family entry point by default', () => {
    setup();
    expect(registered()).toHaveLength(allComponents.length);
    expect(registered()).toContainEqual({ name: 'DialogRoot', export: 'DialogRoot', filePath: 'akar/dialog' });
    expect(registered()).toContainEqual({ name: 'DropdownMenuItem', export: 'DropdownMenuItem', filePath: 'akar/dropdown-menu' });
    expect(registered()).toContainEqual({ name: 'Slot', export: 'Slot', filePath: 'akar/primitive' });
  });

  it('registers every component from the package root with `subpaths: false`', () => {
    setup({ subpaths: false, prefix: 'Akar' });
    expect(registered()).toHaveLength(allComponents.length);
    for (const options of registered()) {
      expect(options).toEqual({ name: `Akar${options.export}`, export: options.export, filePath: 'akar' });
    }
    expect(addVitePlugin).not.toHaveBeenCalled();
  });

  it('only registers the enabled groups', () => {
    setup({
      components: { dialog: true, select: false },
    });
    expect(new Set(registered().map((options) => options.filePath))).toEqual(new Set(['akar/dialog']));
  });

  it('registers nothing with `components: false`', () => {
    setup({ components: false });
    expect(addComponent).not.toHaveBeenCalled();
    expect(addVitePlugin).not.toHaveBeenCalled();
  });

  it('pre-bundles akar and the registered entry points for the client', () => {
    setup({
      components: { dialog: true, alertDialog: true },
    });
    const { config, options, plugin } = viteConfig({
      optimizeDeps: {
        include: ['some-dep', 'akar/dialog'],
      },
    });
    expect(plugin.name).toBe('akar:optimize-deps');
    expect(options).toEqual({ server: false });
    expect(config.optimizeDeps.include).toEqual([
      'some-dep',
      'akar/dialog',
      'akar',
      'akar/alert-dialog',
    ]);
  });

  it('pre-bundles into an empty config', () => {
    setup({
      components: { dialog: true },
    });
    expect(viteConfig().config).toEqual({
      optimizeDeps: {
        include: ['akar', 'akar/dialog'],
      },
    });
  });

  it.each([
    [
      'top-level',
      {
        optimizeDeps: {
          exclude: ['akar'],
        },
      },
    ],
    [
      'client environment',
      {
        environments: {
          client: {
            optimizeDeps: {
              exclude: ['akar'],
            },
          },
        },
      },
    ],
  ])('pre-bundles nothing when akar is excluded (%s)', (_, config) => {
    setup();
    expect(viteConfig(config).config.optimizeDeps.include).toBeUndefined();
  });

  it('skips the entry points the app excludes', () => {
    setup({
      components: { dialog: true, select: true },
    });
    const { config } = viteConfig({
      optimizeDeps: {
        exclude: ['akar/select'],
      },
      environments: {
        client: {
          optimizeDeps: {
            exclude: ['akar/dialog'],
          },
        },
      },
    });
    expect(config.optimizeDeps.include).toEqual(['akar']);
  });
});
