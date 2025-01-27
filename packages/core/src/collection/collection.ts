/* eslint-disable ts/no-empty-object-type */
import type { Ref } from 'vue';
import {
  computed,
  defineComponent,
  h,
  inject,
  markRaw,
  provide,

  ref,
  watch,
  watchEffect,
} from 'vue';
import { APrimitiveSlot, usePrimitiveElement } from '~~/primitive';

interface CollectionContext<ItemData = {}> {
  collectionRef: Ref<HTMLElement | undefined>;
  itemMap: Ref<Map<HTMLElement, ItemData & { ref: HTMLElement; value?: any }>>;
}

const ITEM_DATA_ATTR = 'data-akar-collection-item';

export function useCollection<ItemData = {}>(options: { key?: string; isProvider?: boolean } = {}) {
  const { key = '', isProvider = false } = options;
  const injectionKey = `${key}CollectionProvider`;
  let context: CollectionContext<ItemData>;

  if (isProvider) {
    const itemMap = ref<Map<HTMLElement, ItemData & { ref: HTMLElement }>>(new Map());
    const collectionRef = ref<HTMLElement>();

    context = {
      collectionRef,
      itemMap,
    } as CollectionContext<ItemData>;
    provide(injectionKey, context);
  } else {
    context = inject(injectionKey) as CollectionContext<ItemData>;
  }

  function getItems(includeDisabledItem = false) {
    const collectionNode = context.collectionRef.value;
    if (!collectionNode) {
      return [];
    }
    const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
    const items = Array.from(context.itemMap.value.values());
    const orderedItems = items.sort(
      (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref),
    );

    if (includeDisabledItem) {
      return orderedItems;
    } else {
      return orderedItems.filter((i) => i.ref.dataset.disabled !== '');
    }
  };

  const ACollectionSlot = defineComponent({
    name: 'ACollectionSlot',
    setup(_, { slots }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watch(currentElement, () => {
        context.collectionRef.value = currentElement.value;
      });
      return () => h(APrimitiveSlot, { ref: primitiveElement }, slots);
    },
  });

  const ACollectionItem = defineComponent({
    name: 'ACollectionItem',
    inheritAttrs: false,
    props: {
      value: {
        // It accepts any value
        validator: () => true,
      },
    },
    setup(props, { slots, attrs }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();

      watchEffect((cleanupFn) => {
        if (currentElement.value) {
          const key = markRaw(currentElement.value);
          // @ts-expect-error ignore assignment of unknown to any
          context.itemMap.value.set(key, { ref: currentElement.value!, value: props.value });
          cleanupFn(() => context.itemMap.value.delete(key));
        }
      });

      return () => h(APrimitiveSlot, { ...attrs, [ITEM_DATA_ATTR]: '', ref: primitiveElement }, slots);
    },
  });

  const reactiveItems = computed(() => Array.from(context.itemMap.value.values()));
  const itemMapSize = computed(() => context.itemMap.value.size);

  return {
    getItems,
    reactiveItems,
    itemMapSize,
    ACollectionSlot,
    ACollectionItem,
  };
}
