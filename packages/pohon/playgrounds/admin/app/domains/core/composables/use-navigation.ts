import { useAccessStore } from '../../../../layers/admin/app/stores/access.store';

export function useNavigation() {
  const store = useAccessStore();

  const navLinks = [];

  return {
    navLinks,
  };
}
