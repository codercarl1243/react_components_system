import type { BundledLanguage } from "shiki";

export type SupportedLangs = Extract<BundledLanguage, 'tsx' | 'ts' | 'css' | 'md' | 'bash'>;

export type CodeProps = {
  codeString: string;
  lang?: SupportedLangs;
  inline?: boolean;
  layout?: 'full' | 'bleed' | 'content';
  title?: string;
  copyEnabled?: boolean;
}
export type InlineCodeProps = {
  codeString: string;
  lang?: CodeProps['lang'];
}