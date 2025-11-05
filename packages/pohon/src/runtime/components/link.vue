<script lang="ts">
import type { NuxtLinkProps } from '#app';
import type { AppConfig } from '@nuxt/schema';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/link';

type Link = ComponentConfig<typeof theme, AppConfig, 'link'>;

export interface PLinkProps extends Omit<NuxtLinkProps, 'custom'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled'>, /** @vue-ignore */ Omit<AnchorHTMLAttributes, 'href' | 'target' | 'rel' | 'type'> {
  /**
   * The element or component this component should render as when not a link.
   * @defaultValue 'button'
   */
  as?: any;
  /**
   * The type of the button when not a link.
   * @defaultValue 'button'
   */
  type?: ButtonHTMLAttributes['type'];
  disabled?: boolean;
  /** Force the link to be active independent of the current route. */
  active?: boolean;
  /** Will only be active if the current route is an exact match. */
  exact?: boolean;
  /** Allows controlling how the current route query sets the link as active. */
  exactQuery?: boolean | 'partial';
  /** Will only be active if the current route hash is an exact match. */
  exactHash?: boolean;
  /** The class to apply when the link is inactive. */
  inactiveClass?: string;
  custom?: boolean;
  /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  raw?: boolean;
  class?: any;
}

export interface PLinkSlots {
  default: (props: { active: boolean }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useRoute } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { isEqual } from 'ohash/utils';
import { computed } from 'vue';
import { mergeClasses } from '../utils';
import { isPartiallyEqual } from '../utils/link';
import { uv } from '../utils/uv';
import PLinkBase from './link-base.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PLinkProps>(),
  {
    as: 'button',
    type: 'button',
    ariaCurrentValue: 'page',
    active: undefined,
  },
);
defineSlots<PLinkSlots>();

const route = useRoute();
const appConfig = useAppConfig() as Link['AppConfig'];

const nuxtLinkProps = useForwardProps(
  reactiveOmit(
    props,
    'as',
    'type',
    'disabled',
    'active',
    'exact',
    'exactQuery',
    'exactHash',
    'activeClass',
    'inactiveClass',
    'to',
    'href',
    'raw',
    'custom',
    'class',
  ),
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...defu(
      {
        variants: {
          active: {
            true: mergeClasses(appConfig.pohon?.link?.variants?.active?.true, props.activeClass),
            false: mergeClasses(appConfig.pohon?.link?.variants?.active?.false, props.inactiveClass),
          },
        },
      },
      appConfig.pohon?.link || {},
    ),
  }),
);

const to = computed(() => props.to ?? props.href);

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined) {
    return props.active;
  }

  if (props.exactQuery === 'partial') {
    if (!isPartiallyEqual(linkRoute.query, route.query)) {
      return false;
    }
  } else if (props.exactQuery === true) {
    if (!isEqual(linkRoute.query, route.query)) {
      return false;
    }
  }

  if (props.exactHash && linkRoute.hash !== route.hash) {
    return false;
  }

  if (props.exact && isExactActive) {
    return true;
  }

  if (!props.exact && isActive) {
    return true;
  }

  return false;
}

function resolveLinkClass({ route, isActive, isExactActive }: any) {
  const active = isLinkActive({ route, isActive, isExactActive });

  if (props.raw) {
    return [props.class, active ? props.activeClass : props.inactiveClass];
  }

  return pohon.value({
    class: props.class,
    active,
    disabled: props.disabled,
  });
}
</script>

<template>
  <NuxtLink
    v-slot="{ href, navigate, route: linkRoute, rel, target, isExternal, isActive, isExactActive }"
    v-bind="nuxtLinkProps"
    :to="to"
    custom
  >
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          as,
          type,
          disabled,
          href,
          navigate,
          rel,
          target,
          isExternal,
          active: isLinkActive({ route: linkRoute, isActive, isExactActive }),
        }"
      />
    </template>
    <PLinkBase
      v-else
      v-bind="{
        ...$attrs,
        ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
        as,
        type,
        disabled,
        href,
        navigate,
        rel,
        target,
        isExternal,
      }"
      :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive })"
    >
      <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })" />
    </PLinkBase>
  </NuxtLink>
</template>
