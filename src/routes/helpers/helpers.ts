type ObjectDataType<T extends Record<string | number, any>> = T;
type KeyType<T> = keyof T;

export const hasEmptyFields = <T extends Record<string | number, any>>(
  bodyKeys: readonly (keyof T)[],
  body: ObjectDataType<T>
): boolean => {
  return bodyKeys.some((key) => {
    const value = body[key];
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (typeof value === 'number' && isNaN(value)) ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length === 0)
    );
  });
};
