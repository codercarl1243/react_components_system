type StringFunctionType = {
    escape(str: string | null | undefined): string;
    normalizeWhiteSpace(str: string | null | undefined): string;
    removeEmoji(str: string | null | undefined): string;
    removePunctuation(str: string | null | undefined): string;
    truncate(str: string | null | undefined, maxLength: number): string;
};

// eslint-disable-next-line no-misleading-character-class
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}-\u{2454}\u{20D0}-\u{20FF}\u{FE0F}]/gu;



export const stringUtils: StringFunctionType = {
    escape: (str) => (!str ? '' : str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),

    normalizeWhiteSpace: (str) =>
        !str ? '' : str.replace(/\s+/g, ' ').trim(),

    removeEmoji: (str) => (!str ? '' : str.replace(EMOJI_REGEX, '')),

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