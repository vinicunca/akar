import { computed, type MaybeRef, unref } from 'vue';

export function useFilter(options?: MaybeRef<Intl.CollatorOptions>) {
  const computedOptions = computed(() => unref(options));
  const collator = computed(
    () => new Intl.Collator(
      'en',
      { usage: 'search', ...computedOptions.value },
    ),
  );

  function startsWith(
    { string, substring }: { string: string; substring: string },
  ) {
    if (substring.length === 0) {
      return true;
    }

    string = string.normalize('NFC');
    substring = substring.normalize('NFC');

    return collator.value.compare(string.slice(0, substring.length), substring) === 0;
  };

  function endsWith(
    { string, substring }: { string: string; substring: string },
  ) {
    if (substring.length === 0) {
      return true;
    }

    string = string.normalize('NFC');
    substring = substring.normalize('NFC');

    return collator.value.compare(string.slice(-substring.length), substring) === 0;
  };

  function contains(
    { string, substring }: { string: string; substring: string },
  ) {
    if (substring.length === 0) {
      return true;
    }

    string = string.normalize('NFC');
    substring = substring.normalize('NFC');

    let scan = 0;
    const sliceLen = substring.length;
    for (; scan + sliceLen <= string.length; scan++) {
      const slice = string.slice(scan, scan + sliceLen);
      if (collator.value.compare(substring, slice) === 0) {
        return true;
      }
    }

    return false;
  };

  return {
    startsWith,
    endsWith,
    contains,
  };
}
