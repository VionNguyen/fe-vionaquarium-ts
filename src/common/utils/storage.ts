/**
 * Get an data from storage.
 *
 * @param key The key to fetch.
 */
 export function loadFromStorage(key: any) {
    try {
      const dataParsed: any = localStorage.getItem(key);
      console.log(dataParsed)
      return JSON.parse(dataParsed);
    } catch {
      return null;
    }
  }
  
  /**
   * Saves data to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  export function saveToStorage(key: any, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  export function removeFromStorage(key: any) {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
  
  /**
   * Burn it all to the ground.
   */
  export function clear() {
    try {
      localStorage.clear();
    } catch {}
  }
  