import { getResizeHandleElementIndex } from './dom';

export function determinePivotIndices(
  groupId: string,
  dragHandleId: string,
  panelGroupElement: ParentNode,
): [indexBefore: number, indexAfter: number] {
  const index = getResizeHandleElementIndex({
    groupId,
    id: dragHandleId,
    scope: panelGroupElement,
  });

  return index != null ? [index, index + 1] : [-1, -1];
}
