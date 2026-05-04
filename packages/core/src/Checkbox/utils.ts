export type CheckedState = boolean | 'indeterminate';

export function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getState(checked: CheckedState) {
  // eslint-disable-next-line no-nested-ternary
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked';
}
