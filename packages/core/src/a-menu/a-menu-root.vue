<script lang="ts">
import type { Ref } from 'vue';

import { createContext, useDirection } from '~~/shared';
import { useIsUsingKeyboard } from '~~/shared/use-is-using-keyboard';

import type { Direction } from './utils';

export interface AMenuContext {
  content: Ref<HTMLElement | undefined>;
  onContentChange: (content: HTMLElement | undefined) => void;
  onOpenChange: (open: boolean) => void;
  open: Ref<boolean>;
}

export interface MenuRootContext {
  dir: Ref<Direction>;
  isUsingKeyboardRef: Ref<boolean>;
  modal: Ref<boolean>;
  onClose: () => void;
}

export interface AMenuProps {
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
  /** The controlled open state of the menu. Can be used as `v-model:open`. */
  open?: boolean;
}

export type AMenuEmits = {
  'update:open': [payload: boolean];
};

export const [
  injectAMenuContext,
  provideAMenuContext,
] = createContext<AMenuContext>(['MenuRoot', 'MenuSub'], 'AMenuContext');

export const [
  injectAMenuRootContext,
  provideAMenuRootContext,
] = createContext<MenuRootContext>('MenuRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import {
  ref,
  toRefs,
} from 'vue';

import { APopperRoot } from '~~/a-popper';

const props = withDefaults(
  defineProps<AMenuProps>(),
  {
    open: false,
    modal: true,
  },
);

const emits = defineEmits<AMenuEmits>();
const { modal, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

const open = useVModel(props, 'open', emits);

const content = ref<HTMLElement>();
const isUsingKeyboardRef = useIsUsingKeyboard();

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

provideAMenuRootContext({
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
