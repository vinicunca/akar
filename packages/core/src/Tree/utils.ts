export function getDescendants<T>(item: T, getChildren: (item: T) => Array<T> | undefined): Array<T> {
  const descendants: Array<T> = [];
  for (const child of getChildren(item) ?? []) {
    descendants.push(child, ...getDescendants(child, getChildren));
  }
  return descendants;
}
