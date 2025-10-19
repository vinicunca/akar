import { defineAppConfig } from '#imports';
import { accordionTheme } from '~/themes/accordion.theme';
import { alertTheme } from '~/themes/alert.theme';
import { avatarThemes } from '~/themes/avatar.theme';
import { buttonTheme } from '~/themes/button.theme';
import { cardTheme } from '~/themes/card.theme';
import { chipTheme } from '~/themes/chip.theme';
import { dashboardTheme } from '~/themes/dashboard.theme';
import { dialogTheme } from '~/themes/dialog.theme';
import { dropdownTheme } from '~/themes/dropdown.theme';
import { inputTheme } from '~/themes/input.theme';
import { navigationMenuTheme } from '~/themes/navigation-menu.theme';
import { selectTheme } from '~/themes/select.theme';
import { slideoverTheme } from '~/themes/slideover.theme';

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  pohon: {
    accordion: accordionTheme,
    alert: alertTheme,
    ...avatarThemes,
    button: buttonTheme,
    card: cardTheme,
    chip: chipTheme,
    ...dashboardTheme,
    dialog: dialogTheme,
    dropdownMenu: dropdownTheme,
    fieldGroup: {
      base: 'relative',
      variants: {
        orientation: {
          horizontal: 'inline-flex space-x-[-1px]',
          vertical: 'flex flex-col space-y-[-1px]',
        },
      },
    },
    navigationMenu: navigationMenuTheme,
    slideover: slideoverTheme,
    input: inputTheme,
    select: selectTheme,
  },
});
