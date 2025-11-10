import { stringUtils } from "@/lib/utils/string";

/**
 * Options for configuring the sanitizeString function.
 */
export interface SanitizeStringOptions {
    /** Maximum length to truncate the input to. Default: 200 */
    maxLength?: number;
    /** Whether to remove punctuation. Default: true */
    removePunctuation?: boolean;
    /** Whether to remove emoji. Default: true */
    removeEmoji?: boolean;
    /** Whether to normalize whitespace (collapse multiple spaces and trim). Default: true */
    normalizeWhitespace?: boolean;
    /** Whether to convert to lowercase. Default: false */
    toLowerCase?: boolean;
}

/**
 * Sanitizes and normalizes strings to make it safe for use in regex patterns.
 * Applies transformations in the following order:
 * 1. Normalize whitespace (if enabled)
 * 2. Truncate to maxLength
 * 3. Remove emoji (if enabled)
 * 4. Remove punctuation (if enabled)
 * 5. Convert to lowercase (if enabled)
 * 6. Normalize whitespace again (if enabled)
 * 7. Escape regex special characters
 * 
 * @param query - The string to sanitize
 * @param options - Configuration options for sanitization behavior
 * @returns A sanitized string safe for use in RegExp, or empty string if input is invalid
 * 
 * @example
 * ```ts
 * // Default behavior
 * sanitizeString('Hello 🎉 World!!!'); 
 * // Returns: 'Hello World' (emoji and punctuation removed, regex-escaped)
 * 
 * // Keep punctuation
 * sanitizeString('C++ programming', { removePunctuation: false });
 * // Returns: 'C\\+\\+ programming' (punctuation escaped for regex)
 * 
 * // Custom max length
 * sanitizeString('very long query...', { maxLength: 10 });
 * // Returns: 'very long' (truncated and sanitized)
 * 
 * // Case-insensitive search (lowercase + regex 'i' flag)
 * const sanitized = sanitizeString('JavaScript', { toLowerCase: true });
 * const regex = new RegExp(sanitized, 'i');
 * // regex will match 'javascript', 'JavaScript', 'JAVASCRIPT', etc.
 * ```
 */
export const sanitizeString = (
    query: unknown,
    options: SanitizeStringOptions = {}
): string => {

    if (!query || typeof query !== 'string') return '';

    const {
        maxLength = 200,
        removePunctuation = true,
        removeEmoji = true,
        normalizeWhitespace = true,
        toLowerCase = false,
    } = options;


    let sanitized = query;

    // Trim and limit length first
    if (normalizeWhitespace) {
        sanitized = stringUtils.normalizeWhiteSpace(sanitized);
    }
    sanitized = stringUtils.truncate(sanitized, maxLength);

    // Remove emoji (matches most emoji using Unicode ranges)
    if (removeEmoji) {
        sanitized = stringUtils.removeEmoji(sanitized)
    }

    // Remove punctuation (keeps letters, numbers, and spaces)
    if (removePunctuation) {
        sanitized = stringUtils.removePunctuation(sanitized);
    }

    // Convert to lowercase for case-insensitive matching
    if (toLowerCase) {
        sanitized = sanitized.toLowerCase();
    }

    // Trim again after all transformations
    if (normalizeWhitespace) {
        sanitized = stringUtils.normalizeWhiteSpace(sanitized);
    }

    // Escape for regex use
    return stringUtils.escape(sanitized);
};