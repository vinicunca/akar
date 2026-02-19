interface TreeConfigOptions {
  // The name of the child property, defaults to 'children'
  childProps: string;
}

/**
 * Filter the nodes of the given tree structure based on a condition and
 * return an array of all matching nodes in the original order.
 *
 * @param params
 * @param params.tree Array of root nodes of the tree structure to be filtered.
 * @param params.filter Condition to match each node.
 * @param params.options Optional property name for the child nodes array.
 * @returns Array containing all matching nodes.
 */
export function filterTree<T extends Record<string, any>>(
  { tree, filter, options }:
  {
    tree: Array<T>;
    filter: (node: T) => boolean;
    options?: TreeConfigOptions;
  },
): Array<T> {
  const { childProps } = options || {
    childProps: 'children',
  };

  function filterTree_(nodes: Array<T>): Array<T> {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = filterTree_(node[childProps]);
        }

        return true;
      }

      return false;
    });
  }

  return filterTree_(tree);
}

/**
 * Remap the nodes of the given tree structure based on a condition.
 *
 * @param params
 * @param params.tree Array of root nodes of the tree structure to be mapped.
 * @param params.mapper Function to map each node.
 * @param params.options Optional property name for the child nodes array.
 */
export function mapTree<T, V extends Record<string, any>>(
  { tree, mapper, options }:
  {
    tree: Array<T>;
    mapper: (node: T) => V;
    options?: TreeConfigOptions;
  },
): Array<V> {
  const { childProps } = options || {
    childProps: 'children',
  };
  return tree.map((node) => {
    const mapperNode: Record<string, any> = mapper(node);
    if (mapperNode[childProps]) {
      mapperNode[childProps] = mapTree({
        tree: mapperNode[childProps],
        mapper,
        options,
      });
    }
    return mapperNode as V;
  });
}

/**
 * Recursively sort tree-structured data
 * @param params
 * @param params.tree - Array of tree data
 * @param params.sortFunction - Sort function, used to define the sorting rules
 * @param params.options - Configuration options, including child node attribute names
 * @returns Sorted tree data
 */
export function sortTree<T extends Record<string, any>>(
  { tree, sortFunction, options }:
  {
    tree: Array<T>;
    sortFunction: (a: T, b: T) => number;
    options?: TreeConfigOptions;
  },
): Array<T> {
  const { childProps } = options || {
    childProps: 'children',
  };

  return tree
    .toSorted(sortFunction)
    .map((item) => {
      const children = item[childProps];
      if (children && Array.isArray(children) && children.length > 0) {
        return {
          ...item,
          [childProps]: sortTree({ tree: children, sortFunction, options }),
        };
      }
      return item;
    });
}
