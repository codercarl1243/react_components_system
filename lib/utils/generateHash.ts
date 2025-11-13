import { ReactNode } from "react";

const hashString = (text: string): string => {
  return Array.from(text)
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)
    .toString(16)
    .replace(/^-/, '')
    .slice(0, 8);
};

export const generateHash = (text: string): string => {
  return hashString(text);
};

export const generateHashFromChildren = (children: ReactNode): string => {
  const extractText = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as any).props?.children);
    }
    return "";
  };
  
  return hashString(extractText(children));
};