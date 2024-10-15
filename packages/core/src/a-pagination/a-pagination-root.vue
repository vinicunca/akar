<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

type APaginationRootContext = {
  disabled: Ref<boolean>;
  onPageChange: (value: number) => void;
  page: Ref<number>;
  pageCount: Ref<number>;
  showEdges: Ref<boolean>;
  siblingCount: Ref<number>;
};

export interface APaginationRootProps extends APrimitiveProps {
  /**
   * The value of the page that should be active when initially rendered.
   *
   * Use when you do not need to control the value state.
   */
  defaultPage?: number;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
  /** Number of items per page */
  itemsPerPage: number;
  /** The controlled value of the current page. Can be binded as `v-model:page`. */
  page?: number;
  /** When `true`, always show first page, last page, and ellipsis */
  showEdges?: boolean;
  /** Number of sibling should be shown around the current page */
  siblingCount?: number;
  /** Number of items in your list */
  total?: number;
}

export type APaginationRootEmits = {
  /** Event handler called when the page value changes */
  'update:page': [value: number];
};

export const [
  injectAPaginationRootContext,
  provideAPaginationRootContext,
] = createContext<APaginationRootContext>('APaginationRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<APaginationRootProps>(),
  {
    as: 'nav',
    total: 0,
    siblingCount: 2,
    defaultPage: 1,
    showEdges: false,
  },
);

const emits = defineEmits<APaginationRootEmits>();

defineSlots<{
  default: (props: {
    /** Current page state */
    page: typeof page.value;
    /** Number of pages */
    pageCount: typeof pageCount.value;
  }) => any;
}>();

const { siblingCount, disabled, showEdges } = toRefs(props);

useForwardExpose();

const page = useVModel(
  props,
  'page',
  emits,
  {
    defaultValue: props.defaultPage,
    passive: (props.page === undefined) as false,
  },
) as Ref<number>;

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))),
);

provideAPaginationRootContext({
  page,
  onPageChange(value) {
    page.value = value;
  },
  pageCount,
  siblingCount,
  disabled,
  showEdges,
});
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
  >
    <slot
      :page="page"
      :page-count="pageCount"
    />
  </APrimitive>
</template>
