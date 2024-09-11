import { isString } from '@vinicunca/perkakas';
import { type Component, defineComponent, h, type PropType } from 'vue';

import { APrimitiveSlot } from './a-slot';

export type AsTag =
  | 'a'
  | 'button'
  | 'div'
  | 'form'
  | 'h2'
  | 'h3'
  | 'img'
  | 'input'
  | 'label'
  | 'li'
  | 'nav'
  | 'ol'
  | 'p'
  | 'span'
  | 'svg'
  | 'template'
  | 'ul'
  | ({} & string); // any other string

export interface APrimitiveProps {
  /**
   * The element or component this component should render as.
   * Can be overwrite by `asChild`.
   *
   * @defaultValue "div"
   */
  as?: AsTag | Component;
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean;
}

export const APrimitive = defineComponent({
  name: 'APrimitive',

  inheritAttrs: false,

  props: {
    as: {
      default: 'div',
      type: [String, Object] as PropType<AsTag | Component>,
    },

    asChild: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? 'template' : props.as;

    // For self closing tags, don't provide default slots because of hydration issue
    const SELF_CLOSING_TAGS = ['area', 'img', 'input'];
    if (isString(asTag) && SELF_CLOSING_TAGS.includes(asTag)) {
      return () => h(asTag, attrs);
    }

    if (asTag !== 'template') {
      return () => h(props.as, attrs, { default: slots.default });
    }

    return () => h(APrimitiveSlot, attrs, { default: slots.default });
  },
});
