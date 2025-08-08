const KEY = 'nl-cart';

export const updateItem = (id, count) => {
  const items = JSON.parse(localStorage.getItem(KEY) || '{}');
  const newItems = { ...items, [id]: count}
  localStorage.setItem(KEY, JSON.stringify(newItems));
}

export const getItemCount = (id) => {
  const items = JSON.parse(localStorage.getItem(KEY) || '{}');
  return Number(items[id] || 0);
}

export const getItems = () => {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}

export const clearCart = () => {
  localStorage.removeItem(KEY);
}