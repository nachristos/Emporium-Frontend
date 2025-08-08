
export const setSearch = (key, value) => {
  const newUrl = new URL(window.location.href);
  const searchParams = newUrl.searchParams;
  searchParams.set(key, value);
  newUrl.search = searchParams.toString();
  window.history.pushState({}, '', newUrl.toString());
}

export const clearSearch = () => {
  const newUrl = new URL(window.location.href);
  newUrl.search = '';
  window.history.pushState({}, '', newUrl.toString());
}

export const getCategory = () => {
  const newUrl = new URL(window.location.href);
  const searchParams = newUrl.searchParams;
  return searchParams.get('category');
}