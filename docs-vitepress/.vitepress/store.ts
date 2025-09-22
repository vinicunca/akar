import type { PACKAGE_MANAGERS } from './plugins/installation-tabs';
import { reactive } from 'vue';

export const store = reactive({
  packageManager: 'npm' as typeof PACKAGE_MANAGERS[number],
});
