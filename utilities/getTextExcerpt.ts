export function getTextExcerpt(content: string) {
  const span = document.createElement('span')
  let textContent
  let excerpt

  span.innerHTML = content

  textContent = span.textContent!

  excerpt = textContent.trim().slice(0, 190)

  if (excerpt.length >= 190) {
    excerpt += '...'
  }

  return excerpt || ''
}
