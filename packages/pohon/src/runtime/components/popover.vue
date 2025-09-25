<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AHoverCardRootProps,
  AHoverCardTriggerProps,
  APopoverArrowProps,
  APopoverContentEmits,
  APopoverContentProps,
  APopoverRootEmits,
  APopoverRootProps,
} from 'akar';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/popover';

type Popover = ComponentConfig<typeof theme, AppConfig, 'popover'>;

export interface PPopoverProps extends APopoverRootProps, Pick<AHoverCardRootProps, 'openDelay' | 'closeDelay'> {
  /**
   * The display mode of the popover.
   * @defaultValue 'click'
   */
  mode?: 'click' | 'hover';
  /**
   * The content of the popover.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<APopoverContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<APopoverContentEmits>>;
  /**
   * Display an arrow alongside the popover.
   * @defaultValue false
   */
  arrow?: boolean | Omit<APopoverArrowProps, 'as' | 'asChild'>;
  /**
   * @defaultValue true
   * Render the popover in a portal.
   */
  portal?: boolean | string | HTMLElement;
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: AHoverCardTriggerProps['reference'];
  /**
   * When `false`, the popover will not close when clicking outside or pressing escape.
   * @defaultValue true
   */
  dismissible?: boolean;
  class?: any;
  pohon?: Popover['slots'];
}

export interface PPopoverEmits extends APopoverRootEmits {
  'close:prevent': [];
}

export interface PPopoverSlots {
  default: (props: { open: boolean }) => any;
  content: (props?: object) => any;
  anchor: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { AHoverCard, APopover } from 'akar/namespaced';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { usePortal } from '../composables/use-portal';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PPopoverProps>(),
  {
    portal: true,
    mode: 'click',
    openDelay: 0,
    closeDelay: 0,
    dismissible: true,
  },
);
const emits = defineEmits<PPopoverEmits>();
const slots = defineSlots<PPopoverSlots>();

const appConfig = useAppConfig() as Popover['AppConfig'];

const pick = props.mode === 'hover'
  ? reactivePick(props, 'defaultOpen', 'open', 'openDelay', 'closeDelay')
  : reactivePick(props, 'defaultOpen', 'open', 'modal');
const rootProps = useForwardPropsEmits(pick, emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() =>
  defu(
    props.content,
    { side: 'bottom', sideOffset: 8, collisionPadding: 8 },
  ) as APopoverContentProps,
);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (event: Event) => {
        event.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (e: Event) => void>);
  }

  return {};
});
const arrowProps = toRef(() => props.arrow as APopoverArrowProps);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.popover || {}),
  })({
    side: contentProps.value.side,
  }),
);

const Component = computed(() => props.mode === 'hover' ? AHoverCard : APopover);
</script>

<template>
  <Component.Root
    v-slot="{ open }"
    v-bind="rootProps"
  >
    <Component.Trigger
      v-if="!!slots.default || !!reference"
      as-child
      :reference="reference"
      :class="props.class"
    >
      <slot :open="open" />
    </Component.Trigger>

    <Component.Anchor
      v-if="'Anchor' in Component && !!slots.anchor"
      as-child
    >
      <slot name="anchor" />
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <Component.Content
        v-bind="contentProps"
        :class="pohon.content({ class: [!slots.default && props.class, props.pohon?.content] })"
        v-on="contentEvents"
      >
        <slot name="content" />

        <Component.Arrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="pohon.arrow({ class: props.pohon?.arrow })"
        />
      </Component.Content>
    </Component.Portal>
  </Component.Root>
</template>
