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
import type { VNode } from 'vue';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { AcceptableValue } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/carousel';

type Carousel = ComponentConfig<typeof theme, AppConfig, 'carousel'>;

export type CarouselValue = AcceptableValue;
export type CarouselItem = CarouselValue | {
  class?: any;
  pohon?: Pick<Carousel['slots'], 'item'>;
  [key: string]: any;
};

export interface CarouselProps<T extends CarouselItem = CarouselItem> extends Omit<EmblaOptionsType, 'axis' | 'container' | 'slides' | 'direction'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * Configure the prev button when arrows are enabled.
   * @defaultValue { size: 'md', color: 'neutral', variant: 'link' }
   */
  prev?: Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the prev button.
   * @defaultValue appConfig.pohon.icons.arrowLeft
   * @IconifyIcon
   */
  prevIcon?: PIconProps['name'];
  /**
   * Configure the next button when arrows are enabled.
   * @defaultValue { size: 'md', color: 'neutral', variant: 'link' }
   */
  next?: Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the next button.
   * @defaultValue appConfig.pohon.icons.arrowRight
   * @IconifyIcon
   */
  nextIcon?: PIconProps['name'];
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

export type CarouselSlots<T extends CarouselItem = CarouselItem> = {
  default?: (props: { item: T; index: number }) => Array<VNode>;
};

export interface CarouselEmits {
  /**
   * Emitted when the selected slide changes
   * @param selectedIndex The index of the selected slide
   */
  select: [selectedIndex: number];
}
</script>

<script setup lang="ts" generic="T extends CarouselItem">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { Primitive, useForwardProps } from 'akar';
import useEmblaCarousel from 'embla-carousel-vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(defineProps<CarouselProps<T>>(), {
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
});
const emits = defineEmits<CarouselEmits>();
defineSlots<CarouselSlots<T>>();
const { dir, t } = useLocale();
const appConfig = useAppConfig() as Carousel['AppConfig'];
const pohonProp = useComponentPohon('carousel', props);

const rootProps = useForwardProps(reactivePick(props, 'active', 'align', 'breakpoints', 'containScroll', 'dragFree', 'dragThreshold', 'duration', 'inViewThreshold', 'loop', 'skipSnaps', 'slidesToScroll', 'startIndex', 'watchDrag', 'watchResize', 'watchSlides', 'watchFocus'));

const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.arrowRight : appConfig.pohon.icons.arrowLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.arrowLeft : appConfig.pohon.icons.arrowRight));

const stopAutoplayOnInteraction = computed(() => {
  if (typeof props.autoplay === 'boolean') {
    return true;
  }

  return props.autoplay.stopOnInteraction ?? true;
});

const stopAutoScrollOnInteraction = computed(() => {
  if (typeof props.autoScroll === 'boolean') {
    return true;
  }

  return props.autoScroll.stopOnInteraction ?? true;
});

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
    emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === 'boolean' ? {} : props.autoplay));
  }

  if (props.autoScroll) {
    const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default);
    emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === 'boolean' ? {} : props.autoScroll));
  }

  if (props.autoHeight) {
    const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default);
    emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === 'boolean' ? {} : props.autoHeight));
  }

  if (props.classNames) {
    const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default);
    emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === 'boolean' ? {} : props.classNames));
  }

  if (props.fade) {
    const FadePlugin = await import('embla-carousel-fade').then((r) => r.default);
    emblaPlugins.push(FadePlugin(typeof props.fade === 'boolean' ? {} : props.fade));
  }

  if (props.wheelGestures) {
    const { WheelGesturesPlugin } = await import('embla-carousel-wheel-gestures');
    emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === 'boolean' ? {} : props.wheelGestures));
  }

  plugins.value = emblaPlugins;
}

watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], async () => {
  await loadPlugins();
  emblaApi.value?.reInit(options.value, plugins.value);
}, { immediate: true });

const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

watch(options, () => {
  emblaApi.value?.reInit(options.value, plugins.value);
}, { flush: 'post' });

function stopOnInteraction() {
  if (stopAutoplayOnInteraction.value) {
    emblaApi.value?.plugins().autoplay?.stop();
  }

  if (stopAutoScrollOnInteraction.value) {
    emblaApi.value?.plugins().autoScroll?.stop();
  }
}

function scrollPrev() {
  emblaApi.value?.scrollPrev();
  stopOnInteraction();
}

function scrollNext() {
  emblaApi.value?.scrollNext();
  stopOnInteraction();
}

function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index);
}

function onKeyDown(event: KeyboardEvent) {
  let prevKey;
  let nextKey;
  if (props.orientation === 'horizontal') {
    prevKey = dir.value === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
    nextKey = dir.value === 'ltr' ? 'ArrowRight' : 'ArrowLeft';
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

function isCarouselItem(item: CarouselItem): item is Exclude<CarouselItem, CarouselValue> {
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
  <Primitive
    :as="as"
    role="region"
    aria-roledescription="carousel"
    :data-orientation="orientation"
    tabindex="0"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @keydown="onKeyDown"
  >
    <div
      ref="emblaRef"
      data-slot="viewport"
      :class="pohon.viewport({ class: pohonProp?.viewport })"
    >
      <div
        data-slot="container"
        :class="pohon.container({ class: pohonProp?.container })"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          v-bind="dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }"
          data-slot="item"
          :class="pohon.item({ class: [pohonProp?.item, isCarouselItem(item) && item.pohon?.item, isCarouselItem(item) && item.class] })"
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
      data-slot="controls"
      :class="pohon.controls({ class: pohonProp?.controls })"
    >
      <div
        v-if="arrows"
        data-slot="arrows"
        :class="pohon.arrows({ class: pohonProp?.arrows })"
      >
        <PButton
          :disabled="!canScrollPrev"
          :icon="prevIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.prev')"
          v-bind="typeof prev === 'object' ? prev : undefined"
          data-slot="prev"
          :class="pohon.prev({ class: pohonProp?.prev })"
          @click="scrollPrev"
        />
        <PButton
          :disabled="!canScrollNext"
          :icon="nextIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.next')"
          v-bind="typeof next === 'object' ? next : undefined"
          data-slot="next"
          :class="pohon.next({ class: pohonProp?.next })"
          @click="scrollNext"
        />
      </div>

      <div
        v-if="dots"
        role="tablist"
        :aria-label="t('carousel.dots')"
        data-slot="dots"
        :class="pohon.dots({ class: pohonProp?.dots })"
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
            data-slot="dot"
            :class="pohon.dot({ class: pohonProp?.dot, active: selectedIndex === index })"
            :data-state="selectedIndex === index ? 'active' : undefined"
            @click="scrollTo(index)"
          />
        </template>
      </div>
    </div>
  </Primitive>
</template>
