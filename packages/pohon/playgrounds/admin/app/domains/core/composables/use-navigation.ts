import { useAccessStore } from '../../../../layers/dashboard/app/stores/access.store';

export function useNavigation() {
  const store = useAccessStore();

  const navLinks = [];

  return {
    navLinks,
  };
}
