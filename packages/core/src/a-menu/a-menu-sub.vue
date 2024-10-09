<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

import type { AMenuContext } from './a-menu-root.vue';

export interface AMenuSubContext {
  contentId: string;
  onTriggerChange: (trigger: HTMLElement | undefined) => void;
  parentAMenuContext?: AMenuContext;
  trigger: Ref<HTMLElement | undefined>;
  triggerId: string;
}

export const [
  injectAMenuSubContext,
  provideAMenuSubContext,
] = createContext<AMenuSubContext>('MenuSub');

export interface AMenuSubProps {
  /** The controlled open state of the menu. Can be used as `v-model:open`. */
  open?: boolean;
}

export type AMenuSubEmits = {
  /** Event handler called when the open state of the submenu changes. */
  'update:open': [payload: boolean];
};
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import {
  ref,
  watchEffect,
} from 'vue';

import { APopperRoot } from '~~/a-popper';

import { injectAMenuContext, provideAMenuContext } from './a-menu-root.vue';

const props = withDefaults(
  defineProps<AMenuSubProps>(),
  {
    open: undefined,
  },
);

const emits = defineEmits<AMenuSubEmits>();

const open = useVModel(
  props,
  'open',
  emits,
  {
    defaultValue: false,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

const parentAMenuContext = injectAMenuContext();
const trigger = ref<HTMLElement>();
const content = ref<HTMLElement>();

// Prevent the parent menu from reopening with open submenus.
watchEffect((cleanupFn) => {
  if (parentAMenuContext?.open.value === false) {
    open.value = false;
  }

  cleanupFn(() => {
    open.value = false;
  });
});

provideAMenuContext({
  open,
  onOpenChange: (value) => {
    open.value = value;
  },
  content,
  onContentChange: (element) => {
    content.value = element;
  },
});

provideAMenuSubContext({
  triggerId: '',
  contentId: '',
  trigger,
  onTriggerChange: (element) => {
    trigger.value = element;
  },
});
</script>

<template>
  <APopperRoot>
    <slot />
  </APopperRoot>
</template>
