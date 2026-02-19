import type { Preflight } from 'unocss';

export const preflightCssVariables: Preflight = {
  layer: 'theme',
  getCSS: () => {
    return `
      :root {
        --pohon-text-dimmed: var(--akar-neutral-400);
        --pohon-text-muted: var(--akar-neutral-500);
        --pohon-text-toned: var(--akar-neutral-600);
        --pohon-text: var(--akar-neutral-700);
        --pohon-text-highlighted: var(--akar-neutral-900);
        --pohon-text-inverted: #fff;

        --pohon-bg: #fff;
        --pohon-bg-muted: var(--akar-neutral-50);
        --pohon-bg-elevated: var(--akar-neutral-100);
        --pohon-bg-accented: var(--akar-neutral-200);
        --pohon-bg-inverted: var(--akar-neutral-900);

        --pohon-border: var(--akar-neutral-200);
        --pohon-border-muted: var(--akar-neutral-200);
        --pohon-border-accented: var(--akar-neutral-300);
        --pohon-border-inverted: var(--akar-neutral-900);
      }

      .dark {
        --pohon-text-dimmed: var(--akar-neutral-500);
        --pohon-text-muted: var(--akar-neutral-400);
        --pohon-text-toned: var(--akar-neutral-300);
        --pohon-text: var(--akar-neutral-200);
        --pohon-text-highlighted: #fff;
        --pohon-text-inverted: var(--akar-neutral-900);

        --pohon-bg: var(--akar-neutral-900);
        --pohon-bg-muted: var(--akar-neutral-800);
        --pohon-bg-elevated: var(--akar-neutral-800);
        --pohon-bg-accented: var(--akar-neutral-700);
        --pohon-bg-inverted: #fff;

        --pohon-border: var(--akar-neutral-800);
        --pohon-border-muted: var(--akar-neutral-700);
        --pohon-border-accented: var(--akar-neutral-700);
        --pohon-border-inverted: #fff;
      }
    `;
  },
};
