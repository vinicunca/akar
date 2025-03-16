export function isSafari(): boolean | undefined {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
