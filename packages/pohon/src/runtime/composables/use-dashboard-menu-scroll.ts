import type { Ref } from 'vue';

import { isBoolean } from '@vinicunca/perkakas';

import { useDebounceFn } from '@vueuse/core';
import { watch } from 'vue';

interface UseMenuScrollOptions {
  delay?: number;
  enable?: boolean | Ref<boolean>;
}

export function useMenuScroll(
  activePath: Ref<string | undefined>,
  options: UseMenuScrollOptions = {},
) {
  const { enable = true, delay = 320 } = options;

  function scrollToActiveItem() {
    const isEnabled = isBoolean(enable) ? enable : enable.value;

    if (!isEnabled) {
      return;
    }

    const activeElement = document.querySelector(
      'aside li[role=menuitem].is-active',
    );

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  const debouncedScroll = useDebounceFn(scrollToActiveItem, delay);

  watch(activePath, () => {
    const isEnabled = isBoolean(enable) ? enable : enable.value;
    if (!isEnabled) {
      return;
    }

    debouncedScroll();
  });

  return {
    scrollToActiveItem,
  };
}
