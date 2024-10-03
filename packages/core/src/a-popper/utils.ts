import type { Middleware, Placement } from '@floating-ui/vue';

type SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'];
type ALIGN_OPTIONS = ['start', 'center', 'end'];

export type Side = SIDE_OPTIONS[number];
export type Align = ALIGN_OPTIONS[number];

export function isNotNull<T>(value: null | T): value is T {
  return value !== null;
}

export function transformOrigin(options: {
  arrowHeight: number;
  arrowWidth: number;
}): Middleware {
  return {
    fn(data) {
      const { middlewareData, placement, rects } = data;

      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;

      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { center: '50%', end: '100%', start: '0%' }[
        placedAlign
      ];

      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;

      let x = '';
      let y = '';

      if (placedSide === 'bottom') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === 'top') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === 'right') {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === 'left') {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }

      return { data: { x, y } };
    },

    name: 'transformOrigin',

    options,
  };
}

export function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = 'center'] = placement.split('-');
  return [side as Side, align as Align] as const;
}
