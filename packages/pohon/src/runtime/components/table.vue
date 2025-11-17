<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { Cell, Header, RowData, TableMeta } from '@tanstack/table-core';
import type {
  CellContext,
  ColumnDef,
  ColumnFiltersOptions,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningOptions,
  ColumnPinningState,
  ColumnSizingInfoState,
  ColumnSizingOptions,
  ColumnSizingState,
  CoreOptions,
  ExpandedOptions,
  ExpandedState,
  FacetedOptions,
  GlobalFilterOptions,
  GroupingOptions,
  GroupingState,
  HeaderContext,
  PaginationOptions,
  PaginationState,
  Row,
  RowPinningOptions,
  RowPinningState,
  RowSelectionOptions,
  RowSelectionState,
  SortingOptions,
  SortingState,
  Updater,
  VisibilityOptions,
  VisibilityState,
} from '@tanstack/vue-table';
import type { VirtualizerOptions } from '@tanstack/vue-virtual';
import type { ComponentPublicInstance, Ref, WatchOptions } from 'vue';
import type { TableHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/table';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    class?: {
      th?: string | ((cell: Header<TData, TValue>) => string);
      td?: string | ((cell: Cell<TData, TValue>) => string);
    };
    style?: {
      th?: string | Record<string, string> | ((cell: Header<TData, TValue>) => string | Record<string, string>);
      td?: string | Record<string, string> | ((cell: Cell<TData, TValue>) => string | Record<string, string>);
    };
    colspan?: {
      td?: string | ((cell: Cell<TData, TValue>) => string);
    };
    rowspan?: {
      td?: string | ((cell: Cell<TData, TValue>) => string);
    };

  }

  interface TableMeta<TData> {
    class?: {
      tr?: string | ((row: Row<TData>) => string);
    };
    style?: {
      tr?: string | Record<string, string> | ((row: Row<TData>) => string | Record<string, string>);
    };
  }

}

type Table = ComponentConfig<typeof theme, AppConfig, 'table'>;

export type PTableRow<T> = Row<T>;
export type PTableData = RowData;
export type PTableColumn<T extends PTableData, D = unknown> = ColumnDef<T, D>;

export interface PTableOptions<T extends PTableData = PTableData> extends Omit<CoreOptions<T>, 'data' | 'columns' | 'getCoreRowModel' | 'state' | 'onStateChange' | 'renderFallbackValue'> {
  state?: CoreOptions<T>['state'];
  onStateChange?: CoreOptions<T>['onStateChange'];
  renderFallbackValue?: CoreOptions<T>['renderFallbackValue'];
}

export interface PTableProps<T extends PTableData = PTableData> extends PTableOptions<T>, /** @vue-ignore */ TableHTMLAttributes {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  data?: Array<T>;
  columns?: Array<PTableColumn<T>>;
  caption?: string;
  meta?: TableMeta<T>;
  /**
   * Enable virtualization for large datasets.
   * Note: when enabled, the divider between rows and sticky properties are not supported.
   * @defaultValue false
   */
  virtualize?: boolean | (Partial<Omit<VirtualizerOptions<Element, Element>, 'getScrollElement' | 'count' | 'estimateSize' | 'overscan'>> & {
    /**
     * Number of items rendered outside the visible area
     * @defaultValue 12
     */
    overscan?: number;
    /**
     * Estimated size (in px) of each item, or a function that returns the size for a given index
     * @defaultValue 65
     */
    estimateSize?: number | ((index: number) => number);
  });
  /**
   * The text to display when the table is empty.
   * @defaultValue t('table.noData')
   */
  empty?: string;
  /**
   * Whether the table should have a sticky header or footer. True for both, 'header' for header only, 'footer' for footer only.
   * Note: this prop is not supported when `virtualize` is true.
   * @defaultValue false
   */
  sticky?: boolean | 'header' | 'footer';
  /** Whether the table should be in loading state. */
  loading?: boolean;
  /**
   * @defaultValue 'primary'
   */
  loadingColor?: Table['variants']['loadingColor'];
  /**
   * @defaultValue 'carousel'
   */
  loadingAnimation?: Table['variants']['loadingAnimation'];
  /**
   * Use the `watchOptions` prop to customize reactivity (for ex: disable deep watching for changes in your data or limiting the max traversal depth). This can improve performance by reducing unnecessary re-renders, but it should be used with caution as it may lead to unexpected behavior if not managed properly.
   * @see [API](https://vuejs.org/api/options-state.html#watch)
   * @see [Guide](https://vuejs.org/guide/essentials/watchers.html)
   * @defaultValue { deep: true }
   */
  watchOptions?: WatchOptions;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/global-filtering#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/global-filtering)
   */
  globalFilterOptions?: Omit<GlobalFilterOptions<T>, 'onGlobalFilterChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/column-filtering#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  columnFiltersOptions?: Omit<ColumnFiltersOptions<T>, 'getFilteredRowModel' | 'onColumnFiltersChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/column-pinning#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/column-pinning)
   */
  columnPinningOptions?: Omit<ColumnPinningOptions, 'onColumnPinningChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/column-sizing#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/column-sizing)
   */
  columnSizingOptions?: Omit<ColumnSizingOptions, 'onColumnSizingChange' | 'onColumnSizingInfoChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/column-visibility#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  visibilityOptions?: Omit<VisibilityOptions, 'onColumnVisibilityChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/sorting#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/sorting)
   */
  sortingOptions?: Omit<SortingOptions<T>, 'getSortedRowModel' | 'onSortingChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/grouping#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/grouping)
   */
  groupingOptions?: Omit<GroupingOptions, 'onGroupingChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/expanding#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/expanding)
   */
  expandedOptions?: Omit<ExpandedOptions<T>, 'getExpandedRowModel' | 'onExpandedChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/row-selection#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/row-selection)
   */
  rowSelectionOptions?: Omit<RowSelectionOptions<T>, 'onRowSelectionChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/row-pinning#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/row-pinning)
   */
  rowPinningOptions?: Omit<RowPinningOptions<T>, 'onRowPinningChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/pagination#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/pagination)
   */
  paginationOptions?: Omit<PaginationOptions, 'onPaginationChange'>;
  /**
   * @see [API](https://tanstack.com/table/v8/docs/api/features/column-faceting#table-options)
   * @see [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  facetedOptions?: FacetedOptions<T>;
  onSelect?: (event: Event, row: PTableRow<T>) => void;
  onHover?: (event: Event, row: PTableRow<T> | null) => void;
  onContextmenu?: ((event: Event, row: PTableRow<T>) => void) | Array<((event: Event, row: PTableRow<T>) => void)>;
  class?: any;
  pohon?: Table['slots'];
}

type DynamicHeaderSlots<T, K = keyof T> = Record<string, (props: HeaderContext<T, unknown>) => any> & Record<`${K extends string ? K : never}-header`, (props: HeaderContext<T, unknown>) => any>;
type DynamicFooterSlots<T, K = keyof T> = Record<string, (props: HeaderContext<T, unknown>) => any> & Record<`${K extends string ? K : never}-footer`, (props: HeaderContext<T, unknown>) => any>;
type DynamicCellSlots<T, K = keyof T> = Record<string, (props: CellContext<T, unknown>) => any> & Record<`${K extends string ? K : never}-cell`, (props: CellContext<T, unknown>) => any>;

export type PTableSlots<T extends PTableData = PTableData> = {
  'expanded': (props: { row: Row<T> }) => any;
  'empty': (props?: object) => any;
  'loading': (props?: object) => any;
  'caption': (props?: object) => any;
  'body-top': (props?: object) => any;
  'body-bottom': (props?: object) => any;
} & DynamicHeaderSlots<T> & DynamicFooterSlots<T> & DynamicCellSlots<T>;
</script>

<script setup lang="ts" generic="T extends PTableData">
import { useAppConfig } from '#imports';
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { isBoolean, isFunction, toSentenceCase } from '@vinicunca/perkakas';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { APrimitive } from 'akar';
import { defu } from 'defu';
import { computed, ref, toRef, useTemplateRef, watch } from 'vue';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PTableProps<T>>(),
  {
    watchOptions: () => ({
      deep: true,
    }),
    virtualize: false,
  },
);
const slots = defineSlots<PTableSlots<T>>();

const { t } = useLocale();
const appConfig = useAppConfig() as Table['AppConfig'];

const data = ref(props.data ?? []) as Ref<Array<T>>;
const meta = computed(() => props.meta ?? {});

const columns = computed<Array<PTableColumn<T>>>(() =>
  processColumns(props.columns ?? Object.keys(data.value[0] ?? {})
    .map((accessorKey: string) => ({
      accessorKey,
      header: toSentenceCase(accessorKey),
    }))),
);

function processColumns(columns: Array<PTableColumn<T>>): Array<PTableColumn<T>> {
  return columns.map((column) => {
    const col = { ...column } as PTableColumn<T>;

    if ('columns' in col && col.columns) {
      col.columns = processColumns(col.columns as Array<PTableColumn<T>>);
    }

    if (!col.cell) {
      col.cell = ({ getValue }) => {
        const value = getValue();
        if (value === '' || value === null || value === undefined) {
          return '\u00A0';
        }
        return String(value);
      };
    }

    return col;
  });
}

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.table || {}),
  })({
    sticky: props.virtualize ? false : props.sticky,
    loading: props.loading,
    loadingColor: props.loadingColor,
    loadingAnimation: props.loadingAnimation,
    virtualize: !!props.virtualize,
  }),
);

const [DefineTableTemplate, ReuseTableTemplate] = createReusableTemplate();
const [DefineRowTemplate, ReuseRowTemplate] = createReusableTemplate<{
  row: PTableRow<T>;
  style?: Record<string, string>;
}>({
  props: {
    row: {
      type: Object,
      required: true,
    },
    style: {
      type: Object,
      required: false,
    },
  },
});

const hasFooter = computed(() => {
  function hasFooterRecursive(columns: Array<PTableColumn<T>>): boolean {
    for (const column of columns) {
      if ('footer' in column) {
        return true;
      }
      if ('columns' in column && hasFooterRecursive(column.columns as Array<PTableColumn<T>>)) {
        return true;
      }
    }
    return false;
  }

  return hasFooterRecursive(columns.value);
});

const globalFilterState = defineModel<string>('globalFilter', { default: undefined });
const columnFiltersState = defineModel<ColumnFiltersState>('columnFilters', { default: [] });
const columnOrderState = defineModel<ColumnOrderState>('columnOrder', { default: [] });
const columnVisibilityState = defineModel<VisibilityState>('columnVisibility', { default: {} });
const columnPinningState = defineModel<ColumnPinningState>('columnPinning', { default: {} });
const columnSizingState = defineModel<ColumnSizingState>('columnSizing', { default: {} });
const columnSizingInfoState = defineModel<ColumnSizingInfoState>('columnSizingInfo', { default: {} });
const rowSelectionState = defineModel<RowSelectionState>('rowSelection', { default: {} });
const rowPinningState = defineModel<RowPinningState>('rowPinning', { default: {} });
const sortingState = defineModel<SortingState>('sorting', { default: [] });
const groupingState = defineModel<GroupingState>('grouping', { default: [] });
const expandedState = defineModel<ExpandedState>('expanded', { default: {} });
const paginationState = defineModel<PaginationState>('pagination', { default: {} });

const rootRef = useTemplateRef<ComponentPublicInstance>('rootRef');
const tableRef = useTemplateRef<HTMLTableElement>('tableRef');

const tableApi = useVueTable({
  ...reactiveOmit(
    props,
    'as',
    'data',
    'columns',
    'virtualize',
    'caption',
    'sticky',
    'loading',
    'loadingColor',
    'loadingAnimation',
    'class',
    'pohon',
  ),
  data,
  get columns() {
    return columns.value;
  },
  meta: meta.value,
  getCoreRowModel: getCoreRowModel(),
  ...(props.globalFilterOptions || {}),
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilterState),
  ...(props.columnFiltersOptions || {}),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFiltersState),
  onColumnOrderChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnOrderState),
  ...(props.visibilityOptions || {}),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibilityState),
  ...(props.columnPinningOptions || {}),
  onColumnPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnPinningState),
  ...(props.columnSizingOptions || {}),
  onColumnSizingChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingState),
  onColumnSizingInfoChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingInfoState),
  ...(props.rowSelectionOptions || {}),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelectionState),
  ...(props.rowPinningOptions || {}),
  onRowPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowPinningState),
  ...(props.sortingOptions || {}),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sortingState),
  ...(props.groupingOptions || {}),
  onGroupingChange: (updaterOrValue) => valueUpdater(updaterOrValue, groupingState),
  ...(props.expandedOptions || {}),
  getExpandedRowModel: getExpandedRowModel(),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expandedState),
  ...(props.paginationOptions || {}),
  onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, paginationState),
  ...(props.facetedOptions || {}),
  state: {
    get globalFilter() {
      return globalFilterState.value;
    },
    get columnFilters() {
      return columnFiltersState.value;
    },
    get columnOrder() {
      return columnOrderState.value;
    },
    get columnVisibility() {
      return columnVisibilityState.value;
    },
    get columnPinning() {
      return columnPinningState.value;
    },
    get expanded() {
      return expandedState.value;
    },
    get rowSelection() {
      return rowSelectionState.value;
    },
    get sorting() {
      return sortingState.value;
    },
    get grouping() {
      return groupingState.value;
    },
    get rowPinning() {
      return rowPinningState.value;
    },
    get columnSizing() {
      return columnSizingState.value;
    },
    get columnSizingInfo() {
      return columnSizingInfoState.value;
    },
    get pagination() {
      return paginationState.value;
    },
  },
});

const rows = computed(() => tableApi.getRowModel().rows);

const virtualizerProps = toRef(() =>
  defu(
    isBoolean(props.virtualize) ? {} : props.virtualize,
    {
      estimateSize: 65,
      overscan: 12,
    },
  ));

const virtualizer = !!props.virtualize && useVirtualizer({
  ...virtualizerProps.value,
  get count() {
    return rows.value.length;
  },
  getScrollElement: () => rootRef.value?.$el,
  estimateSize: (index: number) => {
    const estimate = virtualizerProps.value.estimateSize;

    return isFunction(estimate) ? estimate(index) : estimate;
  },
});

const renderedSize = computed(() => {
  if (!virtualizer) {
    return 0;
  }

  const virtualItems = virtualizer.value.getVirtualItems();
  if (!virtualItems?.length) {
    return 0;
  }

  // Sum up the actual sizes of virtual items
  return virtualItems.reduce((sum: number, item: any) => sum + item.size, 0);
});

function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = isFunction(updaterOrValue) ? updaterOrValue(ref.value) : updaterOrValue;
}

function onRowSelect(event: Event, row: PTableRow<T>) {
  if (!props.onSelect) {
    return;
  }
  const target = event.target as HTMLElement;
  const isInteractive = target.closest('button') || target.closest('a');
  if (isInteractive) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  props.onSelect(event, row);
}

function onRowHover(event: Event, row: PTableRow<T> | null) {
  if (!props.onHover) {
    return;
  }

  props.onHover(event, row);
}

function onRowContextmenu(event: Event, row: PTableRow<T>) {
  if (!props.onContextmenu) {
    return;
  }

  if (Array.isArray(props.onContextmenu)) {
    props.onContextmenu.forEach((fn) => {
      fn(event, row);
    });
  } else {
    props.onContextmenu(event, row);
  }
}

function resolveValue<T, A = undefined>(prop: T | ((arg: A) => T), arg?: A): T | undefined {
  if (isFunction(prop)) {
    // @ts-expect-error: TS can't know if prop is a function here
    return prop(arg);
  }
  return prop;
}

watch(
  () => props.data,
  () => {
    data.value = props.data ? [...props.data] : [];
  },
  props.watchOptions,
);

defineExpose({
  get $el() {
    return rootRef.value?.$el as HTMLElement;
  },
  tableRef,
  tableApi,
});
</script>

<template>
  <DefineRowTemplate v-slot="{ row, style }">
    <tr
      :data-selected="row.getIsSelected()"
      :data-selectable="!!props.onSelect || !!props.onHover || !!props.onContextmenu"
      :data-expanded="row.getIsExpanded()"
      :role="props.onSelect ? 'button' : undefined"
      :tabindex="props.onSelect ? 0 : undefined"
      :class="pohon.tr({
        class: [
          props.pohon?.tr,
          resolveValue(tableApi.options.meta?.class?.tr, row),
        ],
      })"
      data-pohon="table-tr"
      :style="[resolveValue(tableApi.options.meta?.style?.tr, row), style]"
      @click="onRowSelect($event, row)"
      @pointerenter="onRowHover($event, row)"
      @pointerleave="onRowHover($event, null)"
      @contextmenu="onRowContextmenu($event, row)"
    >
      <td
        v-for="cell in row.getVisibleCells()"
        :key="cell.id"
        :data-pinned="cell.column.getIsPinned()"
        :colspan="resolveValue(cell.column.columnDef.meta?.colspan?.td, cell)"
        :rowspan="resolveValue(cell.column.columnDef.meta?.rowspan?.td, cell)"
        :class="pohon.td({
          class: [
            props.pohon?.td,
            resolveValue(cell.column.columnDef.meta?.class?.td, cell),
          ],
          pinned: !!cell.column.getIsPinned(),
        })"
        data-pohon="table-td"
        :style="resolveValue(cell.column.columnDef.meta?.style?.td, cell)"
      >
        <slot
          :name="`${cell.column.id}-cell`"
          v-bind="cell.getContext()"
        >
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </slot>
      </td>
    </tr>

    <tr
      v-if="row.getIsExpanded()"
      :class="pohon.tr({ class: [props.pohon?.tr] })"
      data-pohon="table-tr"
    >
      <td
        :colspan="row.getAllCells().length"
        :class="pohon.td({ class: [props.pohon?.td] })"
        data-pohon="table-td"
      >
        <slot
          name="expanded"
          :row="row"
        />
      </td>
    </tr>
  </DefineRowTemplate>

  <DefineTableTemplate>
    <table
      ref="tableRef"
      :class="pohon.base({ class: [props.pohon?.base] })"
      data-pohon="table-base"
    >
      <caption
        v-if="caption || !!slots.caption"
        :class="pohon.caption({ class: [props.pohon?.caption] })"
        data-pohon="table-caption"
      >
        <slot name="caption">
          {{ caption }}
        </slot>
      </caption>

      <thead
        :class="pohon.thead({ class: [props.pohon?.thead] })"
        data-pohon="table-thead"
      >
        <tr
          v-for="headerGroup in tableApi.getHeaderGroups()"
          :key="headerGroup.id"
          :class="pohon.tr({ class: [props.pohon?.tr] })"
          data-pohon="table-tr"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :scope="header.colSpan > 1 ? 'colgroup' : 'col'"
            :colspan="header.colSpan > 1 ? header.colSpan : undefined"
            :rowspan="header.rowSpan > 1 ? header.rowSpan : undefined"
            :class="pohon.th({
              class: [
                props.pohon?.th,
                resolveValue(header.column.columnDef.meta?.class?.th, header),
              ],
              pinned: !!header.column.getIsPinned(),
            })"
            :style="resolveValue(header.column.columnDef.meta?.style?.th, header)"
            data-pohon="table-th"
          >
            <slot
              :name="`${header.id}-header`"
              v-bind="header.getContext()"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </slot>
          </th>
        </tr>

        <tr
          :class="pohon.separator({ class: [props.pohon?.separator] })"
          data-pohon="table-separator"
        />
      </thead>

      <tbody
        :class="pohon.tbody({ class: [props.pohon?.tbody] })"
        data-pohon="table-tbody"
      >
        <slot name="body-top" />

        <template v-if="rows.length">
          <template v-if="virtualizer">
            <template
              v-for="(virtualRow, index) in virtualizer.getVirtualItems()"
              :key="rows[virtualRow.index]?.id"
            >
              <ReuseRowTemplate
                :row="rows[virtualRow.index]!"
                :style="{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                }"
              />
            </template>
          </template>

          <template v-else>
            <ReuseRowTemplate
              v-for="row in rows"
              :key="row.id"
              :row="row"
            />
          </template>
        </template>

        <tr v-else-if="loading && !!slots.loading">
          <td
            :colspan="tableApi.getAllLeafColumns().length"
            :class="pohon.loading({ class: props.pohon?.loading })"
            data-pohon="table-loading"
          >
            <slot name="loading" />
          </td>
        </tr>

        <tr v-else>
          <td
            :colspan="tableApi.getAllLeafColumns().length"
            :class="pohon.empty({ class: props.pohon?.empty })"
            data-pohon="table-empty"
          >
            <slot name="empty">
              {{ empty || t('table.noData') }}
            </slot>
          </td>
        </tr>

        <slot name="body-bottom" />
      </tbody>

      <tfoot
        v-if="hasFooter"
        :class="pohon.tfoot({ class: [props.pohon?.tfoot] })"
        :style="virtualizer ? {
          transform: `translateY(${virtualizer.getTotalSize() - renderedSize}px)`,
        } : undefined"
        data-pohon="table-tfoot"
      >
        <tr :class="pohon.separator({ class: [props.pohon?.separator] })" />

        <tr
          v-for="footerGroup in tableApi.getFooterGroups()"
          :key="footerGroup.id"
          :class="pohon.tr({ class: [props.pohon?.tr] })"
          data-pohon="table-tr"
        >
          <th
            v-for="header in footerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :colspan="header.colSpan > 1 ? header.colSpan : undefined"
            :rowspan="header.rowSpan > 1 ? header.rowSpan : undefined"
            :class="pohon.th({
              class: [
                props.pohon?.th,
                resolveValue(header.column.columnDef.meta?.class?.th, header),
              ],
              pinned: !!header.column.getIsPinned(),
            })"
            :style="resolveValue(header.column.columnDef.meta?.style?.th, header)"
            data-pohon="table-th"
          >
            <slot
              :name="`${header.id}-footer`"
              v-bind="header.getContext()"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.footer"
                :props="header.getContext()"
              />
            </slot>
          </th>
        </tr>
      </tfoot>
    </table>
  </DefineTableTemplate>

  <APrimitive
    ref="rootRef"
    :as="as"
    v-bind="$attrs"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="table-root"
  >
    <div
      v-if="virtualizer"
      :style="{
        height: `${virtualizer.getTotalSize()}px`,
      }"
    >
      <ReuseTableTemplate />
    </div>
    <ReuseTableTemplate v-else />
  </APrimitive>
</template>
