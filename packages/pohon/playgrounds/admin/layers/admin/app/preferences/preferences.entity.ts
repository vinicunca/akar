import type { DeepPartial } from '@vinicunca/perkakas';
import type {
  AccessModeType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
} from '../types/type.dashboard';

export interface PreferencesApp {
  /** Access mode */
  accessMode: AccessModeType;
  /** Check updates polling interval */
  checkUpdatesInterval: number;
  /** Enable gray mode */
  enableColorGrayMode: boolean;
  /** Enable color weak mode */
  enableColorWeakMode: boolean;
  /** Enable compact mode */
  enableCompact: boolean;
  /** Enable content compact mode */
  contentCompact: ContentCompactType;
  /** Content compact width */
  contentCompactWidth: number;
  /** Content padding */
  contentPadding: number;
  /** Content bottom padding */
  contentPaddingBottom: number;
  /** Content left padding */
  contentPaddingLeft: number;
  /** Content right padding */
  contentPaddingRight: number;
  /** Content top padding */
  contentPaddingTop: number;
  /** Default avatar */
  defaultAvatar: string;
  /** Default homepage address */
  defaultHomePath: string;
  /** Enable dynamic title */
  enableDynamicTitle: boolean;
  /** Enable check updates */
  enableCheckUpdates: boolean;
  /** Show preferences */
  enablePreferences: boolean;
  /** Enable refresh token */
  enableRefreshToken: boolean;
  /** Is mobile */
  isMobile: boolean;
  /** Layout type */
  layout: LayoutType;
  /** Supported languages */
  locale: string;
  /** Login expired mode */
  loginExpiredMode: LoginExpiredModeType;
  /** Application name */
  name: string;
  /** Preferences button position */
  preferencesButtonPosition: PreferencesButtonPositionType;
  /** Enable watermark */
  enableWatermark: boolean;
  /** z-index */
  zIndex: number;
}

export interface PreferencesBreadcrumb {
  /** Enable breadcrumb */
  enable: boolean;
  /** Hide breadcrumb when there is only one */
  hideOnlyOne: boolean;
  /** Show home icon in breadcrumb */
  showHome: boolean;
  /** Show icons in breadcrumb */
  showIcon: boolean;
  /** Breadcrumb style */
  styleType: BreadcrumbStyleType;
}

export interface PreferencesCopyright {
  /** Company name */
  companyName: string;
  /** Company site link */
  companySiteLink: string;
  /** Copyright date */
  date: string;
  /** Enable copyright */
  enable: boolean;
  /** ICP number */
  icp: string;
  /** ICP link */
  icpLink: string;
  /** Set whether the panel is displayed */
  showSetting?: boolean;
}

export interface PreferencesFooter {
  /** Enable footer */
  enable: boolean;
  /** Fix footer */
  isFixed: boolean;
  /** Footer height */
  height: number;
}

export interface PreferencesHeader {
  /** Enable header */
  enable: boolean;
  /** Header height */
  height: number;
  /** Hide header (CSS hidden) */
  hidden: boolean;
  /** Top bar menu position */
  menuAlign: LayoutHeaderMenuAlignType;
  /** Header display mode */
  mode: LayoutHeaderModeType;
}

export interface PreferencesLogo {
  /** Enable logo */
  enable: boolean;
  /** Logo image fit mode */
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Logo source */
  source: string;
  /** Dark theme logo URL (optional, use source if not specified) */
  sourceDark?: string;
}

export interface PreferencesNavigation {
  /** Accordion mode for navigation menu */
  isAccordion: boolean;
  /** Split navigation menu, only effective when layout=mixed-nav */
  isSplit: boolean;
  /** Navigation menu style */
  styleType: NavigationStyleType;
}

export interface PreferencesSidebar {
  /** Automatically activate the submenu when clicking on a directory */
  autoActivateChild: boolean;
  /** Collapse sidebar */
  collapsed: boolean;
  /** Is the sidebar collapse button visible */
  showCollapsedButton: boolean;
  /** Show title when sidebar is collapsed */
  collapsedShowTitle: boolean;
  /** Sidebar collapse width */
  collapsedWidth: number;
  /** Enable sidebar */
  enable: boolean;
  /** Expand children on hover */
  expandChildrenOnHover: boolean;
  /** Collapse extra area of sidebar */
  extraCollapsed: boolean;
  /** Sidebar expansion area collapsed width */
  extraCollapsedWidth: number;
  /** Is the sidebar fixed button visible */
  showFixedButton: boolean;
  /** Hide sidebar (CSS hidden) */
  hidden: boolean;
  /** Mixed sidebar widths */
  mixedWidth: number;
  /** Sidebar width */
  width: number;
}

export interface PreferencesShortcutKey {
  /** Enable global shortcut keys */
  enable: boolean;
  /** Enable global lock screen shortcut key */
  enableGlobalLockScreen: boolean;
  /** Enable global logout shortcut key */
  enableGlobalLogout: boolean;
  /** Enable global preferences shortcut key */
  enableGlobalPreferences: boolean;
  /** Enable global search shortcut key */
  enableGlobalSearch: boolean;
}

export interface PreferencesTabbar {
  /** Enable draggable multi-tabs */
  isDraggable: boolean;
  /** Enable multi-tabs */
  enable: boolean;
  /** Tab height */
  height: number;
  /** Enable tab caching */
  enableKeepAlive: boolean;
  /** Limit the maximum number */
  maxCount: number;
  /** Whether to close the tab when clicking the middle button */
  isMiddleClickToClose: boolean;
  /** Persist tabs */
  enablePersist: boolean;
  /** Show tab icons */
  showIcon: boolean;
  /** Show maximize button */
  showMaximize: boolean;
  /** Show more button */
  showMore: boolean;
  /** Show refresh button */
  showRefresh: boolean;
  /** Tab style */
  styleType: TabsStyleType;
  /** Whether to enable mouse wheel response */
  enableWheelable: boolean;
}

export interface PreferencesTheme {
  /** Built-in theme name */
  builtinType: BuiltinThemeType;
  /** Destructive color */
  colorDestructive: string;
  /** Primary color */
  colorPrimary: string;
  /** Success color */
  colorSuccess: string;
  /** Warning color */
  colorWarning: string;
  /** Current theme mode */
  mode: ThemeModeType;
  /** Border radius */
  radius: string;
  /** Enable semi-dark header (only effective when theme='light') */
  enableSemiDarkHeader: boolean;
  /** Enable semi-dark sidebar (only effective when theme='light') */
  enableSemiDarkSidebar: boolean;
}

export interface PreferencesTransition {
  /** Enable page transition animation */
  enable: boolean;
  // /** Enable page loading */
  enableLoading: boolean;
  /** Page transition animation */
  name: PageTransitionType | string;
  /** Enable page loading progress animation */
  enableProgress: boolean;
}

export interface PreferencesWidget {
  /** Enable fullscreen widget */
  enableFullscreen: boolean;
  /** Enable global search widget */
  enableGlobalSearch: boolean;
  /** Enable language toggle widget */
  enableLanguageToggle: boolean;
  /** Enable lock screen */
  enableLockScreen: boolean;
  /** Show notification widget */
  enableNotification: boolean;
  /** Show Refresh Button */
  showRefresh: boolean;
  /** Show sidebar toggle widget */
  showSidebarToggle: boolean;
  /** Show theme toggle widget */
  showThemeToggle: boolean;
  /** Show timezone selection */
  showTimezone: boolean;
}

export interface PreferencesCore {
  /** App configuration */
  app: PreferencesApp;
  /** Breadcrumb configuration */
  breadcrumb: PreferencesBreadcrumb;
  /** Copyright configuration */
  copyright: PreferencesCopyright;
  /** Footer configuration */
  footer: PreferencesFooter;
  /** Header configuration */
  header: PreferencesHeader;
  /** Logo configuration */
  logo: PreferencesLogo;
  /** Navigation configuration */
  navigation: PreferencesNavigation;
  /** Shortcut keys configuration */
  shortcutKeys: PreferencesShortcutKey;
  /** Sidebar configuration */
  sidebar: PreferencesSidebar;
  /** Tabbar configuration */
  tabbar: PreferencesTabbar;
  /** Theme configuration */
  theme: PreferencesTheme;
  /** Transition configuration */
  transition: PreferencesTransition;
  /** Widget configuration */
  widget: PreferencesWidget;
}

export type PreferencesCoreKeys = keyof PreferencesCore;

export interface InitialOptions {
  namespace: string;
  overrides?: DeepPartial<PreferencesCore>;
}
