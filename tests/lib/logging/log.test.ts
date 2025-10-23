import log, { logInfo, logWarning, logError } from '@/lib/logging/log';
import { TDefaultLogEntry, TErrorLogEntry, TWarningLogEntry } from '@/lib/logging/log.type';


function getLogEntry<T>(mockFn: jest.SpyInstance, callIndex = 0): T {
  const calls = mockFn.mock.calls as unknown[][];
  return calls[callIndex]?.[1] as T;
}

describe('Logging', () => {
  // Store original console methods
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  // Mock console methods
  let mockConsoleLog: jest.SpyInstance;
  let mockConsoleWarn: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    // Mock console methods before each test
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore original console methods
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  });

  describe('log', () => {

    it('should log informational message', () => {
      logInfo('User session started');

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User session started',
        })
      );
    });

    it('should log warning message', () => {
      logWarning('Deprecated endpoint used');

      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '[WARN]',
        expect.objectContaining({
          level: 'warning',
          message: 'Deprecated endpoint used',
        })
      );
    });

    it('should log error message', () => {
      const error = new Error('Database connection failed');
      logError('Failed to connect', error);

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Failed to connect',
          error: 'Database connection failed',
        })
      );
    });

    it('should default to "default" level when level is undefined', () => {
      log('Test message');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'Test message',
        })
      );
    });

    it('should include a valid ISO timestamp in the log entry', () => {
      logInfo('Test message');
      const logEntry = getLogEntry<TDefaultLogEntry>(mockConsoleLog);
      expect(logEntry.timestamp).toBeDefined();
      expect(new Date(logEntry.timestamp).toISOString()).toBe(logEntry.timestamp);

      logWarning('a warning test message');
      const warnEntry = getLogEntry<TWarningLogEntry>(mockConsoleWarn);
      expect(warnEntry.timestamp).toBeDefined();
      expect(new Date(warnEntry.timestamp).toISOString()).toBe(warnEntry.timestamp);

      logError('Error message', new Error('Test error'));
      const errorEntry = getLogEntry<TErrorLogEntry>(mockConsoleError);
      expect(errorEntry.timestamp).toBeDefined();
      expect(new Date(errorEntry.timestamp).toISOString()).toBe(errorEntry.timestamp);
    });
    it('should log with context', () => {
      logInfo('Info message with context', { context: 'InfoContext' });
      expect(mockConsoleLog).toHaveBeenCalledWith('[LOG]', expect.objectContaining({ context: 'InfoContext' }));

      logWarning('Warning message with context', { context: 'WarningContext' });
      expect(mockConsoleWarn).toHaveBeenCalledWith('[WARN]', expect.objectContaining({ context: 'WarningContext' }));

      logError('Error message with context', new Error('Test error'), { context: 'ErrorContext' });
      expect(mockConsoleError).toHaveBeenCalledWith('[ERROR]', expect.objectContaining({ context: 'ErrorContext' }));
    })
  });

  describe('Error log', () => {
    it('should handle Error instance with stack trace when trace is true', () => {
      const error = new Error('Connection failed');
      logError('Database error', error, { trace: true });

      const errorEntry = getLogEntry<TErrorLogEntry>(mockConsoleError);
      expect(errorEntry.error).toBe('Connection failed');
      expect(errorEntry.stack).toBeDefined();
      expect(errorEntry.stack).toContain('Error: Connection failed');
    });

    it('should handle Error instance without stack trace when trace is false', () => {
      const error = new Error('Connection failed');
      logError('Database error', error, { trace: false });

      const errorEntry = getLogEntry<TErrorLogEntry>(mockConsoleError);
      expect(errorEntry.error).toBe('Connection failed');
      expect(errorEntry.stack).toBeUndefined();
    });

    it('should handle string error', () => {
      logError('Operation failed', 'Connection timeout');

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          error: 'Connection timeout',
        })
      );
    });

    it('should handle serializable object error', () => {
      const errorObj = { code: 'ERR_001', details: 'Database failure' };
      logError('API error', errorObj);

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          error: JSON.stringify(errorObj),
        })
      );
    });

    it('should handle non-serializable error with circular reference', () => {
      const circular: Record<string, unknown> = { name: 'test' };
      circular.self = circular;

      logError('Circular error', circular);

      const errorEntry = getLogEntry<TErrorLogEntry>(mockConsoleError);

      expect(errorEntry.error).toBe("[Unserializable Object]");
    });

    it('should handle undefined error', () => {
      logError('Undefined error', undefined);

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          error: '',
        })
      );
    });
  });
});
