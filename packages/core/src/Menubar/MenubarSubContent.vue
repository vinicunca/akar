<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '@/Menu';
import { useCollection } from '@/Collection';

export type MenubarSubContentEmits = MenuSubContentEmits;

export interface MenubarSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { MenuSubContent } from '@/Menu';
import { useForwardExpose, useForwardPropsEmits } from '@/shared';
import { wrapArray } from '@/shared/useTypeahead';
import { injectMenubarMenuContext } from './MenubarMenu.vue';
import { injectMenubarRootContext } from './MenubarRoot.vue';

const props = defineProps<MenubarSubContentProps>();
const emits = defineEmits<MenubarSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();

const { getItems } = useCollection({ key: 'Menubar' });

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

function handleArrowNavigation(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute(
    'data-akar-menubar-subtrigger',
  );

  // Prevent navigation when we're opening a submenu
  if (targetIsSubTrigger) {
    return;
  }

  let candidateValues = getItems().filter((i) => i.ref.dataset.disabled !== '').map((i) => i.ref.dataset.value);
  const currentIndex = candidateValues.indexOf(menuContext.value);

  candidateValues = rootContext.loop.value
    ? wrapArray(candidateValues, currentIndex + 1)
    : candidateValues.slice(currentIndex + 1);

  const [nextValue] = candidateValues;
  if (nextValue) {
    rootContext.onMenuOpen(nextValue);
  }
}
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    data-akar-menubar-content=""
    :style="{
      '--akar-menubar-content-transform-origin':
        'var(--akar-popper-transform-origin)',
      '--akar-menubar-content-available-width':
        'var(--akar-popper-available-width)',
      '--akar-menubar-content-available-height':
        'var(--akar-popper-available-height)',
      '--akar-menubar-trigger-width': 'var(--akar-popper-anchor-width)',
      '--akar-menubar-trigger-height': 'var(--akar-popper-anchor-height)',
    }"
    @keydown.arrow-right="handleArrowNavigation"
  >
    <slot />
  </MenuSubContent>
</template>
