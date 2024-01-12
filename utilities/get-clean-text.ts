export function getCleanText(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}
