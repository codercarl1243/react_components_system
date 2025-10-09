import isThenable from '@/utils/isThenable';

describe('isThenable', () => {
    describe('should return true for thenable objects', () => {
        it('returns true for Promises', () => {
            const promise = Promise.resolve('value');
            expect(isThenable(promise)).toBe(true);
        });

        it('returns true for rejected Promises', () => {
            const promise = Promise.reject(new Error('error'));
            // Suppress unhandled rejection warning
            promise.catch(() => { });
            expect(isThenable(promise)).toBe(true);
        });

        it('returns true for async function results', () => {
            const asyncFunc = async () => {
                await Promise.resolve();
                return 'value';
            };
            const result = asyncFunc();
            expect(isThenable(result)).toBe(true);
        });

        it('returns true for objects with then method', () => {
            const thenable = {
                then: (onFulfilled: (value: string) => void) => {
                    onFulfilled('value');
                },
            };
            expect(isThenable(thenable)).toBe(true);
        });

        it('returns true for custom Promise-like objects', () => {
            const customThenable = {
                then: jest.fn(),
                catch: jest.fn(),
            };
            expect(isThenable(customThenable)).toBe(true);
        });
    });

    describe('should return false for non-thenable values', () => {
        it('returns false for null', () => {
            expect(isThenable(null)).toBe(false);
        });

        it('returns false for undefined', () => {
            expect(isThenable(undefined)).toBe(false);
        });

        it('returns false for strings', () => {
            expect(isThenable('string')).toBe(false);
        });

        it('returns false for numbers', () => {
            expect(isThenable(42)).toBe(false);
        });

        it('returns false for booleans', () => {
            expect(isThenable(true)).toBe(false);
            expect(isThenable(false)).toBe(false);
        });

        it('returns false for plain objects without then', () => {
            expect(isThenable({ foo: 'bar' })).toBe(false);
        });

        it('returns false for objects with then property that is not a function', () => {
            expect(isThenable({ then: 'not a function' })).toBe(false);
            expect(isThenable({ then: 123 })).toBe(false);
        });

        it('returns false for arrays', () => {
            expect(isThenable([1, 2, 3])).toBe(false);
        });

        it('returns false for functions', () => {
            expect(isThenable(() => { })).toBe(false);
        });

        it('returns false for objects with other methods but not then', () => {
            expect(isThenable({ catch: () => { } })).toBe(false);
        });
    });

    describe('edge cases', () => {
        it('returns false for objects with then property set to null', () => {
            expect(isThenable({ then: null })).toBe(false);
        });

        it('returns false for objects with then property set to undefined', () => {
            expect(isThenable({ then: undefined })).toBe(false);
        });

        it('handles Symbol.toStringTag correctly', () => {
            const obj = {
                [Symbol.toStringTag]: 'Promise',
                then: () => { },
            };
            expect(isThenable(obj)).toBe(true);
        });

        it('works with class instances that have then method', () => {
            class CustomPromise {
                then = jest.fn();
            }
            const instance = new CustomPromise();
            expect(isThenable(instance)).toBe(true);
        });
    });
});