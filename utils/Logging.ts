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

type TLogEntry = TDefaultLogEntry | TWarningLogEntry | TErrorLogEntry;


/**
 * General logging utility for Next.js / TypeScript apps.
 *
 * Logs messages with different levels (`default`, `warning`, `error`),
 * outputs to the console, and returns a typed log entry object.
 *
 * @template L - The log level type (`default` | `warning` | `error`).
 *
 * @param message - Human-readable description of the event or issue.
 * @param error - Only required when `level` is `'error'`. Can be an `Error`, string, or any serializable object.
 * @param level - The severity level of the log. Defaults to `'default'`.
 * @param options - Additional options to provide context.
 * @param options.context - Optional string describing where the log occurred (e.g. `"AuthService"`).
 * @param options.data - Optional additional data payload for debugging.
 * @param options.trace - When true and an Error is passed, includes the stack trace.
 *
 * @example
 * // Default log
 * const l1 = log("User logged in");
 *
 * @example
 * // Warning log
 * const l2 = log("Missing field in request", undefined, "warning", { context: "SignupForm" });
 *
 * @example
 * // Error log
 * try {
 *   throw new Error("Database connection failed");
 * } catch (err) {
 *   const l3 = log("Could not fetch data", err, "error", { context: "DBService", trace: true });
 *   console.log(l3.error); // Always available here
 * }
 */
export default function log<
  L extends TLogLevel
>(
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
  }

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
  }

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
