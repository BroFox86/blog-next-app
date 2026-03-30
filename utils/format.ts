import sanitize from 'sanitize-html'

export const getSafeHtml = (html: string) => {
  return sanitize(html, {
    allowedTags: ['h1', 'h2', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 's', 'u'],
    allowedAttributes: {
      p: ['class'],
      a: ['href', 'target', 'rel'],
      li: ['data-list']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel']
  })
}

export function getSluggedText(text: string) {
  const sluggedText = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

  return sluggedText + '-' + Math.random().toString(36).replace('0.', '').slice(0, 5)
}

export function formatDate(isoDate: string, isShort?: boolean) {
  let options = {}

  if (!isShort) {
    options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  } else {
    options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }
  }

  const formatter = new Intl.DateTimeFormat('en-GB', options)

  return formatter.format(new Date(isoDate))
}

export function getCleanText(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}
