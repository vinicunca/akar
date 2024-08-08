import {
  createSharedComposable,
  useEventListener,
} from '@vueuse/core';
import { type Fn, isClient, isIOS, tryOnBeforeUnmount } from '@vueuse/shared';
import { defu } from 'defu';
import { nanoid } from 'nanoid/non-secure';
import { computed, nextTick, ref, watch } from 'vue';

import { injectConfigProviderContext } from '~~/ConfigProvider/ConfigProvider.vue';

const useBodyLockStackCount = createSharedComposable(() => {
  const map = ref<Map<string, boolean>>(new Map());
  const initialOverflow = ref<string | undefined>();

  const locked = computed(() => {
    for (const value of map.value.values()) {
      if (value) {
        return true;
      }
    }
    return false;
  });

  const context = injectConfigProviderContext({
    scrollBody: ref(true),
  });

  let stopTouchMoveListener: Fn | null = null;

  const resetBodyStyle = () => {
    document.body.style.paddingRight = '';
    document.body.style.marginRight = '';
    document.body.style.pointerEvents = '';
    document.body.style.removeProperty('--scrollbar-width');
    document.body.style.overflow = initialOverflow.value ?? '';
    if (isIOS && stopTouchMoveListener) {
      stopTouchMoveListener();
    }

    initialOverflow.value = undefined;
  };

  watch(locked, (val, oldVal) => {
    if (!isClient) {
      return;
    }

    if (!val) {
      if (oldVal) {
        resetBodyStyle();
      }
      return;
    }

    if (initialOverflow.value === undefined) {
      initialOverflow.value = document.body.style.overflow;
    }

    const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const defaultConfig = { margin: 0, padding: verticalScrollbarWidth };

    let config;
    if (context.scrollBody?.value) {
      if (typeof context.scrollBody.value === 'object') {
        const margin = context.scrollBody.value.margin === true ? verticalScrollbarWidth : context.scrollBody.value.margin;
        const padding = context.scrollBody.value.padding === true ? verticalScrollbarWidth : context.scrollBody.value.padding;

        config = defu({ margin, padding }, defaultConfig);
      } else {
        config = defaultConfig;
      }
    } else {
      config = { margin: 0, padding: 0 };
    }

    if (verticalScrollbarWidth > 0) {
      document.body.style.paddingRight = `${config.padding}px`;
      document.body.style.marginRight = `${config.margin}px`;
      document.body.style.setProperty('--scrollbar-width', `${verticalScrollbarWidth}px`);
      document.body.style.overflow = 'hidden';
    }

    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        document,
        'touchmove',
        (e: TouchEvent) => {
          if (e.target !== document.documentElement) {
            return;
          }

          if (e.touches.length > 1) {
            return;
          }
          e.preventDefault?.();
        },
        { passive: false },
      );
    }

    // let dismissibleLayer set previous pointerEvent first
    nextTick(() => {
      document.body.style.pointerEvents = 'none';
      document.body.style.overflow = 'hidden';
    });
  }, { flush: 'sync', immediate: true });

  return map;
});

export function useBodyScrollLock(initialState?: boolean | undefined) {
  const id = nanoid(6);
  const map = useBodyLockStackCount();

  map.value.set(id, initialState ?? false);

  const locked = computed({
    get: () => map.value.get(id) ?? false,
    set: (value) => map.value.set(id, value),
  });

  tryOnBeforeUnmount(() => {
    map.value.delete(id);
  });

  return locked;
}
