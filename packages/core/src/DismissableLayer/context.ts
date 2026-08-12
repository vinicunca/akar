import { reactive } from 'vue';

export const context = reactive({
  layersRoot: new Set<HTMLElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<HTMLElement>(),
  originalBodyPointerEvents: undefined as string | undefined,
  branches: new Set<HTMLElement>(),
});
