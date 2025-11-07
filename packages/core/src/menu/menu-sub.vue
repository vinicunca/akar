<script lang="ts">
import type { Ref } from 'vue';
import type { MenuContext } from './menu-root.vue';
import { createContext } from '../shared';

export interface MenuSubContext {
  contentId: string;
  triggerId: string;
  trigger: Ref<HTMLElement | undefined>;
  onTriggerChange: (trigger: HTMLElement | undefined) => void;
  parentMenuContext?: MenuContext;
}

export const [injectMenuSubContext, provideMenuSubContext]
  = createContext<MenuSubContext>('AMenuSub');

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
import { APopperRoot } from '../popper';
import { injectAMenuContext, provideMenuContext } from './menu-root.vue';

const props = withDefaults(defineProps<AMenuSubProps>(), {
  open: undefined,
});
const emits = defineEmits<AMenuSubEmits>();

const open = useVModel(props, 'open', emits, {
  defaultValue: false,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;

const parentMenuContext = injectAMenuContext();
const trigger = ref<HTMLElement>();
const content = ref<HTMLElement>();

// Prevent the parent menu from reopening with open submenus.
watchEffect((cleanupFn) => {
  if (parentMenuContext?.open.value === false) {
    open.value = false;
  }
  cleanupFn(() => {
    open.value = false;
  });
});

provideMenuContext({
  open,
  onOpenChange: (value) => {
    open.value = value;
  },
  content,
  onContentChange: (element) => {
    content.value = element;
  },
});

provideMenuSubContext({
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
