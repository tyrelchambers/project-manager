export const removeSpecialChar = (str) => {
  const pattern = /[\W]/gi;
  return str.replace(pattern, "");
};
