<script lang="ts">
import type { Ref } from 'vue';
import type { Direction } from './utils';
import { createContext, useDirection } from '../shared';
import { useIsUsingKeyboard } from '../shared/use-is-using-keyboard';

export interface MenuContext {
  open: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  content: Ref<HTMLElement | undefined>;
  onContentChange: (content: HTMLElement | undefined) => void;
}

export interface MenuRootContext {
  onClose: () => void;
  dir: Ref<Direction>;
  isUsingKeyboardRef: Ref<boolean>;
  modal: Ref<boolean>;
}

export interface AMenuProps {
  /** The controlled open state of the menu. Can be used as `v-model:open`. */
  open?: boolean;
  /**
   * The reading direction of the combobox when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * The modality of the dropdown menu.
   *
   * When set to `true`, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   */
  modal?: boolean;
}

export type AMenuEmits = {
  'update:open': [payload: boolean];
};

export const [injectAMenuContext, provideMenuContext]
  = createContext<MenuContext>(['AMenuRoot', 'AMenuSub'], 'MenuContext');

export const [injectAMenuRootContext, provideMenuRootContext]
  = createContext<MenuRootContext>('AMenuRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import {
  ref,
  toRefs,
} from 'vue';
import { APopperRoot } from '../popper';

const props = withDefaults(defineProps<AMenuProps>(), {
  open: false,
  modal: true,
});
const emits = defineEmits<AMenuEmits>();
const { modal, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

const open = useVModel(props, 'open', emits);

const content = ref<HTMLElement>();
const isUsingKeyboardRef = useIsUsingKeyboard();

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

provideMenuRootContext({
  onClose: () => {
    open.value = false;
  },
  isUsingKeyboardRef,
  dir,
  modal,
});
</script>

<template>
  <APopperRoot>
    <slot />
  </APopperRoot>
</template>
