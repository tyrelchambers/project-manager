export const formatUrl = (string) => {
  return encodeURIComponent(string.replace(/ /g, "-").toLowerCase());
};
