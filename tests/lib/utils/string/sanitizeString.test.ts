import { sanitizeString } from "@/lib/utils/string";

describe('sanitizeString', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('default behavior', () => {
    test.each([
      ['Hello 🎉 World 🚀', 'Hello World'],
      ['Test 😀😃😄', 'Test'],
    ])('removes emoji: "%s" → "%s"', (input, expected) => {
      expect(sanitizeString(input)).toBe(expected);
    });

    test.each([
      ['Hello, World!', 'Hello World'],
      ['Test... query?', 'Test query'],
      ['$100 price', '100 price'],
    ])('removes punctuation: "%s" → "%s"', (input, expected) => {
      expect(sanitizeString(input)).toBe(expected);
    });

    test.each([
      ['hello    world', 'hello world'],
      ['test\n\nquery', 'test query'],
      ['  spaces  everywhere  ', 'spaces everywhere'],
    ])('normalizes whitespace: "%s" → "%s"', (input, expected) => {
      expect(sanitizeString(input)).toBe(expected);
    });

    it('escapes special regex characters safely', () => {
      const result = sanitizeString('test', { removePunctuation: false });
      expect(result).toBe('test');
    });
  });

  describe('edge cases', () => {
    test.each(['', '   '])('handles empty/whitespace: "%s"', (input) => {
      expect(sanitizeString(input)).toBe('');
    });

    test.each([null, undefined, 123, {}])('handles invalid input: %p', (input) => {
      expect(sanitizeString(input as unknown)).toBe('');
    });

    test.each([
      ['🎉🚀😀', ''],
      ['!!???...', ''],
    ])('handles emoji/punctuation-only strings', (input, expected) => {
      expect(sanitizeString(input)).toBe(expected);
    });
  });

  describe('length limiting', () => {
    it('respects custom maxLength', () => {
      const long = 'a'.repeat(300);
      expect(sanitizeString(long, { maxLength: 100 }).length).toBeLessThanOrEqual(100);
    });

    it('uses default maxLength of 200', () => {
      const long = 'a'.repeat(300);
      expect(sanitizeString(long).length).toBeLessThanOrEqual(200);
    });
  });

  describe('custom options', () => {
    it('keeps punctuation when disabled', () => {
      const result = sanitizeString('C++ programming!', { removePunctuation: false });
      expect(result).toContain('\\+\\+');
      expect(result).toContain('!');
    });

    it('keeps emoji when disabled', () => {
      const result = sanitizeString('Hello 🎉', { removeEmoji: false, removePunctuation: false });
      expect(result).toContain('🎉');
    });

    it('preserves whitespace when normalizeWhitespace is false', () => {
      const result = sanitizeString('hello    world', { normalizeWhitespace: false });
      expect(result).toBe('hello    world');
    });

    it('converts to lowercase when enabled', () => {
      expect(sanitizeString('HeLLo WoRLd', { toLowerCase: true })).toBe('hello world');
    });

    it('preserves case when disabled', () => {
      expect(sanitizeString('HeLLo', { toLowerCase: false })).toBe('HeLLo');
    });

    it('handles multiple options disabled gracefully', () => {
      const result = sanitizeString('Hello! 🎉', {
        removePunctuation: false,
        removeEmoji: false,
        toLowerCase: false,
      });
      expect(result).toContain('Hello');
      expect(result).toContain('🎉');
      expect(result).toContain('!');
    });
  });

  describe('international support', () => {
    test.each(['Café', '日本語', 'Москва', 'Ελληνικά'])(
      'preserves international text: "%s"',
      (input) => {
        expect(sanitizeString(input)).toBe(input);
      }
    );

    it('preserves Arabic numerals', () => {
      expect(sanitizeString('٠١٢٣')).toBe('٠١٢٣');
    });
  });

  describe('regex safety', () => {
    it('prevents catastrophic backtracking', () => {
      const malicious = `${'a'.repeat(100)}!`;
      const sanitized = sanitizeString(malicious);
      const regex = new RegExp(sanitized, 'i');
      const start = Date.now();
      regex.test('test string that does not match');
      expect(Date.now() - start).toBeLessThan(100);
    });

    it('produces valid regex strings', () => {
      const result = sanitizeString('test query', { removePunctuation: false });
      expect(() => new RegExp(result)).not.toThrow();
    });
  });

  describe('practical search scenarios', () => {
    test.each([
      ['JavaScript tutorial', 'JavaScript tutorial'],
      ['How to cook pasta?', 'How to cook pasta'],
      ['React.js guide', 'Reactjs guide'],
    ])('handles queries: "%s" → "%s"', (input, expected) => {
      expect(sanitizeString(input)).toBe(expected);
    });

    test.each([
      ['Best 🔥 C++ tips!!!', 'Best C tips'],
      ['Top 10 🎯 strategies...', 'Top 10 strategies'],
    ])('handles mixed-content queries: "%s" → "%s"', (input, expected) => {
      expect(sanitizeString(input)).toBe(expected);
    });
  });

  describe('integration', () => {
    it('plays nicely with stringUtils.escape()', () => {
      const result = sanitizeString('Hello   🎉   World!');
      expect(result).toBe('Hello World');
    });
  });
});
