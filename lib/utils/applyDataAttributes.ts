const PRESERVE_TESTID_KEYS = new Set([
    "testid",
    "data-testid"
]);

/**
 * Safely converts an object of arbitrary keys into valid `data-*` attributes.
 * - Converts camelCase → kebab-case
 * - Preserves known exceptions like `testId`
 * - Filters null/undefined values
 * - Ensures React-safe `data-*` attribute names
 *
* @example
 * applyDataAttributes({
 *   theme: "dark",
 *   dataVariant: "primary",
 *   isActive: true
 * })
 *
 * // → {
 * //   "data-theme": "dark",
 * //   "data-variant": "primary",
 * //   "data-is-active": "true"
 * // }
 *
 * @example
 * // Handles test IDs automatically
 * applyDataAttributes({
 *   testId: "button-1"
 * })
 *
 * // → {
 * //   "data-testid": "button-1"
 * // }
 *
 * @example
 * // Strips existing data- prefixes safely
 * applyDataAttributes({
 *   "data-userId": 42
 * })
 *
 * // → {
 * //   "data-user-id": "42"
 * // }
 *
 * @example
 * // Ignores undefined or null values
 * applyDataAttributes({
 *   size: undefined,
 *   theme: null,
 *   variant: "accent"
 * })
 *
 * // → {
 * //   "data-variant": "accent"
 * // }
 *
 * @example
 * // Handles booleans, numbers, and strings
 * applyDataAttributes({
 *   isOpen: false,
 *   count: 3,
 *   mode: "compact"
 * })
 *
 * // → {
 * //   "data-is-open": "false",
 * //   "data-count": "3",
 * //   "data-mode": "compact"
 * // }
 */

export function applyDataAttributes(
    data: Record<string, string | number | boolean | undefined | null>
): Record<string, string> {
    const out: Record<string, string> = {};

    for (const rawKey in data) {
        const value = data[rawKey];
        if (value == null) continue;

        const lowerKey = rawKey.toLowerCase();

        // Special case: normalize to data-testid
        if (PRESERVE_TESTID_KEYS.has(lowerKey)) {
            out["data-testid"] = String(value);
            continue;
        }

        // Strip "data-", "data_", or "dataExample" prefix
        const stripped = rawKey.replace(/^data(?=[-_A-Z])/, "");

        // Convert camelCase to kebab-case (must use rawKey casing!)
        const kebabKey = stripped
            // handle camelCase transitions: fooBar → foo-bar
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            // handle "FOOBar" → "foo-bar"
            .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
            .toLowerCase();

        out[`data-${kebabKey}`] = String(value);
    }

    return out;
}