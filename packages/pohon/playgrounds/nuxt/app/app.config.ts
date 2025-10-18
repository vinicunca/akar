import { defineAppConfig } from '#imports';
import { getVinicuncaTheme } from '@vinicunca/unocss-preset/pohon';
import { BRANDS } from '~/themes/constant';

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  pohon: {
    ...getVinicuncaTheme(BRANDS),
    // ...dashboardTheme,
    // button: buttonTheme,
    // dropdownMenu: dropdownTheme,
    // navigationMenu: navigationMenuTheme,
    // dialog: dialogTheme,
    // slideover: slideoverTheme,
    // chip: chipTheme,
    // input: inputTheme,
    // select: selectTheme,
    // ...avatarThemes,

    // fieldGroup: {
    //   base: 'relative',
    //   variants: {
    //     orientation: {
    //       horizontal: 'inline-flex space-x-[-1px]',
    //       vertical: 'flex flex-col space-y-[-1px]',
    //     },
    //   },
    // },
  },
});
