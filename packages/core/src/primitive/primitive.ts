import type { Component, PropType } from 'vue';
import { defineComponent, h } from 'vue';
import { APrimitiveSlot } from './slot-primitive';

export type APrimitiveAsTag =
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
  | (string & {}); // any other string

export interface APrimitiveProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read our [Composition](https://akar.vinicunca.dev/docs/guides/composition) guide for more details.
   */
  asChild?: boolean;
  /**
   * The element or component this component should render as. Can be overwritten by `asChild`.
   * @defaultValue "div"
   */
  as?: APrimitiveAsTag | Component;
}

// For self closing tags, don't provide default slots because of hydration issue
const SELF_CLOSING_TAGS = ['area', 'img', 'input'];

export const APrimitive = defineComponent({
  name: 'APrimitive',
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
    as: {
      type: [String, Object] as PropType<APrimitiveAsTag | Component>,
      default: 'div',
    },
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? 'template' : props.as;

    if (typeof asTag === 'string' && SELF_CLOSING_TAGS.includes(asTag)) {
      return () => h(asTag, attrs);
    }

    if (asTag !== 'template') {
      return () => h(props.as, attrs, { default: slots.default });
    }

    return () => h(APrimitiveSlot, attrs, { default: slots.default });
  },
});
