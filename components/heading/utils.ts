import { generateSlug } from "@/lib/utils/generateSlug"
import extractTextFromNode from "@/lib/utils/react/extractTextFromNode"
import type { ReactNode } from "react"
import type { ValidHeadingTag } from "./heading.type"

export const getSizeClass = (level: number): string => {
  switch (level) {
    case 1: return 'text-6xl'
    case 2: return 'text-3xl'
    case 3: return 'text-2xl'
    case 4: return 'text-xl'
    case 5: return 'text-lg'
    case 6: return 'text-base'
    default: return 'text-2xl'
  }
}
export const getIconSize = (level: number): number => {
  switch (level) {
    case 1: return 64
    case 2: return 48
    case 3: return 32
    case 4: return 24
    default: return 16
  }
}

export const generateHeadingId = (node: ReactNode) => generateSlug(extractTextFromNode(node));

export const generateHeadingSize = (headingTag: ValidHeadingTag) => Number(headingTag[1]);