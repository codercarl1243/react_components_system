/**
 * Type-safe Result pattern for handling operations that can succeed or fail.
 * 
 * @example
 * ```ts
 * type UserError = 'NOT_FOUND' | 'INVALID_ID';
 * 
 * async function getUser(id: string): Promise<IResult<User, UserError>> {
 *   if (!id) return createErrorResult('INVALID_ID', 'User ID is required');
 *   const user = await db.user.findUnique({ where: { id } });
 *   if (!user) return createErrorResult('NOT_FOUND', 'User not found');
 *   return createSuccessfulResult(user);
 * }
 * 
 * const result = await getUser('123');
 * if (isError(result)) {
 *   console.error(result.error.code); // Type-safe error handling
 * } else {
 *   console.log(result.result); // Type-safe success handling
 * }
 * ```
 */

import { AppErrorCode, getErrorMessage } from "@/lib/logging/errorCodes";

/**
 * Represents the outcome of an operation that can either succeed or fail.
 * @template Result - The type of the successful result value
 * @template ErrorCode - The type of error codes (typically a union of string literals)
 */
export type IResult<Result, ErrorCode> = ISuccessfulResult<Result> | IErrorResult<ErrorCode>;

/**
 * Represents a successful operation result.
 * @template Result - The type of the result value
 */
export type ISuccessfulResult<Result> = {
    result: Result;
    error?: undefined;
};

/**
 * Represents a failed operation result.
 * @template ErrorCode - The type of error codes
 */
export type IErrorResult<ErrorCode> = {
    result?: never;
    error: IError<ErrorCode>;
};

/**
 * Error object containing a typed error code and descriptive message.
 * @template ErrorCode - The type of error codes
 */
export type IError<ErrorCode> = {
    code: ErrorCode;
    message: string;
};

/**
 * Creates a typed error result.
 * 
 * @template ErrorCode - The type of error codes
 * @param code - The error code (typically from a predefined set)
 * @param message - Optional human-readable error message. Defaults to "An error occurred"
 * @returns A typed error result
 * 
 * @example
 * ```ts
 * type AuthError = 'UNAUTHORIZED' | 'EXPIRED_TOKEN';
 * return createErrorResult<AuthError>('UNAUTHORIZED', 'Please log in');
 * ```
 */
export function createErrorResult<ErrorCode>(
    errorCode: ErrorCode,
    message?: string
): IErrorResult<ErrorCode> {
    const defaultMessage =
        Object.values(AppErrorCode).includes(errorCode as AppErrorCode)
            ? getErrorMessage(errorCode as AppErrorCode)
            : 'DEFAULT_ERROR_MESSAGE';
    return {
        error: {
            code: errorCode,
            message: message ?? defaultMessage
        },
    };
}

/**
 * Creates a successful result containing a value.
 * 
 * @template T - The type of the result value
 * @param result - The successful result value
 * @returns A typed successful result
 * 
 * @example
 * ```ts
 * const user = await db.user.findUnique({ where: { id } });
 * return createSuccessfulResult(user);
 * ```
 */
export function createSuccessfulResult<T>(result: T): ISuccessfulResult<T> {
    return {
        result,
    };
}

/**
 * Creates a successful result for operations that don't return a value.
 * Useful for operations like delete, update, or void-returning functions.
 * 
 * @returns A successful result with void type
 * 
 * @example
 * ```ts
 * async function deleteUser(id: string): Promise<IResult<void, DbError>> {
 *   await db.user.delete({ where: { id } });
 *   return createVoidResult();
 * }
 * ```
 */
export function createVoidResult(): ISuccessfulResult<void> {
    return {
        result: undefined,
    };
}

/**
 * Type guard to check if a result is an error.
 * Narrows the type to IErrorResult, making error properties accessible.
 * 
 * @template Result - The type of the successful result value
 * @template ErrorCode - The type of error codes
 * @param result - The result to check
 * @returns True if the result is an error, false otherwise
 * 
 * @example
 * ```ts
 * const result = await getUser(id);
 * if (isError(result)) {
 *   console.error(result.error.code); // TypeScript knows error exists
 *   return;
 * }
 * console.log(result.result); // TypeScript knows result exists
 * ```
 */
export function isError<Result, ErrorCode>(
    result: IResult<Result, ErrorCode>
): result is IErrorResult<ErrorCode> {
    return result.error !== undefined;
}

/**
 * Type guard to check if a result is successful.
 * Narrows the type to ISuccessfulResult, making the result value accessible.
 * 
 * @template Result - The type of the successful result value
 * @template ErrorCode - The type of error codes
 * @param result - The result to check
 * @returns True if the result is successful, false otherwise
 * 
 * @example
 * ```ts
 * const result = await getUser(id);
 * if (isSuccess(result)) {
 *   console.log(result.result.name); // TypeScript knows result exists
 * }
 * ```
 */
export function isSuccess<Result, ErrorCode>(
    result: IResult<Result, ErrorCode>
): result is ISuccessfulResult<Result> {
    return result.error === undefined;
}

/**
 * Chains multiple async operations that return Results.
 * Executes operations sequentially, passing the result of each to the next.
 * Stops and returns the first error encountered.
 * 
 * Note: Thrown errors (exceptions) are NOT caught and will propagate as
 * promise rejections. Operations should return error Results instead of throwing.
 * 
 * @template T - The type of the initial value
 * @template ErrorCode - The type of error codes (must be consistent across all operations)
 * @param initialValue - The starting value to pipe through the operations
 * @param fns - Array of async functions that take a value and return a Result
 * @returns A Result containing the final value or the first error encountered
 * 
 * @example
 * ```ts
 * // Clean sequential operations
 * const result = await pipe(
 *   userId,
 *   getUser,                          // User ID → Result<User>
 *   (user) => getUserSettings(user.id), // User → Result<Settings>
 *   validateSettings,                  // Settings → Result<Settings>
 *   updateSettings                     // validated Settings → Result<Settings>
 * );
 * ```
 */
/* eslint-disable no-redeclare */
export async function pipe<T, U, ErrorCode>(
    initialValue: T,
    fn1: (value: T) => Promise<IResult<U, ErrorCode>>
): Promise<IResult<U, ErrorCode>>;

export async function pipe<T, U, V, ErrorCode>(
    initialValue: T,
    fn1: (value: T) => Promise<IResult<U, ErrorCode>>,
    fn2: (value: U) => Promise<IResult<V, ErrorCode>>
): Promise<IResult<V, ErrorCode>>;

export async function pipe<T, U, V, W, ErrorCode>(
    initialValue: T,
    fn1: (value: T) => Promise<IResult<U, ErrorCode>>,
    fn2: (value: U) => Promise<IResult<V, ErrorCode>>,
    fn3: (value: V) => Promise<IResult<W, ErrorCode>>
): Promise<IResult<W, ErrorCode>>;

export async function pipe<T, U, V, W, X, ErrorCode>(
    initialValue: T,
    fn1: (value: T) => Promise<IResult<U, ErrorCode>>,
    fn2: (value: U) => Promise<IResult<V, ErrorCode>>,
    fn3: (value: V) => Promise<IResult<W, ErrorCode>>,
    fn4: (value: W) => Promise<IResult<X, ErrorCode>>
): Promise<IResult<X, ErrorCode>>;

export async function pipe<T, U, V, W, X, Y, ErrorCode>(
    initialValue: T,
    fn1: (value: T) => Promise<IResult<U, ErrorCode>>,
    fn2: (value: U) => Promise<IResult<V, ErrorCode>>,
    fn3: (value: V) => Promise<IResult<W, ErrorCode>>,
    fn4: (value: W) => Promise<IResult<X, ErrorCode>>,
    fn5: (value: X) => Promise<IResult<Y, ErrorCode>>
): Promise<IResult<Y, ErrorCode>>;

export async function pipe<T, ErrorCode>(
    initialValue: T,
    ...fns: Array<(value: unknown) => Promise<IResult<unknown, ErrorCode>>>
): Promise<IResult<unknown, ErrorCode>>;

export async function pipe<T, ErrorCode>(
    initialValue: T,
    ...fns: Array<(value: unknown) => Promise<IResult<unknown, ErrorCode>>>
): Promise<IResult<unknown, ErrorCode>> {
    let current: IResult<unknown, ErrorCode> = createSuccessfulResult(initialValue);

    for (const fn of fns) {
        if (current.error) {
            return current;
        }
        current = await fn(current.result);
    }

    return current;
}
/* eslint-enable no-redeclare */