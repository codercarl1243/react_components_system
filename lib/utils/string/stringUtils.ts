import emojiRegex  from 'emoji-regex';

type StringFunctionType = {
    escape(str: string | null | undefined): string;
    normalizeWhiteSpace(str: string | null | undefined): string;
    removeEmoji(str: string | null | undefined): string;
    removePunctuation(str: string | null | undefined): string;
    truncate(str: string | null | undefined, maxLength: number): string;
};

export const stringUtils: StringFunctionType = {
    escape: (str) => (!str ? '' : str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),

    normalizeWhiteSpace: (str) =>
        !str ? '' : str.replace(/\s+/g, ' ').trim(),

    removeEmoji: (str) => (!str ? '' : str.replace(emojiRegex(), '')),

    removePunctuation: (str) =>
        !str ? '' : str.replace(/[^\p{L}\p{N}\s]/gu, ''),

    truncate: (str: string | null | undefined, maxLength: number): string => {
        if (!str || maxLength <= 0) return '';

        // Use Intl.Segmenter if available to handle emojis and grapheme clusters
        if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
            const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
            const graphemes = [...segmenter.segment(str)];
            return graphemes.slice(0, maxLength).map(seg => seg.segment).join('');
        }

        // Fallback for older environments
        return str.slice(0, maxLength);
    }
};