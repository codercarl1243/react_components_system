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
 * log("Missing optional field in request", undefined, "warning", { 
 *   context: "SignupForm",
 *   data: { field: "phoneNumber" }
 * });
 * 
 * // Error with stack trace
 * try {
 *   await db.connect();
 * } catch (err) {
 *   log("Database connection failed", err, "error", { 
 *     context: "DBService",
 *     trace: true
 *   });
 * }
 * ```
 */

type TLogLevel = 'default' | 'warning' | 'error';

type TBaseLogEntry = {
  level: TLogLevel;
  message: string;
  context?: string;
  data?: unknown;
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
 * Logs a message with structured output to the console.
 * 
 * Provides three severity levels:
 * - `default`: General information and application flow
 * - `warning`: Non-critical issues that should be reviewed
 * - `error`: Critical failures that require attention
 * 
 * @template L - The log level type (inferred from the level parameter)
 * 
 * @param message - Human-readable description of the event or issue
 * @param error - Error object, string, or any value to log. Required when level is 'error'
 * @param level - The severity level. Defaults to 'default'
 * @param options - Additional logging options
 * @param options.context - Where the log occurred (e.g., "AuthService", "UserRepository")
 * @param options.data - Additional structured data for debugging
 * @param options.trace - Include stack trace (only for Error objects)
 * 
 * @example
 * ```ts
 * // Info logging
 * log("User profile updated", undefined, "default", {
 *   context: "ProfileService",
 *   data: { userId: "123" }
 * });
 * 
 * // Warning logging
 * log("Rate limit approaching", undefined, "warning", {
 *   context: "ApiMiddleware",
 *   data: { requests: 95, limit: 100 }
 * });
 * 
 * // Error logging with automatic error parsing
 * try {
 *   await riskyOperation();
 * } catch (err) {
 *   log("Operation failed", err, "error", {
 *     context: "PaymentService",
 *     trace: true,
 *     data: { orderId: "ord_123" }
 *   });
 * }
 * ```
 */
export default function log<L extends TLogLevel = 'default'>(
  message: string,
  error?: L extends 'error' ? unknown : never,
  level?: L,
  options: {
    context?: string;
    data?: unknown;
    trace?: boolean;
  } = {}
): void {
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
  options?: { context?: string; data?: unknown }
): void {
  log(message, undefined, 'default', options);
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
  options?: { context?: string; data?: unknown }
): void {
  log(message, undefined, 'warning', options);
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
  options?: { context?: string; data?: unknown; trace?: boolean }
): void {
  log(message, error, 'error', options);
}