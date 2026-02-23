import type { Preflight } from 'unocss';

export const preflightCssVariables: Preflight = {
  layer: 'theme',
  getCSS: () => {
    return `
      :root {
        --pohon-text-dimmed: var(--colors-slate-400);
        --pohon-text-muted: var(--colors-slate-500);
        --pohon-text-toned: var(--colors-slate-600);
        --pohon-text: var(--colors-slate-700);
        --pohon-text-highlighted: var(--colors-slate-900);
        --pohon-text-inverted: var(--colors-white);

        --pohon-bg: var(--colors-white);
        --pohon-bg-muted: var(--colors-slate-50);
        --pohon-bg-elevated: var(--colors-slate-100);
        --pohon-bg-accented: var(--colors-slate-200);
        --pohon-bg-inverted: var(--colors-slate-900);

        --pohon-border: var(--colors-slate-200);
        --pohon-border-muted: var(--colors-slate-200);
        --pohon-border-accented: var(--colors-slate-300);
        --pohon-border-inverted: var(--colors-slate-900);
      }

      .dark {
        --pohon-text-dimmed: var(--colors-slate-500);
        --pohon-text-muted: var(--colors-slate-400);
        --pohon-text-toned: var(--colors-slate-300);
        --pohon-text: var(--colors-slate-200);
        --pohon-text-highlighted: var(--colors-white);
        --pohon-text-inverted: var(--colors-slate-900);

        --pohon-bg: var(--colors-slate-900);
        --pohon-bg-muted: var(--colors-slate-800);
        --pohon-bg-elevated: var(--colors-slate-800);
        --pohon-bg-accented: var(--colors-slate-700);
        --pohon-bg-inverted: var(--colors-white);

        --pohon-border: var(--colors-slate-800);
        --pohon-border-muted: var(--colors-slate-700);
        --pohon-border-accented: var(--colors-slate-700);
        --pohon-border-inverted: var(--colors-white);
      }
    `;
  },
};
