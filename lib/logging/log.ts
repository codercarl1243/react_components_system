/**
 * Structured logging utility for Next.js / TypeScript applications.
 * 
 * Provides type-safe logging with different severity levels and structured output.
 * All logs include timestamps and can be enriched with context and additional data.
 * 
 * @example
 * ```ts
 * // Simple info log
 * log("User logged in successfully");
 * 
 * // Warning with context
 * log("Missing optional field in request", "warning", { 
 *   context: "SignupForm",
 *   data: { field: "phoneNumber" }
 * });
 * 
 * // Error with stack trace (error parameter is required)
 * try {
 *   await db.connect();
 * } catch (err) {
 *   log("Database connection failed", "error", err, { 
 *     context: "DBService",
 *     trace: true
 *   });
 * }
 * ```
 */

type TLogLevel = 'default' | 'warning' | 'error';

type TLogOptions = {
  context?: string;
  data?: Record<string, unknown>;
};

type TErrorLogOptions = TLogOptions & {
  trace?: boolean;
};

type TBaseLogEntry = {
  level: TLogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  timestamp: string;
};

type TDefaultLogEntry = TBaseLogEntry & {
  level: 'default';
};

type TWarningLogEntry = TBaseLogEntry & {
  level: 'warning';
};

type TErrorLogEntry = TBaseLogEntry & {
  level: 'error';
  error: string;   // required for error logs
  stack?: string;  // optional stack trace
};

/**
 * Union type of all possible log entry types.
 */
export type TLogEntry = TDefaultLogEntry | TWarningLogEntry | TErrorLogEntry;

/**
 * Logs an error message. Error parameter is required.
 */
export default function log(
  message: string,
  level: 'error',
  error: unknown,
  options?: TErrorLogOptions
): void;

/**
 * Logs a warning message.
 */
export default function log(
  message: string,
  level: 'warning',
  options?: TLogOptions
): void;

/**
 * Logs a default/info message.
 */
export default function log(
  message: string,
  level?: 'default',
  options?: TLogOptions
): void;

/**
 * Implementation of the log function.
 */
export default function log(
  message: string,
  levelOrOptions?: TLogLevel,
  errorOrOptions?: unknown | TLogOptions,
  finalOptions?: TErrorLogOptions
): void {
  // Parse arguments based on overload
  const level: TLogLevel = levelOrOptions || 'default';
  let error: unknown;
  let options: TErrorLogOptions = {};

  if (level === 'error') {
    // log(message, 'error', error, options?)
    error = errorOrOptions;
    options = finalOptions || {};
  } else {
    // log(message, 'warning'|'default', options?)
    options = (errorOrOptions as TLogOptions) || {};
  }

  const { context, data, trace } = options;
  const timestamp = new Date().toISOString();

  // Handle error-level logs
  if (level === 'error') {
    let errorMsg = '';
    let stack: string | undefined;

    if (error instanceof Error) {
      errorMsg = error.message;
      stack = trace ? error.stack : undefined;
    } else if (typeof error === 'string') {
      errorMsg = error;
    } else if (error !== undefined) {
      try {
        errorMsg = JSON.stringify(error);
      } catch {
        errorMsg = String(error);
      }
    }

    const entry: TErrorLogEntry = {
      level: 'error',
      message,
      error: errorMsg,
      stack,
      context,
      data,
      timestamp,
    };

    // eslint-disable-next-line no-console
    console.error(`[ERROR]`, entry);
    return;
  }

  // Handle warning-level logs
  if (level === 'warning') {
    const entry: TWarningLogEntry = {
      level: 'warning',
      message,
      context,
      data,
      timestamp,
    };

    // eslint-disable-next-line no-console
    console.warn(`[WARN]`, entry);
    return;
  }

  // Handle default/info-level logs
  const entry: TDefaultLogEntry = {
    level: 'default',
    message,
    context,
    data,
    timestamp,
  };

  // eslint-disable-next-line no-console
  console.log(`[LOG]`, entry);
}

/**
 * Convenience function for logging informational messages.
 * Equivalent to calling log() with level 'default'.
 * 
 * @param message - Human-readable message
 * @param options - Optional context and data
 * 
 * @example
 * ```ts
 * logInfo("User session started", {
 *   context: "AuthService",
 *   data: { userId: "123" }
 * });
 * ```
 */
export function logInfo(
  message: string,
  options?: TLogOptions
): void {
  log(message, 'default', options);
}

/**
 * Convenience function for logging warnings.
 * Equivalent to calling log() with level 'warning'.
 * 
 * @param message - Human-readable warning message
 * @param options - Optional context and data
 * 
 * @example
 * ```ts
 * logWarning("Deprecated API endpoint used", {
 *   context: "ApiRouter",
 *   data: { endpoint: "/api/v1/users" }
 * });
 * ```
 */
export function logWarning(
  message: string,
  options?: TLogOptions
): void {
  log(message, 'warning', options);
}

/**
 * Convenience function for logging errors.
 * Equivalent to calling log() with level 'error'.
 * 
 * @param message - Human-readable error message
 * @param error - Error object, string, or any value to log
 * @param options - Optional context, data, and trace flag
 * 
 * @example
 * ```ts
 * try {
 *   await db.user.delete({ where: { id } });
 * } catch (err) {
 *   logError("Failed to delete user", err, {
 *     context: "UserService",
 *     data: { userId: id },
 *     trace: true
 *   });
 * }
 * ```
 */
export function logError(
  message: string,
  error: unknown,
  options?: TErrorLogOptions
): void {
  log(message, 'error', error, options);
}