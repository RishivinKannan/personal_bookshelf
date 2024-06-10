interface helperTypes<T> {
  data: T[];
  keyValue: string | number;
  key: string;
}
export function findItem<T>({ data, keyValue, key }: helperTypes<T>) {
  const item = data.find(
    (i: T) => (i as unknown as Record<string, unknown>)[key] === keyValue
  );

  return !!item;
}

export function deleteItem<T>({ data, key, keyValue }: helperTypes<T>) {
  const item = data.filter(
    (i: T) => (i as unknown as Record<string, unknown>)[key] !== keyValue
  );

  return item;
}

export const clsn = (classOne = "", classTwo = "", classThree = "") => {
  return classOne + classTwo + classThree;
};
