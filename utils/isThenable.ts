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
export default function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  )
}