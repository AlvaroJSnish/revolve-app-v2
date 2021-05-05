export function saveToStorage(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
