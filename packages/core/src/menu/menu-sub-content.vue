<script lang="ts">
import type {
  MenuContentImplEmits,
  MenuContentImplProps,
} from './menu-content-impl.vue';

export type AMenuSubContentEmits = MenuContentImplEmits;

// reference: https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L1152
export interface AMenuSubContentProps extends Omit<MenuContentImplProps, 'align' | 'disableOutsidePointerEvents' | 'disableOutsideScroll' | 'side' | 'trapFocus'> {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '~~/shared';
import MenuContentImpl from './menu-content-impl.vue';
import { injectAMenuContext, injectAMenuRootContext } from './menu-root.vue';
import { injectMenuSubContext } from './menu-sub.vue';
import { SUB_CLOSE_KEYS } from './utils';

const props = withDefaults(defineProps<AMenuSubContentProps>(), {
  prioritizePosition: true,
});
const emits = defineEmits<AMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectAMenuContext();
const rootContext = injectAMenuRootContext();
const menuSubContext = injectMenuSubContext();

const { forwardRef, currentElement: subContentElement } = useForwardExpose();

menuSubContext.contentId ||= useId(undefined, 'akar-menu-sub-content');
</script>

<template>
  <APresence :present="forceMount || menuContext.open.value">
    <MenuContentImpl
      v-bind="forwarded"
      :id="menuSubContext.contentId"
      :ref="forwardRef"
      :aria-labelledby="menuSubContext.triggerId"
      align="start"
      :side="rootContext.dir.value === 'rtl' ? 'left' : 'right'"
      :disable-outside-pointer-events="false"
      :disable-outside-scroll="false"
      :trap-focus="false"
      @open-auto-focus.prevent="(event) => {
        // when opening a submenu, focus content for keyboard users only
        if (rootContext.isUsingKeyboardRef.value) subContentElement?.focus();
      }"
      @close-auto-focus.prevent
      @focus-outside="
        (event) => {
          if (event.defaultPrevented) return;
          // We prevent closing when the trigger is focused to avoid triggering a re-open animation
          // on pointer interaction.
          if (event.target !== menuSubContext.trigger.value)
            menuContext.onOpenChange(false);
        }
      "
      @escape-key-down="
        (event) => {
          rootContext.onClose();
          // ensure pressing escape in submenu doesn't escape full screen mode
          event.preventDefault();
        }
      "
      @keydown="(event: KeyboardEvent) => {
        // Submenu key events bubble through portals. We only care about keys in this menu.
        const isKeyDownInside = (event.currentTarget as HTMLElement)?.contains(event.target as HTMLElement);
        const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir.value].includes(event.key);
        if (isKeyDownInside && isCloseKey) {
          menuContext.onOpenChange(false);
          // We focus manually because we prevented it in `onCloseAutoFocus`
          menuSubContext.trigger.value?.focus();
          // prevent window from scrolling
          event.preventDefault();
        }
      }"
    >
      <slot />
    </MenuContentImpl>
  </APresence>
</template>
