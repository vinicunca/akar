<script lang="ts">
import type { MenuContentEmits, MenuContentProps } from '@/Menu';
import { useCollection } from '@/Collection';

export type MenubarContentEmits = Omit<MenuContentEmits, 'entryFocus'>;

export interface MenubarContentProps extends MenuContentProps {}
</script>

<script setup lang="ts">
import { MenuContent } from '@/Menu';
import { omitEntryFocusListener } from '@/Menu/utils';
import { useForwardElement, useForwardPropsEmits } from '@/shared';
import { injectMenubarMenuContext } from './MenubarMenu.vue';
import { injectMenubarRootContext } from './MenubarRoot.vue';
import { createMenubarContentSurface } from './useMenubar';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start',
});
const emits = defineEmits<MenubarContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef, expose } = useForwardElement();
defineExpose(expose);

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

const { getItems } = useCollection({ key: 'Menubar' });

// `id`/`aria-labelledby`/the content selector, the focus handlers and the
// ArrowLeft/Right menu switching come from the composable. The surface's attrs
// (no handlers) spread BEFORE the forwarded props and `$attrs`, so a consumer
// `id` still wins; its handlers bind AFTER the forwarded emits, as before.
const content = createMenubarContentSurface(rootContext, menuContext, { getItems });
</script>

<template>
  <MenuContent
    :ref="forwardRef"
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
    v-bind="{ ...content.attrs.value, ...forwarded, ...omitEntryFocusListener($attrs) }"
    @close-auto-focus="content.onCloseAutoFocus"
    @focus-outside="content.onFocusOutside"
    @interact-outside="content.onInteractOutside"
    @entry-focus="content.onEntryFocus"
    @keydown="content.onKeydown"
  >
    <slot />
  </MenuContent>
</template>
