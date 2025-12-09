import type { PNavigationMenuItem } from 'pohon-ui';
import type { RouteRecordRaw } from 'vue-router';

export interface AdminRoute extends Pick<RouteRecordRaw, 'path' | 'meta'> {
  name: string;
  children?: Array<AdminRoute>;
}

export interface AdminMenu extends Omit<PNavigationMenuItem, 'children'> {
  children?: Array<Omit<PNavigationMenuItem, 'type' | 'pohon'>>;
}
