export interface Sizes {
  content: number;

  scrollbar: {
    paddingEnd: number;
    paddingStart: number;
    size: number;
  };

  viewport: number;
}

export type ScrollType = 'always' | 'auto' | 'hover' | 'scroll';
