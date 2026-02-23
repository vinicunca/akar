import type { Extractor } from 'unocss';
import { BRANDS } from '../design.constants';

const COLOR_PATTERN = /([^\s`]*\$\{color\}[^\s`]*)/g;

/**
 * Within pohon-ui's theme files, there's a lot of defition using `${color}`.
 * Since unocss doesn't support dynamic values, we need to extract all the colors from the theme files
 * This extractor will extract all the colors based on the BRANDS.
 */
export const extractorBrandColors: Extractor = {
  name: 'pohon-colors-extractor',
  extract: ({ code }) => {
    const matches = code.match(COLOR_PATTERN);

    if (matches !== null) {
      return matches.flatMap((match) => {
        // eslint-disable-next-line no-template-curly-in-string
        return BRANDS.map((brand) => match.replace('${color}', brand));
      });
    }
  },
};
