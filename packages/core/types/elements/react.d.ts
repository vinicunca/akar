// `akar/elements/react` (types only): JSX typings for the default-prefixed
// tags in React 19, with camelCase props and `onupdate-model-value`-style event
// props.
//
//   /// <reference types="akar/elements/react" />
//
// Copied to `dist/elements/` by `scripts/postbuild.ts`.
import type { HTMLAttributes, RefAttributes } from 'react';
import type { AkarIntrinsicElements } from '../elements.js';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends AkarIntrinsicElements<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>> {}
  }
}
