/* eslint-disable sonar/no-nested-conditional */
/* eslint-disable no-nested-ternary */
import type { AcceptableValue, SingleOrMultipleProps } from './types';
import { isDeepEqual, isDefined } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { computed, type Ref, ref, watch } from 'vue';
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
  if (
    isDefined(modelValue)
    && isDefined(defaultValue)
    && typeof modelValue !== typeof defaultValue
  ) {
    throw new Error(
      `Invalid prop \`value\` of value \`${modelValue}\` supplied, should be the same type as the \`defaultValue\` prop, which is \`${defaultValue}\`. The \`value\` prop must be:
  ${type === 'single' ? '- a string' : type === 'multiple' ? '- an array of strings' : '- a string\n- an array of strings'}
  - \`undefined\``,
    );
  }

  const canTypeBeInferred = isDefined(modelValue) || isDefined(defaultValue);
  // Ensure the type matches the provided values
  if (type && canTypeBeInferred) {
    const isArray = Array.isArray(modelValue) || Array.isArray(defaultValue);
    const propUsed = modelValue !== undefined ? 'modelValue' : 'defaultValue';
    const typeUsed = propUsed === 'modelValue' ? typeof modelValue : typeof defaultValue;
    if (type === 'single' && isArray) {
      console.error(`Invalid prop \`${propUsed}\` of type ${typeUsed} supplied with type \`single\`. The \`modelValue\` prop must be a string or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${propUsed} prop.`);
      return 'multiple';
    } else if (type === 'multiple' && !isArray) {
      console.error(`Invalid prop \`${propUsed}\` of type ${typeUsed} supplied with type \`multiple\`. The \`modelValue\` prop must be an array of strings or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${propUsed} prop.`);
      return 'single';
    }
  }

  if (canTypeBeInferred) {
    return Array.isArray(value) ? 'multiple' : 'single';
  } else {
    return type ?? 'single';
  } // always fallback to `single`
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
  const type = ref(getDefaultType(props));
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

  watch(
    () => [props.type, props.modelValue, props.defaultValue],
    () => {
      const validatedType = validateProps(props);
      if (type.value !== validatedType) {
        type.value = validatedType;
      }
    },
    { immediate: true },
  );

  function changeModelValue(value: AcceptableValue) {
    if (type.value === 'single') {
      modelValue.value = isDeepEqual(value, modelValue.value) ? undefined : value;
    } else {
      const modelValueArray = [...(modelValue.value as Array<AcceptableValue> || [])];
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
    type,
    changeModelValue,
    isSingle,
  };
}
