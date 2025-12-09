import { useAccessStore } from '../stores/access.store';

export function useNavigation() {
  const store = useAccessStore();

  const navLinks = [];

  return {
    navLinks,
  };
}
