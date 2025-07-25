
export const addItems = (id, count) => {
  const existing = Number(localStorage.getItem(id) || 0);
  localStorage.setItem(id, Number(existing + count));
}

export const addItem = (id) => {
  const existing = Number(localStorage.getItem(id) || 0);
  localStorage.setItem(id, Number(existing + 1));
}

export const removeItem = (id) => {
  const existing = Number(localStorage.getItem(id) || 0);
  localStorage.setItem(id, Number(existing - 1));
}

export const getItemCount = (id) => {
  return Number(localStorage.getItem(id) || 0);
}