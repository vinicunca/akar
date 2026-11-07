import type { ResolvedElementOptions, ResolvedPart } from './AkarElement';
import type { ElementEventOptions } from './events';
import type { AkarElementFamily } from './meta';
import { version } from 'vue';
import { AKAR_ELEMENT, AkarElement } from './AkarElement';
import { hyphenate } from './host';
import { getPartMeta, toPartDefinition } from './meta';

export interface DefineAkarElementsOptions {
  /**
   * Tag prefix: `<prefix>-<part>`, e.g. `acme` registers `<acme-dialog-root>`.
   * @defaultValue 'akar'
   */
  prefix?: string;
  /**
   * Give every element a shadow root holding a single default `<slot>`. Children
   * stay in the light DOM (slotted), so styling, focus, ARIA id references and form
   * participation work the same as without it. The shadow root only adds a place
   * for encapsulated `:host(...)` rules (`styles`); nothing is rendered into it, so
   * there are no `::part()`s.
   *
   * Only `mode` is supported: `delegatesFocus` would move focus away from the host,
   * which is the focusable part.
   * @defaultValue false
   */
  shadowRoot?: boolean | { mode: ShadowRootMode };
  /** Stylesheets adopted by every element's shadow root. Requires `shadowRoot`. */
  styles?: Array<CSSStyleSheet>;
  /** How the elements dispatch their events. Non-bubbling and non-composed by default. */
  events?: ElementEventOptions;
}

// Custom element names allow no uppercase ASCII letters.
const VALID_PREFIX = /^[a-z][a-z0-9._-]*$/;
const VERSION = /^(\d+)\.(\d+)/;

function warn(message: string) {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[akar] ${message}`);
  }
}

let checkedVersion = false;

function checkVueVersion() {
  if (checkedVersion) {
    return;
  }
  checkedVersion = true;
  const [, major, minor] = VERSION.exec(version) ?? [];
  if (Number(major) === 3 && Number(minor) < 5) {
    warn(`custom elements are tested on Vue 3.5. With Vue ${version}, generated ids are not unique between elements.`);
  }
}

function resolveOptions(options: DefineAkarElementsOptions = {}): ResolvedElementOptions {
  const { prefix = 'akar', shadowRoot = false, styles = [], events = {} } = options;
  if (!VALID_PREFIX.test(prefix)) {
    throw new Error(`[akar] defineAkarElements: invalid tag prefix "${prefix}"`);
  }
  if (typeof shadowRoot === 'object' && Object.keys(shadowRoot).some((key) => key !== 'mode')) {
    warn('defineAkarElements: `shadowRoot` only supports `mode`; other options are ignored.');
  }
  return {
    prefix,
    shadowRoot: shadowRoot === false
      ? false
      : {
          mode: shadowRoot === true
            ? 'open'
            : shadowRoot.mode,
        },
    styles,
    events: { bubbles: !!events.bubbles, composed: !!events.composed },
  };
}

function createElementClass(part: ResolvedPart): typeof AkarElement {
  class AkarPartElement extends AkarElement {
    static override akarPart = part;
    static formAssociated = part.meta.formAssociated;
  }
  for (const name of part.meta.properties) {
    Object.defineProperty(AkarPartElement.prototype, name, {
      configurable: true,
      enumerable: true,
      get(this: AkarElement) {
        return this._getProperty(name);
      },
      set(this: AkarElement, value: unknown) {
        this._setProperty(name, value);
      },
    });
  }
  return AkarPartElement;
}

/**
 * Registers the custom elements of the given families. Registration is explicit
 * (importing `akar/elements` defines nothing) and idempotent: a tag that is
 * already defined is skipped.
 *
 * @example
 * ```ts
 * import { defineAkarElements, dialogElements, switchElements } from 'akar/elements'
 *
 * defineAkarElements([dialogElements, switchElements])
 * ```
 * @returns the tags of the given families, defined now or before.
 */
export function defineAkarElements(
  families: ReadonlyArray<AkarElementFamily>,
  options?: DefineAkarElementsOptions,
): Array<string> {
  if (typeof customElements === 'undefined') {
    return [];
  }
  const resolved = resolveOptions(options);
  checkVueVersion();

  const tags: Array<string> = [];
  for (const family of families) {
    for (const [name, rawPart] of Object.entries(family.parts)) {
      const tag = `${resolved.prefix}-${hyphenate(name)}`;
      tags.push(tag);
      const existing = customElements.get(tag);
      if (existing) {
        // Defined by this or another copy of the library: fine.
        if (!(existing as unknown as Record<symbol, unknown>)[AKAR_ELEMENT]) {
          warn(`<${tag}> is already defined by something else, skipping it.`);
        }
        continue;
      }
      const definition = toPartDefinition(rawPart);
      customElements.define(tag, createElementClass({
        name,
        tag,
        component: definition.component,
        meta: getPartMeta(definition),
        options: resolved,
      }));
    }
  }
  return tags;
}
