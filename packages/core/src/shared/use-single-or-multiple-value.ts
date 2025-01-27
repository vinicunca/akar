import type { Ref } from 'vue';
import type { AcceptableValue, SingleOrMultipleProps } from './types';
import { isDeepEqual, isDefined } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';
import { isValueEqualOrExist } from './is-value-equal-or-exist';

/**
 * Validates the props and it makes sure that the types are coherent with each other
 *
 * 1. If type, defaultValue, and modelValue are all undefined, throw an error.
 * 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
 * 3. If type is defined:
 *    a. If type is 'single' and either modelValue or defaultValue is an array, log an error and return 'multiple'.
 *    b. If type is 'multiple' and neither modelValue nor defaultValue is an array, log an error and return 'single'.
 * 4. Return 'multiple' if modelValue is an array, else return 'single'.
 */
function validateProps({ type, defaultValue, modelValue }: SingleOrMultipleProps) {
  const value = modelValue || defaultValue;

  const canTypeBeInferred = isDefined(modelValue) || isDefined(defaultValue);

  if (canTypeBeInferred) {
    return Array.isArray(value) ? 'multiple' : 'single';
  } else {
    // always fallback to `single`
    return type ?? 'single';
  }
}

function getDefaultType({ type, defaultValue, modelValue }: SingleOrMultipleProps) {
  if (type) {
    return type;
  }

  return validateProps({ type, defaultValue, modelValue });
}

function getDefaultValue({ type, defaultValue }: SingleOrMultipleProps) {
  if (isDefined(defaultValue)) {
    return defaultValue;
  }

  return (type === 'single') ? undefined : [];
}

export function useSingleOrMultipleValue<P extends SingleOrMultipleProps, Name extends string>(
  props: P,
  emits: (name: Name, ...args: Array<any>) => void,
) {
  const type = computed(() => getDefaultType(props));
  const modelValue = useVModel(
    props,
    'modelValue',
    emits,
    {
      defaultValue: getDefaultValue(props),
      passive: (props.modelValue === undefined) as false,
      deep: true,
    },
  ) as Ref<AcceptableValue | Array<AcceptableValue> | undefined>;

  function changeModelValue(value: AcceptableValue) {
    if (type.value === 'single') {
      modelValue.value = isDeepEqual(value, modelValue.value) ? undefined : value;
    } else {
      const modelValueArray = Array.isArray(modelValue.value)
        ? [...(modelValue.value as Array<AcceptableValue> || [])]
        : [modelValue.value].filter(Boolean);
      if (isValueEqualOrExist(modelValueArray, value)) {
        const index = modelValueArray.findIndex((i) => isDeepEqual(i, value));
        modelValueArray.splice(index, 1);
      } else {
        modelValueArray.push(value);
      }
      modelValue.value = modelValueArray;
    }
  }

  const isSingle = computed(() => type.value === 'single');

  return {
    modelValue,
    changeModelValue,
    isSingle,
  };
}
