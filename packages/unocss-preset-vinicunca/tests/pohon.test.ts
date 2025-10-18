import { describe, expect, it } from 'vitest';
import { getButtonTheme } from '../src/pohon/button.pohon';

describe('pohon merge configs', () => {
  it('should merge configs correctly', () => {
    const buttonTheme = getButtonTheme({
      brands: [],
      configs: {
        slots: {
          base: () => '',
        },
      },
    });

    expect(buttonTheme.slots).toMatchInlineSnapshot(`
      {
        "base": "",
        "label": "truncate",
        "leadingAvatar": "shrink-0",
        "leadingIcon": "shrink-0",
        "trailingIcon": "shrink-0",
      }
    `);
  });
});
