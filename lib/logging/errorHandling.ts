/**
 * Error handling utilities that combine logging with the Result pattern.
 * 
 * These functions automatically log errors/warnings while returning typed Results,
 * providing a consistent way to handle and track errors throughout your application.
 * 
 * @example
 * ```ts
 * // Wrap risky operations
 * const userResult = await tryCatchAsync(
 *   () => db.user.findUnique({ where: { id } }),
 *   'DATABASE_ERROR',
 *   { context: 'UserService' }
 * );
 * 
 * // Validate input
 * const emailResult = validate(
 *   email,
 *   (e) => e.includes('@'),
 *   'INVALID_EMAIL',
 *   'Email must contain @'
 * );
 * 
 * // Quick error returns with logging
 * if (!userId) {
 *   return logAndReturnError('MISSING_ID', 'User ID is required', { context: 'getUser' });
 * }
 * ```
 */

import { logError, logWarning } from '@/lib/logging/log';
import type { TErrorLogOptions } from '@/lib/logging/log.type';
import { createErrorResult, createSuccessfulResult, IErrorResult, IResult } from '@/lib/results';

/**
 * Logs an error and returns a typed error result.
 * Convenience function for common pattern of logging then returning an error.
 * 
 * @template ErrorCode - The type of error codes
 * @param code - The error code to return
 * @param message - Human-readable error message (will be logged and returned)
 * @param options - Optional logging context and additional data
 * @param options.context - Where the error occurred (e.g., "UserService", "AuthMiddleware")
 * @param options.data - Additional debugging data to include in logs
 * @returns A typed error result
 * 
 * @example
 * ```ts
 * type UserError = 'NOT_FOUND' | 'INVALID_ID';
 * 
 * function getUser(id: string): IResult<User, UserError> {
 *   if (!id) {
 *     return logAndReturnError('INVALID_ID', 'User ID is required', { 
 *       context: 'UserService' 
 *     });
 *   }
 *   // ... rest of function
 * }
 * ```
 */
export function logAndReturnError<ErrorCode>(
    code: ErrorCode,
    message: string,
    options?: TErrorLogOptions
): IErrorResult<ErrorCode> {
    logError(message, undefined, options);
    return createErrorResult(code, message);
}

/**
 * Wraps an async function that might throw, converting exceptions to typed Results.
 * Automatically logs any errors that occur.
 * 
 * @template Result - The type of the successful result
 * @template ErrorCode - The type of error codes
 * @param fn - Async function to execute (typically a Promise-returning operation)
 * @param errorCode - The error code to return if the function throws
 * @param options - Optional configuration
 * @param options.context - Where this operation occurs (e.g., "DatabaseService")
 * @param options.errorMessage - Custom error message (defaults to "Operation failed")
 * @param options.trace - Whether to include stack trace in logs
 * @returns A Result containing either the successful value or a typed error
 * 
 * @example
 * ```ts
 * type DbError = 'CONNECTION_ERROR' | 'NOT_FOUND' | 'QUERY_ERROR';
 * 
 * const userResult = await tryCatchAsync(
 *   () => db.user.findUnique({ where: { id: userId } }),
 *   'QUERY_ERROR',
 *   { 
 *     context: 'UserRepository',
 *     errorMessage: 'Failed to fetch user from database',
 *     trace: true
 *   }
 * );
 * 
 * if (isError(userResult)) {
 *   // Error was automatically logged with context
 *   return userResult;
 * }
 * 
 * const user = userResult.result;
 * ```
 */
export async function tryCatchAsync<Result, ErrorCode>(
    fn: () => Promise<Result>,
    errorCode: ErrorCode,
    options?: {
        context?: TErrorLogOptions['context'];
        errorMessage?: string;
        trace?: TErrorLogOptions['trace'];
    }
): Promise<IResult<Result, ErrorCode>> {
    try {
        const result = await fn();
        return createSuccessfulResult(result);
    } catch (error) {
        const message = options?.errorMessage ?? 'Operation failed';
        logError(message, error, {
            context: options?.context,
            trace: options?.trace,
        });
        return createErrorResult(errorCode, message);
    }
}

/**
 * Synchronous version of tryCatchAsync.
 * Wraps a synchronous function that might throw, converting exceptions to typed Results.
 * Automatically logs any errors that occur.
 * 
 * @template Result - The type of the successful result
 * @template ErrorCode - The type of error codes
 * @param fn - Synchronous function to execute
 * @param errorCode - The error code to return if the function throws
 * @param options - Optional configuration
 * @param options.context - Where this operation occurs
 * @param options.errorMessage - Custom error message (defaults to "Operation failed")
 * @param options.trace - Whether to include stack trace in logs
 * @returns A Result containing either the successful value or a typed error
 * 
 * @example
 * ```ts
 * type ParseError = 'INVALID_JSON' | 'MISSING_FIELD';
 * 
 * const configResult = tryCatch(
 *   () => JSON.parse(configString),
 *   'INVALID_JSON',
 *   { 
 *     context: 'ConfigLoader',
 *     errorMessage: 'Failed to parse configuration file'
 *   }
 * );
 * 
 * if (isError(configResult)) {
 *   return defaultConfig;
 * }
 * 
 * return configResult.result;
 * ```
 */
export function tryCatch<Result, ErrorCode>(
    fn: () => Result,
    errorCode: ErrorCode,
    options?: {
        context?: TErrorLogOptions['context'];
        errorMessage?: string;
        trace?: TErrorLogOptions['trace'];
    }
): IResult<Result, ErrorCode> {
    try {
        const result = fn();
        return createSuccessfulResult(result);
    } catch (error) {
        const message = options?.errorMessage ?? 'Operation failed';
        logError(message, error, {
            context: options?.context,
            trace: options?.trace,
        });
        return createErrorResult(errorCode, message);
    }
}

/**
 * Validates a value against a predicate and returns a typed Result.
 * Logs a warning if validation fails.
 * 
 * @template T - The type of the value being validated
 * @template ErrorCode - The type of error codes
 * @param value - The value to validate
 * @param predicate - Function that returns true if value is valid
 * @param errorCode - Error code to return if validation fails
 * @param errorMessage - Human-readable validation error message
 * @param options - Optional configuration
 * @param options.context - Where this validation occurs (e.g., "SignupForm")
 * @returns A Result containing either the validated value or a typed error
 * 
 * @example
 * ```ts
 * type ValidationError = 'INVALID_EMAIL' | 'INVALID_PASSWORD' | 'INVALID_USERNAME';
 * 
 * // Email validation
 * const emailResult = validate(
 *   email,
 *   (e) => e.includes('@') && e.includes('.'),
 *   'INVALID_EMAIL',
 *   'Email must be valid',
 *   { context: 'SignupForm' }
 * );
 * 
 * // Password validation
 * const passwordResult = validate(
 *   password,
 *   (p) => p.length >= 8,
 *   'INVALID_PASSWORD',
 *   'Password must be at least 8 characters',
 *   { context: 'SignupForm' }
 * );
 * 
 * // Chain validations
 * if (isError(emailResult)) return emailResult;
 * if (isError(passwordResult)) return passwordResult;
 * 
 * // All validations passed
 * await createUser(emailResult.result, passwordResult.result);
 * ```
 */
export function validate<T, ErrorCode>(
    value: T,
    predicate: (value: T) => boolean,
    errorCode: ErrorCode,
    errorMessage: string,
    options?: { context?: TErrorLogOptions['context'] }
): IResult<T, ErrorCode> {
    if (!predicate(value)) {
        logWarning(errorMessage, options);
        return createErrorResult(errorCode, errorMessage);
    }
    return createSuccessfulResult(value);
}