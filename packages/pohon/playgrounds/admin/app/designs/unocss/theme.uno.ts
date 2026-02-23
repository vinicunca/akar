import type { VinicuncaTheme } from '@vinicunca/unocss-preset';
import type { ThemeExtender } from 'unocss';

export const extendedColors: ThemeExtender<VinicuncaTheme> = (theme) => {
  return {
    ...theme,
    colors: {
      slate: theme.colors.slate,

      primary: {
        50: 'oklch(96.47% 0.020 233.85)', // #e7f6ff (primary-lighter)
        100: 'oklch(95.05% 0.028 233.64)',
        200: 'oklch(93.64% 0.037 233.44)', // #ceedff (primary-light)
        300: 'oklch(88.18% 0.067 235.73)',
        400: 'oklch(78.69% 0.120 240.52)',
        500: 'oklch(69.19% 0.173 245.30)', // #0aa3ff (primary-base)
        600: 'oklch(62.84% 0.157 245.14)',
        700: 'oklch(56.49% 0.140 244.97)', // #0772b3 (primary-dark)
        800: 'oklch(45.66% 0.115 244.97)',
        900: 'oklch(30.33% 0.083 245.14)',
        950: 'oklch(15.00% 0.050 245.30)',
        DEFAULT: 'oklch(69.19% 0.173 245.30)',
      },

      background: {
        accented: 'var(--pohon-bg-accented)',
        border: 'var(--pohon-border)',
        DEFAULT: 'var(--pohon-bg)',
        elevated: 'var(--pohon-bg-elevated)',
        inverted: 'var(--pohon-bg-inverted)',
        muted: 'var(--pohon-bg-muted)',
      },
      border: {
        accented: 'var(--pohon-border-accented)',
        bg: 'var(--pohon-bg)',
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
        muted: 'var(--pohon-border-muted)',
      },
      divide: {
        accented: 'var(--pohon-border-accented)',
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
        muted: 'var(--pohon-border-muted)',
      },
      fill: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      outline: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      ring: {
        accented: 'var(--pohon-border-accented)',
        bg: 'var(--pohon-bg)',
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
        muted: 'var(--pohon-border-muted)',
        offset: {
          accented: 'var(--pohon-border-accented)',
          bg: 'var(--pohon-bg)',
          DEFAULT: 'var(--pohon-border)',
          inverted: 'var(--pohon-border-inverted)',
          muted: 'var(--pohon-border-muted)',
        },
      },
      stroke: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      text: {
        DEFAULT: 'var(--pohon-text)',
        dimmed: 'var(--pohon-text-dimmed)',
        highlighted: 'var(--pohon-text-highlighted)',
        inverted: 'var(--pohon-text-inverted)',
        muted: 'var(--pohon-text-muted)',
        toned: 'var(--pohon-text-toned)',
      },
    },
  };
};

export const coreTheme: VinicuncaTheme = {
  container: {
    '8xl': '90rem',
  },

  font: {
    sans: 'Inter',
  },
};
