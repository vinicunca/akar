import type { DefineAkarElementsOptions } from './define';
import type { AkarElementFamily, AkarElementPartDefinition, AttributeKind } from './meta';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from '@/Accordion';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/AlertDialog';
import { AspectRatio } from '@/AspectRatio';
import { AutocompleteInput, AutocompleteRoot } from '@/Autocomplete';
import { AvatarFallback, AvatarRoot } from '@/Avatar';
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  CalendarView,
  CalendarViewTrigger,
} from '@/Calendar';
import { CheckboxGroupRoot, CheckboxIndicator, CheckboxRoot } from '@/Checkbox';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '@/Collapsible';
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb } from '@/ColorArea';
import { ColorFieldInput, ColorFieldRoot } from '@/ColorField';
import { ColorSliderRoot, ColorSliderThumb, ColorSliderTrack } from '@/ColorSlider';
import { ColorSwatch } from '@/ColorSwatch';
import { ColorSwatchPickerItem, ColorSwatchPickerItemIndicator, ColorSwatchPickerItemSwatch, ColorSwatchPickerRoot } from '@/ColorSwatchPicker';
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxCancel,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/Combobox';
import { ConfigProvider } from '@/ConfigProvider';
import {
  ContextMenuArrow,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/ContextMenu';
import { DateFieldInput, DateFieldRoot } from '@/DateField';
import {
  DatePickerAnchor,
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerClose,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewTrigger,
} from '@/DatePicker';
import { DateRangeFieldInput, DateRangeFieldRoot } from '@/DateRangeField';
import {
  DateRangePickerAnchor,
  DateRangePickerArrow,
  DateRangePickerCalendar,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
  DateRangePickerClose,
  DateRangePickerContent,
  DateRangePickerField,
  DateRangePickerGrid,
  DateRangePickerGridBody,
  DateRangePickerGridHead,
  DateRangePickerGridRow,
  DateRangePickerHeadCell,
  DateRangePickerHeader,
  DateRangePickerHeading,
  DateRangePickerInput,
  DateRangePickerNext,
  DateRangePickerPrev,
  DateRangePickerRoot,
  DateRangePickerTrigger,
  DateRangePickerView,
  DateRangePickerViewTrigger,
} from '@/DateRangePicker';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/Dialog';
import {
  DrawerBackdrop,
  DrawerClose,
  DrawerDescription,
  DrawerGrabber,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerRoot,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerVirtualKeyboardProvider,
} from '@/Drawer';
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuFilter,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/DropdownMenu';
import {
  EditableArea,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableRoot,
  EditableSubmitTrigger,
  injectEditableRootContext,
} from '@/Editable';
import { FieldDescription, FieldError, FieldLabel, FieldRoot } from '@/Field';
import { FormRoot } from '@/Form';
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '@/HoverCard';
import {
  ListboxContent,
  ListboxFilter,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot,
} from '@/Listbox';
import {
  MenubarArrow,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarItemIndicator,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRoot,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/Menubar';
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuSub,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/NavigationMenu';
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from '@/NumberField';
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from '@/Pagination';
import { PinInputInput, PinInputRoot } from '@/PinInput';
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '@/Popover';
import { ProgressIndicator, ProgressRoot } from '@/Progress';
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from '@/RadioGroup';
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  RangeCalendarView,
  RangeCalendarViewTrigger,
} from '@/RangeCalendar';
import { RatingItem, RatingItemIndicator, RatingRoot } from '@/Rating';
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@/ScrollArea';
import {
  SelectArrow,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '@/Select';
import { Separator } from '@/Separator';
import { normalizeColor } from '@/shared/color';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@/Slider';
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from '@/Splitter';
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/Stepper';
import { SwitchRoot, SwitchThumb } from '@/Switch';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from '@/Tabs';
import { TagGroupItem, TagGroupItemDelete, TagGroupItemText, TagGroupRoot } from '@/TagGroup';
import {
  injectTagsInputItemContext,
  TagsInputClear,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from '@/TagsInput';
import { TimeFieldInput, TimeFieldRoot } from '@/TimeField';
import { TimeRangeFieldInput, TimeRangeFieldRoot } from '@/TimeRangeField';
import {
  ToastAction,
  ToastArrow,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastPositioner,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from '@/Toast';
import { Toggle } from '@/Toggle';
import { ToggleGroupItem, ToggleGroupRoot } from '@/ToggleGroup';
import { ToolbarButton, ToolbarRoot, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '@/Toolbar';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from '@/Tooltip';
import { TreeItem, TreeRoot } from '@/Tree';
import { VisuallyHidden } from '@/VisuallyHidden';
import { defineAkarElements } from './define';
import { ToastProviderElement } from './toast';

// Each family is a plain object, so a bundler drops the ones an app never imports.

/** Positioned content: the reference and collision boundary are elements, not attributes. */
const POPPER_PROPERTIES: Record<string, AttributeKind> = { reference: 'property', collisionBoundary: 'property' };
/** A menu checkbox item's value can be `'indeterminate'`. */
const CHECKED_STATE: Record<string, AttributeKind> = { modelValue: 'booleanish' };

/** `<akar-alert-dialog-root>`, `-trigger`, `-portal`, `-overlay`, `-content`, `-title`, `-description`, `-cancel`, `-action`. */
export const alertDialogElements: AkarElementFamily = {
  name: 'alert-dialog',
  parts: {
    AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
  },
};

/** `<akar-accordion-root>`, `-item`, `-header`, `-trigger`, `-content`. */
export const accordionElements: AkarElementFamily = {
  name: 'accordion',
  parts: {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    // Renders `CollapsibleTrigger`, a `<button>` by default.
    AccordionTrigger: { component: AccordionTrigger, semantics: 'button' },
    AccordionContent,
  },
};

/** `<akar-checkbox-root>`, `-indicator`, `<akar-checkbox-group-root>`. */
export const checkboxElements: AkarElementFamily = {
  name: 'checkbox',
  parts: {
    CheckboxRoot: {
      component: CheckboxRoot,
      attributes: { modelValue: 'booleanish', defaultValue: 'booleanish' },
    },
    CheckboxIndicator,
    CheckboxGroupRoot,
  },
};

/** `<akar-collapsible-root>`, `-trigger`, `-content`. */
export const collapsibleElements: AkarElementFamily = {
  name: 'collapsible',
  parts: {
    CollapsibleRoot,
    CollapsibleTrigger,
    CollapsibleContent,
  },
};

/**
 * `<akar-context-menu-root>`, `-trigger`, `-portal`, `-content`, `-arrow`, `-item`, `-group`,
 * `-label`, `-checkbox-item`, `-radio-group`, `-radio-item`, `-item-indicator`, `-separator`,
 * `-sub`, `-sub-trigger`, `-sub-content`.
 */
export const contextMenuElements: AkarElementFamily = {
  name: 'context-menu',
  parts: {
    ContextMenuRoot,
    ContextMenuTrigger,
    ContextMenuPortal,
    ContextMenuContent: { component: ContextMenuContent, attributes: POPPER_PROPERTIES },
    ContextMenuArrow,
    ContextMenuItem,
    ContextMenuGroup,
    ContextMenuLabel,
    ContextMenuCheckboxItem: { component: ContextMenuCheckboxItem, attributes: CHECKED_STATE },
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuItemIndicator,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent: { component: ContextMenuSubContent, attributes: POPPER_PROPERTIES },
  },
};

/** `<akar-dialog-root>`, `-trigger`, `-portal`, `-overlay`, `-content`, `-title`, `-description`, `-close`. */
export const dialogElements: AkarElementFamily = {
  name: 'dialog',
  parts: {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
  },
};

/**
 * `<akar-drawer-root>`, `-trigger`, `-portal`, `-backdrop`, `-viewport`, `-popup`, `-title`,
 * `-description`, `-close`, `-grabber`, `-swipe-area`, `-provider`, `-indent`,
 * `-indent-background`, `-virtual-keyboard-provider`.
 */
export const drawerElements: AkarElementFamily = {
  name: 'drawer',
  parts: {
    DrawerRoot,
    DrawerTrigger,
    DrawerPortal,
    DrawerBackdrop,
    DrawerViewport,
    DrawerPopup,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
    DrawerGrabber,
    DrawerSwipeArea,
    DrawerProvider,
    DrawerIndent,
    DrawerIndentBackground,
    DrawerVirtualKeyboardProvider,
  },
};

/**
 * `<akar-dropdown-menu-root>`, `-trigger`, `-portal`, `-content`, `-filter`, `-arrow`, `-item`, `-group`,
 * `-label`, `-checkbox-item`, `-radio-group`, `-radio-item`, `-item-indicator`, `-separator`,
 * `-sub`, `-sub-trigger`, `-sub-content`.
 */
export const dropdownMenuElements: AkarElementFamily = {
  name: 'dropdown-menu',
  parts: {
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuContent: { component: DropdownMenuContent, attributes: POPPER_PROPERTIES },
    // A text field: the part renders onto the element's `<input>` child.
    DropdownMenuFilter: { component: DropdownMenuFilter, target: 'input' },
    DropdownMenuArrow,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem: { component: DropdownMenuCheckboxItem, attributes: CHECKED_STATE },
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuItemIndicator,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent: { component: DropdownMenuSubContent, attributes: POPPER_PROPERTIES },
  },
};

/** `<akar-hover-card-root>`, `-trigger`, `-portal`, `-content`, `-arrow`. */
export const hoverCardElements: AkarElementFamily = {
  name: 'hover-card',
  parts: {
    HoverCardRoot,
    HoverCardTrigger: {
      component: HoverCardTrigger,
      attributes: { reference: 'property' },
    },
    HoverCardPortal,
    HoverCardContent: { component: HoverCardContent, attributes: POPPER_PROPERTIES },
    HoverCardArrow,
  },
};

/**
 * `<akar-menubar-root>`, `-menu`, `-trigger`, `-portal`, `-content`, `-arrow`, `-item`, `-group`,
 * `-label`, `-checkbox-item`, `-radio-group`, `-radio-item`, `-item-indicator`, `-separator`,
 * `-sub`, `-sub-trigger`, `-sub-content`.
 */
export const menubarElements: AkarElementFamily = {
  name: 'menubar',
  parts: {
    MenubarRoot,
    MenubarMenu,
    MenubarTrigger,
    MenubarPortal,
    MenubarContent: { component: MenubarContent, attributes: POPPER_PROPERTIES },
    MenubarArrow,
    MenubarItem,
    MenubarGroup,
    MenubarLabel,
    MenubarCheckboxItem: { component: MenubarCheckboxItem, attributes: CHECKED_STATE },
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarItemIndicator,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent: { component: MenubarSubContent, attributes: POPPER_PROPERTIES },
  },
};

/**
 * `<akar-navigation-menu-root>`, `-sub`, `-list`, `-item`, `-trigger`, `-content`, `-link`,
 * `-indicator`, `-viewport`.
 */
export const navigationMenuElements: AkarElementFamily = {
  name: 'navigation-menu',
  parts: {
    NavigationMenuRoot,
    NavigationMenuSub,
    NavigationMenuList,
    NavigationMenuItem,
    // While open with a viewport, it renders a focus proxy (Tab moves into the
    // content) and an `aria-owns` element next to itself.
    NavigationMenuTrigger: { component: NavigationMenuTrigger, siblings: 'after' },
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
  },
};

/** `<akar-popover-root>`, `-trigger`, `-anchor`, `-portal`, `-content`, `-arrow`, `-close`. */
export const popoverElements: AkarElementFamily = {
  name: 'popover',
  parts: {
    PopoverRoot,
    PopoverTrigger,
    PopoverAnchor: {
      component: PopoverAnchor,
      attributes: { reference: 'property' },
    },
    PopoverPortal,
    PopoverContent: { component: PopoverContent, attributes: POPPER_PROPERTIES },
    PopoverArrow,
    PopoverClose,
  },
};

/** `<akar-switch-root>`, `-thumb`. */
export const switchElements: AkarElementFamily = {
  name: 'switch',
  parts: {
    SwitchRoot: {
      component: SwitchRoot,
      attributes: { modelValue: 'booleanish', defaultValue: 'booleanish' },
    },
    SwitchThumb,
  },
};

/** `<akar-tabs-root>`, `-list`, `-trigger`, `-content`, `-indicator`. */
export const tabsElements: AkarElementFamily = {
  name: 'tabs',
  parts: {
    TabsRoot,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsIndicator,
  },
};

/**
 * `<akar-toast-provider>`, `-viewport`, `-root`, `-title`, `-description`, `-action`, `-close`,
 * `-portal`, `-positioner`, `-arrow`.
 */
export const toastElements: AkarElementFamily = {
  name: 'toast',
  parts: {
    ToastProvider: ToastProviderElement,
    ToastViewport,
    // Its live-region announcement renders next to it (the toast itself moves
    // into the viewport).
    ToastRoot: { component: ToastRoot, siblings: 'after' },
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    ToastPortal,
    ToastPositioner: {
      component: ToastPositioner,
      attributes: { anchor: 'property', collisionBoundary: 'property' },
    },
    ToastArrow,
  },
};

/** `<akar-toggle>`. */
export const toggleElements: AkarElementFamily = {
  name: 'toggle',
  parts: {
    Toggle,
  },
};

/** `<akar-aspect-ratio>`. */
export const aspectRatioElements: AkarElementFamily = {
  name: 'aspect-ratio',
  parts: {
    // Renders a sizing wrapper around itself, which takes the element's place.
    AspectRatio,
  },
};

/** `<akar-tooltip-provider>`, `<akar-tooltip-root>`, `-trigger`, `-portal`, `-content`, `-arrow`. */
export const tooltipElements: AkarElementFamily = {
  name: 'tooltip',
  parts: {
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger: {
      component: TooltipTrigger,
      attributes: { reference: 'property' },
    },
    TooltipPortal,
    TooltipContent: {
      component: TooltipContent,
      attributes: { collisionBoundary: 'property' },
    },
    TooltipArrow,
  },
};

// Collections. Values can be of any type: an attribute sets a string, the
// property any value (objects are compared with `by`). Functions (`filter`,
// `displayValue`, `getKey`) and elements (`reference`) are properties only.

/**
 * `<akar-listbox-root>`, `-content`, `-filter`, `-item`, `-item-indicator`, `-group`,
 * `-group-label`. Not `ListboxVirtualizer`: it renders its items from a scoped slot.
 */
export const listboxElements: AkarElementFamily = {
  name: 'listbox',
  parts: {
    ListboxRoot: {
      component: ListboxRoot,
      attributes: { filter: 'property' },
    },
    ListboxContent,
    // A text field: the part renders onto the element's `<input>` child.
    ListboxFilter: { component: ListboxFilter, target: 'input' },
    ListboxItem,
    ListboxItemIndicator,
    ListboxGroup,
    ListboxGroupLabel,
  },
};

// (Families are written out in full: a call or a spread at module level would
// keep every family in a bundle that imports one.)

/** Shows its value while it has no children, like the Vue component's fallback. */
const COMBOBOX_ITEM: AkarElementPartDefinition = {
  component: ComboboxItem,
  text: (_slotProps, props) => props.value,
};

/**
 * `<akar-combobox-root>`, `-input`, `-anchor`, `-trigger`, `-cancel`, `-portal`,
 * `-content`, `-viewport`, `-empty`, `-item`, `-item-indicator`, `-group`, `-label`,
 * `-separator`, `-arrow`. Not `ComboboxVirtualizer` (a scoped slot).
 */
export const comboboxElements: AkarElementFamily = {
  name: 'combobox',
  parts: {
    ComboboxRoot: {
      component: ComboboxRoot,
      attributes: { filter: 'property' },
    },
    ComboboxInput: { component: ComboboxInput, target: 'input' },
    ComboboxAnchor: { component: ComboboxAnchor, attributes: POPPER_PROPERTIES },
    ComboboxTrigger,
    ComboboxCancel,
    ComboboxPortal,
    ComboboxContent: { component: ComboboxContent, attributes: POPPER_PROPERTIES },
    ComboboxViewport,
    ComboboxEmpty,
    ComboboxItem: COMBOBOX_ITEM,
    ComboboxItemIndicator,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxSeparator,
    ComboboxArrow,
  },
};

/**
 * `<akar-avatar-root>`, `-fallback`. `AvatarImage` is not available: a custom
 * element cannot be an `<img>`.
 */
export const avatarElements: AkarElementFamily = {
  name: 'avatar',
  parts: {
    AvatarRoot,
    AvatarFallback,
  },
};

/**
 * `<akar-autocomplete-root>`, `-input`, and the Combobox parts under the
 * Autocomplete name (`-anchor`, `-content`, `-item`, …), as in Vue.
 */
export const autocompleteElements: AkarElementFamily = {
  name: 'autocomplete',
  parts: {
    AutocompleteRoot: {
      component: AutocompleteRoot,
      attributes: { filter: 'property' },
    },
    AutocompleteInput: { component: AutocompleteInput, target: 'input' },
    AutocompleteAnchor: { component: ComboboxAnchor, attributes: POPPER_PROPERTIES },
    AutocompleteTrigger: ComboboxTrigger,
    AutocompleteCancel: ComboboxCancel,
    AutocompletePortal: ComboboxPortal,
    AutocompleteContent: { component: ComboboxContent, attributes: POPPER_PROPERTIES },
    AutocompleteViewport: ComboboxViewport,
    AutocompleteEmpty: ComboboxEmpty,
    AutocompleteItem: COMBOBOX_ITEM,
    AutocompleteItemIndicator: ComboboxItemIndicator,
    AutocompleteGroup: ComboboxGroup,
    AutocompleteLabel: ComboboxLabel,
    AutocompleteSeparator: ComboboxSeparator,
  },
};

/**
 * `<akar-config-provider>`: provides `dir`, `locale`, `nonce`, `scroll-body` and
 * `teleport-to` to the Akar elements inside it, as `ConfigProvider` does in Vue.
 */
export const configProviderElements: AkarElementFamily = {
  name: 'config-provider',
  parts: {
    ConfigProvider,
  },
};

/**
 * `<akar-field-root>`, `-label`, `-description`, `-error`. `FieldControl` (an
 * `<input>`) and `FieldValidity` (a scoped slot) are not available: use a Akar
 * element control, such as `<akar-checkbox-root>`.
 */
export const fieldElements: AkarElementFamily = {
  name: 'field',
  parts: {
    FieldRoot,
    // Never a native `<label>`: labels its control through `aria-labelledby`, and
    // focuses it on click.
    FieldLabel: {
      component: FieldLabel,
      fixedProps: { nativeLabel: false, for: undefined },
    },
    FieldDescription,
    // `match` is a flag or a `ValidityState` key: `match`, `match="valueMissing"`.
    FieldError: {
      component: FieldError,
      attributes: { match: 'booleanish' },
    },
  },
};

/** `<akar-form-root>`, around a native `<form novalidate>`. */
export const formElements: AkarElementFamily = {
  name: 'form',
  parts: {
    FormRoot: {
      component: FormRoot,
      // Listening to `form-submit` prevents the native submission.
      listenedEmits: ['formSubmit'],
    },
  },
};

/**
 * `<akar-select-root>`, `-trigger`, `-value`, `-icon`, `-portal`, `-content`,
 * `-viewport`, `-scroll-up-button`, `-scroll-down-button`, `-item`, `-item-text`,
 * `-item-indicator`, `-group`, `-label`, `-separator`, `-arrow`. Not
 * `SelectVirtualizer` (a scoped slot).
 */
export const selectElements: AkarElementFamily = {
  name: 'select',
  parts: {
    SelectRoot,
    SelectTrigger: {
      component: SelectTrigger,
      attributes: { reference: 'property' },
    },
    SelectValue: {
      component: SelectValue,
      // The selected labels, or the placeholder.
      text: ({ selectedLabels }, props) => selectedLabels?.length
        ? selectedLabels.join(', ')
        : props.placeholder,
    },
    SelectIcon,
    SelectPortal,
    SelectContent: { component: SelectContent, attributes: POPPER_PROPERTIES },
    SelectViewport,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SelectItem,
    SelectItemText,
    SelectItemIndicator,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
    SelectArrow,
  },
};

/**
 * `<akar-pagination-root>`, `-list`, `-list-item`, `-first`, `-prev`, `-next`,
 * `-last`, `-ellipsis`.
 */
export const paginationElements: AkarElementFamily = {
  name: 'pagination',
  parts: {
    PaginationRoot,
    PaginationList,
    PaginationListItem,
    PaginationFirst,
    PaginationPrev,
    PaginationNext,
    PaginationLast,
    PaginationEllipsis,
  },
};

/** `<akar-progress-root>`, `-indicator`. */
export const progressElements: AkarElementFamily = {
  name: 'progress',
  parts: {
    ProgressRoot,
    ProgressIndicator,
  },
};

/** `<akar-radio-group-root>`, `-item`, `-indicator`. */
export const radioGroupElements: AkarElementFamily = {
  name: 'radio-group',
  parts: {
    RadioGroupRoot,
    RadioGroupItem,
    RadioGroupIndicator,
  },
};

/** `<akar-scroll-area-root>`, `-viewport`, `-scrollbar`, `-thumb`, `-corner`. */
export const scrollAreaElements: AkarElementFamily = {
  name: 'scroll-area',
  parts: {
    ScrollAreaRoot,
    // The element is the content: the scrolling viewport is a wrapper around it.
    ScrollAreaViewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner,
  },
};

/** `<akar-separator>`. */
export const separatorElements: AkarElementFamily = {
  name: 'separator',
  parts: {
    Separator,
  },
};

/** `<akar-splitter-group>`, `-panel`, `-resize-handle`. */
export const splitterElements: AkarElementFamily = {
  name: 'splitter',
  parts: {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  },
};

/**
 * `<akar-tree-root>`, `<akar-tree-item>`. In Vue the root hands its flattened items
 * to a scoped slot; as elements you render the items (see the guide). Not
 * `TreeVirtualizer` (a scoped slot).
 */
export const treeElements: AkarElementFamily = {
  name: 'tree',
  parts: {
    // Items are objects.
    TreeRoot: {
      component: TreeRoot,
      attributes: { modelValue: 'property', defaultValue: 'property' },
    },
    TreeItem: {
      component: TreeItem,
      attributes: { value: 'property' },
    },
  },
};

/** `<akar-tags-input-root>`, `-input`, `-item`, `-item-text`, `-item-delete`, `-clear`. */
export const tagsInputElements: AkarElementFamily = {
  name: 'tags-input',
  parts: {
    TagsInputRoot,
    TagsInputInput: { component: TagsInputInput, target: 'input' },
    TagsInputItem,
    // Shows the tag's `displayValue` while it has no children.
    TagsInputItemText: {
      component: TagsInputItemText,
      text: () => injectTagsInputItemContext().displayValue.value,
    },
    TagsInputItemDelete,
    TagsInputClear,
  },
};

/** `<akar-tag-group-root>`, `-item`, `-item-text`, `-item-delete`. */
export const tagGroupElements: AkarElementFamily = {
  name: 'tag-group',
  parts: {
    TagGroupRoot,
    TagGroupItem,
    TagGroupItemText,
    TagGroupItemDelete,
  },
};

/**
 * `<akar-stepper-root>`, `-item`, `-trigger`, `-indicator`, `-title`,
 * `-description`, `-separator`.
 */
export const stepperElements: AkarElementFamily = {
  name: 'stepper',
  parts: {
    // Its "Step 2 of 4" live region goes inside the element.
    StepperRoot: { component: StepperRoot, siblings: 'inside' },
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperDescription,
    StepperSeparator,
  },
};

/** `<akar-toggle-group-root>`, `-item`. */
export const toggleGroupElements: AkarElementFamily = {
  name: 'toggle-group',
  parts: {
    ToggleGroupRoot,
    ToggleGroupItem,
  },
};

/**
 * `<akar-toolbar-root>`, `-button`, `-separator`, `-toggle-group`, `-toggle-item`.
 * `ToolbarLink` is not available: a custom element cannot be a link.
 */
export const toolbarElements: AkarElementFamily = {
  name: 'toolbar',
  parts: {
    ToolbarRoot,
    ToolbarButton,
    ToolbarSeparator,
    ToolbarToggleGroup,
    // Renders `ToggleGroupItem`, a `<button>` by default.
    ToolbarToggleItem: { component: ToolbarToggleItem, semantics: 'button' },
  },
};

/** `<akar-visually-hidden>`. */
export const visuallyHiddenElements: AkarElementFamily = {
  name: 'visually-hidden',
  parts: {
    VisuallyHidden,
  },
};

/**
 * `<akar-editable-root>`, `-area`, `-input`, `-preview`, `-edit-trigger`,
 * `-submit-trigger`, `-cancel-trigger`.
 */
export const editableElements: AkarElementFamily = {
  name: 'editable',
  parts: {
    EditableRoot,
    EditableArea,
    EditableInput: { component: EditableInput, target: 'input' },
    EditablePreview: {
      component: EditablePreview,
      // The value, or the preview placeholder.
      text: () => {
        const context = injectEditableRootContext();
        return context.modelValue.value || context.placeholder.value?.preview;
      },
    },
    EditableEditTrigger,
    EditableSubmitTrigger,
    EditableCancelTrigger,
  },
};

// Date and time props are Temporal values: as attributes they take ISO 8601
// strings (see `AttributeKind`), as properties the Temporal objects themselves.
const DATE_ATTRIBUTES: Record<string, AttributeKind> = {
  modelValue: 'date',
  defaultValue: 'date',
  placeholder: 'date',
  defaultPlaceholder: 'date',
  minValue: 'date',
  maxValue: 'date',
  value: 'date',
};
const DATE_RANGE_ATTRIBUTES: Record<string, AttributeKind> = {
  modelValue: 'date-range',
  defaultValue: 'date-range',
  placeholder: 'date',
  defaultPlaceholder: 'date',
  minValue: 'date',
  maxValue: 'date',
};
const TIME_ATTRIBUTES: Record<string, AttributeKind> = {
  modelValue: 'time',
  defaultValue: 'time',
  placeholder: 'time',
  defaultPlaceholder: 'time',
  minValue: 'time',
  maxValue: 'time',
};
const TIME_RANGE_ATTRIBUTES: Record<string, AttributeKind> = {
  modelValue: 'time-range',
  defaultValue: 'time-range',
  placeholder: 'time',
  defaultPlaceholder: 'time',
  minValue: 'time',
  maxValue: 'time',
};

/**
 * `<akar-calendar-root>`, `-header`, `-heading`, `-prev`, `-next`, `-grid`,
 * `-grid-head`, `-grid-body`, `-grid-row`, `-head-cell`, `-cell`, `-cell-trigger`,
 * `-view`, `-view-trigger`.
 */
export const calendarElements: AkarElementFamily = {
  name: 'calendar',
  parts: {
    // The visually hidden heading the grids are labelled by goes inside the root.
    CalendarRoot: { component: CalendarRoot, attributes: DATE_ATTRIBUTES, siblings: 'inside' },
    CalendarHeader,
    CalendarHeading,
    CalendarPrev,
    CalendarNext,
    CalendarGrid: { component: CalendarGrid, attributes: DATE_ATTRIBUTES },
    CalendarGridHead,
    CalendarGridBody,
    CalendarGridRow,
    CalendarHeadCell,
    CalendarCell: { component: CalendarCell, attributes: DATE_ATTRIBUTES },
    CalendarCellTrigger: { component: CalendarCellTrigger, attributes: DATE_ATTRIBUTES },
    CalendarView,
    CalendarViewTrigger,
  },
};

/** `<akar-range-calendar-root>` and the same parts as `calendarElements`. */
export const rangeCalendarElements: AkarElementFamily = {
  name: 'range-calendar',
  parts: {
    RangeCalendarRoot: { component: RangeCalendarRoot, attributes: DATE_RANGE_ATTRIBUTES, siblings: 'inside' },
    RangeCalendarHeader,
    RangeCalendarHeading,
    RangeCalendarPrev,
    RangeCalendarNext,
    RangeCalendarGrid: { component: RangeCalendarGrid, attributes: DATE_ATTRIBUTES },
    RangeCalendarGridHead,
    RangeCalendarGridBody,
    RangeCalendarGridRow,
    RangeCalendarHeadCell,
    RangeCalendarCell: { component: RangeCalendarCell, attributes: DATE_ATTRIBUTES },
    RangeCalendarCellTrigger: { component: RangeCalendarCellTrigger, attributes: DATE_ATTRIBUTES },
    RangeCalendarView,
    RangeCalendarViewTrigger,
  },
};

/** `<akar-date-field-root>`, `-input`. */
export const dateFieldElements: AkarElementFamily = {
  name: 'date-field',
  parts: {
    DateFieldRoot: { component: DateFieldRoot, attributes: DATE_ATTRIBUTES },
    DateFieldInput,
  },
};

/** `<akar-date-range-field-root>`, `-input`. */
export const dateRangeFieldElements: AkarElementFamily = {
  name: 'date-range-field',
  parts: {
    DateRangeFieldRoot: { component: DateRangeFieldRoot, attributes: DATE_RANGE_ATTRIBUTES },
    DateRangeFieldInput,
  },
};

/** `<akar-time-field-root>`, `-input`. */
export const timeFieldElements: AkarElementFamily = {
  name: 'time-field',
  parts: {
    TimeFieldRoot: { component: TimeFieldRoot, attributes: TIME_ATTRIBUTES },
    TimeFieldInput,
  },
};

/** `<akar-time-range-field-root>`, `-input`. */
export const timeRangeFieldElements: AkarElementFamily = {
  name: 'time-range-field',
  parts: {
    TimeRangeFieldRoot: { component: TimeRangeFieldRoot, attributes: TIME_RANGE_ATTRIBUTES },
    TimeRangeFieldInput,
  },
};

/**
 * `<akar-date-picker-root>`, `-field`, `-input`, `-trigger`, `-anchor`, `-content`,
 * `-arrow`, `-close`, `-calendar` and the calendar parts (`-header`, `-grid`,
 * `-cell-trigger`, …).
 */
export const datePickerElements: AkarElementFamily = {
  name: 'date-picker',
  // Most parts render the `Popover` / `Calendar` ones, which default to buttons
  // and table parts: `semantics` stands in for their `as` default.
  parts: {
    DatePickerRoot: { component: DatePickerRoot, attributes: DATE_ATTRIBUTES },
    // The field and the calendar have no props of their own: `asChild` falls
    // through to the `DateFieldRoot` / `CalendarRoot` they render. The field
    // renders the hidden input of the root's `name`, so it is the one that submits.
    DatePickerField: { component: DatePickerField, asChild: true, formAssociated: true },
    DatePickerInput,
    DatePickerTrigger: { component: DatePickerTrigger, semantics: 'button' },
    DatePickerAnchor: {
      component: DatePickerAnchor,
      attributes: { reference: 'property' },
    },
    DatePickerContent: {
      component: DatePickerContent,
      attributes: { reference: 'property', collisionBoundary: 'property' },
    },
    DatePickerArrow: { component: DatePickerArrow, semantics: 'svg' },
    DatePickerClose: { component: DatePickerClose, semantics: 'button' },
    DatePickerCalendar: { component: DatePickerCalendar, asChild: true, siblings: 'inside' },
    DatePickerHeader,
    DatePickerHeading,
    DatePickerPrev: { component: DatePickerPrev, semantics: 'button' },
    DatePickerNext: { component: DatePickerNext, semantics: 'button' },
    DatePickerGrid: { component: DatePickerGrid, attributes: DATE_ATTRIBUTES, semantics: 'table' },
    DatePickerGridHead: { component: DatePickerGridHead, semantics: 'thead' },
    DatePickerGridBody: { component: DatePickerGridBody, semantics: 'tbody' },
    DatePickerGridRow: { component: DatePickerGridRow, semantics: 'tr' },
    DatePickerHeadCell: { component: DatePickerHeadCell, semantics: 'th' },
    DatePickerCell: { component: DatePickerCell, attributes: DATE_ATTRIBUTES, semantics: 'td' },
    DatePickerCellTrigger: { component: DatePickerCellTrigger, attributes: DATE_ATTRIBUTES },
    DatePickerView,
    DatePickerViewTrigger: { component: DatePickerViewTrigger, semantics: 'button' },
  },
};

/** `<akar-date-range-picker-root>` and the same parts as `datePickerElements`. */
export const dateRangePickerElements: AkarElementFamily = {
  name: 'date-range-picker',
  parts: {
    DateRangePickerRoot: { component: DateRangePickerRoot, attributes: DATE_RANGE_ATTRIBUTES },
    DateRangePickerField: { component: DateRangePickerField, asChild: true, formAssociated: true },
    DateRangePickerInput,
    DateRangePickerTrigger: { component: DateRangePickerTrigger, semantics: 'button' },
    DateRangePickerAnchor: {
      component: DateRangePickerAnchor,
      attributes: { reference: 'property' },
    },
    DateRangePickerContent: {
      component: DateRangePickerContent,
      attributes: { reference: 'property', collisionBoundary: 'property' },
    },
    DateRangePickerArrow: { component: DateRangePickerArrow, semantics: 'svg' },
    DateRangePickerClose: { component: DateRangePickerClose, semantics: 'button' },
    DateRangePickerCalendar: { component: DateRangePickerCalendar, asChild: true, siblings: 'inside' },
    DateRangePickerHeader,
    DateRangePickerHeading,
    DateRangePickerPrev: { component: DateRangePickerPrev, semantics: 'button' },
    DateRangePickerNext: { component: DateRangePickerNext, semantics: 'button' },
    DateRangePickerGrid: { component: DateRangePickerGrid, attributes: DATE_ATTRIBUTES, semantics: 'table' },
    DateRangePickerGridHead: { component: DateRangePickerGridHead, semantics: 'thead' },
    DateRangePickerGridBody: { component: DateRangePickerGridBody, semantics: 'tbody' },
    DateRangePickerGridRow: { component: DateRangePickerGridRow, semantics: 'tr' },
    DateRangePickerHeadCell: { component: DateRangePickerHeadCell, semantics: 'th' },
    DateRangePickerCell: { component: DateRangePickerCell, attributes: DATE_ATTRIBUTES, semantics: 'td' },
    DateRangePickerCellTrigger: { component: DateRangePickerCellTrigger, attributes: DATE_ATTRIBUTES },
    DateRangePickerView,
    DateRangePickerViewTrigger: { component: DateRangePickerViewTrigger, semantics: 'button' },
  },
};

/** `<akar-color-area-root>`, `-area`, `-thumb`. */
export const colorAreaElements: AkarElementFamily = {
  name: 'color-area',
  parts: {
    ColorAreaRoot: { component: ColorAreaRoot, model: normalizeColor },
    ColorAreaArea,
    // Its two range inputs hold focus: they go inside the thumb.
    ColorAreaThumb: { component: ColorAreaThumb, siblings: 'inside' },
  },
};

/** `<akar-color-field-root>`, `-input` (renders onto an `<input>` inside it). */
export const colorFieldElements: AkarElementFamily = {
  name: 'color-field',
  parts: {
    ColorFieldRoot: { component: ColorFieldRoot, model: normalizeColor },
    ColorFieldInput: { component: ColorFieldInput, target: 'input' },
  },
};

/** `<akar-color-slider-root>`, `-track`, `-thumb`. */
export const colorSliderElements: AkarElementFamily = {
  name: 'color-slider',
  parts: {
    ColorSliderRoot: { component: ColorSliderRoot, model: normalizeColor },
    ColorSliderTrack,
    ColorSliderThumb,
  },
};

/** `<akar-color-swatch>`. */
export const colorSwatchElements: AkarElementFamily = {
  name: 'color-swatch',
  parts: {
    ColorSwatch,
  },
};

/** `<akar-color-swatch-picker-root>`, `-item`, `-item-swatch`, `-item-indicator`. */
export const colorSwatchPickerElements: AkarElementFamily = {
  name: 'color-swatch-picker',
  parts: {
    ColorSwatchPickerRoot,
    ColorSwatchPickerItem,
    ColorSwatchPickerItemSwatch,
    ColorSwatchPickerItemIndicator,
  },
};

/** `<akar-number-field-root>`, `-input` (renders onto an `<input>` inside it), `-increment`, `-decrement`. */
export const numberFieldElements: AkarElementFamily = {
  name: 'number-field',
  parts: {
    NumberFieldRoot,
    NumberFieldInput: { component: NumberFieldInput, target: 'input' },
    NumberFieldIncrement,
    NumberFieldDecrement,
  },
};

/** `<akar-pin-input-root>`, `-input` (renders onto an `<input>` inside it). */
export const pinInputElements: AkarElementFamily = {
  name: 'pin-input',
  parts: {
    PinInputRoot,
    PinInputInput: { component: PinInputInput, target: 'input' },
  },
};

/** `<akar-slider-root>`, `-track`, `-range`, `-thumb`. */
export const sliderElements: AkarElementFamily = {
  name: 'slider',
  parts: {
    // One value per thumb: `default-value="20 80"`.
    SliderRoot: {
      component: SliderRoot,
      attributes: { modelValue: 'numbers', defaultValue: 'numbers' },
    },
    SliderTrack,
    SliderRange,
    SliderThumb,
  },
};

/** `<akar-rating-root>`, `-item`, `-item-indicator`. */
export const ratingElements: AkarElementFamily = {
  name: 'rating',
  parts: {
    RatingRoot,
    RatingItem,
    // Renders a `RadioGroupItem`, a `<button>` by default.
    RatingItemIndicator: { component: RatingItemIndicator, semantics: 'button' },
  },
};

/** Every family available as custom elements. Importing it bundles all of them. */
export const akarElementFamilies: ReadonlyArray<AkarElementFamily> = [
  accordionElements,
  alertDialogElements,
  aspectRatioElements,
  autocompleteElements,
  avatarElements,
  calendarElements,
  checkboxElements,
  collapsibleElements,
  colorAreaElements,
  colorFieldElements,
  colorSliderElements,
  colorSwatchElements,
  colorSwatchPickerElements,
  comboboxElements,
  configProviderElements,
  contextMenuElements,
  dateFieldElements,
  datePickerElements,
  dateRangeFieldElements,
  dateRangePickerElements,
  dialogElements,
  drawerElements,
  dropdownMenuElements,
  editableElements,
  fieldElements,
  formElements,
  hoverCardElements,
  listboxElements,
  menubarElements,
  navigationMenuElements,
  numberFieldElements,
  paginationElements,
  pinInputElements,
  popoverElements,
  progressElements,
  radioGroupElements,
  rangeCalendarElements,
  ratingElements,
  scrollAreaElements,
  selectElements,
  separatorElements,
  sliderElements,
  splitterElements,
  stepperElements,
  switchElements,
  tabsElements,
  tagGroupElements,
  tagsInputElements,
  timeFieldElements,
  timeRangeFieldElements,
  toastElements,
  toggleElements,
  toggleGroupElements,
  toolbarElements,
  tooltipElements,
  treeElements,
  visuallyHiddenElements,
];

/**
 * Registers every supported family: a single call for a page that uses many of
 * them (or a CDN build). Importing it bundles all of them; prefer the per-family
 * helpers otherwise.
 */
export function defineAllAkarElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements(akarElementFamilies, options);
}

export function defineAccordionElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([accordionElements], options);
}

export function defineAlertDialogElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([alertDialogElements], options);
}

export function defineCheckboxElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([checkboxElements], options);
}

export function defineCollapsibleElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([collapsibleElements], options);
}

export function defineContextMenuElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([contextMenuElements], options);
}

export function defineDialogElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([dialogElements], options);
}

export function defineDrawerElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([drawerElements], options);
}

export function defineDropdownMenuElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([dropdownMenuElements], options);
}

export function defineHoverCardElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([hoverCardElements], options);
}

export function defineMenubarElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([menubarElements], options);
}

export function defineNavigationMenuElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([navigationMenuElements], options);
}

export function definePopoverElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([popoverElements], options);
}

export function defineSwitchElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([switchElements], options);
}

export function defineTabsElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([tabsElements], options);
}

export function defineToastElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([toastElements], options);
}

export function defineToggleElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([toggleElements], options);
}

export function defineAspectRatioElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([aspectRatioElements], options);
}

export function defineAvatarElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([avatarElements], options);
}

export function defineConfigProviderElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([configProviderElements], options);
}

export function defineFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([fieldElements], options);
}

export function defineFormElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([formElements], options);
}

export function definePaginationElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([paginationElements], options);
}

export function defineProgressElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([progressElements], options);
}

export function defineRadioGroupElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([radioGroupElements], options);
}

export function defineScrollAreaElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([scrollAreaElements], options);
}

export function defineSeparatorElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([separatorElements], options);
}

export function defineSplitterElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([splitterElements], options);
}

export function defineStepperElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([stepperElements], options);
}

export function defineToggleGroupElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([toggleGroupElements], options);
}

export function defineToolbarElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([toolbarElements], options);
}

export function defineVisuallyHiddenElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([visuallyHiddenElements], options);
}

export function defineTooltipElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([tooltipElements], options);
}

export function defineAutocompleteElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([autocompleteElements], options);
}

export function defineComboboxElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([comboboxElements], options);
}

export function defineEditableElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([editableElements], options);
}

export function defineListboxElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([listboxElements], options);
}

export function defineSelectElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([selectElements], options);
}

export function defineTagGroupElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([tagGroupElements], options);
}

export function defineTagsInputElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([tagsInputElements], options);
}

export function defineTreeElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([treeElements], options);
}

export function defineCalendarElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([calendarElements], options);
}

export function defineColorAreaElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([colorAreaElements], options);
}

export function defineColorFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([colorFieldElements], options);
}

export function defineColorSliderElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([colorSliderElements], options);
}

export function defineColorSwatchElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([colorSwatchElements], options);
}

export function defineColorSwatchPickerElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([colorSwatchPickerElements], options);
}

export function defineDateFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([dateFieldElements], options);
}

export function defineDatePickerElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([datePickerElements], options);
}

export function defineDateRangeFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([dateRangeFieldElements], options);
}

export function defineDateRangePickerElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([dateRangePickerElements], options);
}

export function defineNumberFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([numberFieldElements], options);
}

export function definePinInputElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([pinInputElements], options);
}

export function defineRangeCalendarElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([rangeCalendarElements], options);
}

export function defineRatingElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([ratingElements], options);
}

export function defineSliderElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([sliderElements], options);
}

export function defineTimeFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([timeFieldElements], options);
}

export function defineTimeRangeFieldElements(options?: DefineAkarElementsOptions) {
  return defineAkarElements([timeRangeFieldElements], options);
}
