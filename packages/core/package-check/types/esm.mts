// A TypeScript consumer that uses `import`. Type-checked against the packed akar with
// `moduleResolution` "bundler" and "node16" (where a .mts file resolves the `import` condition).
import type { DateValue } from 'akar';
import type { Components } from 'akar/constant';
import type { ModuleOptions } from 'akar/nuxt';
import type { ResolverOptions } from 'akar/resolver';
import type { Component } from 'vue';
import { AccordionRoot, DialogRoot, PopoverContent, useForwardPropsEmits, useId } from 'akar';
import { createAgent } from 'akar/agent';
import { components } from 'akar/constant';
import { createMonth } from 'akar/date';
import { MenuRoot } from 'akar/internal';
import { Accordion, Dialog } from 'akar/namespaced';
import nuxtModule from 'akar/nuxt';
import resolver from 'akar/resolver';
import { Primitive } from 'akar/vapor';

// Fails when an entry resolves to no declarations (everything would be `any`)
type NotAny<T> = 0 extends 1 & T ? never : T;
function typed<T>(value: NotAny<T>): T {
  return value;
}

export const parts: Array<Component> = [
  typed(AccordionRoot),
  typed(DialogRoot),
  typed(PopoverContent),
  typed(Accordion.Root),
  typed(Dialog.Content),
];
export const group: Components['accordion'] = typed(components).accordion;
export const options: [Partial<ModuleOptions>, ResolverOptions] = [
  { prefix: 'Akar' },
  { prefix: 'Akar' },
];
export const resolved = typed(resolver)(options[1]);
export const date: DateValue | undefined = undefined;
export const functions = [
  typed(useForwardPropsEmits),
  typed(useId),
  typed(createAgent),
  typed(createMonth),
  typed(MenuRoot),
  typed(nuxtModule),
  typed(Primitive),
];
