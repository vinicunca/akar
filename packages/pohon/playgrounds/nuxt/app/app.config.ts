import { defineAppConfig } from '#imports';
import { avatarThemes } from '~/themes/avatar.theme';
import { buttonTheme } from '~/themes/button.theme';
import { chipTheme } from '~/themes/chip.theme';
import { dashboardTheme } from '~/themes/dashboard.theme';
import { dialogTheme } from '~/themes/dialog.theme';
import { dropdownTheme } from '~/themes/dropdown.theme';
import { navigationMenuTheme } from '~/themes/navigation-menu.theme';
import { slideoverTheme } from '~/themes/slideover.theme';
// @unocss-includes

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  pohon: {
    ...dashboardTheme,
    button: buttonTheme,
    dropdownMenu: dropdownTheme,
    navigationMenu: navigationMenuTheme,
    dialog: dialogTheme,
    slideover: slideoverTheme,
    chip: chipTheme,
    ...avatarThemes,

    fieldGroup: {
      base: 'relative',
      variants: {
        orientation: {
          horizontal: 'inline-flex space-x-[-1px]',
          vertical: 'flex flex-col space-y-[-1px]',
        },
      },
    },
  },
});
