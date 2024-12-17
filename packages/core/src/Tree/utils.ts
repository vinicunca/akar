export function flatten<U, T extends { children: Array<any> } >(items: Array<T>): Array<U> {
  return items.reduce((acc: Array<any>, item: T) => {
    acc.push(item);

    if (item.children) {
      acc.push(...flatten(item.children));
    }

    return acc;
  }, []);
}

// TODO: expose more utility function to handle flattened item
