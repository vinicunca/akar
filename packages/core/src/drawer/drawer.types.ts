export interface SnapPoint {
  fraction: number;
  height: number;
}

export type ADrawerDirection = 'top' | 'bottom' | 'left' | 'right';

export type AnyFunction = (...args: any) => any;
