import { isNonEmptyArray } from "@/lib/utils/guards";
import { HighlightTokens, HighlightCustomTokensOptions } from "@/components/code/code.type";

export function highlightCustomTokens(
  html: string,
  tokens: HighlightTokens = [],
  options?: HighlightCustomTokensOptions
) {
  if (!isNonEmptyArray(tokens)) return html;

  let result = html;

  const variant = options?.variant ?? 'primary';
  const appearance = options?.appearance;

  for (const token of tokens) {
    if (!token) continue;

    // Check if token is a data attribute pattern like 'data-variant="primary"'
    const dataAttrMatch = token.match(/^(data-[\w-]+)="([^"]+)"$/);

    if (dataAttrMatch) {
      const [, attrName, attrValue] = dataAttrMatch;

      // Match the attribute name, equals sign, and quoted value across multiple spans
      // Example: <span>data-variant</span><span>=</span><span>"primary"</span>
      const pattern = new RegExp(
        `(<span[^>]*>\\s*${escapeCodeStringRegex(attrName)}\\s*</span>` + // attribute name
        `<span[^>]*>\\s*=\\s*</span>` +                          // equals sign
        `<span[^>]*>\\s*"${escapeCodeStringRegex(attrValue)}"\\s*</span>)`, // quoted value
        'g'
      );

      const attrs = [`data-variant="${variant}"`];
      if (appearance) attrs.push(`data-appearance="${appearance}"`);

      result = result.replace(pattern, (match) => {
        return `<span class="custom-code-highlight" ${attrs.join(' ')}>${match}</span>`;
      });
    } else {
      // Fallback to original logic for non-attribute tokens
      const replaceRegex = escapeCodeStringRegex(token);
      const regex = new RegExp(replaceRegex, 'g');
      const attrs = [`data-variant="${variant}"`];
      if (appearance) attrs.push(`data-appearance="${appearance}"`);

      result = result.replace(regex, () => {
        return `<span class="custom-code-highlight" ${attrs.join(' ')}>${token}</span>`;
      });
    }
  }

  return result;
}

function escapeCodeStringRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}