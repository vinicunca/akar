// `akar/elements/global` (types only): types the default-prefixed tags in
// `HTMLElementTagNameMap`, so `document.querySelector('akar-switch-root')` and
// `document.createElement()` return the element's type.
//
//   /// <reference types="akar/elements/global" />
//
// Copied to `dist/elements/` by `scripts/postbuild.ts`.
import type { AkarElementTagNameMap } from '../elements.js';

declare global {
  interface HTMLElementTagNameMap extends AkarElementTagNameMap {}
}
