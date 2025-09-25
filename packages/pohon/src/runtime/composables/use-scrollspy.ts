import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';

export function useScrollspy() {
  const observer = ref<IntersectionObserver>();
  const visibleHeadings = ref<Array<string>>([]);
  const activeHeadings = ref<Array<string>>([]);

  function observerCallback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (!id) {
        return;
      }

      if (entry.isIntersecting) {
        visibleHeadings.value = [...visibleHeadings.value, id];
      } else {
        visibleHeadings.value = visibleHeadings.value.filter((h) => h !== id);
      }
    });
  }

  function updateHeadings(headings: Array<Element>) {
    headings.forEach((heading) => {
      if (!observer.value) {
        return;
      }

      observer.value.observe(heading);
    });
  }

  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0) {
      activeHeadings.value = oldVal;
    } else {
      activeHeadings.value = val;
    }
  });

  // Create intersection observer
  onBeforeMount(() => {
    observer.value = new IntersectionObserver(observerCallback);
  });

  // Destroy it
  onBeforeUnmount(() => observer.value?.disconnect());

  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings,
  };
}
