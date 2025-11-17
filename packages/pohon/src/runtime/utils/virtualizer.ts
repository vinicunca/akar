import { isNonNullish } from '@vinicunca/perkakas';
import { getProp } from './';

function hasDescription(item: any, descriptionKey: string): boolean {
  if (typeof item !== 'object' || item === null) {
    return false;
  }
  const value = getProp({ object: item, path: descriptionKey });
  return isNonNullish(value) && value !== '';
}

function getSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl', hasDescription: boolean): number {
  if (hasDescription) {
    return ({
      xs: 44,
      sm: 48,
      md: 52,
      lg: 56,
      xl: 60,
    })[size];
  }

  return ({
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40,
  })[size];
}

/**
 * Get estimate size for virtualizers that checks each item individually
 */
export function getEstimateSize(items: Array<any>, size: 'xs' | 'sm' | 'md' | 'lg' | 'xl', descriptionKey?: string): number | ((index: number) => number) {
  return (index: number) => {
    const item = items[index];
    const hasDescription_ = descriptionKey ? hasDescription(item, descriptionKey) : false;
    return getSize(size, hasDescription_);
  };
}
