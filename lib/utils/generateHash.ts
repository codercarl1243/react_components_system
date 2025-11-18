import type { ReactNode } from "react";
import { isNullish, isReactElementWithChildren } from "@/lib/utils/guards";
import { LRUCache } from "./cache";


const HASH_CACHE = new LRUCache<string, string>(250);

const hashString = (text: string): string => {
  const hash = Array.from(text)
    .reduce(
      (acc, char) => (
        (acc << 5) - acc + char.charCodeAt(0)
      ) | 0, 0);

  return (hash >>> 0).toString(16).padStart(8, '0');
};

export const generateHash = (text: string): string => {
  const cached = HASH_CACHE.get(text);
  if (cached !== undefined) return cached;

  const hash = hashString(text);
  HASH_CACHE.set(text, hash);

  return hash;
};

export const generateHashFromChildren = (children: ReactNode): string => {

  const extractText = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (isReactElementWithChildren(node)) {
      return extractText(node.props.children);
    }
    return "";
  };

  const extractedText = extractText(children);

  return generateHash(extractedText);
};