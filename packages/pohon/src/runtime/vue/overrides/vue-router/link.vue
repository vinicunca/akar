<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { RouterLinkProps } from 'vue-router';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from '../../../types/html';
import type { ComponentConfig } from '../../../types/uv';
import theme from '#build/pohon/link';

type Link = ComponentConfig<typeof theme, AppConfig, 'link'>;

export interface LinkProps extends Partial<Omit<RouterLinkProps, 'custom'>>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled'>, /** @vue-ignore */ Omit<AnchorHTMLAttributes, 'href' | 'target' | 'rel' | 'type'> {
  /**
   * The element or component this component should render as when not a link.
   * @defaultValue 'button'
   */
  as?: any;
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: LinkProps['to'];
  /**
   * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
   */
  external?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
  /**
   * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
   */
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
  /**
   * If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean;
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
  /** Will only be active if the current route query is an exact match. */
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

export interface LinkSlots {
  default: (props: { active: boolean }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { isEqual } from 'ohash/utils';
import { hasProtocol } from 'ufo';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import PLinkBase from '../../../components/link-base.vue';
import { mergeClasses } from '../../../utils';
import { isPartiallyEqual } from '../../../utils/link';
import { uv } from '../../../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
  ariaCurrentValue: 'page',
  active: undefined,
});
defineSlots<LinkSlots>();

const route = useRoute();

const appConfig = useAppConfig() as Link['AppConfig'];

const routerLinkProps = useForwardProps(reactiveOmit(props, 'as', 'type', 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass', 'to', 'href', 'raw', 'custom', 'class', 'noRel'));

const ui = computed(() => uv({
  extend: uv(theme),
  ...defu({
    variants: {
      active: {
        true: mergeClasses(appConfig.pohon?.link?.variants?.active?.true, props.activeClass),
        false: mergeClasses(appConfig.pohon?.link?.variants?.active?.false, props.inactiveClass),
      },
    },
  }, appConfig.pohon?.link || {}),
}));

const to = computed(() => props.to ?? props.href);

const isExternal = computed(() => {
  if (props.external) {
    return true;
  }

  if (!to.value) {
    return false;
  }

  return typeof to.value === 'string' && hasProtocol(to.value, { acceptRelative: true });
});

const hasTarget = computed(() => !!props.target && props.target !== '_self');

const rel = computed(() => {
  // If noRel is explicitly set, return null
  if (props.noRel) {
    return null;
  }

  // If rel is explicitly set, use it
  if (props.rel !== undefined) {
    return props.rel || null;
  }

  // Default to "noopener noreferrer" for external links or links with target
  if (isExternal.value || hasTarget.value) {
    return 'noopener noreferrer';
  }

  return null;
});

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined) {
    return props.active;
  }

  if (!to.value) {
    return false;
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

function resolveLinkClass({ route, isActive, isExactActive }: any = {}) {
  const active = isLinkActive({ route, isActive, isExactActive });

  if (props.raw) {
    return [props.class, active ? props.activeClass : props.inactiveClass];
  }

  return ui.value({ class: props.class, active, disabled: props.disabled });
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <template v-if="!isExternal && !!to">
    <RouterLink
      v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive }"
      v-bind="routerLinkProps"
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
    </RouterLink>
  </template>

  <template v-else>
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          as,
          type,
          disabled,
          href: to,
          rel,
          target,
          active: active ?? false,
          isExternal,
        }"
      />
    </template>
    <PLinkBase
      v-else
      v-bind="{
        ...$attrs,
        as,
        type,
        disabled,
        href: (to as string),
        rel,
        target,
        isExternal,
      }"
      :class="resolveLinkClass()"
    >
      <slot :active="active ?? false" />
    </PLinkBase>
  </template>
</template>
