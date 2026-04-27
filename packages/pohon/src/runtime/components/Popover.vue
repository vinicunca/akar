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
import type { VNode } from 'vue';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/popover';

type Popover = ComponentConfig<typeof theme, AppConfig, 'popover'>;
type PopoverMode = 'click' | 'hover';

export interface PPopoverProps<M extends PopoverMode = PopoverMode> extends APopoverRootProps, Pick<AHoverCardRootProps, 'openDelay' | 'closeDelay'> {
  /**
   * The display mode of the popover.
   * @defaultValue 'click'
   */
  mode?: M;
  /**
   * The content of the popover.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<APopoverContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<APopoverContentEmits>>;
  /**
   * Display an arrow alongside the popover.
   * `{ rounded: true }`{lang="ts-type"}
   * @defaultValue false
   */
  arrow?: boolean | Omit<APopoverArrowProps, 'as' | 'asChild'>;
  /**
   * Render the popover in a portal.
   * @defaultValue true
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

type SlotProps<M extends PopoverMode = PopoverMode> = [M] extends ['hover'] ? { close: undefined } : { close: () => void };

export interface PPopoverSlots<M extends PopoverMode = PopoverMode> {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props: SlotProps<M>) => Array<VNode>;
  anchor?: (props: SlotProps<M>) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="M extends PopoverMode">
import { reactivePick } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { AHoverCard, APopover } from 'akar/namespaced';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset } from '../composables/use-field-group';
import { usePortal } from '../composables/use-portal';
import { pointerDownOutside } from '../utils/overlay';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PPopoverProps<M>>(),
  {
    portal: true,
    mode: 'click' as never,
    openDelay: 0,
    closeDelay: 0,
    dismissible: true,
  },
);
const emits = defineEmits<PPopoverEmits>();
const slots = defineSlots<PPopoverSlots<M>>();

const appConfig = useAppConfig() as Popover['AppConfig'];
const pohonProp = useComponentPohon('popover', props);

const pick = props.mode === 'hover' ? reactivePick(props, 'defaultOpen', 'open', 'openDelay', 'closeDelay') : reactivePick(props, 'defaultOpen', 'open', 'modal');
const rootProps = useForwardPropsEmits(pick, emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as APopoverContentProps);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (event: Event) => {
        event.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (event: Event) => void>);
  }

  return {
    pointerDownOutside,
  };
});
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as APopoverArrowProps);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.popover || {}) })({
  side: contentProps.value.side,
}));

const Component = computed(() => props.mode === 'hover' ? AHoverCard : APopover);
</script>

<template>
  <Component.Root
    v-slot="{ open, close }: { open: boolean, close?: () => void }"
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
      <slot
        name="anchor"
        v-bind="((close ? { close } : {}) as SlotProps<M>)"
      />
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <FieldGroupReset>
        <Component.Content
          v-bind="contentProps"
          data-slot="content"
          :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
          v-on="contentEvents"
        >
          <slot
            name="content"
            v-bind="((close ? { close } : {}) as SlotProps<M>)"
          />

          <Component.Arrow
            v-if="!!arrow"
            v-bind="arrowProps"
            data-slot="arrow"
            :class="pohon.arrow({ class: pohonProp?.arrow })"
          />
        </Component.Content>
      </FieldGroupReset>
    </Component.Portal>
  </Component.Root>
</template>
