import type { InjectionKey, Ref } from 'vue';
import type { PLocale, PMessages } from '../types/locale';
import { createSharedComposable } from '@vueuse/core';
import { computed, inject, toRef } from 'vue';
import en from '../locale/en';
import { buildLocaleContext } from '../utils/locale';

export const localeContextInjectionKey: InjectionKey<Ref<PLocale<unknown> | undefined>> = Symbol.for('pohon.locale-context');

function _useLocale(localeOverrides?: Ref<PLocale<PMessages> | undefined>) {
  const locale = localeOverrides || toRef(inject<PLocale<PMessages>>(localeContextInjectionKey, en));

  return buildLocaleContext<PMessages>(computed(() => locale.value || en));
}

export const useLocale = /* @__PURE__ */ import.meta.client ? createSharedComposable(_useLocale) : _useLocale;
