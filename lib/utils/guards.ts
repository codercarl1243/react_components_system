import { ReactElement, ReactNode } from "react";

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Type guard to check if a value is not null or undefined.
 * Narrows the type to exclude null and undefined.
 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard to check if a value is null or undefined.
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Type guard to check if a value is defined (not undefined).
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Type guard to check if a value is undefined (not defined).
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}

/**
 * Type guard to check if a value is not null.
 */
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

/**
 * Type guard to check if a value is an object (including empty objects).
 * Returns false for null, undefined, and arrays.
 * 
 * @example
 * ```ts
 * isObject({ name: 'John' }) // true
 * isObject({}) // true
 * isObject(null) // false
 * isObject([1, 2, 3]) // false
 * ```
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    value !== undefined &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
}


/**
 * Type guard to check if a value is a non-empty object.
 * Returns false for null, undefined, arrays, and objects with no own properties.
 * 
 * @example
 * ```ts
 * isNonEmptyObject({ name: 'John' }) // true
 * isNonEmptyObject({}) // false
 * isNonEmptyObject(null) // false
 * isNonEmptyObject([1, 2, 3]) // false
 * isNonEmptyObject('string') // false
 * ```
 */
export function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    value !== undefined &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  );
}

/**
  * Checks if a value is thenable (Promise-like).
  * 
  * A thenable is any object or a function with a `then` method, which includes native Promises,
  * async function results, and custom Promise-like objects.
  * 
  * @param value - The value to check
  * @returns True if the value is thenable, false otherwise
  * 
  * @example
  * isThenable(Promise.resolve()) // true
  * isThenable({ then: () => {} }) // true
  * isThenable('string') // false
*/
export function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  )
}

/**
 * Type guard that checks if a value is a valid React element.
 * 
 * @param node - The value to check
 * @returns True if the value is a ReactElement with props
 * 
 * @example
 * ```tsx
 * const element = <div>Hello</div>;
 * if (isReactElement(element)) {
 *   console.log(element.props); // TypeScript knows props exists
 * }
 * ```
 */
export function isReactElement(node: unknown): node is ReactElement {
  return (
    node !== null &&
    typeof node === "object" && 
    "props" in node
  );
}

/**
 * Type guard that checks if a React element has children.
 * 
 * @param node - The value to check
 * @returns True if the value is a ReactElement with non-null/undefined children
 * 
 * @example
 * ```tsx
 * const element = <div><span>Child</span></div>;
 * if (hasChildren(element)) {
 *   console.log(element.props.children); // TypeScript knows children exists
 * }
 * 
 * // Empty elements return false
 * const empty = <div />;
 * hasChildren(empty); // false
 * ```
 */
export function isReactElementWithChildren(
  node: unknown
): node is ReactElement & { props: { children?: ReactNode } } {
  return (
    node !== null &&
    typeof node === "object" &&
    "props" in node &&
    node.props !== null &&
    typeof node.props === "object" &&
    "children" in node.props
  );
}