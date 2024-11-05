import { KEY_CODES } from '@vinicunca/perkakas';
import { type Ref, watchEffect } from 'vue';

import type { ResizeHandler } from '../types';

import { assert } from '../assert';
import {
  getResizeHandleElement,
  getResizeHandleElementIndex,
  getResizeHandleElementsForGroup,
} from '../dom';

// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/

export function useWindowSplitterResizeHandlerBehavior({
  disabled,
  handleId,
  resizeHandler,
  panelGroupElement,
}: {
  disabled: Ref<boolean>;
  handleId: string;
  panelGroupElement: Ref<null | ParentNode>;
  resizeHandler: Ref<null | ResizeHandler>;
}): void {
  watchEffect((onCleanup) => {
    const _panelGroupElement = panelGroupElement.value;
    if (disabled.value || resizeHandler.value === null || _panelGroupElement === null) {
      return;
    }

    const handleElement = getResizeHandleElement({ id: handleId, scope: _panelGroupElement });
    if (handleElement == null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      switch (event.key) {
        case 'F6': {
          event.preventDefault();

          const groupId = handleElement.getAttribute('data-panel-group-id');
          assert(groupId);

          const handles = getResizeHandleElementsForGroup({
            groupId,
            scope: _panelGroupElement,
          });

          const index = getResizeHandleElementIndex({
            groupId,
            id: handleId,
            scope: _panelGroupElement,
          });

          assert(index !== null);

          let nextIndex;

          if (event.shiftKey) {
            if (index > 0) {
              nextIndex = index - 1;
            } else {
              nextIndex = handles.length - 1;
            }
          } else {
            if (index + 1 < handles.length) {
              nextIndex = index + 1;
            } else {
              nextIndex = 0;
            }
          }

          const nextHandle = handles[nextIndex] as HTMLElement;
          nextHandle.focus();

          break;
        }
        case KEY_CODES.ARROW_DOWN:
        case KEY_CODES.ARROW_LEFT:
        case KEY_CODES.ARROW_RIGHT:
        case KEY_CODES.ARROW_UP:
        case KEY_CODES.END:
        case KEY_CODES.HOME: {
          event.preventDefault();

          resizeHandler.value?.(event);
          break;
        }
      }
    };

    handleElement.addEventListener('keydown', onKeyDown);

    onCleanup(() => {
      handleElement.removeEventListener('keydown', onKeyDown);
    });
  });
}
