import { stringUtils } from "@/lib/utils/string/stringUtils";

/**
 * Sanitizes an input string by removing unwanted characters such as punctuation,
 * emojis, or excessive whitespace, and optionally lowercasing or escaping it.
 */
export const sanitizeString = (
    query: unknown,
    options: {
        maxLength?: number;
        removePunctuation?: boolean;
        removeEmoji?: boolean;
        normalizeWhitespace?: boolean;
        toLowerCase?: boolean;
    } = {}
) => {

    if (typeof query !== 'string') return '';

    const {
        maxLength = 200,
        removePunctuation = true,
        removeEmoji = true,
        normalizeWhitespace = true,
        toLowerCase = false,
    } = options;

    if (!query || typeof query !== 'string') return '';

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