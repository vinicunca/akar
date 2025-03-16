import { ref, watchEffect } from 'vue';
import { BORDER_RADIUS, TRANSITIONS, WINDOW_TOP_OFFSET } from './drawer.constants';
import { injectADrawerRootContext } from './drawer.context';
import { assignStyle, chain, isVertical } from './drawer.utils';

const noop = () => () => {};

export function useScaleBackground() {
  const {
    direction,
    isOpen,
    shouldScaleBackground,
    setBackgroundColorOnScale,
    noBodyStyles,
  } = injectADrawerRootContext();
  const timeoutIdRef = ref<number | null>(null);
  const initialBackgroundColor = ref(document.body.style.backgroundColor);

  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }

  watchEffect(
    (onCleanup) => {
      if (isOpen.value && shouldScaleBackground.value) {
        if (timeoutIdRef.value) {
          clearTimeout(timeoutIdRef.value);
        }
        const wrapper = (document.querySelector('[data-akar-drawer-wrapper]') as HTMLElement)
          || (document.querySelector('[akar-drawer-wrapper]') as HTMLElement);

        if (!wrapper) {
          return;
        }

        chain(
          setBackgroundColorOnScale.value && !noBodyStyles.value
            ? assignStyle({ element: document.body, style: { background: 'black' } })
            : noop,
          assignStyle({
            element: wrapper,
            style: {
              transformOrigin: isVertical(direction.value) ? 'top' : 'left',
              transitionProperty: 'transform, border-radius',
              transitionDuration: `${TRANSITIONS.DURATION}s`,
              transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            },
          }),
        );

        const wrapperStylesCleanup = assignStyle({
          element: wrapper,
          style: {
            borderRadius: `${BORDER_RADIUS}px`,
            overflow: 'hidden',
            ...(isVertical(direction.value)
              ? {
                  transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                }
              : {
                  transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                }),
          },
        });

        onCleanup(() => {
          wrapperStylesCleanup();
          timeoutIdRef.value = window.setTimeout(() => {
            if (initialBackgroundColor.value) {
              document.body.style.background = initialBackgroundColor.value;
            } else {
              document.body.style.removeProperty('background');
            }
          }, TRANSITIONS.DURATION * 1000);
        });
      }
    },
    { flush: 'pre' },
  );
}
