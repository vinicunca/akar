<script lang="ts">
import { refAutoReset } from '@vueuse/shared';
import { APrimitive, type APrimitiveProps } from '~~/primitive';
import { injectAListboxRootContext } from './listbox-root.vue';

export interface AListboxContentProps extends APrimitiveProps { }
</script>

<script setup lang="ts">
import { useCollection } from '~~/collection';

defineProps<AListboxContentProps>();

const { ACollectionSlot } = useCollection();
const rootContext = injectAListboxRootContext();

const isClickFocus = refAutoReset(false, 10);
</script>

<template>
  <ACollectionSlot>
    <APrimitive
      role="listbox"
      :as="as"
      :as-child="asChild"
      :tabindex="rootContext.focusable.value ? rootContext.highlightedElement.value ? '-1' : '0' : undefined"
      :aria-orientation="rootContext.orientation.value"
      :aria-multiselectable="!!rootContext.multiple.value"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="isClickFocus = true"
      @focus="(ev) => {
        if (isClickFocus)
          return
        rootContext.onEnter(ev)
      }"
      @keydown.down.up.left.right.home.end.prevent="(event) => {
        rootContext.focusable.value ? rootContext.onKeydownNavigation(event) : undefined
      }"
      @keydown.enter="rootContext.onKeydownEnter"
      @keydown="rootContext.onKeydownTypeAhead"
    >
      <slot />
    </APrimitive>
  </ACollectionSlot>
</template>
