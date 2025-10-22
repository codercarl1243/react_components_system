import log, { logInfo, logWarning, logError } from '@/lib/logging/log';

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

  describe('log - default level', () => {
    it('should log default message with timestamp', () => {
      log('User logged in');

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User logged in',
          timestamp: expect.any(String),
        })
      );
    });

    it('should log with context', () => {
      log('User logged in', undefined, 'default', { context: 'AuthService' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User logged in',
          context: 'AuthService',
        })
      );
    });

    it('should log with additional data', () => {
      const data = { userId: '123', action: 'login' };
      log('User logged in', undefined, 'default', { data });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User logged in',
          data,
        })
      );
    });

    it('should log with both context and data', () => {
      const data = { userId: '123' };
      log('User logged in', undefined, 'default', {
        context: 'AuthService',
        data,
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User logged in',
          context: 'AuthService',
          data,
        })
      );
    });

    it('should include valid ISO timestamp', () => {
      log('Test message');

      const call = mockConsoleLog.mock.calls[0][1];
      const timestamp = call.timestamp;

      // Verify it's a valid ISO date string
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });
  });

  describe('log - warning level', () => {
    it('should log warning message', () => {
      log('Deprecated API used', undefined, 'warning');

      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '[WARN]',
        expect.objectContaining({
          level: 'warning',
          message: 'Deprecated API used',
          timestamp: expect.any(String),
        })
      );
    });

    it('should log warning with context', () => {
      log('Missing optional field', undefined, 'warning', {
        context: 'SignupForm',
      });

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '[WARN]',
        expect.objectContaining({
          level: 'warning',
          message: 'Missing optional field',
          context: 'SignupForm',
        })
      );
    });

    it('should log warning with data', () => {
      const data = { field: 'phoneNumber', form: 'signup' };
      log('Missing optional field', undefined, 'warning', { data });

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '[WARN]',
        expect.objectContaining({
          level: 'warning',
          message: 'Missing optional field',
          data,
        })
      );
    });
  });

  describe('log - error level', () => {
    it('should log error with Error object', () => {
      const error = new Error('Connection failed');
      log('Database error', error, 'error');

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Database error',
          error: 'Connection failed',
          timestamp: expect.any(String),
        })
      );
    });

    it('should log error with stack trace when trace option is true', () => {
      const error = new Error('Connection failed');
      log('Database error', error, 'error', { trace: true });

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Database error',
          error: 'Connection failed',
          stack: expect.stringContaining('Error: Connection failed'),
        })
      );
    });

    it('should not include stack trace when trace option is false', () => {
      const error = new Error('Connection failed');
      log('Database error', error, 'error', { trace: false });

      const call = mockConsoleError.mock.calls[0][1];
      expect(call.stack).toBeUndefined();
    });

    it('should log error with string error', () => {
      log('Database error', 'Connection timeout', 'error');

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Database error',
          error: 'Connection timeout',
        })
      );
    });

    it('should log error with serializable object', () => {
      const errorObj = { code: 500, details: 'Internal error' };
      log('API error', errorObj, 'error');

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'API error',
          error: JSON.stringify(errorObj),
        })
      );
    });

    it('should handle non-serializable error objects', () => {
      const circular: any = { a: 1 };
      circular.self = circular; // Create circular reference

      log('Circular error', circular, 'error');

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Circular error',
          error: expect.stringContaining('[object Object]'),
        })
      );
    });

    it('should log error with context', () => {
      const error = new Error('Query failed');
      log('Database error', error, 'error', { context: 'UserRepository' });

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Database error',
          error: 'Query failed',
          context: 'UserRepository',
        })
      );
    });

    it('should log error with additional data', () => {
      const error = new Error('Query failed');
      const data = { userId: '123', query: 'SELECT * FROM users' };
      log('Database error', error, 'error', { data });

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Database error',
          error: 'Query failed',
          data,
        })
      );
    });

    it('should handle undefined error', () => {
      log('Something went wrong', undefined, 'error');

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Something went wrong',
          error: '',
        })
      );
    });
  });

  describe('logInfo convenience function', () => {
    it('should log info message', () => {
      logInfo('User session started');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User session started',
        })
      );
    });

    it('should log info with context and data', () => {
      const data = { sessionId: 'abc123' };
      logInfo('User session started', { context: 'AuthService', data });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          level: 'default',
          message: 'User session started',
          context: 'AuthService',
          data,
        })
      );
    });
  });

  describe('logWarning convenience function', () => {
    it('should log warning message', () => {
      logWarning('Deprecated endpoint used');

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '[WARN]',
        expect.objectContaining({
          level: 'warning',
          message: 'Deprecated endpoint used',
        })
      );
    });

    it('should log warning with context and data', () => {
      const data = { endpoint: '/api/v1/users' };
      logWarning('Deprecated endpoint used', { context: 'ApiRouter', data });

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '[WARN]',
        expect.objectContaining({
          level: 'warning',
          message: 'Deprecated endpoint used',
          context: 'ApiRouter',
          data,
        })
      );
    });
  });

  describe('logError convenience function', () => {
    it('should log error message', () => {
      const error = new Error('Database connection failed');
      logError('Failed to connect', error);

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Failed to connect',
          error: 'Database connection failed',
        })
      );
    });

    it('should log error with context, data, and trace', () => {
      const error = new Error('Query failed');
      const data = { query: 'SELECT * FROM users' };

      logError('Database query failed', error, {
        context: 'UserRepository',
        data,
        trace: true,
      });

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[ERROR]',
        expect.objectContaining({
          level: 'error',
          message: 'Database query failed',
          error: 'Query failed',
          context: 'UserRepository',
          data,
          stack: expect.stringContaining('Error: Query failed'),
        })
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty message', () => {
      log('');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          message: '',
        })
      );
    });

    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(10000);
      log(longMessage);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          message: longMessage,
        })
      );
    });

    it('should handle special characters in message', () => {
      const specialMessage = 'User logged in: 你好 🎉 \n\t';
      log(specialMessage);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          message: specialMessage,
        })
      );
    });

    it('should handle null in data field', () => {
      log('Test message', undefined, 'default', { data: null });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[LOG]',
        expect.objectContaining({
          data: null,
        })
      );
    });
  });
});