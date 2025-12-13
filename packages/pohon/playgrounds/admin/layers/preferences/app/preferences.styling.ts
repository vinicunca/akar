export function isDarkTheme(theme: string) {
  let dark = theme === 'dark';

  if (theme === 'auto') {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return dark;
}
