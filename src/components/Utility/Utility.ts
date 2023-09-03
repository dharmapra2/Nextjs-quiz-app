export const loadFromLocalStorage = (key = "store") => {
  try {
    if (typeof window === "undefined") {
      // Server-side context, return undefined or an appropriate value
      return undefined;
    }
    const serializedStore = window.localStorage.getItem(key);
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (error) {
    console.log(`localStorage.getItem error ==> ${error}`);
    return null;
  }
};
export const saveToLocalStorage = (value: any, key = "store") => {
  try {
    if (typeof window === "undefined") {
      // Server-side context, return undefined or an appropriate value
      return undefined;
    }
    const serializedStore = JSON.stringify(value);
    window.localStorage.setItem(key, serializedStore);
  } catch (error) {
    console.log(`localStorage.setItem error ==> ${error}`);
  }
};
export const clearFromLocalStorage = (key = "store") => {
  try {
    if (typeof window === "undefined") {
      // Server-side context, return undefined or an appropriate value
      return undefined;
    }
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(`localStorage.setItem error ==> ${error}`);
  }
};
