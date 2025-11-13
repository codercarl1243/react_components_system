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
  let text: string;
  
  if (typeof children === "string") {
    text = children;
  } else if (typeof children === "number") {
    text = String(children);
  } else if (Array.isArray(children)) {
    text = children.map(child => 
      typeof child === "string" || typeof child === "number" 
        ? String(child) 
        : JSON.stringify(child)
    ).join("");
  } else {
    text = JSON.stringify(children ?? "");
  }
  
  return hashString(text);
};