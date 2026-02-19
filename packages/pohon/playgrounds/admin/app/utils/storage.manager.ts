type PStorageType = 'localStorage' | 'sessionStorage';

interface PStorageManagerOptions {
  prefix?: string;
  storageType?: PStorageType;
}

interface PStorageItem<T> {
  expiry?: number;
  value: T;
}

export class PStorageManager {
  private prefix: string;
  private storage: Storage;

  constructor({
    prefix = '',
    storageType = 'localStorage',
  }: PStorageManagerOptions = {}) {
    this.prefix = prefix;

    if (import.meta.client) {
      this.storage = storageType === 'localStorage'
        ? window.localStorage
        : window.sessionStorage;
    } else {
      this.storage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      } as unknown as Storage;
    }
  }

  /**
   * Clear all storage items with prefix
   */
  clear(): void {
    const keysToRemove: Array<string> = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      this.storage.removeItem(key);
    });
  }

  /**
   * Clear all expired storage items
   */
  clearExpiredItems(): void {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);

      if (key && key.startsWith(this.prefix)) {
        const shortKey = key.replace(this.prefix, '');

        // Call the getItem method to check and remove expired items
        this.getItem(shortKey);
      }
    }
  }

  /**
   * @param key
   * @param defaultValue The default value returned when the item does not exist or has expired
   * @returns If the item has expired or parsing error occurs, the default value is returned.
   */
  getItem<T>(key: string, defaultValue: null | T = null): null | T {
    const fullKey = this.getFullKey(key);
    const itemStr = this.storage.getItem(fullKey);
    if (!itemStr) {
      return defaultValue;
    }

    try {
      const item: PStorageItem<T> = JSON.parse(itemStr);

      if (item.expiry && Date.now() > item.expiry) {
        this.storage.removeItem(fullKey);

        return defaultValue;
      }
      return item.value;
    } catch (error) {
      console.error(`Error parsing item with key "${fullKey}":`, error);
      // If parsing fails, remove the item
      this.storage.removeItem(fullKey);
      return defaultValue;
    }
  }

  /**
   * Remove storage item
   * @param key key
   */
  removeItem(key: string): void {
    const fullKey = this.getFullKey(key);
    this.storage.removeItem(fullKey);
  }

  /**
   * @param key
   * @param value
   * @param ttl Time to live (milliseconds)
   */
  setItem<T>(key: string, value: T, ttl?: number): void {
    const fullKey = this.getFullKey(key);
    const expiry = ttl ? Date.now() + ttl : undefined;
    const item: PStorageItem<T> = { expiry, value };

    try {
      this.storage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      console.error(`Error setting item with key "${fullKey}":`, error);
    }
  }

  /**
   * Get the full storage key
   * @param key the original key
   * @returns the full key with prefix
   */
  private getFullKey(key: string): string {
    return `${this.prefix}-${key}`;
  }
}
