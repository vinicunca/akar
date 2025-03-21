export type Direction = 'ltr' | 'rtl';
export interface Sizes {
  content: number;
  viewport: number;
  scrollbar: {
    size: number;
    paddingStart: number;
    paddingEnd: number;
  };
}

export type ScrollType = 'always' | 'auto' | 'hover' | 'scroll';
