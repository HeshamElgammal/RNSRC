import { MMKV } from 'react-native-mmkv';

// Create MMKV instance
const mmkvInstance = new MMKV({
  id: 'app-storage',
  encryptionKey: 'your-encryption-key-here', // Change this in production
});

export const mmkvStorage = {
  // Synchronous operations (MMKV advantage)
  getItem<T>(key: string): T | null {
    try {
      const value = mmkvInstance.getString(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      mmkvInstance.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  },

  removeItem(key: string): void {
    try {
      mmkvInstance.delete(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  },

  clear(): void {
    try {
      mmkvInstance.clearAll();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Get all keys
  getAllKeys(): string[] {
    return mmkvInstance.getAllKeys();
  },

  // Check if key exists
  contains(key: string): boolean {
    return mmkvInstance.contains(key);
  },
};

// Legacy async API for compatibility (wraps sync MMKV)
export const storage = {
  async getItem<T>(key: string): Promise<T | null> {
    return mmkvStorage.getItem<T>(key);
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    mmkvStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    mmkvStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    mmkvStorage.clear();
  },
};
