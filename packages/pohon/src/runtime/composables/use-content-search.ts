import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';

function useContentSearch_() {
  const open = ref(false);

  return {
    open,
  };
}

export const useContentSearch = /* @__PURE__ */ createSharedComposable(useContentSearch_);
