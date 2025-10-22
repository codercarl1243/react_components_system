import {
  logAndReturnError,
  tryCatchAsync,
  tryCatch,
  validate,
} from '@/lib/logging/errorHandling';
import log from '@/lib/logging/log';
import { isError, isSuccess } from '@/lib/results';

// Mock the logging module
jest.mock('@/lib/logging/log.ts');
const mockLog = log as jest.MockedFunction<typeof log>;

describe('errorHandling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logAndReturnError', () => {
    it('should log error and return typed error result', () => {
      const result = logAndReturnError(
        'NOT_FOUND',
        'User not found',
        { context: 'UserService', data: { id: '123' } }
      );

      expect(mockLog).toHaveBeenCalledWith(
        'User not found',
        undefined,
        'error',
        { context: 'UserService', data: { id: '123' } }
      );

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('NOT_FOUND');
      expect(result.error?.message).toBe('User not found');
    });

    it('should work without options', () => {
      const result = logAndReturnError('GENERIC_ERROR', 'Something went wrong');

      expect(mockLog).toHaveBeenCalledWith(
        'Something went wrong',
        undefined,
        'error',
        undefined
      );

      expect(result.error?.code).toBe('GENERIC_ERROR');
    });
  });

  describe('tryCatchAsync', () => {
    it('should return success result when async function succeeds', async () => {
      const mockFn = jest.fn().mockResolvedValue({ id: '123', name: 'John' });

      const result = await tryCatchAsync(
        mockFn,
        'DATABASE_ERROR',
        { context: 'UserRepository' }
      );

      expect(isSuccess(result)).toBe(true);
      expect(result.result).toEqual({ id: '123', name: 'John' });
      expect(mockLog).not.toHaveBeenCalled();
    });

    it('should return error result and log when async function throws', async () => {
      const error = new Error('Connection timeout');
      const mockFn = jest.fn().mockRejectedValue(error);

      const result = await tryCatchAsync(
        mockFn,
        'DATABASE_ERROR',
        {
          context: 'UserRepository',
          errorMessage: 'Failed to fetch user',
          trace: true,
        }
      );

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('DATABASE_ERROR');
      expect(result.error?.message).toBe('Failed to fetch user');

      expect(mockLog).toHaveBeenCalledWith(
        'Failed to fetch user',
        error,
        'error',
        { context: 'UserRepository', trace: true }
      );
    });

    it('should use default error message when not provided', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Boom'));

      const result = await tryCatchAsync(mockFn, 'UNKNOWN_ERROR');

      expect(result.error?.message).toBe('Operation failed');
    });

    it('should work without options', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Error'));

      const result = await tryCatchAsync(mockFn, 'ERROR');

      expect(isError(result)).toBe(true);
      expect(mockLog).toHaveBeenCalledWith(
        'Operation failed',
        expect.any(Error),
        'error',
        { context: undefined, trace: undefined }
      );
    });
  });

  describe('tryCatch', () => {
    it('should return success result when sync function succeeds', () => {
      const mockFn = jest.fn().mockReturnValue({ parsed: true });

      const result = tryCatch(
        mockFn,
        'PARSE_ERROR',
        { context: 'ConfigParser' }
      );

      expect(isSuccess(result)).toBe(true);
      expect(result.result).toEqual({ parsed: true });
      expect(mockLog).not.toHaveBeenCalled();
    });

    it('should return error result and log when sync function throws', () => {
      const error = new SyntaxError('Invalid JSON');
      const mockFn = jest.fn().mockImplementation(() => {
        throw error;
      });

      const result = tryCatch(
        mockFn,
        'PARSE_ERROR',
        {
          context: 'ConfigParser',
          errorMessage: 'Failed to parse config',
          trace: true,
        }
      );

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('PARSE_ERROR');
      expect(result.error?.message).toBe('Failed to parse config');

      expect(mockLog).toHaveBeenCalledWith(
        'Failed to parse config',
        error,
        'error',
        { context: 'ConfigParser', trace: true }
      );
    });

    it('should handle JSON.parse example', () => {
      const invalidJson = '{invalid}';

      const result = tryCatch(
        () => JSON.parse(invalidJson),
        'INVALID_JSON',
        { context: 'JsonParser', errorMessage: 'Invalid JSON string' }
      );

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('INVALID_JSON');
    });

    it('should use default error message when not provided', () => {
      const mockFn = jest.fn().mockImplementation(() => {
        throw new Error('Boom');
      });

      const result = tryCatch(mockFn, 'UNKNOWN_ERROR');

      expect(result.error?.message).toBe('Operation failed');
    });
  });

  describe('validate', () => {
    it('should return success result when validation passes', () => {
      const email = 'user@example.com';

      const result = validate(
        email,
        (e) => e.includes('@'),
        'INVALID_EMAIL',
        'Email must contain @',
        { context: 'SignupForm' }
      );

      expect(isSuccess(result)).toBe(true);
      expect(result.result).toBe(email);
      expect(mockLog).not.toHaveBeenCalled();
    });

    it('should return error result and log when validation fails', () => {
      const email = 'invalid-email';

      const result = validate(
        email,
        (e) => e.includes('@'),
        'INVALID_EMAIL',
        'Email must contain @',
        { context: 'SignupForm' }
      );

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('INVALID_EMAIL');
      expect(result.error?.message).toBe('Email must contain @');

      expect(mockLog).toHaveBeenCalledWith(
        'Email must contain @',
        undefined,
        'warning',
        { context: 'SignupForm' }
      );
    });

    it('should work with number validation', () => {
      const age = 25;

      const validResult = validate(
        age,
        (a) => a >= 18,
        'UNDERAGE',
        'Must be 18 or older'
      );

      expect(isSuccess(validResult)).toBe(true);

      const invalidResult = validate(
        15,
        (a) => a >= 18,
        'UNDERAGE',
        'Must be 18 or older'
      );

      expect(isError(invalidResult)).toBe(true);
      expect(invalidResult.error?.code).toBe('UNDERAGE');
    });

    it('should work with complex object validation', () => {
      type User = { name: string; email: string };
      const user: User = { name: 'John', email: 'john@example.com' };

      const result = validate(
        user,
        (u) => u.name.length > 0 && u.email.includes('@'),
        'INVALID_USER',
        'User data is invalid'
      );

      expect(isSuccess(result)).toBe(true);
      expect(result.result).toBe(user);
    });

    it('should work without context option', () => {
      const result = validate(
        'test',
        (s) => s.length > 5,
        'TOO_SHORT',
        'String too short'
      );

      expect(isError(result)).toBe(true);
      expect(mockLog).toHaveBeenCalledWith(
        'String too short',
        undefined,
        'warning',
        undefined
      );
    });
  });

  describe('integration scenarios', () => {
    it('should handle chained validations', () => {
      type ValidationError = 'INVALID_EMAIL' | 'INVALID_PASSWORD';

      const email = 'user@example.com';
      const password = 'secure123';

      const emailResult = validate<string, ValidationError>(
        email,
        (e) => e.includes('@'),
        'INVALID_EMAIL',
        'Invalid email'
      );

      if (isError(emailResult)) {
        throw new Error('Should not fail');
      }

      const passwordResult = validate<string, ValidationError>(
        password,
        (p) => p.length >= 8,
        'INVALID_PASSWORD',
        'Password too short'
      );

      expect(isSuccess(emailResult)).toBe(true);
      expect(isSuccess(passwordResult)).toBe(true);
    });

    it('should handle async operation with validation', async () => {
      type AppError = 'NOT_FOUND' | 'INVALID_ID';

      // Validate ID first
      const id = '123';
      const validationResult = validate<string, AppError>(
        id,
        (i) => i.length > 0,
        'INVALID_ID',
        'ID cannot be empty'
      );

      if (isError(validationResult)) {
        throw new Error('Should not fail');
      }

      // Then fetch with validated ID
      const fetchUser = jest.fn().mockResolvedValue({ id: '123', name: 'John' });
      const fetchResult = await tryCatchAsync<{ id: string; name: string }, AppError>(
        () => fetchUser(validationResult.result),
        'NOT_FOUND',
        { context: 'UserService' }
      );

      expect(isSuccess(fetchResult)).toBe(true);
      expect(fetchResult.result).toEqual({ id: '123', name: 'John' });
    });
  });
});