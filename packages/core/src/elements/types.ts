import type { AkarElement } from './AkarElement';
import type { AkarElementEvent } from './events';
import type { ToastProviderElementEmits } from './toast';
import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  AccordionTriggerProps,
} from '@/Accordion';
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentEmits,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogEmits,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from '@/AlertDialog';
import type { AspectRatioProps } from '@/AspectRatio';
import type {
  AutocompleteInputEmits,
  AutocompleteInputProps,
  AutocompleteRootEmits,
  AutocompleteRootProps,
} from '@/Autocomplete';
import type { AvatarFallbackProps, AvatarRootProps } from '@/Avatar';
import type {
  CalendarCellProps,
  CalendarCellTriggerProps,
  CalendarGridBodyProps,
  CalendarGridHeadProps,
  CalendarGridProps,
  CalendarGridRowProps,
  CalendarHeadCellProps,
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNextProps,
  CalendarPrevProps,
  CalendarRootEmits,
  CalendarRootProps,
  CalendarViewProps,
  CalendarViewTriggerProps,
} from '@/Calendar';
import type {
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  CheckboxIndicatorProps,
  CheckboxRootEmits,
  CheckboxRootProps,
} from '@/Checkbox';
import type {
  CollapsibleContentEmits,
  CollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
} from '@/Collapsible';
import type {
  ColorAreaAreaProps,
  ColorAreaRootEmits,
  ColorAreaRootProps,
  ColorAreaThumbProps,
} from '@/ColorArea';
import type {
  ColorFieldInputProps,
  ColorFieldRootEmits,
  ColorFieldRootProps,
} from '@/ColorField';
import type {
  ColorSliderRootEmits,
  ColorSliderRootProps,
  ColorSliderThumbProps,
  ColorSliderTrackProps,
} from '@/ColorSlider';
import type {
  ColorSwatchProps,
} from '@/ColorSwatch';
import type {
  ColorSwatchPickerItemIndicatorProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerItemSwatchProps,
  ColorSwatchPickerRootEmits,
  ColorSwatchPickerRootProps,
} from '@/ColorSwatchPicker';
import type {
  ComboboxAnchorProps,
  ComboboxArrowProps,
  ComboboxCancelProps,
  ComboboxContentEmits,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputEmits,
  ComboboxInputProps,
  ComboboxItemEmits,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxPortalProps,
  ComboboxRootEmits,
  ComboboxRootProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxViewportProps,
} from '@/Combobox';
import type { ConfigProviderProps } from '@/ConfigProvider';
import type {
  ContextMenuArrowProps,
  ContextMenuCheckboxItemEmits,
  ContextMenuCheckboxItemProps,
  ContextMenuContentEmits,
  ContextMenuContentProps,
  ContextMenuGroupProps,
  ContextMenuItemEmits,
  ContextMenuItemIndicatorProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuPortalProps,
  ContextMenuRadioGroupEmits,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemEmits,
  ContextMenuRadioItemProps,
  ContextMenuRootEmits,
  ContextMenuRootProps,
  ContextMenuSeparatorProps,
  ContextMenuSubContentEmits,
  ContextMenuSubContentProps,
  ContextMenuSubEmits,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
} from '@/ContextMenu';
import type {
  DateFieldInputProps,
  DateFieldRootEmits,
  DateFieldRootProps,
} from '@/DateField';
import type {
  DatePickerAnchorProps,
  DatePickerArrowProps,
  DatePickerCellProps,
  DatePickerCellTriggerProps,
  DatePickerCloseProps,
  DatePickerContentEmits,
  DatePickerContentProps,
  DatePickerGridBodyProps,
  DatePickerGridHeadProps,
  DatePickerGridProps,
  DatePickerGridRowProps,
  DatePickerHeadCellProps,
  DatePickerHeaderProps,
  DatePickerHeadingProps,
  DatePickerInputProps,
  DatePickerNextProps,
  DatePickerPrevProps,
  DatePickerRootEmits,
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerViewProps,
  DatePickerViewTriggerProps,
} from '@/DatePicker';
import type {
  DateRangeFieldInputProps,
  DateRangeFieldRootEmits,
  DateRangeFieldRootProps,
} from '@/DateRangeField';
import type {
  DateRangePickerAnchorProps,
  DateRangePickerArrowProps,
  DateRangePickerCellProps,
  DateRangePickerCellTriggerProps,
  DateRangePickerCloseProps,
  DateRangePickerContentEmits,
  DateRangePickerContentProps,
  DateRangePickerGridBodyProps,
  DateRangePickerGridHeadProps,
  DateRangePickerGridProps,
  DateRangePickerGridRowProps,
  DateRangePickerHeadCellProps,
  DateRangePickerHeaderProps,
  DateRangePickerHeadingProps,
  DateRangePickerInputProps,
  DateRangePickerNextProps,
  DateRangePickerPrevProps,
  DateRangePickerRootEmits,
  DateRangePickerRootProps,
  DateRangePickerTriggerProps,
  DateRangePickerViewProps,
  DateRangePickerViewTriggerProps,
} from '@/DateRangePicker';
import type {
  DialogCloseProps,
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@/Dialog';
import type {
  DrawerBackdropProps,
  DrawerCloseProps,
  DrawerDescriptionProps,
  DrawerGrabberProps,
  DrawerIndentBackgroundProps,
  DrawerIndentProps,
  DrawerPopupEmits,
  DrawerPopupProps,
  DrawerPortalProps,
  DrawerRootEmits,
  DrawerRootProps,
  DrawerSwipeAreaProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerViewportProps,
} from '@/Drawer';
import type {
  DropdownMenuArrowProps,
  DropdownMenuCheckboxItemEmits,
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentEmits,
  DropdownMenuContentProps,
  DropdownMenuFilterEmits,
  DropdownMenuFilterProps,
  DropdownMenuGroupProps,
  DropdownMenuItemEmits,
  DropdownMenuItemIndicatorProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemEmits,
  DropdownMenuRadioItemProps,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubContentEmits,
  DropdownMenuSubContentProps,
  DropdownMenuSubEmits,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from '@/DropdownMenu';
import type {
  EditableAreaProps,
  EditableCancelTriggerProps,
  EditableEditTriggerProps,
  EditableInputProps,
  EditablePreviewProps,
  EditableRootEmits,
  EditableRootProps,
  EditableSubmitTriggerProps,
} from '@/Editable';
import type { FieldDescriptionProps, FieldErrorProps, FieldLabelProps, FieldRootProps } from '@/Field';
import type { FormRootEmits, FormRootProps } from '@/Form';
import type {
  HoverCardArrowProps,
  HoverCardContentProps,
  HoverCardPortalProps,
  HoverCardRootEmits,
  HoverCardRootProps,
  HoverCardTriggerProps,
} from '@/HoverCard';
import type { HoverCardContentEmits } from '@/HoverCard/HoverCardContent.vue';
import type {
  ListboxContentProps,
  ListboxFilterEmits,
  ListboxFilterProps,
  ListboxGroupLabelProps,
  ListboxGroupProps,
  ListboxItemEmits,
  ListboxItemIndicatorProps,
  ListboxItemProps,
  ListboxRootEmits,
  ListboxRootProps,
} from '@/Listbox';
import type {
  MenubarArrowProps,
  MenubarCheckboxItemEmits,
  MenubarCheckboxItemProps,
  MenubarContentEmits,
  MenubarContentProps,
  MenubarGroupProps,
  MenubarItemEmits,
  MenubarItemIndicatorProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarMenuEmits,
  MenubarMenuProps,
  MenubarPortalProps,
  MenubarRadioGroupEmits,
  MenubarRadioGroupProps,
  MenubarRadioItemEmits,
  MenubarRadioItemProps,
  MenubarRootEmits,
  MenubarRootProps,
  MenubarSeparatorProps,
  MenubarSubContentEmits,
  MenubarSubContentProps,
  MenubarSubEmits,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarTriggerProps,
} from '@/Menubar';
import type {
  NavigationMenuContentEmits,
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkEmits,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuRootEmits,
  NavigationMenuRootProps,
  NavigationMenuSubEmits,
  NavigationMenuSubProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps,
} from '@/NavigationMenu';
import type {
  NumberFieldDecrementProps,
  NumberFieldIncrementProps,
  NumberFieldInputProps,
  NumberFieldRootEmits,
  NumberFieldRootProps,
} from '@/NumberField';
import type {
  PaginationEllipsisProps,
  PaginationFirstProps,
  PaginationLastProps,
  PaginationListItemProps,
  PaginationListProps,
  PaginationNextProps,
  PaginationPrevProps,
  PaginationRootEmits,
  PaginationRootProps,
} from '@/Pagination';
import type {
  PinInputInputProps,
  PinInputRootEmits,
  PinInputRootProps,
} from '@/PinInput';
import type {
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentEmits,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps,
} from '@/Popover';
import type { ProgressIndicatorProps, ProgressRootEmits, ProgressRootProps } from '@/Progress';
import type {
  RadioGroupIndicatorProps,
  RadioGroupItemEmits,
  RadioGroupItemProps,
  RadioGroupRootEmits,
  RadioGroupRootProps,
} from '@/RadioGroup';
import type {
  RangeCalendarCellProps,
  RangeCalendarCellTriggerProps,
  RangeCalendarGridBodyProps,
  RangeCalendarGridHeadProps,
  RangeCalendarGridProps,
  RangeCalendarGridRowProps,
  RangeCalendarHeadCellProps,
  RangeCalendarHeaderProps,
  RangeCalendarHeadingProps,
  RangeCalendarNextProps,
  RangeCalendarPrevProps,
  RangeCalendarRootEmits,
  RangeCalendarRootProps,
  RangeCalendarViewProps,
  RangeCalendarViewTriggerProps,
} from '@/RangeCalendar';
import type {
  RatingItemIndicatorProps,
  RatingItemProps,
  RatingRootEmits,
  RatingRootProps,
} from '@/Rating';
import type {
  ScrollAreaCornerProps,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
} from '@/ScrollArea';
import type {
  SelectArrowProps,
  SelectContentEmits,
  SelectContentProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemEmits,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectPortalProps,
  SelectRootEmits,
  SelectRootProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps,
} from '@/Select';
import type { SeparatorProps } from '@/Separator';
import type {
  SliderRangeProps,
  SliderRootEmits,
  SliderRootProps,
  SliderThumbProps,
  SliderTrackProps,
} from '@/Slider';
import type {
  SplitterGroupEmits,
  SplitterGroupProps,
  SplitterPanelEmits,
  SplitterPanelProps,
  SplitterResizeHandleEmits,
  SplitterResizeHandleProps,
} from '@/Splitter';
import type {
  StepperDescriptionProps,
  StepperIndicatorProps,
  StepperItemProps,
  StepperRootEmits,
  StepperRootProps,
  StepperSeparatorProps,
  StepperTitleProps,
  StepperTriggerProps,
} from '@/Stepper';
import type { SwitchRootEmits, SwitchRootProps, SwitchThumbProps } from '@/Switch';
import type {
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootEmits,
  TabsRootProps,
  TabsTriggerProps,
} from '@/Tabs';
import type {
  TagGroupItemDeleteProps,
  TagGroupItemProps,
  TagGroupItemTextProps,
  TagGroupRootEmits,
  TagGroupRootProps,
} from '@/TagGroup';
import type {
  TagsInputClearProps,
  TagsInputInputProps,
  TagsInputItemDeleteProps,
  TagsInputItemProps,
  TagsInputItemTextProps,
  TagsInputRootEmits,
  TagsInputRootProps,
} from '@/TagsInput';
import type {
  TimeFieldInputProps,
  TimeFieldRootEmits,
  TimeFieldRootProps,
} from '@/TimeField';
import type {
  TimeRangeFieldInputProps,
  TimeRangeFieldRootEmits,
  TimeRangeFieldRootProps,
} from '@/TimeRangeField';
import type {
  ToastActionProps,
  ToastArrowProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastPortalProps,
  ToastPositionerProps,
  ToastProviderProps,
  ToastRootEmits,
  ToastRootProps,
  ToastTitleProps,
  ToastViewportProps,
} from '@/Toast';
import type { ToggleEmits, ToggleProps } from '@/Toggle';
import type { ToggleGroupItemProps, ToggleGroupRootEmits, ToggleGroupRootProps } from '@/ToggleGroup';
import type {
  ToolbarButtonProps,
  ToolbarRootProps,
  ToolbarSeparatorProps,
  ToolbarToggleGroupEmits,
  ToolbarToggleGroupProps,
  ToolbarToggleItemProps,
} from '@/Toolbar';
import type {
  TooltipArrowProps,
  TooltipContentEmits,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipProviderProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipTriggerProps,
} from '@/Tooltip';
import type {
  TreeItemEmits,
  TreeItemProps,
  TreeRootEmits,
  TreeRootProps,
} from '@/Tree';
import type { VisuallyHiddenProps } from '@/VisuallyHidden';

type Hyphenate<S extends string> = S extends `${infer Head}${infer Tail}`
  ? `${Head extends Lowercase<Head> ? Head : `-${Lowercase<Head>}`}${Hyphenate<Tail>}`
  : S;
type ReplaceColons<S extends string> = S extends `${infer Head}:${infer Tail}` ? `${Head}-${ReplaceColons<Tail>}` : S;
type PascalSegments<S extends string> = S extends `${infer Head}:${infer Tail}` ? `${Capitalize<Head>}${PascalSegments<Tail>}` : Capitalize<S>;

/** DOM event type of a Vue emit, like `toEventType()`: `update:modelValue` → `update-model-value`. */
export type AkarEventType<Emit extends string> = Hyphenate<ReplaceColons<Emit>>;

type EmitArgs<E, K extends keyof E> = E[K] extends ReadonlyArray<unknown> ? E[K] : Array<unknown>;
type EmitEvent<E, K extends keyof E> = AkarElementEvent<EmitArgs<E, K>[0], EmitArgs<E, K>[1]>;

/** The `CustomEvent`s an element dispatches, by event type. */
export type AkarElementEventMap<Emits> = {
  [K in keyof Emits & string as AkarEventType<K>]: EmitEvent<Emits, K>
};

/** The element's props as properties: everything but `as` / `asChild`. */
export type AkarElementProps<Props> = Partial<Omit<Props, 'as' | 'asChild'>>;

/**
 * A Akar element instance: its props as properties, and typed `addEventListener`
 * (listed first, so its overload wins over `HTMLElement`'s `string` one).
 */
export type AkarPartElement<Props, Emits = object> = {
  addEventListener: <K extends keyof AkarElementEventMap<Emits>>(
    type: K,
    listener: (this: HTMLElement, event: AkarElementEventMap<Emits>[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;
  removeEventListener: <K extends keyof AkarElementEventMap<Emits>>(
    type: K,
    listener: (this: HTMLElement, event: AkarElementEventMap<Emits>[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
} & AkarElement & AkarElementProps<Props>;

/** Shown in a type error when a JSX handler uses React's camelCase event naming. */
export interface UseKebabCaseEventProp<Name extends string> {
  'Custom element events are named in kebab-case. Use this prop instead:': Name;
}

/**
 * JSX props of an element for frameworks that set properties and listen to custom
 * events with `on<event-type>` (React 19, Preact, Solid with `prop:`/`on:` aside):
 * camelCase props, and `onupdate-model-value`-style event props. A camelCase handler
 * such as `onUpdateModelValue` is a type error: React would listen to an event
 * named `UpdateModelValue`, which never fires.
 */
export type AkarElementJSXProps<Props, Emits = object> = AkarElementProps<Props> & {
  [K in keyof Emits & string as `on${AkarEventType<K>}`]?: (event: EmitEvent<Emits, K>) => void
} & {
  [K in keyof Emits & string as `on${PascalSegments<K>}`]?: UseKebabCaseEventProp<`on${AkarEventType<K>}`>
};

interface Part<Props, Emits = object> {
  element: AkarPartElement<Props, Emits>;
  jsx: AkarElementJSXProps<Props, Emits>;
}

interface AkarElementParts {
  'akar-accordion-root': Part<AccordionRootProps, AccordionRootEmits>;
  'akar-accordion-item': Part<AccordionItemProps>;
  'akar-accordion-header': Part<AccordionHeaderProps>;
  'akar-accordion-trigger': Part<AccordionTriggerProps>;
  'akar-accordion-content': Part<AccordionContentProps>;
  'akar-aspect-ratio': Part<AspectRatioProps>;
  'akar-avatar-root': Part<AvatarRootProps>;
  'akar-avatar-fallback': Part<AvatarFallbackProps>;
  'akar-alert-dialog-root': Part<AlertDialogProps, AlertDialogEmits>;
  'akar-alert-dialog-trigger': Part<AlertDialogTriggerProps>;
  'akar-alert-dialog-portal': Part<AlertDialogPortalProps>;
  'akar-alert-dialog-overlay': Part<AlertDialogOverlayProps>;
  'akar-alert-dialog-content': Part<AlertDialogContentProps, AlertDialogContentEmits>;
  'akar-alert-dialog-title': Part<AlertDialogTitleProps>;
  'akar-alert-dialog-description': Part<AlertDialogDescriptionProps>;
  'akar-alert-dialog-cancel': Part<AlertDialogCancelProps>;
  'akar-alert-dialog-action': Part<AlertDialogActionProps>;
  'akar-autocomplete-root': Part<AutocompleteRootProps, AutocompleteRootEmits>;
  'akar-autocomplete-input': Part<AutocompleteInputProps, AutocompleteInputEmits>;
  'akar-autocomplete-anchor': Part<ComboboxAnchorProps>;
  'akar-autocomplete-trigger': Part<ComboboxTriggerProps>;
  'akar-autocomplete-cancel': Part<ComboboxCancelProps>;
  'akar-autocomplete-portal': Part<ComboboxPortalProps>;
  'akar-autocomplete-content': Part<ComboboxContentProps, ComboboxContentEmits>;
  'akar-autocomplete-viewport': Part<ComboboxViewportProps>;
  'akar-autocomplete-empty': Part<ComboboxEmptyProps>;
  'akar-autocomplete-item': Part<ComboboxItemProps, ComboboxItemEmits>;
  'akar-autocomplete-item-indicator': Part<ComboboxItemIndicatorProps>;
  'akar-autocomplete-group': Part<ComboboxGroupProps>;
  'akar-autocomplete-label': Part<ComboboxLabelProps>;
  'akar-autocomplete-separator': Part<ComboboxSeparatorProps>;
  'akar-checkbox-root': Part<CheckboxRootProps, CheckboxRootEmits>;
  'akar-checkbox-indicator': Part<CheckboxIndicatorProps>;
  'akar-checkbox-group-root': Part<CheckboxGroupRootProps, CheckboxGroupRootEmits>;
  'akar-collapsible-root': Part<CollapsibleRootProps, CollapsibleRootEmits>;
  'akar-collapsible-trigger': Part<CollapsibleTriggerProps>;
  'akar-collapsible-content': Part<CollapsibleContentProps, CollapsibleContentEmits>;
  'akar-config-provider': Part<ConfigProviderProps>;
  'akar-context-menu-root': Part<ContextMenuRootProps, ContextMenuRootEmits>;
  'akar-context-menu-trigger': Part<ContextMenuTriggerProps>;
  'akar-context-menu-portal': Part<ContextMenuPortalProps>;
  'akar-context-menu-content': Part<ContextMenuContentProps, ContextMenuContentEmits>;
  'akar-context-menu-arrow': Part<ContextMenuArrowProps>;
  'akar-context-menu-item': Part<ContextMenuItemProps, ContextMenuItemEmits>;
  'akar-context-menu-group': Part<ContextMenuGroupProps>;
  'akar-context-menu-label': Part<ContextMenuLabelProps>;
  'akar-context-menu-checkbox-item': Part<ContextMenuCheckboxItemProps, ContextMenuCheckboxItemEmits>;
  'akar-context-menu-radio-group': Part<ContextMenuRadioGroupProps, ContextMenuRadioGroupEmits>;
  'akar-context-menu-radio-item': Part<ContextMenuRadioItemProps, ContextMenuRadioItemEmits>;
  'akar-context-menu-item-indicator': Part<ContextMenuItemIndicatorProps>;
  'akar-context-menu-separator': Part<ContextMenuSeparatorProps>;
  'akar-context-menu-sub': Part<ContextMenuSubProps, ContextMenuSubEmits>;
  'akar-context-menu-sub-trigger': Part<ContextMenuSubTriggerProps>;
  'akar-context-menu-sub-content': Part<ContextMenuSubContentProps, ContextMenuSubContentEmits>;
  'akar-combobox-root': Part<ComboboxRootProps, ComboboxRootEmits>;
  'akar-combobox-input': Part<ComboboxInputProps, ComboboxInputEmits>;
  'akar-combobox-anchor': Part<ComboboxAnchorProps>;
  'akar-combobox-trigger': Part<ComboboxTriggerProps>;
  'akar-combobox-cancel': Part<ComboboxCancelProps>;
  'akar-combobox-portal': Part<ComboboxPortalProps>;
  'akar-combobox-content': Part<ComboboxContentProps, ComboboxContentEmits>;
  'akar-combobox-viewport': Part<ComboboxViewportProps>;
  'akar-combobox-empty': Part<ComboboxEmptyProps>;
  'akar-combobox-item': Part<ComboboxItemProps, ComboboxItemEmits>;
  'akar-combobox-item-indicator': Part<ComboboxItemIndicatorProps>;
  'akar-combobox-group': Part<ComboboxGroupProps>;
  'akar-combobox-label': Part<ComboboxLabelProps>;
  'akar-combobox-separator': Part<ComboboxSeparatorProps>;
  'akar-combobox-arrow': Part<ComboboxArrowProps>;
  'akar-dialog-root': Part<DialogRootProps, DialogRootEmits>;
  'akar-dialog-trigger': Part<DialogTriggerProps>;
  'akar-dialog-portal': Part<DialogPortalProps>;
  'akar-dialog-overlay': Part<DialogOverlayProps>;
  'akar-dialog-content': Part<DialogContentProps, DialogContentEmits>;
  'akar-dialog-title': Part<DialogTitleProps>;
  'akar-dialog-description': Part<DialogDescriptionProps>;
  'akar-dialog-close': Part<DialogCloseProps>;
  'akar-field-root': Part<FieldRootProps>;
  /** Never a native label: `nativeLabel` and `for` are not part of the element. */
  'akar-field-label': Part<Omit<FieldLabelProps, 'nativeLabel' | 'for'>>;
  'akar-field-description': Part<FieldDescriptionProps>;
  'akar-field-error': Part<FieldErrorProps>;
  'akar-form-root': Part<FormRootProps, FormRootEmits>;
  'akar-pagination-root': Part<PaginationRootProps, PaginationRootEmits>;
  'akar-pagination-list': Part<PaginationListProps>;
  'akar-pagination-list-item': Part<PaginationListItemProps>;
  'akar-pagination-first': Part<PaginationFirstProps>;
  'akar-pagination-prev': Part<PaginationPrevProps>;
  'akar-pagination-next': Part<PaginationNextProps>;
  'akar-pagination-last': Part<PaginationLastProps>;
  'akar-pagination-ellipsis': Part<PaginationEllipsisProps>;
  'akar-drawer-root': Part<DrawerRootProps, DrawerRootEmits>;
  'akar-drawer-trigger': Part<DrawerTriggerProps>;
  'akar-drawer-portal': Part<DrawerPortalProps>;
  'akar-drawer-backdrop': Part<DrawerBackdropProps>;
  'akar-drawer-viewport': Part<DrawerViewportProps>;
  'akar-drawer-popup': Part<DrawerPopupProps, DrawerPopupEmits>;
  'akar-drawer-title': Part<DrawerTitleProps>;
  'akar-drawer-description': Part<DrawerDescriptionProps>;
  'akar-drawer-close': Part<DrawerCloseProps>;
  'akar-drawer-grabber': Part<DrawerGrabberProps>;
  'akar-drawer-swipe-area': Part<DrawerSwipeAreaProps>;
  'akar-drawer-provider': Part<object>;
  'akar-drawer-indent': Part<DrawerIndentProps>;
  'akar-drawer-indent-background': Part<DrawerIndentBackgroundProps>;
  'akar-drawer-virtual-keyboard-provider': Part<object>;
  'akar-dropdown-menu-root': Part<DropdownMenuRootProps, DropdownMenuRootEmits>;
  'akar-dropdown-menu-trigger': Part<DropdownMenuTriggerProps>;
  'akar-dropdown-menu-portal': Part<DropdownMenuPortalProps>;
  'akar-dropdown-menu-content': Part<DropdownMenuContentProps, DropdownMenuContentEmits>;
  'akar-dropdown-menu-filter': Part<DropdownMenuFilterProps, DropdownMenuFilterEmits>;
  'akar-dropdown-menu-arrow': Part<DropdownMenuArrowProps>;
  'akar-dropdown-menu-item': Part<DropdownMenuItemProps, DropdownMenuItemEmits>;
  'akar-dropdown-menu-group': Part<DropdownMenuGroupProps>;
  'akar-dropdown-menu-label': Part<DropdownMenuLabelProps>;
  'akar-dropdown-menu-checkbox-item': Part<DropdownMenuCheckboxItemProps, DropdownMenuCheckboxItemEmits>;
  'akar-dropdown-menu-radio-group': Part<DropdownMenuRadioGroupProps, DropdownMenuRadioGroupEmits>;
  'akar-dropdown-menu-radio-item': Part<DropdownMenuRadioItemProps, DropdownMenuRadioItemEmits>;
  'akar-dropdown-menu-item-indicator': Part<DropdownMenuItemIndicatorProps>;
  'akar-dropdown-menu-separator': Part<DropdownMenuSeparatorProps>;
  'akar-dropdown-menu-sub': Part<DropdownMenuSubProps, DropdownMenuSubEmits>;
  'akar-dropdown-menu-sub-trigger': Part<DropdownMenuSubTriggerProps>;
  'akar-dropdown-menu-sub-content': Part<DropdownMenuSubContentProps, DropdownMenuSubContentEmits>;
  'akar-hover-card-root': Part<HoverCardRootProps, HoverCardRootEmits>;
  'akar-hover-card-trigger': Part<HoverCardTriggerProps>;
  'akar-hover-card-portal': Part<HoverCardPortalProps>;
  'akar-hover-card-content': Part<HoverCardContentProps, HoverCardContentEmits>;
  'akar-hover-card-arrow': Part<HoverCardArrowProps>;
  'akar-menubar-root': Part<MenubarRootProps, MenubarRootEmits>;
  'akar-menubar-menu': Part<MenubarMenuProps, MenubarMenuEmits>;
  'akar-menubar-trigger': Part<MenubarTriggerProps>;
  'akar-menubar-portal': Part<MenubarPortalProps>;
  'akar-menubar-content': Part<MenubarContentProps, MenubarContentEmits>;
  'akar-menubar-arrow': Part<MenubarArrowProps>;
  'akar-menubar-item': Part<MenubarItemProps, MenubarItemEmits>;
  'akar-menubar-group': Part<MenubarGroupProps>;
  'akar-menubar-label': Part<MenubarLabelProps>;
  'akar-menubar-checkbox-item': Part<MenubarCheckboxItemProps, MenubarCheckboxItemEmits>;
  'akar-menubar-radio-group': Part<MenubarRadioGroupProps, MenubarRadioGroupEmits>;
  'akar-menubar-radio-item': Part<MenubarRadioItemProps, MenubarRadioItemEmits>;
  'akar-menubar-item-indicator': Part<MenubarItemIndicatorProps>;
  'akar-menubar-separator': Part<MenubarSeparatorProps>;
  'akar-menubar-sub': Part<MenubarSubProps, MenubarSubEmits>;
  'akar-menubar-sub-trigger': Part<MenubarSubTriggerProps>;
  'akar-menubar-sub-content': Part<MenubarSubContentProps, MenubarSubContentEmits>;
  'akar-navigation-menu-root': Part<NavigationMenuRootProps, NavigationMenuRootEmits>;
  'akar-navigation-menu-sub': Part<NavigationMenuSubProps, NavigationMenuSubEmits>;
  'akar-navigation-menu-list': Part<NavigationMenuListProps>;
  'akar-navigation-menu-item': Part<NavigationMenuItemProps>;
  'akar-navigation-menu-trigger': Part<NavigationMenuTriggerProps>;
  'akar-navigation-menu-content': Part<NavigationMenuContentProps, NavigationMenuContentEmits>;
  'akar-navigation-menu-link': Part<NavigationMenuLinkProps, NavigationMenuLinkEmits>;
  'akar-navigation-menu-indicator': Part<NavigationMenuIndicatorProps>;
  'akar-navigation-menu-viewport': Part<NavigationMenuViewportProps>;
  'akar-editable-root': Part<EditableRootProps, EditableRootEmits>;
  'akar-editable-area': Part<EditableAreaProps>;
  'akar-editable-input': Part<EditableInputProps>;
  'akar-editable-preview': Part<EditablePreviewProps>;
  'akar-editable-edit-trigger': Part<EditableEditTriggerProps>;
  'akar-editable-submit-trigger': Part<EditableSubmitTriggerProps>;
  'akar-editable-cancel-trigger': Part<EditableCancelTriggerProps>;
  'akar-listbox-root': Part<ListboxRootProps, ListboxRootEmits>;
  'akar-listbox-content': Part<ListboxContentProps>;
  'akar-listbox-filter': Part<ListboxFilterProps, ListboxFilterEmits>;
  'akar-listbox-item': Part<ListboxItemProps, ListboxItemEmits>;
  'akar-listbox-item-indicator': Part<ListboxItemIndicatorProps>;
  'akar-listbox-group': Part<ListboxGroupProps>;
  'akar-listbox-group-label': Part<ListboxGroupLabelProps>;
  'akar-popover-root': Part<PopoverRootProps, PopoverRootEmits>;
  'akar-popover-trigger': Part<PopoverTriggerProps>;
  'akar-popover-anchor': Part<PopoverAnchorProps>;
  'akar-popover-portal': Part<PopoverPortalProps>;
  'akar-popover-content': Part<PopoverContentProps, PopoverContentEmits>;
  'akar-popover-arrow': Part<PopoverArrowProps>;
  'akar-popover-close': Part<PopoverCloseProps>;
  'akar-progress-root': Part<ProgressRootProps, ProgressRootEmits>;
  'akar-progress-indicator': Part<ProgressIndicatorProps>;
  'akar-radio-group-root': Part<RadioGroupRootProps, RadioGroupRootEmits>;
  'akar-radio-group-item': Part<RadioGroupItemProps, RadioGroupItemEmits>;
  'akar-radio-group-indicator': Part<RadioGroupIndicatorProps>;
  'akar-scroll-area-root': Part<ScrollAreaRootProps>;
  'akar-scroll-area-viewport': Part<ScrollAreaViewportProps>;
  'akar-scroll-area-scrollbar': Part<ScrollAreaScrollbarProps>;
  'akar-scroll-area-thumb': Part<ScrollAreaThumbProps>;
  'akar-scroll-area-corner': Part<ScrollAreaCornerProps>;
  'akar-separator': Part<SeparatorProps>;
  'akar-splitter-group': Part<SplitterGroupProps, SplitterGroupEmits>;
  'akar-splitter-panel': Part<SplitterPanelProps, SplitterPanelEmits>;
  'akar-splitter-resize-handle': Part<SplitterResizeHandleProps, SplitterResizeHandleEmits>;
  'akar-stepper-root': Part<StepperRootProps, StepperRootEmits>;
  'akar-stepper-item': Part<StepperItemProps>;
  'akar-stepper-trigger': Part<StepperTriggerProps>;
  'akar-stepper-indicator': Part<StepperIndicatorProps>;
  'akar-stepper-title': Part<StepperTitleProps>;
  'akar-stepper-description': Part<StepperDescriptionProps>;
  'akar-stepper-separator': Part<StepperSeparatorProps>;
  'akar-select-root': Part<SelectRootProps, SelectRootEmits>;
  'akar-select-trigger': Part<SelectTriggerProps>;
  'akar-select-value': Part<SelectValueProps>;
  'akar-select-icon': Part<SelectIconProps>;
  'akar-select-portal': Part<SelectPortalProps>;
  'akar-select-content': Part<SelectContentProps, SelectContentEmits>;
  'akar-select-viewport': Part<SelectViewportProps>;
  'akar-select-scroll-up-button': Part<SelectScrollUpButtonProps>;
  'akar-select-scroll-down-button': Part<SelectScrollDownButtonProps>;
  'akar-select-item': Part<SelectItemProps, SelectItemEmits>;
  'akar-select-item-text': Part<SelectItemTextProps>;
  'akar-select-item-indicator': Part<SelectItemIndicatorProps>;
  'akar-select-group': Part<SelectGroupProps>;
  'akar-select-label': Part<SelectLabelProps>;
  'akar-select-separator': Part<SelectSeparatorProps>;
  'akar-select-arrow': Part<SelectArrowProps>;
  'akar-switch-root': Part<SwitchRootProps, SwitchRootEmits>;
  'akar-switch-thumb': Part<SwitchThumbProps>;
  'akar-tabs-root': Part<TabsRootProps, TabsRootEmits>;
  'akar-tabs-list': Part<TabsListProps>;
  'akar-tabs-trigger': Part<TabsTriggerProps>;
  'akar-tabs-content': Part<TabsContentProps>;
  'akar-tabs-indicator': Part<TabsIndicatorProps>;
  'akar-toast-provider': Part<ToastProviderProps, ToastProviderElementEmits>;
  'akar-toast-viewport': Part<ToastViewportProps>;
  'akar-toast-root': Part<ToastRootProps, ToastRootEmits>;
  'akar-toast-title': Part<ToastTitleProps>;
  'akar-toast-description': Part<ToastDescriptionProps>;
  'akar-toast-action': Part<ToastActionProps>;
  'akar-toast-close': Part<ToastCloseProps>;
  'akar-toast-portal': Part<ToastPortalProps>;
  'akar-toast-positioner': Part<ToastPositionerProps>;
  'akar-toast-arrow': Part<ToastArrowProps>;
  'akar-toggle': Part<ToggleProps, ToggleEmits>;
  'akar-toggle-group-root': Part<ToggleGroupRootProps, ToggleGroupRootEmits>;
  'akar-toggle-group-item': Part<ToggleGroupItemProps>;
  'akar-toolbar-root': Part<ToolbarRootProps>;
  'akar-toolbar-button': Part<ToolbarButtonProps>;
  'akar-toolbar-separator': Part<ToolbarSeparatorProps>;
  'akar-toolbar-toggle-group': Part<ToolbarToggleGroupProps, ToolbarToggleGroupEmits>;
  'akar-toolbar-toggle-item': Part<ToolbarToggleItemProps>;
  'akar-visually-hidden': Part<VisuallyHiddenProps>;
  'akar-tooltip-provider': Part<TooltipProviderProps>;
  'akar-tooltip-root': Part<TooltipRootProps, TooltipRootEmits>;
  'akar-tooltip-trigger': Part<TooltipTriggerProps>;
  'akar-tooltip-portal': Part<TooltipPortalProps>;
  'akar-tooltip-content': Part<TooltipContentProps, TooltipContentEmits>;
  'akar-tooltip-arrow': Part<TooltipArrowProps>;
  'akar-tag-group-root': Part<TagGroupRootProps, TagGroupRootEmits>;
  'akar-tag-group-item': Part<TagGroupItemProps>;
  'akar-tag-group-item-text': Part<TagGroupItemTextProps>;
  'akar-tag-group-item-delete': Part<TagGroupItemDeleteProps>;
  'akar-tags-input-root': Part<TagsInputRootProps, TagsInputRootEmits>;
  'akar-tags-input-input': Part<TagsInputInputProps>;
  'akar-tags-input-item': Part<TagsInputItemProps>;
  'akar-tags-input-item-text': Part<TagsInputItemTextProps>;
  'akar-tags-input-item-delete': Part<TagsInputItemDeleteProps>;
  'akar-tags-input-clear': Part<TagsInputClearProps>;
  'akar-tree-root': Part<TreeRootProps, TreeRootEmits>;
  'akar-tree-item': Part<TreeItemProps<Record<string, any>>, TreeItemEmits<Record<string, any>>>;
  'akar-calendar-root': Part<CalendarRootProps, CalendarRootEmits>;
  'akar-calendar-header': Part<CalendarHeaderProps>;
  'akar-calendar-heading': Part<CalendarHeadingProps>;
  'akar-calendar-prev': Part<CalendarPrevProps>;
  'akar-calendar-next': Part<CalendarNextProps>;
  'akar-calendar-grid': Part<CalendarGridProps>;
  'akar-calendar-grid-head': Part<CalendarGridHeadProps>;
  'akar-calendar-grid-body': Part<CalendarGridBodyProps>;
  'akar-calendar-grid-row': Part<CalendarGridRowProps>;
  'akar-calendar-head-cell': Part<CalendarHeadCellProps>;
  'akar-calendar-cell': Part<CalendarCellProps>;
  'akar-calendar-cell-trigger': Part<CalendarCellTriggerProps>;
  'akar-calendar-view': Part<CalendarViewProps>;
  'akar-calendar-view-trigger': Part<CalendarViewTriggerProps>;
  'akar-range-calendar-root': Part<RangeCalendarRootProps, RangeCalendarRootEmits>;
  'akar-range-calendar-header': Part<RangeCalendarHeaderProps>;
  'akar-range-calendar-heading': Part<RangeCalendarHeadingProps>;
  'akar-range-calendar-prev': Part<RangeCalendarPrevProps>;
  'akar-range-calendar-next': Part<RangeCalendarNextProps>;
  'akar-range-calendar-grid': Part<RangeCalendarGridProps>;
  'akar-range-calendar-grid-head': Part<RangeCalendarGridHeadProps>;
  'akar-range-calendar-grid-body': Part<RangeCalendarGridBodyProps>;
  'akar-range-calendar-grid-row': Part<RangeCalendarGridRowProps>;
  'akar-range-calendar-head-cell': Part<RangeCalendarHeadCellProps>;
  'akar-range-calendar-cell': Part<RangeCalendarCellProps>;
  'akar-range-calendar-cell-trigger': Part<RangeCalendarCellTriggerProps>;
  'akar-range-calendar-view': Part<RangeCalendarViewProps>;
  'akar-range-calendar-view-trigger': Part<RangeCalendarViewTriggerProps>;
  'akar-date-field-root': Part<DateFieldRootProps, DateFieldRootEmits>;
  'akar-date-field-input': Part<DateFieldInputProps>;
  'akar-date-range-field-root': Part<DateRangeFieldRootProps, DateRangeFieldRootEmits>;
  'akar-date-range-field-input': Part<DateRangeFieldInputProps>;
  'akar-time-field-root': Part<TimeFieldRootProps, TimeFieldRootEmits>;
  'akar-time-field-input': Part<TimeFieldInputProps>;
  'akar-time-range-field-root': Part<TimeRangeFieldRootProps, TimeRangeFieldRootEmits>;
  'akar-time-range-field-input': Part<TimeRangeFieldInputProps>;
  'akar-date-picker-root': Part<DatePickerRootProps, DatePickerRootEmits>;
  'akar-date-picker-field': Part<object>;
  'akar-date-picker-input': Part<DatePickerInputProps>;
  'akar-date-picker-trigger': Part<DatePickerTriggerProps>;
  'akar-date-picker-anchor': Part<DatePickerAnchorProps>;
  'akar-date-picker-content': Part<DatePickerContentProps, DatePickerContentEmits>;
  'akar-date-picker-arrow': Part<DatePickerArrowProps>;
  'akar-date-picker-close': Part<DatePickerCloseProps>;
  'akar-date-picker-calendar': Part<object>;
  'akar-date-picker-header': Part<DatePickerHeaderProps>;
  'akar-date-picker-heading': Part<DatePickerHeadingProps>;
  'akar-date-picker-prev': Part<DatePickerPrevProps>;
  'akar-date-picker-next': Part<DatePickerNextProps>;
  'akar-date-picker-grid': Part<DatePickerGridProps>;
  'akar-date-picker-grid-head': Part<DatePickerGridHeadProps>;
  'akar-date-picker-grid-body': Part<DatePickerGridBodyProps>;
  'akar-date-picker-grid-row': Part<DatePickerGridRowProps>;
  'akar-date-picker-head-cell': Part<DatePickerHeadCellProps>;
  'akar-date-picker-cell': Part<DatePickerCellProps>;
  'akar-date-picker-cell-trigger': Part<DatePickerCellTriggerProps>;
  'akar-date-picker-view': Part<DatePickerViewProps>;
  'akar-date-picker-view-trigger': Part<DatePickerViewTriggerProps>;
  'akar-date-range-picker-root': Part<DateRangePickerRootProps, DateRangePickerRootEmits>;
  'akar-date-range-picker-field': Part<object>;
  'akar-date-range-picker-input': Part<DateRangePickerInputProps>;
  'akar-date-range-picker-trigger': Part<DateRangePickerTriggerProps>;
  'akar-date-range-picker-anchor': Part<DateRangePickerAnchorProps>;
  'akar-date-range-picker-content': Part<DateRangePickerContentProps, DateRangePickerContentEmits>;
  'akar-date-range-picker-arrow': Part<DateRangePickerArrowProps>;
  'akar-date-range-picker-close': Part<DateRangePickerCloseProps>;
  'akar-date-range-picker-calendar': Part<object>;
  'akar-date-range-picker-header': Part<DateRangePickerHeaderProps>;
  'akar-date-range-picker-heading': Part<DateRangePickerHeadingProps>;
  'akar-date-range-picker-prev': Part<DateRangePickerPrevProps>;
  'akar-date-range-picker-next': Part<DateRangePickerNextProps>;
  'akar-date-range-picker-grid': Part<DateRangePickerGridProps>;
  'akar-date-range-picker-grid-head': Part<DateRangePickerGridHeadProps>;
  'akar-date-range-picker-grid-body': Part<DateRangePickerGridBodyProps>;
  'akar-date-range-picker-grid-row': Part<DateRangePickerGridRowProps>;
  'akar-date-range-picker-head-cell': Part<DateRangePickerHeadCellProps>;
  'akar-date-range-picker-cell': Part<DateRangePickerCellProps>;
  'akar-date-range-picker-cell-trigger': Part<DateRangePickerCellTriggerProps>;
  'akar-date-range-picker-view': Part<DateRangePickerViewProps>;
  'akar-date-range-picker-view-trigger': Part<DateRangePickerViewTriggerProps>;
  'akar-color-area-root': Part<ColorAreaRootProps, ColorAreaRootEmits>;
  'akar-color-area-area': Part<ColorAreaAreaProps>;
  'akar-color-area-thumb': Part<ColorAreaThumbProps>;
  'akar-color-field-root': Part<ColorFieldRootProps, ColorFieldRootEmits>;
  'akar-color-field-input': Part<ColorFieldInputProps>;
  'akar-color-slider-root': Part<ColorSliderRootProps, ColorSliderRootEmits>;
  'akar-color-slider-track': Part<ColorSliderTrackProps>;
  'akar-color-slider-thumb': Part<ColorSliderThumbProps>;
  'akar-color-swatch': Part<ColorSwatchProps>;
  'akar-color-swatch-picker-root': Part<ColorSwatchPickerRootProps, ColorSwatchPickerRootEmits>;
  'akar-color-swatch-picker-item': Part<ColorSwatchPickerItemProps>;
  'akar-color-swatch-picker-item-swatch': Part<ColorSwatchPickerItemSwatchProps>;
  'akar-color-swatch-picker-item-indicator': Part<ColorSwatchPickerItemIndicatorProps>;
  'akar-number-field-root': Part<NumberFieldRootProps, NumberFieldRootEmits>;
  'akar-number-field-input': Part<NumberFieldInputProps>;
  'akar-number-field-increment': Part<NumberFieldIncrementProps>;
  'akar-number-field-decrement': Part<NumberFieldDecrementProps>;
  'akar-pin-input-root': Part<PinInputRootProps, PinInputRootEmits>;
  'akar-pin-input-input': Part<PinInputInputProps>;
  'akar-slider-root': Part<SliderRootProps, SliderRootEmits>;
  'akar-slider-track': Part<SliderTrackProps>;
  'akar-slider-range': Part<SliderRangeProps>;
  'akar-slider-thumb': Part<SliderThumbProps>;
  'akar-rating-root': Part<RatingRootProps, RatingRootEmits>;
  'akar-rating-item': Part<RatingItemProps>;
  'akar-rating-item-indicator': Part<RatingItemIndicatorProps>;
}

/**
 * Element types of the default-prefixed tags. Opt in to typed
 * `document.querySelector('akar-switch-root')` / `createElement()` with:
 *
 * ```ts
 * /// <reference types="akar/elements/global" />
 * ```
 *
 * (A separate, types-only entry: every JavaScript entry shares one declaration
 * chunk, so a global declared there would reach every `akar` user.)
 */
export type AkarElementTagNameMap = {
  [Tag in keyof AkarElementParts]: AkarElementParts[Tag]['element']
};

/**
 * JSX intrinsic elements for the default-prefixed tags. `Base` is your framework's
 * own attributes type; the element's props replace the ones it shares with it
 * (`defaultValue`, `dir`, …).
 *
 * React 19 typings for these are in `akar/elements/react`
 * (`/// <reference types="akar/elements/react" />`).
 *
 * @example
 * ```ts
 * // React 19, by hand
 * import type { HTMLAttributes, RefAttributes } from 'react'
 * import type { AkarIntrinsicElements } from 'akar/elements'
 *
 * declare module 'react' {
 *   namespace JSX {
 *     interface IntrinsicElements extends AkarIntrinsicElements<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>> {}
 *   }
 * }
 * ```
 */
export type AkarIntrinsicElements<Base = object> = {
  [Tag in keyof AkarElementParts]: Omit<Base, keyof AkarElementParts[Tag]['jsx']> & AkarElementParts[Tag]['jsx']
};
