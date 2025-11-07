import { stringUtils } from "@/lib/utils/string";

describe('stringUtils', () => {

    describe('escape', () => {
        test.each([
            ['test.*', 'test\\.\\*'],
            ['hello+world', 'hello\\+world'],
            ['test?query', 'test\\?query'],
            ['price$100', 'price\\$100'],
            ['(group)', '\\(group\\)'],
        ])('escapes special characters: "%s" → "%s"', (input, expected) => {
            expect(stringUtils.escape(input)).toBe(expected);
        });

        it('should not trim or alter whitespace', () => {
            expect(stringUtils.escape('  hello  ')).toBe('  hello  ');
            expect(stringUtils.escape('   ')).toBe('   ');
        });

        it('escapes all regex specials', () => {
            const special = '.*+?^${}()|[]\\';
            expect(stringUtils.escape(special)).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
        });

        it('handles empty and nullish inputs', () => {
            expect(stringUtils.escape('')).toBe('');
            expect(stringUtils.escape(null)).toBe('');
            expect(stringUtils.escape(undefined)).toBe('');
        });

        it('allows safe regex usage', () => {
            const malicious = '.*';
            const safe = stringUtils.escape(malicious);
            const regex = new RegExp(safe);
            expect(regex.test('.*')).toBe(true);
            expect(regex.test('anything else')).toBe(false);
        });

        it('preserves alphanumeric text', () => {
            expect(stringUtils.escape('hello123')).toBe('hello123');
            expect(stringUtils.escape('Test Query')).toBe('Test Query');
        });
    });

    describe('normalizeWhiteSpace', () => {
        test.each([
            ['hello    world', 'hello world'],
            ['hello  world  test', 'hello world test'],
            ['  hello  ', 'hello'],
            ['\n\thello\t\n', 'hello'],
            ['hello\n\nworld', 'hello world'],
            ['hello\t\tworld', 'hello world'],
        ])('normalizes whitespace: "%s" → "%s"', (input, expected) => {
            expect(stringUtils.normalizeWhiteSpace(input)).toBe(expected);
        });

        it('handles empty or whitespace-only strings', () => {
            expect(stringUtils.normalizeWhiteSpace('')).toBe('');
            expect(stringUtils.normalizeWhiteSpace('   ')).toBe('');
            expect(stringUtils.normalizeWhiteSpace('\n\n\n')).toBe('');
        });

        it('handles null and undefined', () => {
            expect(stringUtils.normalizeWhiteSpace(null)).toBe('');
            expect(stringUtils.normalizeWhiteSpace(undefined)).toBe('');
        });
    });

    describe('removeEmoji', () => {
        test.each([
            ['Hello 😀 World', 'Hello  World'],
            ['Test 🎉🚀💯', 'Test '],
            ['Faces 😀😃😄', 'Faces '],
            ['Objects 🎯🎨🎭', 'Objects '],
            ['Travel 🚗🚀✈️', 'Travel '],
            ['Flags 🇺🇸🇬🇧🇯🇵', 'Flags '],
        ])('removes emoji: "%s" → "%s"', (input, expected) => {
            expect(stringUtils.removeEmoji(input)).toBe(expected);
        });

        it('preserves normal text', () => {
            expect(stringUtils.removeEmoji('Hello World')).toBe('Hello World');
            expect(stringUtils.removeEmoji('Test 123')).toBe('Test 123');
        });

        it('handles emoji-only, empty, and nullish inputs', () => {
            expect(stringUtils.removeEmoji('🎉🚀😀')).toBe('');
            expect(stringUtils.removeEmoji('')).toBe('');
            expect(stringUtils.removeEmoji(null)).toBe('');
            expect(stringUtils.removeEmoji(undefined)).toBe('');
        });
    });

    describe('removePunctuation', () => {
        test.each([
            ['Hello, World!', 'Hello World'],
            ['Test... query?', 'Test query'],
            ['Price: $100', 'Price 100'],
            ['user@email.com', 'useremailcom'],
            ['#hashtag', 'hashtag'],
            ['50%', '50'],
        ])('removes punctuation: "%s" → "%s"', (input, expected) => {
            expect(stringUtils.removePunctuation(input)).toBe(expected);
        });

        it('preserves letters, numbers, spaces, and accents', () => {
            expect(stringUtils.removePunctuation('abc123 xyz')).toBe('abc123 xyz');
            expect(stringUtils.removePunctuation('Café')).toBe('Café');
            expect(stringUtils.removePunctuation('日本語')).toBe('日本語');
            expect(stringUtils.removePunctuation('Москва')).toBe('Москва');
        });

        it('handles punctuation-only, empty, and nullish inputs', () => {
            expect(stringUtils.removePunctuation('!!???..')).toBe('');
            expect(stringUtils.removePunctuation('')).toBe('');
            expect(stringUtils.removePunctuation(null)).toBe('');
            expect(stringUtils.removePunctuation(undefined)).toBe('');
        });
    });

    test.each([
        ['hello world', 5, 'hello'],
        ['test string', 4, 'test'],
        ['hello', 10, 'hello'],
        ['test', 100, 'test'],
        ['hello', 5, 'hello'],
    ])('truncates "%s" → "%s" (max %d)', (input, maxLength, expected) => {
        expect(stringUtils.truncate(input, maxLength)).toBe(expected);
    });

    it('returns empty string for nullish or empty input', () => {
        expect(stringUtils.truncate('', 10)).toBe('');
        expect(stringUtils.truncate(null, 10)).toBe('');
        expect(stringUtils.truncate(undefined, 10)).toBe('');
    });

    it('returns empty string for maxLength <= 0', () => {
        expect(stringUtils.truncate('hello', 0)).toBe('');
        expect(stringUtils.truncate('hello', -1)).toBe('');
    });

    it('handles single emoji correctly', () => {
        expect(stringUtils.truncate('🎉🎉🎉', 2)).toBe('🎉🎉');
        expect(stringUtils.truncate('🎉🎉🎉', 1)).toBe('🎉');
    });

    it('handles mixed text with emojis', () => {
        expect(stringUtils.truncate('Hello 🎉 World', 7)).toBe('Hello 🎉');
    });

    it('handles combined flag emojis (2 code points)', () => {
        // 🇦🇺 is two Unicode code points, but one grapheme
        const input = '🇦🇺🇯🇵🇺🇸';
        expect(stringUtils.truncate(input, 1)).toBe('🇦🇺');
        expect(stringUtils.truncate(input, 2)).toBe('🇦🇺🇯🇵');
    });

    it('handles diacritics as single characters', () => {
        const input = 'Café Noël'; // é and ë are composed chars
        expect(stringUtils.truncate(input, 5)).toBe('Café ');
    });

    it('falls back safely when Intl.Segmenter is unavailable', () => {
        const originalIntl = global.Intl;
        // @ts-expect-error simulate undefined Intl
        global.Intl = undefined;

        const result = stringUtils.truncate('Hello World', 5);
        expect(result).toBe('Hello');

        global.Intl = originalIntl;
    });

    describe('integration', () => {
        it('works correctly when composed', () => {
            const result = stringUtils.escape(
                stringUtils.normalizeWhiteSpace(stringUtils.removeEmoji(' Hello   🎉 World  '))
            );
            expect(result).toBe('Hello World');
        });
    });
});
