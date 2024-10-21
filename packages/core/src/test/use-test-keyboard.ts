import { KEY_CODES } from '@vinicunca/perkakas';

export type KbdKeys = keyof typeof KEY_CODES;

export function useTestKeyboard() {
  const initTestKbd: Record<KbdKeys, string> = Object.entries(KEY_CODES)
    .reduce((acc, [key, value]) => {
      acc[key as KbdKeys] = `{${value}}`;
      return acc;
    }, {} as Record<KbdKeys, string>);

  // console.log('🚀 ~ useTestKeyboard ~ initTestKbd:', initTestKbd);
  return {
    ...initTestKbd,
    SHIFT_TAB: `{Shift>}{${KEY_CODES.TAB}}`,
  };
}
