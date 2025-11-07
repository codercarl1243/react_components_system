declare const __brand: unique symbol;

type Brand<B> = { [__brand]: B };

export type Branded<T, B> = T & Brand<B>;

export function asBrand<T extends string, B>(value: T): Branded<T, B> {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('Cannot brand an empty or non-string value');
  }
  return value as Branded<T, B>;
}