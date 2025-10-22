import {
  createErrorResult,
  createSuccessfulResult,
  createVoidResult,
  isError,
  isSuccess,
  pipe,
} from '@/lib/results';
import type {
  IResult,
  IErrorResult,
  ISuccessfulResult
} from '@/lib/results';

describe('results', () => {
  describe('createErrorResult', () => {
    it('should create error result with code and message', () => {

      const errorResult = createErrorResult('GENERIC_CODE', 'Generic error occurred');

      expect(errorResult.error).toBeDefined();
      expect(errorResult.error.code).toBe('GENERIC_CODE');
      expect(errorResult.error.message).toBe('Generic error occurred');
      expect(errorResult.result).toBeUndefined();
      expect(Object.keys(errorResult)).not.toContain('result');
    });

    it('should use default message when not provided', () => {
      const result = createErrorResult('GENERIC_CODE');

      expect(result.error.code).toBe('GENERIC_CODE');
      expect(result.error.message).toBe('An unknown error occurred');
    });

    it('should handle empty string as error code', () => {
      const result = createErrorResult('', 'Empty error code');
      expect(result.error.code).toBe('UNKNOWN_ERROR');
    });

    it('should handle empty string as message', () => {
      const result = createErrorResult('ERROR', '');
      expect(result.error.message).toBe('An unknown error occurred');
    });
  });

  describe('createSuccessfulResult', () => {
    it('should create an object with a KEY of result with VALUE passed into func', () => {
      const user = { id: '123', name: 'John' };
      const successfulResult = createSuccessfulResult(user);

      expect(successfulResult.result).toBe(user);
      expect(successfulResult.error).toBeUndefined();
      expect(Object.keys(successfulResult)).toContain('result');
    });
  });

  describe('createVoidResult', () => {
    it('should create successful result with undefined value', () => {
      const voidResult = createVoidResult();

      expect(voidResult.result).toBeUndefined();
      expect(voidResult.error).toBeUndefined();
      expect(Object.keys(voidResult)).toContain('result');
    });
  });

  describe('isError', () => {
    it('should narrow type correctly', () => {
      type UserError = 'NOT_FOUND';
      const errorResult: IResult<{ id: string }, UserError> = createErrorResult('NOT_FOUND');

      expect(isError(errorResult)).toBe(true);

      const successResult: IResult<{ id: string }, UserError> = createSuccessfulResult({ id: '123' });

      expect(isError(successResult)).toBe(false);

      const voidResult = createVoidResult();

      expect(isError(voidResult)).toBe(false);
    });
  });

  describe('isSuccess', () => {
    it('should narrow type correctly', () => {
      type UserError = 'NOT_FOUND';
      const errorResult: IResult<{ id: string }, UserError> = createErrorResult('NOT_FOUND');
      expect(isSuccess(errorResult)).toBe(false);

      const successResult: IResult<{ id: string }, UserError> = createSuccessfulResult({ id: '123' });
      expect(isSuccess(successResult)).toBe(true);

      const voidResult = createVoidResult();
      expect(isSuccess(voidResult)).toBe(true);
    });
  });

  describe('pipe', () => {
    type TestError = 'ERROR_1' | 'ERROR_2' | 'ERROR_3';

    it('should chain successful operations', async () => {
      const step1 = jest
        .fn()
        .mockResolvedValue(createSuccessfulResult('step1-result'));
      const step2 = jest
        .fn()
        .mockResolvedValue(createSuccessfulResult('step2-result'));
      const step3 = jest
        .fn()
        .mockResolvedValue(createSuccessfulResult('step3-result'));

      const result = await pipe('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).toHaveBeenCalledWith('step1-result');
      expect(step3).toHaveBeenCalledWith('step2-result');
      expect(isSuccess(result)).toBe(true);
      expect(result.result).toBe('step3-result');
    });

    it('should stop at first error', async () => {
      const step1 = jest
        .fn()
        .mockResolvedValue(createSuccessfulResult('step1-result'));
      const step2 = jest
        .fn()
        .mockResolvedValue(createErrorResult<TestError>('ERROR_2', 'Failed at step 2'));
      const step3 = jest.fn(); // Should not be called

      const result = await pipe<string, TestError>('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).toHaveBeenCalledWith('step1-result');
      expect(step3).not.toHaveBeenCalled();
      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('ERROR_2');
    });

    it('should handle initial error', async () => {
      const step1 = jest
        .fn()
        .mockResolvedValue(createErrorResult<TestError>('ERROR_1', 'Failed immediately'));
      const step2 = jest.fn();
      const step3 = jest.fn();

      const result = await pipe<string, TestError>('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).not.toHaveBeenCalled();
      expect(step3).not.toHaveBeenCalled();
      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('ERROR_1');
    });

    it('should handle async errors', async () => {
      const failingStep = async (): Promise<IResult<string, string>> => {
        throw new Error('Unexpected error');
      };

      // pipe doesn't catch thrown errors - they should propagate
      await expect(pipe('initial', failingStep)).rejects.toThrow(
        'Unexpected error'
      );
    });
  });
});