import type { ComponentPublicInstance, Ref } from 'vue';
import type { ADrawerDirection } from './drawer.types';
import { createContext } from '../shared';

export interface ADrawerRootContext {
  open: Ref<boolean>;
  isOpen: Ref<boolean>;
  modal: Ref<boolean>;
  hasBeenOpened: Ref<boolean>;
  drawerRef: Ref<ComponentPublicInstance | null>;
  overlayRef: Ref<ComponentPublicInstance | null>;
  handleRef: Ref<ComponentPublicInstance | null>;
  isDragging: Ref<boolean>;
  dragStartTime: Ref<Date | null>;
  isAllowedToDrag: Ref<boolean>;
  snapPoints: Ref<Array<number | string> | undefined>;
  hasSnapPoints: Ref<boolean>;
  keyboardIsOpen: Ref<boolean>;
  activeSnapPoint: Ref<number | string | null | undefined>;
  pointerStart: Ref<number>;
  dismissible: Ref<boolean>;
  drawerHeightRef: Ref<number>;
  snapPointsOffset: Ref<Array<number>>;
  direction: Ref<ADrawerDirection>;
  onPress: (event: PointerEvent) => void;
  onDrag: (event: PointerEvent) => void;
  onRelease: (event: PointerEvent) => void;
  closeDrawer: () => void;
  shouldFade: Ref<boolean>;
  fadeFromIndex: Ref<number | undefined>;
  shouldScaleBackground: Ref<boolean | undefined>;
  setBackgroundColorOnScale: Ref<boolean | undefined>;
  onNestedDrag: (percentageDragged: number) => void;
  onNestedRelease: (o: boolean) => void;
  onNestedOpenChange: (o: boolean) => void;
  emitClose: () => void;
  emitDrag: (percentageDragged: number) => void;
  emitRelease: (open: boolean) => void;
  emitOpenChange: (o: boolean) => void;
  nested: Ref<boolean>;
  handleOnly: Ref<boolean>;
  noBodyStyles: Ref<boolean>;
}

export const [
  injectADrawerRootContext,
  provideADrawerRootContext,
] = createContext<ADrawerRootContext>('ADrawerRoot');
