import { Variant, VariantAppearance } from "@/types/variant";
import type { BundledLanguage } from "shiki";

export type SupportedLangs = Extract<BundledLanguage, 'tsx' | 'ts' | 'css' | 'md' | 'bash' | 'html' | 'text'>;

export type HighlightCustomTokensOptions = {
  variant?: Variant;
  appearance?: VariantAppearance;
}

export type CodeProps = {
  codeString: string;
  lang?: SupportedLangs;
  inline?: boolean;
  layout?: 'full' | 'bleed' | 'content';
  title?: string;
  copyEnabled?: boolean;
  highlightTokens?: string[];
  options?: HighlightCustomTokensOptions;
}
export type InlineCodeProps = Pick<CodeProps, 'codeString' | 'lang' | 'highlightTokens' | 'options'> & {
  noWrap?: boolean;
}