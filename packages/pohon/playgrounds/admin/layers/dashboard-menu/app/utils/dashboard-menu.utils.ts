import type { ComponentInternalInstance, VNode, VNodeChild, VNodeNormalizedChildren } from 'vue';
import { isVNode } from 'vue';

type VNodeChildAtom = Exclude<VNodeChild, Array<any>>;
type RawSlots = Exclude<VNodeNormalizedChildren, Array<any> | null | string>;

type FlattenVNodes = Array<RawSlots | VNodeChildAtom>;
/**
 * Find the parent component upward
 */
function findComponentUpward(
  { instance, parentNames }:
  { instance: ComponentInternalInstance; parentNames: Array<string> },
) {
  let parent = instance.parent;

  while (parent && !parentNames.includes(parent?.type?.name ?? '')) {
    parent = parent.parent;
  }

  return parent;
}

function flattedChildren(
  children: FlattenVNodes | VNode | VNodeNormalizedChildren,
): FlattenVNodes {
  const vNodes = Array.isArray(children) ? children : [children];
  const result: FlattenVNodes = [];

  vNodes.forEach((vNode) => {
    if (Array.isArray(vNode)) {
      result.push(...flattedChildren(vNode));
    } else if (isVNode(vNode) && Array.isArray(vNode.children)) {
      result.push(...flattedChildren(vNode.children));
    } else {
      result.push(vNode);
      if (isVNode(vNode) && vNode.component?.subTree) {
        result.push(...flattedChildren(vNode.component.subTree));
      }
    }
  });

  return result;
}

export {
  findComponentUpward,
  flattedChildren,
};
