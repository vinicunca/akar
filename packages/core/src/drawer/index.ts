import ADrawerContent from './drawer-content.vue';
import ADrawerHandle from './drawer-handle.vue';
import ADrawerOverlay from './drawer-overlay.vue';
import ADrawerRootNested from './drawer-root-nested.vue';
import ADrawerRoot from './drawer-root.vue';

export {
  ADrawerContent,
  ADrawerHandle,
  ADrawerOverlay,
  ADrawerRoot,
  ADrawerRootNested,
};

export {
  ADialogClose as ADrawerClose,
  type ADialogCloseProps as ADrawerCloseProps,

  ADialogDescription as ADrawerDescription,
  type ADialogDescriptionProps as ADrawerDescriptionProps,

  ADialogPortal as ADrawerPortal,
  type ADialogPortalProps as ADrawerPortalProps,

  ADialogTitle as ADrawerTitle,
  type ADialogTitleProps as ADrawerTitleProps,

  ADialogTrigger as ADrawerTrigger,
  type ADialogTriggerProps as ADrawerTriggerProps,
} from '../dialog';

export type {
  ADrawerRootEmits,
  ADrawerRootProps,
} from './drawer.controls';

export type {
  ADrawerDirection,
  SnapPoint,
} from './drawer.types';
