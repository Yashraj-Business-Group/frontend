/** Trims whitespace and caps length before a value is sent to the database. */
export const sanitizeText = (value: string, maxLength: number): string =>
  value.trim().slice(0, maxLength);

/** Applies sanitizeText to every string field in an object; other fields pass through untouched. */
export const sanitizeFields = <T extends Record<string, unknown>>(
  obj: T,
  maxLength: number
): T => {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeText(value, maxLength);
    }
  }
  return result;
};
