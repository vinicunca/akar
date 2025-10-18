import { getAvatarTheme } from './avatar.pohon';
import { getButtonTheme } from './button.pohon';
import { getChipTheme } from './chip.pohon';
import { getDashboardTheme } from './dashboard.pohon';
import { getDialogTheme } from './dialog.pohon';
import { getDropdownTheme } from './dropdown.pohon';
import { getInputTheme } from './input.pohon';
import { getNavigationMenuTheme } from './navigation-menu.pohon';
import { getSelectTheme } from './select.pohon';
import { getSlideoverTheme } from './slideover.pohon';

export function getVinicuncaTheme(
  brands: Array<string>,
  configs: any = {},
) {
  const inputTheme = getInputTheme({ brands, configs });

  return {
    button: getButtonTheme({ brands, configs }),
    ...getAvatarTheme(configs),
    chip: getChipTheme({ brands, configs }),
    ...getDashboardTheme(configs),
    dialog: getDialogTheme(configs),
    dropdown: getDropdownTheme({ brands, configs }),
    input: inputTheme,
    navigationMenu: getNavigationMenuTheme({ brands, configs }),
    select: getSelectTheme({ configs, inputTheme }),
    slideover: getSlideoverTheme(configs),
  };
}
