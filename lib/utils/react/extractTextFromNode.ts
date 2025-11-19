import type { ReactNode } from "react";
import { isReactElementWithChildren } from "@/lib/utils/guards";

export default function extractTextFromNode(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractTextFromNode).join("");
    }
    if (isReactElementWithChildren(node)) {
      return extractTextFromNode(node.props.children);
    }
    return "";
  }