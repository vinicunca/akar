import type { Theme } from 'vitepress';
import LayoutBase from '../custom/layout-base.vue';
import 'uno.css';
import './styles.css';

export default {
  Layout: LayoutBase,
} satisfies Theme;
