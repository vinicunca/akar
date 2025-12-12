import type { PNavigationMenuItem } from 'pohon-ui';

export interface AdminMenu extends Omit<PNavigationMenuItem, 'children'> {
  children?: Array<Omit<PNavigationMenuItem, 'type' | 'pohon'>>;
}
