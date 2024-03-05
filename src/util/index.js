export const isWindow = typeof window !== 'undefined';
const getQueryString = (key, def) => {
  const urlParams = isWindow && new URLSearchParams(window.location.search);
  return urlParams && (urlParams.get(key) || def);
};

export {
  getQueryString,
}