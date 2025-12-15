<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/scrollbar';

type Scrollbar = ComponentConfig<typeof theme, AppConfig, 'scrollbar'>;

export interface PScrollbarProps {
  /**
   * Whether to use horizontal scrollbar
   * @default false
   */
  horizontal?: boolean;
  /**
   * Whether to show shadow
   * @default false
   */
  hasShadow?: boolean;
  /**
   * Whether to show shadow border
   * @default false
   */
  hasShadowBorder?: boolean;
  /**
   * Whether to show shadow top
   * @default true
   */
  hasShadowTop?: boolean;
  /**
   * Wheter to show shador right
   * @default false
   */
  hasShadowRight?: boolean;
  /**
   * Whether to show shadow bottom
   * @default true
   */
  hasShadowBottom?: boolean;
  /**
   * Whether to show shadow left
   * @default false
   */
  hasShadowLeft?: boolean;
  class?: any;
  pohon?: Scrollbar['slots'];
}

export interface PScrollbarEmits {
  scrollAt: [{ bottom: boolean; left: boolean; right: boolean; top: boolean }];
}
</script>

<script lang="ts" setup>
import { computed, ref, useAppConfig } from '#imports';
import { uv } from '../utils/uv';
import PScrollbarArea from './scrollbar-area.vue';
import PScrollbarBar from './scrollbar-bar.vue';

const props = withDefaults(
  defineProps<PScrollbarProps>(),
  {
    horizontal: false,
    hasShadow: false,
    hasShadowBorder: false,
    hasShadowBottom: true,
    hasShadowLeft: false,
    hasShadowRight: false,
    hasShadowTop: true,
  },
);

const emits = defineEmits<PScrollbarEmits>();

const isAtTop = ref(true);
const isAtRight = ref(false);
const isAtBottom = ref(false);
const isAtLeft = ref(true);

/**
 * We have to check if the scroll amount is close enough to some threshold in order to
 * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
 * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;

const showShadowTop = computed(() => props.hasShadow && props.hasShadowTop);
const showShadowBottom = computed(() => props.hasShadow && props.hasShadowBottom);
const showShadowLeft = computed(() => props.hasShadow && props.hasShadowLeft);
const showShadowRight = computed(() => props.hasShadow && props.hasShadowRight);

const computedShadowClasses = computed(() => {
  return {
    'both-shadow':
      !isAtLeft.value
      && !isAtRight.value
      && showShadowLeft.value
      && showShadowRight.value,
    'left-shadow': !isAtLeft.value && showShadowLeft.value,
    'right-shadow': !isAtRight.value && showShadowRight.value,
  };
});

function handleScroll(event: Event) {
  const target = event.target as HTMLElement;
  const scrollTop = target?.scrollTop ?? 0;
  const scrollLeft = target?.scrollLeft ?? 0;
  const clientHeight = target?.clientHeight ?? 0;
  const clientWidth = target?.clientWidth ?? 0;
  const scrollHeight = target?.scrollHeight ?? 0;
  const scrollWidth = target?.scrollWidth ?? 0;
  isAtTop.value = scrollTop <= 0;
  isAtLeft.value = scrollLeft <= 0;
  isAtBottom.value = Math.abs(scrollTop) + clientHeight
    >= scrollHeight - ARRIVED_STATE_THRESHOLD_PIXELS;
  isAtRight.value = Math.abs(scrollLeft) + clientWidth
    >= scrollWidth - ARRIVED_STATE_THRESHOLD_PIXELS;

  emits('scrollAt', {
    bottom: isAtBottom.value,
    left: isAtLeft.value,
    right: isAtRight.value,
    top: isAtTop.value,
  });
}

const appConfig = useAppConfig() as Scrollbar['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.scrollbar || {}),
  })({
    shadowTopBorder: props.hasShadowBorder && !isAtTop.value,
    shadowBottomBorder: props.hasShadowBorder && !isAtTop.value && !isAtBottom.value,
    shadowTopScrolling: !isAtTop.value,
    shadowBottomScrolling: !isAtTop.value && !isAtBottom.value,
  }),
);
</script>

<template>
  <PScrollbarArea
    :on-scroll="handleScroll"
    :class="[
      pohon.root({ class: [props.class, props.pohon?.root] }),
      computedShadowClasses,
    ]"
  >
    <div
      v-if="showShadowTop"
      :class="pohon.shadowTop({ class: props.pohon?.shadowTop })"
    />

    <slot />

    <div
      v-if="showShadowBottom"
      :class="pohon.shadowBottom({ class: props.pohon?.shadowBottom })"
    />

    <PScrollbarBar
      v-if="horizontal"
      orientation="horizontal"
    />
  </PScrollbarArea>
</template>
