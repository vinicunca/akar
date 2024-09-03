import { unrefElement } from '@vueuse/core';
import {
  defineComponent,
  getCurrentInstance,
  h,
  ref,
  type SlotsType,
  toRefs,
} from 'vue';

import { usePresence } from '~~/a-presence/use-presence';
import { renderSlotFragments } from '~~/shared';

export interface APresenceProps {
  /**
   * Force the element to render all the time.
   * Useful for programmatically render grandchildren components with the exposed `present` slot prop.
   */
  forceMount?: boolean;
  /**
   * Conditional to mount or unmount the child element.
   * Similar to `v-if`.
   *
   * @required true
   */
  present: boolean;
}

export default defineComponent({
  name: 'APresence',

  props: {
    present: {
      type: Boolean,
      required: true,
    },
    forceMount: {
      type: Boolean,
    },
  },

  slots: {} as SlotsType<{
    default: (options: { present: boolean }) => Array<any>;
  }>,

  setup(props, { slots, expose }) {
    const { present, forceMount } = toRefs(props);

    const node = ref<HTMLElement>();

    // Mount composables once to prevent duplicated eventListener
    const { isPresent } = usePresence({ present, node });
    expose({ present: isPresent });

    let children = slots.default({ present: isPresent.value });
    children = renderSlotFragments(children);
    const instance = getCurrentInstance();

    if (children && children.length > 1) {
      const componentName = instance?.parent?.type.name
        ? `<${instance.parent.type.name} />`
        : 'component';

      throw new Error(
        [
          `Detected an invalid children for \`${componentName}\` for \`APresence\` component.`,
          '',
          'Note: APresence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.',
          'You can apply a few solutions:',
          [
            'Provide a single child element so that `presence` directive attach correctly.',
            'Ensure the first child is an actual element instead of a raw text node or commnet node.',
          ]
            .map((line) => `  - ${line}`)
            .join('\n'),
        ].join('\n'),
      );
    }

    return () => {
      if (forceMount.value || present.value || isPresent.value) {
        return h(
          slots.default({ present: isPresent.value })[0],
          {
            ref: (val) => {
              const el = unrefElement(val as HTMLElement);
              if (typeof el?.hasAttribute === 'undefined') {
                return el;
              }

              // Edge case to handle animation for APopperContent
              if (el.hasAttribute('data-akar-popper-content-wrapper')) {
                node.value = el.firstElementChild as HTMLElement;
              } else {
                node.value = el;
              }

              return el;
            },
          },
        );
      } else {
        return null;
      }
    };
  },
});
