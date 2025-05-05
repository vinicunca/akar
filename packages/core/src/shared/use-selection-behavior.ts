import type { Ref, UnwrapNestedRefs } from 'vue';
import { ref } from 'vue';
import { findValuesBetween } from './arrays';

export function useSelectionBehavior<T>(
  { modelValue, props }:
  {
    modelValue: Ref<Array<T> | T>;
    props: UnwrapNestedRefs<{ multiple?: boolean; selectionBehavior?: 'replace' | 'toggle' }>;
  },
) {
  const firstValue = ref();

  function onSelectItem(
    { val, condition }:
    {
      val: T;
      condition: (existingValue: T) => boolean;
    },
  ) {
    // multiple select
    if (props.multiple && Array.isArray(modelValue.value)) {
      if (props.selectionBehavior === 'replace') {
        modelValue.value = [val];
        firstValue.value = val;
      } else {
        const index = modelValue.value.findIndex((v) => condition(v));
        if (index !== -1) {
          modelValue.value = modelValue.value.filter((_, i) => i !== index);
        } else {
          modelValue.value = [...modelValue.value, val];
        }
      }
    } else { // single select
      if (props.selectionBehavior === 'replace') {
        modelValue.value = { ...val };
      } else {
        if (!Array.isArray(modelValue.value) && condition(modelValue.value)) {
          modelValue.value = undefined as any;
        } else {
          modelValue.value = { ...val };
        }
      }
    }

    return modelValue.value;
  };

  function handleMultipleReplace(
    { intent, currentElement, getItems, options }:
    {
      currentElement: Element | HTMLElement | null;
      getItems: () => Array<{ ref: HTMLElement; value?: any }>;
      intent: 'first' | 'last' | 'next' | 'prev';
      options: Array<any>;
    },
  ) {
    if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value)) {
      return;
    }

    const collection = getItems().filter((i) => i.ref.dataset.disabled !== '');
    const lastValue = collection.find((i) => i.ref === currentElement)?.value;

    if (!lastValue) {
      return;
    }

    let value: Array<T> | null = null;
    switch (intent) {
      case 'first': {
        value = findValuesBetween({
          array: options,
          start: firstValue.value,
          end: options?.[0],
        });
        break;
      }

      case 'last': {
        value = findValuesBetween({
          array: options,
          start: firstValue.value,
          end: options?.[options.length - 1],
        });
        break;
      }

      case 'next':
      case 'prev': {
        value = findValuesBetween({
          array: options,
          start: firstValue.value,
          end: lastValue,
        });
        break;
      }
    }

    modelValue.value = value;
  }

  return {
    firstValue,
    onSelectItem,
    handleMultipleReplace,
  };
}
