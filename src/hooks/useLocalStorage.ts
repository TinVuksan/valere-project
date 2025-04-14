import { useCallback } from 'react';

export const useLocalStorage = <T>() => {
  const getLocalStorageItem = useCallback((key: string): T | null => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error(`Error getting localStorage key ${key}: `, error);
      return null;
    }
  }, []);
  const setLocalStorageItem = useCallback((key: string, value: T) => {
    try {
      const stringifiedValue = JSON.stringify(value);
      localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.error(`Error setting localStorage key ${key}: `, error);
    }
  }, []);

  return { getLocalStorageItem, setLocalStorageItem };
};
