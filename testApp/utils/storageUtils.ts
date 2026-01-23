/**
 * Utility for type-safe local storage operations.
 */
export const StorageUtils = {
  /**
   * Mock storage implementation (replaceable with MMKV or AsyncStorage).
   */
  _storage: new Map<string, string>(),

  setItem: (key: string, value: any): void => {
    StorageUtils._storage.set(key, JSON.stringify(value));
  },

  getItem: <T>(key: string): T | null => {
    const value = StorageUtils._storage.get(key);
    return value ? JSON.parse(value) : null;
  },

  removeItem: (key: string): void => {
    StorageUtils._storage.delete(key);
  },

  clear: (): void => {
    StorageUtils._storage.clear();
  },
};
