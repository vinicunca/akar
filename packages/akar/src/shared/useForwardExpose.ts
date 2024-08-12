/* eslint-disable no-restricted-syntax */
// reference: https://github.com/vuejs/rfcs/issues/258#issuecomment-1068697672
import { unrefElement } from '@vueuse/core';
import { type ComponentPublicInstance, computed, getCurrentInstance, ref } from 'vue';

export function useForwardExpose() {
  const instance = getCurrentInstance()!;

  const currentRef = ref<ComponentPublicInstance | Element | null>();
  const currentElement = computed<HTMLElement>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling
    // @ts-expect-error ignore ts error
    return ['#comment', '#text'].includes(currentRef.value?.$el.nodeName) ? currentRef.value?.$el.nextElementSibling : unrefElement(currentRef);
  });

  // localExpose should only be assigned once else will create infinite loop
  const localExpose: null | Record<string, any> = Object.assign({}, instance.exposed);
  const ret: Record<string, any> = {};

  // retrieve props for current instance
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      configurable: true,
      enumerable: true,
      get: () => instance.props[key],
    });
  }

  // retrieve default exposed value
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => localExpose![key],
      });
    }
  }

  // retrieve original first root element
  Object.defineProperty(ret, '$el', {
    configurable: true,
    enumerable: true,
    get: () => instance.vnode.el,
  });
  instance.exposed = ret;

  function forwardRef(ref: ComponentPublicInstance | Element | null) {
    currentRef.value = ref;

    if (ref instanceof Element || !ref) {
      return;
    }

    // retrieve the forwarded element
    Object.defineProperty(ret, '$el', {
      configurable: true,
      enumerable: true,
      get: () => ref.$el,
    });

    instance.exposed = ret;
  }

  return { currentElement, currentRef, forwardRef };
}
