import type { Ref } from 'vue';
import { useCookie, useLocale } from '#imports';
import { useStorage } from '@vueuse/core';
import { computed, isRef, ref, unref, watch } from 'vue';

export interface UseResizableProps {
  /**
   * The id of the panel.
   * @defaultValue useId()
   */
  id?: string;
  /**
   * The side to render the panel on.
   * @defaultValue 'left'
   */
  side?: 'left' | 'right';
  /**
   * The minimum size of the panel.
   * @defaultValue 0
   */
  minSize?: number;
  /**
   * The maximum size of the panel.
   * @defaultValue 100
   */
  maxSize?: number;
  /**
   * The default size of the panel.
   * @defaultValue 0
   */
  defaultSize?: number;
  /**
   * Whether to allow the user to resize the panel.
   * @defaultValue true
   */
  resizable?: boolean;
  /**
   * Whether to allow the user to collapse the panel.
   * @defaultValue true
   */
  collapsible?: boolean;
  /**
   * The size of the panel when collapsed.
   * @defaultValue 0
   */
  collapsedSize?: number;
  /**
   * The storage to use for the size.
   * @defaultValue 'cookie'
   */
  storage?: 'cookie' | 'local';
  /**
   * Unique id used to auto-save size.
   * @defaultValue 'dashboard'
   */
  storageKey?: string;
  /**
   * Whether to persist the size in the storage.
   * @defaultValue true
   */
  persistent?: boolean;
  /**
   * The unit to use for size values.
   * @defaultValue '%'
   */
  unit?: '%' | 'rem' | 'px';
}

export interface UseResizableReturn {
  el: Ref<HTMLElement | null>;
  size: Ref<number>;
  isDragging: Ref<boolean>;
  isCollapsed: Ref<boolean>;
  onMouseDown: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onDoubleClick: (event: MouseEvent) => void;
  collapse: (value?: boolean) => void;
}

interface StorageType {
  size: number;
  collapsed: boolean;
}

export function useResizable(
  { key, options = {}, collapsed = ref(false) }:
  {
    key: string;
    options?: Ref<UseResizableProps> | UseResizableProps;
    collapsed?: Ref<boolean>;
  },
): UseResizableReturn {
  const el = ref<HTMLElement | null>(null);
  const opts = computed(() => ({
    side: 'left',
    minSize: 0,
    maxSize: 100,
    defaultSize: 0,
    storage: 'cookie',
    persistent: true,
    collapsible: false,
    collapsedSize: 0,
    resizable: true,
    unit: '%',
    ...(isRef(options) ? options.value : options),
  }));

  const { dir } = useLocale();

  const defaultStorageValue = {
    size: opts.value.defaultSize,
    collapsed: unref(collapsed) ?? false,
  };

  let storageData: Ref<StorageType>;

  if (opts.value.persistent && (opts.value.resizable || opts.value.collapsible)) {
    if (opts.value.storage === 'cookie') {
      storageData = useCookie<StorageType>(key, { default: () => defaultStorageValue });
    } else {
      storageData = useStorage<StorageType>(key, defaultStorageValue);
    }
  } else {
    storageData = ref(defaultStorageValue);
  }

  const isCollapsed = computed({
    get: () => storageData.value.collapsed,
    set: (value: boolean) => {
      if (!opts.value.collapsible) {
        return;
      }

      if (isRef(collapsed)) {
        collapsed.value = value;
      }

      storageData.value.collapsed = value;
    },
  });

  const previousSize = ref(opts.value.defaultSize);

  const size = computed({
    get: () => storageData.value.size,
    set: (value) => {
      storageData.value.size = value;
    },
  });

  const currentSize = computed(() => isCollapsed.value ? opts.value.collapsedSize : size.value);

  const isDragging = ref(false);

  function onMouseMove(
    { event, initialPos, initialSize }:
    { event: MouseEvent; initialPos: number; initialSize: number },
  ): void {
    if (!el.value || !opts.value.resizable) {
      return;
    }

    const parentSize = el.value.parentElement?.offsetWidth || 1;
    const isRtl = dir.value === 'rtl';

    // In RTL mode, we need to invert the delta calculation
    let delta: number;
    if (isRtl) {
      // In RTL mode, invert the logic
      delta = opts.value.side === 'left' ? initialPos - event.clientX : event.clientX - initialPos;
    } else {
      // Original LTR logic
      delta = opts.value.side === 'left' ? event.clientX - initialPos : initialPos - event.clientX;
    }

    const newSize = initialSize + delta;

    // Calculate size based on the selected unit
    let newValue: number;
    if (opts.value.unit === 'rem') {
      // Convert pixels to rem
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      newValue = newSize / rootFontSize;
    } else if (opts.value.unit === 'px') {
      // Use pixel value directly
      newValue = newSize;
    } else {
      // Default percentage calculation
      newValue = (newSize / parentSize) * 100;
    }

    // Auto collapse when dragging near collapsedSize
    if (opts.value.collapsible && newValue < (opts.value.collapsedSize + 4)) {
      collapse(true);
      return;
    } else if (isCollapsed.value) {
      collapse(false);
    }

    size.value = Math.min(opts.value.maxSize, Math.max(opts.value.minSize, newValue));
  }

  function onMouseDown(event: MouseEvent) {
    if (!el.value || !opts.value.resizable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const elWidth = el.value.getBoundingClientRect().width;
    if (!elWidth) {
      return;
    }

    const initialX = event.clientX;
    const initialWidth = elWidth;

    isDragging.value = true;

    function handleMouseMove(event: MouseEvent) {
      onMouseMove({ event, initialPos: initialX, initialSize: initialWidth });
    }

    function handleMouseUp() {
      isDragging.value = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function onTouchMove(
    { event, initialPos, initialSize }:
    { event: TouchEvent; initialPos: number; initialSize: number },
  ): void {
    if (!el.value || !opts.value.resizable || !event.touches[0]) {
      return;
    }

    const parentSize = el.value.parentElement?.offsetWidth || 1;
    const isRtl = dir.value === 'rtl';

    // In RTL mode, we need to invert the delta calculation
    let delta: number;
    if (isRtl) {
      // In RTL mode, invert the logic
      delta = opts.value.side === 'left' ? initialPos - event.touches[0].clientX : event.touches[0].clientX - initialPos;
    } else {
      // Original LTR logic
      delta = opts.value.side === 'left' ? event.touches[0].clientX - initialPos : initialPos - event.touches[0].clientX;
    }

    const newSize = initialSize + delta;

    // Calculate size based on the selected unit
    let newValue: number;
    if (opts.value.unit === 'rem') {
      // Convert pixels to rem
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      newValue = newSize / rootFontSize;
    } else if (opts.value.unit === 'px') {
      // Use pixel value directly
      newValue = newSize;
    } else {
      // Default percentage calculation
      newValue = (newSize / parentSize) * 100;
    }

    // Auto collapse when dragging near collapsedSize
    if (opts.value.collapsible && newValue < (opts.value.collapsedSize + 4)) {
      collapse(true);
      return;
    } else if (isCollapsed.value) {
      collapse(false);
    }

    size.value = Math.min(opts.value.maxSize, Math.max(opts.value.minSize, newValue));
  }

  function onTouchStart(event: TouchEvent) {
    if (!el.value || !opts.value.resizable || !event.touches[0]) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const elWidth = el.value.getBoundingClientRect().width;
    if (!elWidth) {
      return;
    }

    const initialX = event.touches[0].clientX;
    const initialWidth = elWidth;

    isDragging.value = true;

    function handleTouchMove(event: TouchEvent) {
      onTouchMove({ event, initialPos: initialX, initialSize: initialWidth });
    }

    function handleTouchEnd() {
      isDragging.value = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
  }

  function onDoubleClick(event: MouseEvent) {
    if (!el.value || !opts.value.resizable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isCollapsed.value) {
      collapse(false);
    }

    size.value = opts.value.defaultSize;
  }

  function collapse(value?: boolean) {
    if (!opts.value.collapsible) {
      return;
    }

    const newCollapsed = value ?? !isCollapsed.value;
    if (newCollapsed && !isCollapsed.value) {
      previousSize.value = size.value;
    } else if (!newCollapsed && isCollapsed.value) {
      size.value = previousSize.value;
    }

    isCollapsed.value = newCollapsed;
  }

  // Initial sync of storage value to external collapsed ref
  if (isRef(collapsed) && storageData.value.collapsed) {
    collapsed.value = storageData.value.collapsed;
  }

  // Watch for changes in the external collapsed ref
  if (isRef(collapsed)) {
    watch(collapsed, (value) => {
      if (!opts.value.collapsible) {
        return;
      }

      if (storageData.value.collapsed !== value) {
        storageData.value.collapsed = value;
      }
    });
  }

  return {
    el,
    size: currentSize,
    isDragging,
    isCollapsed,
    onMouseDown,
    onTouchStart,
    onDoubleClick,
    collapse,
  };
}
