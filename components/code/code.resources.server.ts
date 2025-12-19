import { logInfo, logError } from "@/lib/logging/log";
import { cache } from "react";
import { Highlighter, createHighlighter } from "shiki";

declare global {
  var __highlighterPromise: Promise<Highlighter> | undefined
}
const globalForShiki = globalThis

export const getHighlighter = cache(async () => {
  if (!globalForShiki.__highlighterPromise) {

    logInfo('🟦 Creating new Shiki highlighter', { context: `getHighlighterSingleton` })

    globalForShiki.__highlighterPromise = createHighlighter({
      // themes: ['github-dark', 'light-plus'],
      themes: ['github-dark-default', 'github-light'],
      langs: ['tsx', 'ts', 'css', 'md', 'bash', 'html']
    }).catch(err => {
      // reset cache so a later retry can succeed
      delete globalForShiki.__highlighterPromise
      logError('Failed to create shiki Highlighter', err, { context: "getHighlighterSingleton" })
      throw err
    })
  }

  return globalForShiki.__highlighterPromise
});

export const getLoadedLanguages = cache(async () => {
  const highlighter = await getHighlighter();
  return new Set(highlighter.getLoadedLanguages?.() ?? []);
});