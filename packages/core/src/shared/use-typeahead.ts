import type { Ref } from 'vue';

import { refAutoReset } from '@vueuse/shared';

import { wrapArray } from '~~/shared';

export function useTypeahead(collections?: Ref<Array<HTMLElement>>) {
  // Reset `search` 1 second after it was last updated
  const search = refAutoReset('', 1000);

  function handleTypeaheadSearch(
    { key, fallback }: { fallback?: Array<HTMLElement>; key: string },
  ) {
    if (!collections?.value && !fallback) {
      return;
    }

    search.value = search.value + key;
    const items = collections?.value ?? fallback!;
    const currentItem = document.activeElement;
    const currentMatch = items.find((item) => item === currentItem)?.textContent?.trim() ?? '';
    const values = items.map((item) => item.textContent?.trim() ?? '');
    const nextMatch = getNextMatch({
      values,
      search: search.value,
      currentMatch,
    });

    const newItem = items.find(
      (item) => item.textContent?.trim() === nextMatch,
    );

    if (newItem) {
      (newItem as HTMLElement).focus();
    }

    return newItem;
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
    currentMatch?: string;
    search: string;
    values: Array<string>;
  },
) {
  const isRepeated
    = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated
    ? search[0]
    : search;
  const currentMatchIndex = currentMatch
    ? values.indexOf(currentMatch)
    : -1;

  let wrappedValues = wrapArray({
    array: values,
    startIndex: Math.max(currentMatchIndex, 0),
  });

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
