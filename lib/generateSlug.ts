import { generateHash } from '@/lib/generateHash'

export const generateSlug = (text: string): string => {
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  if (slug && slug.length) {
    return slug
  }

  return `slug-${generateHash(text)}`
}