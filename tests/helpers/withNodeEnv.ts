import isThenable from "@/lib/isThenable"

/**
 * Temporarily sets NODE_ENV for a test function, restoring the original value afterward.
 * Handles both sync and async test functions.
 *
 * @param env - The NODE_ENV value to set
 * @param testFn - The test function to run (sync or async)
 * @returns The result of the test function (void for sync, Promise<void> for async)
 *
 * @example
 * test('logs in development', () => {
 *   withNodeEnv('development', () => {
 *     const handler = jest.fn()
 *     handleClick(handler)({} as React.MouseEvent<HTMLButtonElement>)
 *     expect(mockLog).toHaveBeenCalled()
 *   })
 * })
 *
 * @example
 * test('handles async operations', async () => {
 *   await withNodeEnv('production', async () => {
 *     // test code here
 *   })
 * })
 */
export default function withNodeEnv(
  env: string,
  testFn: () => void | Promise<void>
): void | Promise<void> {
  const original = process.env.NODE_ENV

  Object.defineProperty(process.env, 'NODE_ENV', {
    value: env,
    writable: true,
    configurable: true
  })

  try {
    const result = testFn()

    // Handle async test functions
    if (isThenable(result)) {
      return result.finally(() => {
        restoreNodeEnv(original)
      })
    }

    // Handle sync test functions
    restoreNodeEnv(original)
    return result
  } catch (err) {
    // Restore on error for sync functions
    restoreNodeEnv(original)
    throw err
  }
}

/**
 * Helper to restore NODE_ENV to its original value.
 */
function restoreNodeEnv(original: string | undefined): void {
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: original,
    writable: false,
    configurable: true
  })
}