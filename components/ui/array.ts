/**
 * Converts API object of key-value pairs into an array of strings used in tables
 */
export const convertObjectToTableStringArray = (
  obj: { [key: string]: string },
  divider = " - ",
) => {
  const entries = Object.entries(obj);
  if (entries.length > 0) {
    return entries.map(([key, value]) => `${key}${divider}${value}`);
  } else {
    return [];
  }
};
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value) && typeof value === "object";
};
export const isStringArray = (value: unknown): value is string[] => {
  if (!isArray(value) || value.length === 0) return false;
  return value.every((item) => typeof item === "string");
};
