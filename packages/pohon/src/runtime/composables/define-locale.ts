import type { DeepPartial } from '@vinicunca/perkakas';
import type { PDirection, PLocale } from '../types/locale';
import { defu } from 'defu';

interface DefineLocaleOptions<M> {
  name: string;
  code: string;
  dir?: PDirection;
  messages: M;
}

/* @__NO_SIDE_EFFECTS__ */
export function defineLocale<M>(options: DefineLocaleOptions<M>): PLocale<M> {
  return defu<DefineLocaleOptions<M>, [{ dir: PDirection }]>(options, { dir: 'ltr' });
}

/* @__NO_SIDE_EFFECTS__ */
export function extendLocale<M>(locale: PLocale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): PLocale<M> {
  return defu<PLocale<M>, [DefineLocaleOptions<M>]>(options, locale);
}
