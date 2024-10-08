import { isDefined } from '@vinicunca/perkakas';
import { camelize, computed, getCurrentInstance, type MaybeRefOrGetter, toRef } from 'vue';

interface PropOptions {
  default?: any;
  required?: boolean;
  type?: any;
}

/**
 * The `useForwardProps` function in TypeScript takes in a set of props and returns a computed value
 * that combines default props with assigned props from the current instance.
 * @param props - The `props` parameter is an object that represents the props passed to a
 * component.
 *
 * @returns computed value that combines the default props, preserved props, and assigned props.
 */
export function useForwardProps<T extends Record<string, any>>(props: MaybeRefOrGetter<T>) {
  const vm = getCurrentInstance();
  // Default value for declared props
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr] as PropOptions).default;
    if (isDefined(defaultValue)) {
      prev[curr as keyof T] = defaultValue;
    }
    return prev;
  }, {} as T);

  const refProps = toRef(props);

  return computed(() => {
    const preservedProps = {} as T;
    const assignedProps = vm?.vnode.props ?? {};

    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key) as keyof T] = assignedProps[key];
    });

    // Only return value from the props parameter
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      if (isDefined(refProps.value[curr])) {
        prev[curr as keyof T] = refProps.value[curr];
      }

      return prev;
    }, {} as T);
  });
}
