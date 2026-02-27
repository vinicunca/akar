// Re-export Combobox sub-components as Autocomplete equivalents.
// These components inject ComboboxRootContext which AutocompleteRoot provides.
export {
  AComboboxAnchor as AAutocompleteAnchor,
  type AComboboxAnchorProps as AAutocompleteAnchorProps,
} from '../combobox';
export {
  AComboboxArrow as AAutocompleteArrow,
  type AComboboxArrowProps as AAutocompleteArrowProps,
} from '../combobox';

export {
  AComboboxCancel as AAutocompleteCancel,
  type AComboboxCancelProps as AAutocompleteCancelProps,
} from '../combobox';
export {
  AComboboxContent as AAutocompleteContent,
  type AComboboxContentEmits as AAutocompleteContentEmits,
  type AComboboxContentProps as AAutocompleteContentProps,
} from '../combobox';
export {
  AComboboxEmpty as AAutocompleteEmpty,
  type AComboboxEmptyProps as AAutocompleteEmptyProps,
} from '../combobox';
export {
  AComboboxGroup as AAutocompleteGroup,
  type AComboboxGroupProps as AAutocompleteGroupProps,
} from '../combobox';
export {
  AComboboxItem as AAutocompleteItem,
  type AComboboxItemEmits as AAutocompleteItemEmits,
  type AComboboxItemProps as AAutocompleteItemProps,
} from '../combobox';
export {
  AComboboxItemIndicator as AAutocompleteItemIndicator,
  type AComboboxItemIndicatorProps as AAutocompleteItemIndicatorProps,
} from '../combobox';
export {
  AComboboxLabel as AAutocompleteLabel,
  type AComboboxLabelProps as AAutocompleteLabelProps,
} from '../combobox';
export {
  AComboboxPortal as AAutocompletePortal,
  type AComboboxPortalProps as AAutocompletePortalProps,
} from '../combobox';
export {
  AComboboxSeparator as AAutocompleteSeparator,
  type AComboboxSeparatorProps as AAutocompleteSeparatorProps,
} from '../combobox';
export {
  AComboboxTrigger as AAutocompleteTrigger,
  type AComboboxTriggerProps as AAutocompleteTriggerProps,
} from '../combobox';
export {
  AComboboxViewport as AAutocompleteViewport,
  type AComboboxViewportProps as AAutocompleteViewportProps,
} from '../combobox';
export {
  AComboboxVirtualizer as AAutocompleteVirtualizer,
  type AComboboxVirtualizerProps as AAutocompleteVirtualizerProps,
} from '../combobox';

export {
  default as AAutocompleteInput,
  type AAutocompleteInputEmits,
  type AAutocompleteInputProps,
} from './autocomplete-input.vue';

export {
  default as AAutocompleteRoot,
  type AAutocompleteRootEmits,
  type AAutocompleteRootProps,
  injectAAutocompleteRootContext,
} from './autocomplete-root.vue';
