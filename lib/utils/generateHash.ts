export const generateHash = (text: string): string => {
  return Array.from(text)
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)
    .toString(16)
    .replace(/^-/, '')
    .slice(0, 8)
}