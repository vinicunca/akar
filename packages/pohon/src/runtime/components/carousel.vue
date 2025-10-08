<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import type { AutoHeightOptionsType } from 'embla-carousel-auto-height';
import type { AutoScrollOptionsType } from 'embla-carousel-auto-scroll';
import type { AutoplayOptionsType } from 'embla-carousel-autoplay';
import type { ClassNamesOptionsType } from 'embla-carousel-class-names';
import type { FadeOptionsType } from 'embla-carousel-fade';
import type { WheelGesturesPluginOptions } from 'embla-carousel-wheel-gestures';
import type { IconProps, PButtonProps } from '../types';
import type { AcceptableValue } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/carousel';

type Carousel = ComponentConfig<typeof theme, AppConfig, 'carousel'>;

export type PCarouselValue = AcceptableValue;
export type PCarouselItem = PCarouselValue | {
  class?: any;
  pohon?: Pick<Carousel['slots'], 'item'>;
  [key: string]: any;
};

export interface PCarouselProps<T extends PCarouselItem = PCarouselItem> extends Omit<EmblaOptionsType, 'axis' | 'container' | 'slides' | 'direction'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * Configure the prev button when arrows are enabled.
   * @defaultValue { size: 'md', color: 'neutral', variant: 'link' }
   */
  prev?: PButtonProps;
  /**
   * The icon displayed in the prev button.
   * @defaultValue appConfig.pohon.icons.arrowLeft
   * @IconifyIcon
   */
  prevIcon?: IconProps['name'];
  /**
   * Configure the next button when arrows are enabled.
   * @defaultValue { size: 'md', color: 'neutral', variant: 'link' }
   */
  next?: PButtonProps;
  /**
   * The icon displayed in the next button.
   * @defaultValue appConfig.pohon.icons.arrowRight
   * @IconifyIcon
   */
  nextIcon?: IconProps['name'];
  /**
   * Display prev and next buttons to scroll the carousel.
   * @defaultValue false
   */
  arrows?: boolean;
  /**
   * Display dots to scroll to a specific slide.
   * @defaultValue false
   */
  dots?: boolean;
  /**
   * The orientation of the carousel.
   * @defaultValue 'horizontal'
   */
  orientation?: Carousel['variants']['orientation'];
  items?: Array<T>;
  /**
   * Enable Autoplay plugin
   * @see https://www.embla-carousel.com/plugins/autoplay/
   */
  autoplay?: boolean | AutoplayOptionsType;
  /**
   * Enable Auto Scroll plugin
   * @see https://www.embla-carousel.com/plugins/auto-scroll/
   */
  autoScroll?: boolean | AutoScrollOptionsType;
  /**
   * Enable Auto Height plugin
   * @see https://www.embla-carousel.com/plugins/auto-height/
   */
  autoHeight?: boolean | AutoHeightOptionsType;
  /**
   * Enable Class Names plugin
   * @see https://www.embla-carousel.com/plugins/class-names/
   */
  classNames?: boolean | ClassNamesOptionsType;
  /**
   * Enable Fade plugin
   * @see https://www.embla-carousel.com/plugins/fade/
   */
  fade?: boolean | FadeOptionsType;
  /**
   * Enable Wheel Gestures plugin
   * @see https://www.embla-carousel.com/plugins/wheel-gestures/
   */
  wheelGestures?: boolean | WheelGesturesPluginOptions;
  class?: any;
  pohon?: Carousel['slots'];
}

export type PCarouselSlots<T extends PCarouselItem = PCarouselItem> = {
  default: (props: { item: T; index: number }) => any;
};

export interface PCarouselEmits {
  /**
   * Emitted when the selected slide changes
   * @param selectedIndex The index of the selected slide
   */
  select: [selectedIndex: number];
}
</script>

<script setup lang="ts" generic="T extends PCarouselItem">
import { useAppConfig } from '#imports';
import { isBoolean, KEY_CODES } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { APrimitive, useForwardProps } from 'akar';
import useEmblaCarousel from 'embla-carousel-vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(
  defineProps<PCarouselProps<T>>(),
  {
    orientation: 'horizontal',
    arrows: false,
    dots: false,
    // Embla Options
    active: true,
    align: 'center',
    breakpoints: () => ({}),
    containScroll: 'trimSnaps',
    dragFree: false,
    dragThreshold: 10,
    duration: 25,
    inViewThreshold: 0,
    loop: false,
    skipSnaps: false,
    slidesToScroll: 1,
    startIndex: 0,
    watchDrag: true,
    watchResize: true,
    watchSlides: true,
    watchFocus: true,
    // Embla Plugins
    autoplay: false,
    autoScroll: false,
    autoHeight: false,
    classNames: false,
    fade: false,
    wheelGestures: false,
  },
);
const emits = defineEmits<PCarouselEmits>();
defineSlots<PCarouselSlots<T>>();
const { dir, t } = useLocale();
const appConfig = useAppConfig() as Carousel['AppConfig'];

const rootProps = useForwardProps(
  reactivePick(
    props,
    'active',
    'align',
    'breakpoints',
    'containScroll',
    'dragFree',
    'dragThreshold',
    'duration',
    'inViewThreshold',
    'loop',
    'skipSnaps',
    'slidesToScroll',
    'startIndex',
    'watchDrag',
    'watchResize',
    'watchSlides',
    'watchFocus',
  ),
);

const prevIcon = computed(() =>
  props.prevIcon || (dir.value === 'rtl'
    ? appConfig.pohon.icons.arrowRight
    : appConfig.pohon.icons.arrowLeft),
);
const nextIcon = computed(() =>
  props.nextIcon || (dir.value === 'rtl'
    ? appConfig.pohon.icons.arrowLeft
    : appConfig.pohon.icons.arrowRight),
);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.carousel || {}) })({
  orientation: props.orientation,
}));

const options = computed<EmblaOptionsType>(() => ({
  ...(props.fade ? { align: 'center', containScroll: false } : {}),
  ...rootProps.value,
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
  direction: dir.value === 'rtl' ? 'rtl' : 'ltr',
}));

const plugins = ref<Array<EmblaPluginType>>([]);

async function loadPlugins() {
  const emblaPlugins: Array<EmblaPluginType> = [];

  if (props.autoplay) {
    const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default);
    emblaPlugins.push(AutoplayPlugin(isBoolean(props.autoplay) ? {} : props.autoplay));
  }

  if (props.autoScroll) {
    const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default);
    emblaPlugins.push(AutoScrollPlugin(isBoolean(props.autoScroll) ? {} : props.autoScroll));
  }

  if (props.autoHeight) {
    const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default);
    emblaPlugins.push(AutoHeightPlugin(isBoolean(props.autoHeight) ? {} : props.autoHeight));
  }

  if (props.classNames) {
    const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default);
    emblaPlugins.push(ClassNamesPlugin(isBoolean(props.classNames) ? {} : props.classNames));
  }

  if (props.fade) {
    const FadePlugin = await import('embla-carousel-fade').then((r) => r.default);
    emblaPlugins.push(FadePlugin(isBoolean(props.fade) ? {} : props.fade));
  }

  if (props.wheelGestures) {
    const { WheelGesturesPlugin } = await import('embla-carousel-wheel-gestures');
    emblaPlugins.push(WheelGesturesPlugin(isBoolean(props.wheelGestures) ? {} : props.wheelGestures));
  }

  plugins.value = emblaPlugins;
}

watch(
  () => [
    props.autoplay,
    props.autoScroll,
    props.autoHeight,
    props.classNames,
    props.fade,
    props.wheelGestures,
  ],
  async () => {
    await loadPlugins();
    emblaApi.value?.reInit(options.value, plugins.value);
  },
  { immediate: true },
);

const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

watch(
  options,
  () => {
    emblaApi.value?.reInit(options.value, plugins.value);
  },
  { flush: 'post' },
);

function scrollPrev() {
  emblaApi.value?.scrollPrev();
}
function scrollNext() {
  emblaApi.value?.scrollNext();
}
function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index);
}

function onKeyDown(event: KeyboardEvent) {
  let prevKey;
  let nextKey;
  if (props.orientation === 'horizontal') {
    prevKey = dir.value === 'ltr' ? KEY_CODES.ARROW_LEFT : KEY_CODES.ARROW_RIGHT;
    nextKey = dir.value === 'ltr' ? KEY_CODES.ARROW_RIGHT : KEY_CODES.ARROW_LEFT;
  } else {
    prevKey = 'ArrowUp';
    nextKey = 'ArrowDown';
  }

  if (event.key === prevKey) {
    event.preventDefault();
    scrollPrev();

    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}

const canScrollNext = ref(false);
const canScrollPrev = ref(false);
const selectedIndex = ref<number>(0);
const scrollSnaps = ref<Array<number>>([]);

function onInit(api: EmblaCarouselType) {
  scrollSnaps.value = api?.scrollSnapList() || [];
}

function onSelect(api: EmblaCarouselType) {
  canScrollNext.value = api?.canScrollNext() || false;
  canScrollPrev.value = api?.canScrollPrev() || false;
  selectedIndex.value = api?.selectedScrollSnap() || 0;

  emits('select', selectedIndex.value);
}

function isCarouselItem(item: PCarouselItem): item is Exclude<PCarouselItem, PCarouselValue> {
  return typeof item === 'object' && item !== null;
}

onMounted(() => {
  if (!emblaApi.value) {
    return;
  }

  emblaApi.value.on('init', onInit);
  emblaApi.value.on('init', onSelect);
  emblaApi.value.on('reInit', onInit);
  emblaApi.value.on('reInit', onSelect);
  emblaApi.value.on('select', onSelect);
});

onBeforeUnmount(() => {
  if (!emblaApi.value) {
    return;
  }

  emblaApi.value.off('init', onInit);
  emblaApi.value.off('init', onSelect);
  emblaApi.value.off('reInit', onInit);
  emblaApi.value.off('reInit', onSelect);
  emblaApi.value.off('select', onSelect);
});

defineExpose({
  emblaRef,
  emblaApi,
});
</script>

<template>
  <APrimitive
    :as="as"
    role="region"
    aria-roledescription="carousel"
    :data-orientation="orientation"
    tabindex="0"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    @keydown="onKeyDown"
  >
    <div
      ref="emblaRef"
      :class="pohon.viewport({ class: props.pohon?.viewport })"
    >
      <div :class="pohon.container({ class: props.pohon?.container })">
        <div
          v-for="(item, index) in items"
          :key="index"
          v-bind="dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }"
          :class="pohon.item({ class: [props.pohon?.item, isCarouselItem(item) && item.pohon?.item, isCarouselItem(item) && item.class] })"
        >
          <slot
            :item="item"
            :index="index"
          />
        </div>
      </div>
    </div>

    <div
      v-if="arrows || dots"
      :class="pohon.controls({ class: props.pohon?.controls })"
    >
      <div
        v-if="arrows"
        :class="pohon.arrows({ class: props.pohon?.arrows })"
      >
        <PButton
          :disabled="!canScrollPrev"
          :icon="prevIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.prev')"
          v-bind="typeof prev === 'object' ? prev : undefined"
          :class="pohon.prev({ class: props.pohon?.prev })"
          @click="scrollPrev"
        />
        <PButton
          :disabled="!canScrollNext"
          :icon="nextIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.next')"
          v-bind="typeof next === 'object' ? next : undefined"
          :class="pohon.next({ class: props.pohon?.next })"
          @click="scrollNext"
        />
      </div>

      <div
        v-if="dots"
        role="tablist"
        :aria-label="t('carousel.dots')"
        :class="pohon.dots({ class: props.pohon?.dots })"
      >
        <template
          v-for="(_, index) in scrollSnaps"
          :key="index"
        >
          <button
            type="button"
            role="tab"
            :aria-label="t('carousel.goto', { slide: index + 1 })"
            :aria-selected="selectedIndex === index"
            :class="pohon.dot({ class: props.pohon?.dot, active: selectedIndex === index })"
            :data-state="selectedIndex === index ? 'active' : undefined"
            @click="scrollTo(index)"
          />
        </template>
      </div>
    </div>
  </APrimitive>
</template>
