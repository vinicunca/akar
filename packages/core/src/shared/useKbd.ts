import { KEY_CODES } from '@vinicunca/perkakas';

export type KbdKeys = keyof typeof KEY_CODES;

export function useTestKbd() {
  const initTestKbd: Record<KbdKeys, string> = Object.entries({
    ...KEY_CODES,
    SPACE: ' ',
  })
    .reduce((acc, [key, value]) => {
      acc[key as KbdKeys] = `{${value}}`;
      return acc;
    }, {} as Record<KbdKeys, string>);

  return {
    ...initTestKbd,
    SHIFT_TAB: `{Shift>}{${KEY_CODES.TAB}}`,
  };
}
