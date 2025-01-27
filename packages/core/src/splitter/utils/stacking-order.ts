/* eslint-disable sonar/no-dead-store */
// Forked from NPM stacking-order@2.0.0
// Background at https://github.com/Rich-Harris/stacking-order/issues/3

import { assert } from './assert';

/**
 * Determine which of two nodes appears in front of the other —
 * if `a` is in front, returns 1, otherwise returns -1
 * @param a
 * @param b
 */
export function compare(a: HTMLElement, b: HTMLElement): number {
  if (a === b) {
    throw new Error('Cannot compare node with itself');
  }

  const ancestors = {
    a: getAncestors(a),
    b: getAncestors(b),
  };

  let commonAncestor;

  // remove shared ancestors
  while (ancestors.a.at(-1) === ancestors.b.at(-1)) {
    a = ancestors.a.pop() as HTMLElement;
    b = ancestors.b.pop() as HTMLElement;

    commonAncestor = a;
  }

  assert(commonAncestor);

  const zIndexes = {
    a: getZIndex(findStackingContext(ancestors.a)),
    b: getZIndex(findStackingContext(ancestors.b)),
  };

  if (zIndexes.a === zIndexes.b) {
    const children = commonAncestor.childNodes;

    const furthestAncestors = {
      a: ancestors.a.at(-1),
      b: ancestors.b.at(-1),
    };

    let i = children.length;
    while (i--) {
      const child = children[i];
      if (child === furthestAncestors.a) {
        return 1;
      }
      if (child === furthestAncestors.b) {
        return -1;
      }
    }
  }

  return Math.sign(zIndexes.a - zIndexes.b);
}

const props
  = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;

/** @param node */
function isFlexItem(node: HTMLElement) {
  const display = getComputedStyle(getParent(node)).display;
  return display === 'flex' || display === 'inline-flex';
}

/** @param node */
function createsStackingContext(node: HTMLElement) {
  const style = getComputedStyle(node);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
  if (style.position === 'fixed') {
    return true;
  }
  // Forked to fix upstream bug https://github.com/Rich-Harris/stacking-order/issues/3
  // if (
  //   (style.zIndex !== "auto" && style.position !== "static") ||
  //   isFlexItem(node)
  // )
  if (
    style.zIndex !== 'auto'
    && (style.position !== 'static' || isFlexItem(node))
  ) {
    return true;
  }
  if (+style.opacity < 1) {
    return true;
  }
  if ('transform' in style && style.transform !== 'none') {
    return true;
  }
  if ('webkitTransform' in style && style.webkitTransform !== 'none') {
    return true;
  }
  if ('mixBlendMode' in style && style.mixBlendMode !== 'normal') {
    return true;
  }
  if ('filter' in style && style.filter !== 'none') {
    return true;
  }
  if ('webkitFilter' in style && style.webkitFilter !== 'none') {
    return true;
  }
  if ('isolation' in style && style.isolation === 'isolate') {
    return true;
  }
  if (props.test(style.willChange)) {
    return true;
  }
  // @ts-expect-error non-standard styling https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling
  return style.webkitOverflowScrolling === 'touch';
}

/** @param nodes */
function findStackingContext(nodes: Array<HTMLElement>) {
  let i = nodes.length;

  while (i--) {
    const node = nodes[i];
    assert(node);
    if (createsStackingContext(node)) {
      return node;
    }
  }

  return null;
}

/** @param node */
function getZIndex(node: HTMLElement | null) {
  return (node && Number(getComputedStyle(node).zIndex)) || 0;
}

/** @param node */
function getAncestors(node: HTMLElement) {
  const ancestors = [];

  while (node) {
    ancestors.push(node);
    node = getParent(node);
  }

  return ancestors; // [ node, ... <body>, <html>, document ]
}

/** @param node */
function getParent(node: HTMLElement) {
  // @ts-expect-error host should exist
  return (node.parentNode instanceof DocumentFragment && node.parentNode?.host) || node.parentNode;
}
