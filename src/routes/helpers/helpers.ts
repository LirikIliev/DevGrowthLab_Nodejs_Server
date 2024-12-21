type ObjectDataType<T extends Record<string | number, any>> = T;
type KeyType<T> = keyof T;

export const hasEmptyFields = <T extends Record<string | number, any>>(
  bodyKeys: readonly (keyof T)[], // Keys to check
  body: ObjectDataType<T>
): boolean => {
  return bodyKeys.some((key) => {
    const value = body[key];
    // Define "empty" conditions
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') || // Empty string
      (typeof value === 'number' && isNaN(value)) || // NaN check
      (Array.isArray(value) && value.length === 0) || // Empty array
      (typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length === 0) // Empty object
    );
  });
};
