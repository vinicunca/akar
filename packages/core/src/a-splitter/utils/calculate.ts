import { KEY_CODES } from '@vinicunca/perkakas';

import type { PanelData } from '../a-splitter-panel.vue';
import type { Direction, DragState, ResizeEvent } from './types';

import { assert } from './assert';
import { getPanelGroupElement, getResizeHandleElement } from './dom';
import { getResizeEventCursorPosition, isKeyDown } from './events';

export function calculateDragOffsetPercentage(
  { event, dragHandleId, direction, initialDragState, panelGroupElement }:
  {
    direction: Direction;
    dragHandleId: string;
    event: ResizeEvent;
    initialDragState: DragState;
    panelGroupElement: HTMLElement;
  },
): number {
  const isHorizontal = direction === 'horizontal';

  const handleElement = getResizeHandleElement({
    id: dragHandleId,
    scope: panelGroupElement,
  });
  assert(handleElement);

  const groupId = handleElement.getAttribute('data-panel-group-id');
  assert(groupId);

  const { initialCursorPosition } = initialDragState;

  const cursorPosition = getResizeEventCursorPosition({ direction, event });

  const groupElement = getPanelGroupElement({
    id: groupId,
    rootElement: panelGroupElement,
  });
  assert(groupElement);

  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;

  const offsetPixels = cursorPosition - initialCursorPosition;
  return (offsetPixels / groupSizeInPixels) * 100;
}

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX
export function calculateDeltaPercentage(
  {
    event,
    dragHandleId,
    direction,
    initialDragState,
    keyboardResizeBy,
    panelGroupElement,
  }:
  {
    direction: Direction;
    dragHandleId: string;
    event: ResizeEvent;
    initialDragState: DragState | null;
    keyboardResizeBy: null | number;
    panelGroupElement: HTMLElement;
  },
): number {
  if (isKeyDown(event)) {
    const isHorizontal = direction === 'horizontal';

    let delta = 0;
    if (event.shiftKey) {
      delta = 100;
    } else {
      delta = keyboardResizeBy ?? 10;
    }

    let movement = 0;
    switch (event.key) {
      case KEY_CODES.ARROW_DOWN:
        movement = isHorizontal ? 0 : delta;
        break;
      case KEY_CODES.ARROW_LEFT:
        movement = isHorizontal ? -delta : 0;
        break;
      case KEY_CODES.ARROW_RIGHT:
        movement = isHorizontal ? delta : 0;
        break;
      case KEY_CODES.ARROW_UP:
        movement = isHorizontal ? 0 : -delta;
        break;
      case KEY_CODES.END:
        movement = 100;
        break;
      case KEY_CODES.HOME:
        movement = -100;
        break;
    }

    return movement;
  } else {
    if (initialDragState == null) {
      return 0;
    }

    return calculateDragOffsetPercentage({
      event,
      dragHandleId,
      direction,
      initialDragState,
      panelGroupElement,
    });
  }
}

export function calculateAriaValues({
  layout,
  panelsArray,
  pivotIndices,
}: {
  layout: Array<number>;
  panelsArray: Array<PanelData>;
  pivotIndices: Array<number>;
}) {
  let currentMinSize = 0;
  let currentMaxSize = 100;
  let totalMinSize = 0;
  let totalMaxSize = 0;

  const firstIndex = pivotIndices[0];
  assert(firstIndex != null);

  // A panel's effective min/max sizes also need to account for other panel's sizes.
  panelsArray.forEach((panelData, index) => {
    const { constraints } = panelData;
    const { maxSize = 100, minSize = 0 } = constraints;

    if (index === firstIndex) {
      currentMinSize = minSize;
      currentMaxSize = maxSize;
    } else {
      totalMinSize += minSize;
      totalMaxSize += maxSize;
    }
  });

  const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
  const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);

  const valueNow = layout[firstIndex];

  return {
    valueMax,
    valueMin,
    valueNow,
  };
}

export function calculateUnsafeDefaultLayout(
  panelDataArray: Array<PanelData>,
): Array<number> {
  const layout = Array<number>(panelDataArray.length);

  const panelConstraintsArray = panelDataArray.map(
    (panelData) => panelData.constraints,
  );

  let numPanelsWithSizes = 0;
  let remainingSize = 100;

  // Distribute default sizes first
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints);
    const { defaultSize } = panelConstraints;

    if (defaultSize != null) {
      numPanelsWithSizes++;
      layout[index] = defaultSize;
      remainingSize -= defaultSize;
    }
  }

  // Remaining size should be distributed evenly between panels without default sizes
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints);
    const { defaultSize } = panelConstraints;

    if (defaultSize != null) {
      continue;
    }

    const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
    const size = remainingSize / numRemainingPanels;

    numPanelsWithSizes++;
    layout[index] = size;
    remainingSize -= size;
  }

  return layout;
}
