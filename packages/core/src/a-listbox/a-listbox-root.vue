<script lang="ts">
import { KEY_CODES } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';
import type { AcceptableValue, DataOrientation, Direction, FormFieldProps } from '~~/shared/types';

import { createContext } from '~~/shared';

type AListboxRootContext<T> = {
  by?: ((a: T, b: T) => boolean) | string;
  changeHighlight: (params: { el: HTMLElement; scrollIntoView?: boolean }) => void;
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  firstValue?: Ref<T | undefined>;
  focusable: Ref<boolean>;
  highlightedElement: Ref<HTMLElement | null>;
  highlightFirstItem: (event: InputEvent) => void;
  highlightOnHover: Ref<boolean>;
  isVirtual: Ref<boolean>;
  modelValue: Ref<Array<T> | T | undefined>;
  multiple: Ref<boolean>;
  onEnter: (event: Event) => void;
  onKeydownEnter: (event: KeyboardEvent) => void;
  onKeydownNavigation: (event: KeyboardEvent) => void;

  onKeydownTypeAhead: (event: KeyboardEvent) => void;

  onLeave: (event: Event) => void;
  onValueChange: (val: T) => void;
  orientation: Ref<DataOrientation>;
  selectionBehavior?: Ref<'replace' | 'toggle'>;
  virtualFocusHook: EventHook<Event | null | undefined>;
  virtualHighlightHook: EventHook<any>;
  virtualKeydownHook: EventHook<KeyboardEvent>;
};

export const [
  injectAListboxRootContext,
  provideAListboxRootContext,
] = createContext<AListboxRootContext<AcceptableValue>>('AListboxRoot');

export interface AListboxRootProps<T = AcceptableValue> extends APrimitiveProps, FormFieldProps {
  /** Use this to compare objects by a particular field, or pass your own comparison function for complete control over how objects are compared. */
  by?: ((a: T, b: T) => boolean) | string;
  /** The value of the listbox when initially rendered. Use when you do not need to control the state of the AListbox */
  defaultValue?: Array<T> | T;
  /** The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with listbox */
  disabled?: boolean;
  /** When `true`, hover over item will trigger highlight */
  highlightOnHover?: boolean;
  /** The controlled value of the listbox. Can be binded-with with `v-model`. */
  modelValue?: Array<T> | T;
  /** Whether multiple options can be selected or not. */
  multiple?: boolean;
  /** The orientation of the listbox. <br>Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: DataOrientation;
  /**
   * How multiple selection should behave in the collection.
   * @defaultValue 'toggle'
   */
  selectionBehavior?: 'replace' | 'toggle';
}

export type AListboxRootEmits<T = AcceptableValue> = {
  /** Event handler called when container is being focused. Can be prevented. */
  'entryFocus': [event: CustomEvent];
  /** Event handler when highlighted element changes. */
  'highlight': [payload: { ref: HTMLElement; value: T } | undefined];
  /** Event handler called when the mouse leave the container */
  'leave': [event: Event];
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
};
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { createEventHook, type EventHook, useVModel } from '@vueuse/core';
import { nextTick, type Ref, ref, toRefs, watch } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { getFocusIntent } from '~~/a-roving-focus/utils';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { useCollection } from '~~/collection';
import { findValuesBetween, useDirection, useFormControl, useTypeahead } from '~~/shared';

import { compare } from './utils';

const props = withDefaults(
  defineProps<AListboxRootProps>(),
  {
    selectionBehavior: 'toggle',
    orientation: 'vertical',
  },
);
const emits = defineEmits<AListboxRootEmits>();

defineSlots<{
  default: (props: {
    /** Current active value */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const {
  multiple,
  highlightOnHover,
  orientation,
  disabled,
  selectionBehavior,
  dir: propDir,
} = toRefs(props);
const { getItems } = useCollection<{ value: T }>({ isProvider: true });
const { handleTypeaheadSearch } = useTypeahead();
const { primitiveElement, currentElement } = usePrimitiveElement();
const dir = useDirection(propDir);

const isFormControl = useFormControl(currentElement);

const firstValue = ref<T>();
const isUserAction = ref(false);
const focusable = ref(true);
const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
    passive: (props.modelValue === undefined) as false,
    deep: true,
  },
) as Ref<Array<T> | T | undefined>;

function onValueChange(val: T) {
  isUserAction.value = true;
  if (Array.isArray(modelValue.value)) {
    const index = modelValue.value.findIndex((idx) => compare({
      value: idx,
      currentValue: val,
      comparator: props.by,
    }));

    if (props.selectionBehavior === 'toggle') {
      const modelArray = [...modelValue.value];

      if (index === -1) {
        modelArray.push(val);
      } else {
        modelArray.splice(index, 1);
      }

      modelValue.value = modelArray;
    } else {
      modelValue.value = [val];
      firstValue.value = val;
    }
  } else {
    if (props.selectionBehavior === 'toggle') {
      if (compare({
        value: modelValue.value,
        currentValue: val,
        comparator: props.by,
      })) {
        modelValue.value = undefined;
      } else {
        modelValue.value = val;
      }
    } else {
      modelValue.value = val;
    }
  }

  setTimeout(() => {
    isUserAction.value = false;
  }, 1);
}

const highlightedElement = ref<HTMLElement | null>(null);
const previousElement = ref<HTMLElement | null>(null);
const isVirtual = ref(false);
const virtualFocusHook = createEventHook<Event | null | undefined>();
const virtualKeydownHook = createEventHook<KeyboardEvent>();
const virtualHighlightHook = createEventHook<T>();

function getCollectionItem() {
  return getItems()
    .map((item) => item.ref)
    .filter((item) => item.dataset.disabled !== '');
}

function changeHighlight(
  { el, scrollIntoView = true }:
  { el: HTMLElement; scrollIntoView?: boolean },
) {
  if (!el) {
    return;
  }

  highlightedElement.value = el;

  if (focusable.value) {
    highlightedElement.value.focus();
  }

  if (scrollIntoView) {
    highlightedElement.value.scrollIntoView({ block: 'nearest' });
  }

  const highlightedItem = getItems().find((item) => item.ref === el);
  emits('highlight', highlightedItem);
}

function highlightItem(value: T) {
  if (isVirtual.value) {
    virtualHighlightHook.trigger(value);
  } else {
    const item = getItems().find((item) => compare({
      value: item.value,
      currentValue: value,
      comparator: props.by,
    }));

    if (item) {
      highlightedElement.value = item.ref;
      changeHighlight({ el: item.ref });
    }
  }
}

function onKeydownEnter(event: KeyboardEvent) {
  if (highlightedElement.value) {
    event.preventDefault();
    event.stopPropagation();

    highlightedElement.value.click();
  }
}

function onKeydownTypeAhead(event: KeyboardEvent) {
  isUserAction.value = true;

  if (isVirtual.value) {
    virtualKeydownHook.trigger(event);
  } else {
    const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;

    if (isMetaKey && event.key === 'a' && multiple.value) {
      const collection = getItems();
      const values = collection.map((i) => i.value);
      modelValue.value = [...values];
      event.preventDefault();
      changeHighlight({ el: collection[collection.length - 1].ref });
    } else if (!isMetaKey) {
      const el = handleTypeaheadSearch({ key: event.key, fallback: getCollectionItem() });
      if (el) {
        changeHighlight({ el });
      }
    }
  }

  setTimeout(() => {
    isUserAction.value = false;
  }, 1);
}

function highlightFirstItem() {
  nextTick(() => {
    const event = new KeyboardEvent('keydown', { key: 'PageUp' });
    onKeydownNavigation(event);
  });
}

function onLeave(event: Event) {
  const el = highlightedElement.value;

  if ((el as Node)?.isConnected) {
    previousElement.value = el;
  }

  highlightedElement.value = null;
  emits('leave', event);
}

function onEnter(event: Event) {
  const entryFocusEvent = new CustomEvent(
    'listbox.entryFocus',
    { bubbles: false, cancelable: true },
  );
  event.currentTarget?.dispatchEvent(entryFocusEvent);
  emits('entryFocus', entryFocusEvent);

  if (entryFocusEvent.defaultPrevented) {
    return;
  }

  if (previousElement.value) {
    changeHighlight({ el: previousElement.value });
  } else {
    const el = getCollectionItem()?.[0];
    changeHighlight({ el });
  }
}

function onKeydownNavigation(event: KeyboardEvent) {
  const intent = getFocusIntent({
    event,
    orientation: orientation.value,
    dir: dir.value,
  });

  if (!intent) {
    return;
  }

  let collection = getCollectionItem();

  if (highlightedElement.value) {
    if (intent === 'last') {
      collection.reverse();
    } else if (intent === 'prev' || intent === 'next') {
      if (intent === 'prev') {
        collection.reverse();
      }

      const currentIndex = collection.indexOf(highlightedElement.value);
      collection = collection.slice(currentIndex + 1);
    }

    handleMultipleReplace(event, collection[0]);
  }

  if (collection.length) {
    const index = !highlightedElement.value && intent === 'prev'
      ? collection.length - 1
      : 0;
    changeHighlight({ el: collection[index] });
  }

  if (isVirtual.value) {
    return virtualKeydownHook.trigger(event);
  }
}

function handleMultipleReplace(event: KeyboardEvent, targetEl: HTMLElement) {
  if (
    isVirtual.value
    || props.selectionBehavior !== 'replace'
    || !multiple.value
    || !Array.isArray(modelValue.value)
  ) {
    return;
  }

  const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
  if (isMetaKey && !event.shiftKey) {
    return;
  }

  if (event.shiftKey) {
    const collection = getItems().filter((i) => i.ref.dataset.disabled !== '');
    let lastValue = collection.find((i) => i.ref === targetEl)?.value;

    if (event.key === KEY_CODES.END) {
      lastValue = collection[collection.length - 1].value;
    } else if (event.key === KEY_CODES.HOME) {
      lastValue = collection[0].value;
    }

    if (!lastValue || !firstValue.value) {
      return;
    }

    const values = findValuesBetween({
      array: collection.map((item) => item.value),
      start: firstValue.value,
      end: lastValue,
    });

    modelValue.value = values;
  }
}

async function highlightSelected(event?: Event) {
  await nextTick();

  if (isVirtual.value) {
    // Trigger on nextTick for Virtualizer to be mounted
    virtualFocusHook.trigger(event);
  } else {
    const collection = getCollectionItem();
    const item = collection.find((i) => i.dataset.state === 'checked');
    if (item) {
      changeHighlight({ el: item });
    } else if (collection.length) {
      changeHighlight({ el: collection[0] });
    }
  }
}

// watch for only programmatic changes
watch(
  modelValue,
  () => {
    if (!isUserAction.value) {
      nextTick(() => {
        highlightSelected();
      });
    }
  },
  { immediate: true, deep: true },
);

async function handleFocusOut(event: FocusEvent) {
  const target = (event.relatedTarget || event.target) as HTMLElement | null;

  await nextTick();

  if (highlightedElement.value && currentElement && !currentElement.value.contains(target)) {
    onLeave(event);
  }
}

defineExpose({
  highlightedElement,
  highlightItem,
  highlightFirstItem,
  highlightSelected,
  getItems,
});

provideAListboxRootContext({
  modelValue,
  // @ts-expect-error ignoring
  onValueChange,
  multiple,
  orientation,
  dir,
  disabled,
  highlightOnHover,
  highlightedElement,
  isVirtual,
  virtualFocusHook,
  virtualKeydownHook,
  virtualHighlightHook,
  by: props.by,
  firstValue,
  selectionBehavior,

  focusable,
  onLeave,
  onEnter,
  changeHighlight,
  onKeydownEnter,
  onKeydownNavigation,
  onKeydownTypeAhead,
  highlightFirstItem,
});
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    :dir="dir"
    :data-disabled="disabled ? '' : undefined"
    @pointerleave="onLeave"
    @focusout="handleFocusOut"
  >
    <slot :model-value="modelValue" />

    <AVisuallyHiddenInput
      v-if="isFormControl && name"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
    />
  </APrimitive>
</template>
