/**
 * Every item and its descendants, depth-first. Children are read through
 * `getChildren` (the `TreeRoot` prop), so a custom children schema is followed
 * at every level, not only the first. Defaults to `item.children`.
 */
export function flatten<T>(
  items: ReadonlyArray<T>,
  getChildren: (item: T) => ReadonlyArray<T> | undefined = (item) => (item as { children?: Array<T> }).children,
): Array<T> {
  return items.reduce((acc: Array<T>, item: T) => {
    acc.push(item);

    const children = getChildren(item);
    if (children) {
      acc.push(...flatten(children, getChildren));
    }

    return acc;
  }, []);
}
