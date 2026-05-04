import { isFunction, isObjectType, isString } from '@vinicunca/perkakas';
/**
 * Checks whether a given VNode is a render-vialble element.
 */
export function isValidVNodeElement(input: any): boolean {
  return (
    input
    && (isString(input.type)
      || isObjectType(input.type)
      || isFunction(input.type))
  );
}
