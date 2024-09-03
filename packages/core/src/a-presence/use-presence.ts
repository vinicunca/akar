import { computed, nextTick, onUnmounted, ref, type Ref, watch } from 'vue';

import { useStateMachine } from '~~/shared';

export function usePresence(
  { node, present }:
  {
    node: Ref<HTMLElement | undefined>;
    present: Ref<boolean>;
  },
) {
  const stylesRef = ref<CSSStyleDeclaration>({} as CSSStyleDeclaration);
  const prevAnimationNameRef = ref<string>('none');
  const initialState = present.value ? 'mounted' : 'unmounted';

  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended',
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted',
    },
    unmounted: {
      MOUNT: 'mounted',
    },
  });

  function dispatchCustomEvent(name: 'after-enter' | 'after-leave' | 'enter' | 'leave') {
    const customEvent = new CustomEvent(name, { bubbles: false, cancelable: false });

    node.value?.dispatchEvent(customEvent);
  }

  /**
   * Run the function when the present changes.
   * Note: this is executed immediately.
   */
  watch(
    present,
    async (currentPresent, prevPresent) => {
      const hasPresentChange = currentPresent !== prevPresent;

      await nextTick();

      if (hasPresentChange) {
        const prevAnimationName = prevAnimationNameRef.value;
        const currentAnimationName = getAnimationName(node.value);

        if (currentPresent) {
          dispatch('MOUNT');
          dispatchCustomEvent('enter');

          if (currentAnimationName === 'none') {
            dispatchCustomEvent('after-enter');
          }
        } else if (
          currentAnimationName === 'none'
          || stylesRef.value.display === 'none'
        ) {
          /**
           * If there is no exit animation or the element is hidden,
           * animations won't run so we unmount instantly.
           */
          dispatch('UNMOUNT');
          dispatchCustomEvent('leave');
          dispatchCustomEvent('after-leave');
        } else {
          /**
           * When `present` changes to `false`, we check changes to animation-name to
           * determine wether an animation has started.
           * We chose this approach (reading computed styles) because
           * there is no `animationrun` event and `animationstart` fires after
           * `animation-delay` has expired which would be too late.
           */
          const isAnimating = prevAnimationName !== currentAnimationName;

          if (prevPresent && isAnimating) {
            dispatch('ANIMATION_OUT');
            dispatchCustomEvent('leave');
          } else {
            dispatch('UNMOUNT');
            dispatchCustomEvent('after-leave');
          }
        }
      }
    },
    { immediate: true },
  );

  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state.
   * Therefore, we need to make sure we only trigger ANIMATION_END for the currently active animation.
   */
  function handleAnimationEnd(event: AnimationEvent) {
    const currentAnimationName = getAnimationName(node.value);
    const isCurrentAnimation = currentAnimationName.includes(event.animationName);
    const directionName = state.value === 'mounted' ? 'enter' : 'leave';

    if (event.target === node.value && isCurrentAnimation) {
      dispatchCustomEvent(`after-${directionName}`);
      dispatch('ANIMATION_END');
    }

    // if no animation, immediately trigger 'ANIMATION_END'
    if (event.target === node.value && currentAnimationName === 'none') {
      dispatch('ANIMATION_END');
    }
  }

  function handleAnimationStart(event: AnimationEvent) {
    if (event.target === node.value) {
      // if animation occurred, store its name as the previous animation.
      prevAnimationNameRef.value = getAnimationName(node.value);
    }
  }

  const watcher = watch(
    node,
    (newNode, oldNode) => {
      if (newNode) {
        stylesRef.value = getComputedStyle(newNode);
        newNode.addEventListener('animationstart', handleAnimationStart);
        newNode.addEventListener('animationcancel', handleAnimationEnd);
        newNode.addEventListener('animationend', handleAnimationEnd);
      } else {
        /**
         * Transition to the unmounted state if the node is removed prematurely.
         * We avoid doing so during cleanup as the node may change but still exist.
         */
        dispatch('ANIMATION_END');

        oldNode?.removeEventListener('animationstart', handleAnimationStart);
        oldNode?.removeEventListener('animationcancel', handleAnimationEnd);
        oldNode?.removeEventListener('animationend', handleAnimationEnd);
      }
    },
    { immediate: true },
  );

  const stateWatcher = watch(
    state,
    () => {
      const currentAnimationName = getAnimationName(node.value);
      prevAnimationNameRef.value
      = state.value === 'mounted' ? currentAnimationName : 'none';
    },
  );

  onUnmounted(() => {
    watcher();
    stateWatcher();
  });

  const isPresent = computed(() =>
    ['mounted', 'unmountSuspended'].includes(state.value),
  );

  return {
    isPresent,
  };
}

function getAnimationName(node?: HTMLElement) {
  return node ? getComputedStyle(node).animationName || 'none' : 'none';
}
