import { refAutoReset } from '@vueuse/shared';
import { wrapArray } from './arrays';
import { getActiveElement } from './get-active-element';

export function useTypeahead(callback?: (search: string) => void) {
  // Reset `search` 1 second after it was last updated
  const search = refAutoReset('', 1000);

  function handleTypeaheadSearch(
    { key, items }: { key: string; items: Array<{ ref: HTMLElement; value?: any }> },
  ) {
    search.value = search.value + key;

    if (callback) {
      callback(key);
    } else {
      const currentItem = getActiveElement();
      const itemsWithTextValue = items.map((item) => ({
        ...item,
        textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? '',
      }));

      const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
      const values = itemsWithTextValue.map((item) => item.textValue);

      const nextMatch = getNextMatch({
        values,
        search: search.value,
        currentMatch: currentMatch?.textValue,
      });

      const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);

      if (newItem) {
        (newItem.ref as HTMLElement).focus();
      }

      return newItem?.ref;
    }
  };

  function resetTypeahead() {
    search.value = '';
  };

  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead,
  };
}

/**
 * This is the "meat" of the typeahead matching logic. It takes in all the values,
 * the search and the current match, and returns the next match (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through options starting with that character)
 *
 * We also reorder the values by wrapping the array around the current match.
 * This is so we always look forward from the current match, and picking the first
 * match will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current match from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current match still matches.
 */
export function getNextMatch(
  { values, search, currentMatch }:
  {
    values: Array<string>;
    search: string;
    currentMatch?: string;
  },
) {
  const isRepeated = search.length > 1
    && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;

  if (excludeCurrentMatch) {
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  }

  const nextMatch = wrappedValues.find((value) =>
    value.toLowerCase().startsWith(normalizedSearch.toLowerCase()),
  );

  return nextMatch !== currentMatch
    ? nextMatch
    : undefined;
}
