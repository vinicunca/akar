<script lang="ts">
import type { PLinkProps } from '../../types';

export interface LinkBaseProps {
  as?: string;
  type?: string;
  disabled?: boolean;
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>;
  href?: string;
  target?: PLinkProps['target'];
  active?: boolean;
  isExternal?: boolean;
}
</script>

<script setup lang="ts">
import { Link as InertiaLink } from '@inertiajs/vue3';
import { APrimitive } from 'akar';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<LinkBaseProps>(), {
  as: 'button',
  type: 'button',
});

function onClickWrapper(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }

  if (props.onClick) {
    for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
      onClick(e);
    }
  }
}
</script>

<template>
  <InertiaLink
    v-if="!!href && !isExternal && !disabled"
    :href="href"
    v-bind="{
      target: target || (isExternal ? '_blank' : undefined),
      ...$attrs,
    }"
    @click="onClickWrapper"
  >
    <slot />
  </InertiaLink>
  <APrimitive
    v-else
    v-bind="href ? {
      'as': 'a',
      'href': disabled ? undefined : href,
      'aria-disabled': disabled ? 'true' : undefined,
      'role': disabled ? 'link' : undefined,
      'tabindex': disabled ? -1 : undefined,
      'target': target || (isExternal ? '_blank' : undefined),
      ...$attrs,
    } : as === 'button' ? {
      as,
      type,
      disabled,
      ...$attrs,
    } : {
      as,
      ...$attrs,
    }"
    @click="onClickWrapper"
  >
    <slot />
  </APrimitive>
</template>
