import type { Ref } from 'vue';
import type { Side } from './utils';
import { createAkarContext } from '@/shared';

export interface PopperContentContext {
  placedSide: Ref<Side>;
  onArrowChange: (arrow: HTMLElement | undefined) => void;
  arrowX?: Ref<number>;
  arrowY?: Ref<number>;
  shouldHideArrow: Ref<boolean>;
}

export const [injectPopperContentContext, providePopperContentContext]
  = createAkarContext<PopperContentContext>('PopperContent');
