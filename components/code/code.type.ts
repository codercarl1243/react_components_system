import type { BundledLanguage } from "shiki";

export type SupportedLangs = Extract<BundledLanguage, 'tsx' | 'ts' | 'css' | 'md' | 'bash' | 'html' | 'text'>;

export type CodeProps = {
  codeString: string;
  lang?: SupportedLangs;
  inline?: boolean;
  layout?: 'full' | 'bleed' | 'content';
  title?: string;
  copyEnabled?: boolean;
  highlightTokens?: string[];
}
export type InlineCodeProps = Pick<CodeProps, 'codeString' | 'lang' | 'highlightTokens'> & {
  noWrap?: boolean;
}