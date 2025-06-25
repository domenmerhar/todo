export const normalisePascalCase = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, "$1 $2");
