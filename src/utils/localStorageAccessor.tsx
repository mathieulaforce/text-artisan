export const localStorageItemAccessor = <T extends unknown>(itemKey: string, defaultValue: T) => {
  const saveItem = (value: T) => {
    localStorage.setItem(itemKey, JSON.stringify(value));
  };

  const clear = () => {
    localStorage.removeItem(itemKey);
  };

  const getItem = (): T => {
    const item = localStorage.getItem(itemKey);
    if (item) {
      const parsedItem: T = JSON.parse(item);
      return parsedItem;
    }
    saveItem(defaultValue);
    return defaultValue;
  };

  return {
    saveItem,
    getItem,
    clear,
  };
};
