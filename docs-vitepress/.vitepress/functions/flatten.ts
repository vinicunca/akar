export function flatten<T extends Record<string, any>, U extends keyof T>(items: Array<T>, key: U): Array<T> {
  return items.reduce((acc: Array<any>, item: T) => {
    acc.push(item);
    if (item[key]) {
      acc.push(...flatten(item[key], key as any));
    }
    return acc;
  }, []);
}
