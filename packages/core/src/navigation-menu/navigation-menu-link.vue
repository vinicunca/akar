<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useCollection } from '~~/collection';
import { useForwardExpose } from '~~/shared';

export type NavigationMenuLinkEmits = {
  /**
   * Event handler called when the user selects a link (via mouse or keyboard).
   *
   * Calling `event.preventDefault` in this handler will prevent the navigation menu from closing when selecting that link.
   */
  select: [payload: CustomEvent<{ originalEvent: Event }>];
};
export interface ANavigationMenuLinkProps extends APrimitiveProps {
  /** Used to identify the link as the currently active page. */
  active?: boolean;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { EVENT_ROOT_CONTENT_DISMISS, LINK_SELECT } from './utils';

const props = withDefaults(defineProps<ANavigationMenuLinkProps>(), {
  as: 'a',
});

const emits = defineEmits<NavigationMenuLinkEmits>();

const { ACollectionItem } = useCollection({ key: 'NavigationMenu' });
useForwardExpose();

async function handleClick(event: MouseEvent) {
  const linkSelectEvent = new CustomEvent(LINK_SELECT, {
    bubbles: true,
    cancelable: true,
    detail: {
      originalEvent: event,
    },
  });
  emits('select', linkSelectEvent);

  if (!linkSelectEvent.defaultPrevented && !event.metaKey) {
    const rootContentDismissEvent = new CustomEvent(
      EVENT_ROOT_CONTENT_DISMISS,
      {
        bubbles: true,
        cancelable: true,
      },
    );
    event.target?.dispatchEvent(rootContentDismissEvent);
  }
}
</script>

<template>
  <ACollectionItem>
    <APrimitive
      :as="as"
      :data-active="active ? '' : undefined"
      :aria-current="active ? 'page' : undefined"
      :as-child="props.asChild"
      @click="handleClick"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
