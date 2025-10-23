import {
  createErrorResult,
  createSuccessfulResult,
  createVoidResult,
  isError,
  isSuccess,
  pipe,
  pipeAsync,
  type TResult
} from '@/lib/results';
import { logAppError } from '@/lib/logging/logAppError';


// Mock the logger to verify logging behavior
jest.mock('@/lib/logging/logAppError', () => ({
  logAppError: jest.fn(),
}));

const mockLogAppError = logAppError as jest.MockedFunction<typeof logAppError>;
const INTERNAL_ERROR_CODE = 'INTERNAL_ERROR';
const INTERNAL_ERROR_MESSAGE = 'Function did not return a valid Result object';

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

    it('should use default message when msg prop is falsey', () => {
      const result = createErrorResult('GENERIC_CODE');

      expect(result.error.code).toBe('GENERIC_CODE');
      expect(result.error.message).toBe('DEFAULT_ERROR_MESSAGE');

      const result2 = createErrorResult('ERROR', '');
      expect(result2.error.code).toBe('ERROR');
      expect(result2.error.message).toBe('DEFAULT_ERROR_MESSAGE');
    });

    it('should return app Error when error code is falsey', () => {
      const result = createErrorResult('', 'Empty error code');
      expect(result.error.code).toBe(INTERNAL_ERROR_CODE);
      expect(result.error.message).toBe('Error code cannot be empty or falsy');
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

      const errorResult = createErrorResult('NOT_FOUND');

      expect(isError(errorResult)).toBe(true);

      const successResult = createSuccessfulResult({ id: '123' });

      expect(isError(successResult)).toBe(false);

      const voidResult = createVoidResult();

      expect(isError(voidResult)).toBe(false);
    });
  });

  describe('isSuccess', () => {
    it('should narrow type correctly', () => {

      const errorResult = createErrorResult('NOT_FOUND');
      expect(isSuccess(errorResult)).toBe(false);

      const successResult = createSuccessfulResult({ id: '123' });
      expect(isSuccess(successResult)).toBe(true);

      const voidResult = createVoidResult();
      expect(isSuccess(voidResult)).toBe(true);
    });
  });

  describe('pipeAsync', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should chain successful operations', async () => {
      const step1 = jest.fn().mockResolvedValue(createSuccessfulResult('step1-result'));
      const step2 = jest.fn().mockResolvedValue(createSuccessfulResult('step2-result'));
      const step3 = jest.fn().mockResolvedValue(createSuccessfulResult('step3-result'));

      const result = await pipeAsync('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).toHaveBeenCalledWith('step1-result');
      expect(step3).toHaveBeenCalledWith('step2-result');
      expect(isSuccess(result)).toBe(true);
      expect(result.result).toBe('step3-result');
    });

    it('should stop at first error', async () => {
      const step1 = jest.fn().mockResolvedValue(createSuccessfulResult('step1-result'));
      const step2 = jest.fn().mockResolvedValue(
        createErrorResult('ERROR_2', 'Failed at step 2')
      );
      const step3 = jest.fn(); // should not be called

      const result = await pipeAsync('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).toHaveBeenCalledWith('step1-result');
      expect(step3).not.toHaveBeenCalled();

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('ERROR_2');
    });

    it('should handle initial error', async () => {
      const step1 = jest.fn().mockResolvedValue(
        createErrorResult('ERROR_1', 'Failed immediately')
      );
      const step2 = jest.fn();
      const step3 = jest.fn();

      const result = await pipeAsync('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).not.toHaveBeenCalled();
      expect(step3).not.toHaveBeenCalled();

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('ERROR_1');
    });

    it('should handle async thrown errors', async () => {
      const failingStep = async () => {
        await Promise.resolve(); // make it async
        throw new Error('Unexpected error');
      };

      const result = await pipeAsync('initial', failingStep);

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe("INTERNAL_ERROR");
      expect(result.error?.message).toContain('Function threw an error');
    });

    it('should handle malformed return values gracefully', async () => {
      const step1 = jest.fn().mockResolvedValue(createSuccessfulResult('ok'));
      const step2 = jest.fn().mockResolvedValue('not-a-result' as any);

      const result = await pipeAsync('start', step1, step2);
      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe("INTERNAL_ERROR");
      expect(result.error?.message).toBe(INTERNAL_ERROR_MESSAGE);
    });

    it('should log an app error when a step fails', async () => {
      const step1 = jest.fn().mockResolvedValue(createErrorResult('NOT_FOUND', 'Item not found'));
      const step2 = jest.fn(); // should not run

      const result = await pipeAsync('initial', step1, step2);

      expect(mockLogAppError).toHaveBeenCalledWith('NOT_FOUND', 'Item not found', { "context": "pipeAsync step 1" });
      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('NOT_FOUND');
      expect(step2).not.toHaveBeenCalled();

    });

    it('should stop when encountering an invalid step result', async () => {
      const step1 = jest.fn().mockResolvedValue(createSuccessfulResult('ok'));
      const step2 = jest.fn().mockResolvedValue({} as any);
      const step3 = jest.fn(); // should not run

      const result = await pipeAsync('initial', step1, step2, step3);

      expect(isError(result)).toBe(true);

      expect(result.error?.code).toBe("INTERNAL_ERROR");
      expect(result.error?.message).toBe(INTERNAL_ERROR_MESSAGE);

      expect(step3).not.toHaveBeenCalled();
    });
  });
  describe('pipe (sync version)', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should chain successful operations synchronously', () => {
      const step1 = jest.fn().mockReturnValue(createSuccessfulResult('step1-result'));
      const step2 = jest.fn().mockReturnValue(createSuccessfulResult('step2-result'));
      const step3 = jest.fn().mockReturnValue(createSuccessfulResult('step3-result'));

      const result = pipe('initial', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('initial');
      expect(step2).toHaveBeenCalledWith('step1-result');
      expect(step3).toHaveBeenCalledWith('step2-result');

      expect(isSuccess(result)).toBe(true);
      expect(result.result).toBe('step3-result');
    });

    it('should stop at first error', () => {
      const step1 = jest.fn().mockReturnValue(createSuccessfulResult('ok'));
      const step2 = jest.fn().mockReturnValue(createErrorResult('ERROR_2', 'sync fail'));
      const step3 = jest.fn(); // should not be called

      const result = pipe('start', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('start');
      expect(step2).toHaveBeenCalledWith('ok');
      expect(step3).not.toHaveBeenCalled();

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('ERROR_2');
      expect(result.error?.message).toBe('sync fail');
    });

    it('should handle initial error', () => {
      const step1 = jest.fn().mockReturnValue(createErrorResult('ERROR_1', 'Immediate fail'));
      const step2 = jest.fn();
      const step3 = jest.fn();

      const result = pipe('start', step1, step2, step3);

      expect(step1).toHaveBeenCalledWith('start');
      expect(step2).not.toHaveBeenCalled();
      expect(step3).not.toHaveBeenCalled();

      expect(isError(result)).toBe(true);

      expect(result.error?.code).toBe('ERROR_1');
      expect(result.error?.message).toBe('Immediate fail');

    });

    it('should handle malformed return values gracefully', () => {
      const step1 = jest.fn().mockReturnValue(createSuccessfulResult('ok'));
      const step2 = jest.fn().mockReturnValue('not-a-result' as any);

      const result = pipe('start', step1, step2);

      expect(isError(result)).toBe(true);

      expect(result.error?.code).toBe(INTERNAL_ERROR_CODE);
      expect(result.error?.message).toBe(INTERNAL_ERROR_MESSAGE);

    });

    it('should log an app error when a step fails', () => {
      const step1 = jest.fn().mockReturnValue(
        createErrorResult('NOT_FOUND', 'Item not found')
      );
      const step2 = jest.fn(); // should not run

      const result = pipe('initial', step1, step2);

      expect(mockLogAppError).toHaveBeenCalledWith('NOT_FOUND', 'Item not found', { "context": "pipe step 1" });
      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe('NOT_FOUND');
      expect(step2).not.toHaveBeenCalled();

    });

    it('should stop when encountering invalid return shape', () => {
      const step1 = jest.fn().mockReturnValue(createSuccessfulResult('ok'));
      const step2 = jest.fn().mockReturnValue({} as any);
      const step3 = jest.fn(); // should not run

      const result = pipe('initial', step1, step2, step3);

      expect(isError(result)).toBe(true);
      expect(result.error?.code).toBe(INTERNAL_ERROR_CODE);
      expect(result.error?.message).toBe(INTERNAL_ERROR_MESSAGE);

      expect(step3).not.toHaveBeenCalled();
    });
  });
});