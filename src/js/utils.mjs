// utils.mjs

// Get data from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Clear a specific key from localStorage
export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

// Utility to format currency (for cart totals, product prices, etc.)
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// Utility to retrieve query parameters from the URL (useful for product pages)
export function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Debounce function to limit the frequency of events (e.g., search input, scroll events)
export function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
