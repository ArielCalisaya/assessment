export const isWindow = typeof window !== 'undefined';
const getQueryString = (key, def) => {
  const urlParams = isWindow && new URLSearchParams(window.location.search);
  return urlParams && (urlParams.get(key) || def);
};

function updateQueryStringWithCurrentURLParams(targetUrl) {
  // Create a URL object from the current window URL to access its query parameters
  const currentUrlParams = new URLSearchParams(window.location.search);

  // Create a URL object for the target URL to modify its query parameters
  const targetUrlObj = new URL(targetUrl);

  // Iterate over the current URL's search parameters and update the target URL's parameters
  currentUrlParams.forEach((value, key) => {
    targetUrlObj.searchParams.set(key, value);
  });

  // Return the updated target URL as a string
  return targetUrlObj.toString();
}

export {
  getQueryString, updateQueryStringWithCurrentURLParams,
}