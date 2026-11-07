import type { Components } from 'akar/constant';

const UPPERCASE = /[A-Z]/g;

/**
 * The module a component of `group` is imported from: its family entry point
 * (`alertDialog` → `akar/alert-dialog`), or the package root when `subpaths` is off.
 *
 * Every group in `akar/constant` is named after its component family, and every
 * family has an entry point; `packages/core/src/subpaths.test.ts` checks both.
 */
export function getComponentSource(group: keyof Components, subpaths: boolean): string {
  if (!subpaths) {
    return 'akar';
  }
  return `akar/${group.replace(UPPERCASE, (char) => `-${char.toLowerCase()}`)}`;
}
