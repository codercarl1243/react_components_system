import { ReactNode } from "react";
import { isReactElementWithChildren } from "./guards";

const hashString = (text: string): string => {
  const hash = Array.from(text)
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);

  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 8);
};

const hashCache = new Map<string, string>();

export const generateHash = (text: string): string => {
  if (hashCache.has(text)) return hashCache.get(text)!;
  const hash = hashString(text);
  hashCache.set(text, hash);
  return hash;
};

export const generateHashFromChildren = (children: ReactNode): string => {
  const extractText = (node: ReactNode): string => {
    if (node === null || node === undefined || typeof node === 'boolean') {
      return "";
    }
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (isReactElementWithChildren(node)) {
      return extractText(node.props?.children);
    }
    return "";
  };

  return hashString(extractText(children));
};