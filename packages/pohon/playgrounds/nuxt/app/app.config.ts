import { defineAppConfig } from '#imports';
import { buttonTheme } from '~/themes/button.theme';
import { dashboardTheme } from '~/themes/dashboard.theme';
import { dropdownTheme } from '~/themes/dropdown.theme';
// @unocss-includes

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  pohon: {
    ...dashboardTheme,
    dropdownMenu: dropdownTheme,
    button: buttonTheme,
  },
});
