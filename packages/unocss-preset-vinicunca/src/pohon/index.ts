import { getButtonTheme } from './button.pohon';

export function getVinicuncaTheme(brands: Array<string>) {
  return {
    button: getButtonTheme(brands),
  };
}
