<script lang="ts">
import type { APrimitiveProps } from 'akar';
import type { LinkProps } from '../types';

export interface LinkBaseProps {
  as?: APrimitiveProps['as'];
  type?: string;
  disabled?: boolean;
  onClick?: ((e: MouseEvent) => void | Promise<void>) | Array<((e: MouseEvent) => void | Promise<void>)>;
  href?: string;
  navigate?: (e: MouseEvent) => void;
  target?: LinkProps['target'];
  rel?: LinkProps['rel'];
  active?: boolean;
  isExternal?: boolean;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';

const props = withDefaults(
  defineProps<LinkBaseProps>(),
  {
    as: 'button',
    type: 'button',
  },
);

function onClickWrapper(event: MouseEvent) {
  if (props.disabled) {
    event.stopPropagation();
    event.preventDefault();
    return;
  }

  if (props.onClick) {
    for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
      onClick(event);
    }
  }

  if (props.href && props.navigate && !props.isExternal) {
    props.navigate(event);
  }
}
</script>

<template>
  <APrimitive
    v-bind="href ? {
      'as': 'a',
      'href': disabled ? undefined : href,
      'aria-disabled': disabled ? 'true' : undefined,
      'role': disabled ? 'link' : undefined,
      'tabindex': disabled ? -1 : undefined,
    } : as === 'button' ? {
      as,
      type,
      disabled,
    } : {
      as,
    }"
    :rel="rel"
    :target="target"
    @click="onClickWrapper"
  >
    <slot />
  </APrimitive>
</template>
