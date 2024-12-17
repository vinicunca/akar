export type CheckboxCheckedState = 'indeterminate' | boolean;

export function isIndeterminate(checked?: CheckboxCheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getState(checked: CheckboxCheckedState) {
  if (isIndeterminate(checked)) {
    return 'indeterminate';
  }

  return checked ? 'checked' : 'unchecked';
}
