export function getSluggedText(text: string) {
  const sluggedText = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

  return sluggedText + '-' + Math.random().toString(36).replace('0.', '').slice(0, 5)
}
