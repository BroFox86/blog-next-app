import sanitize from 'sanitize-html'

export const getSafeHtml = (html: string) => {
  return sanitize(html, {
    allowedTags: ['h1', 'h2', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 's', 'u', 'code'],
    allowedAttributes: {
      p: ['class'],
      a: ['href', 'target', 'rel'],
      li: ['data-list']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    textFilter: text => {
      return text.replace(/\u00A0/g, ' ')
    }
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

export function formatDate(isoDate: string) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return formatter.format(new Date(isoDate))
}

export function getCleanText(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

export function getTextExcerpt(content: string) {
  const plainText = content
    .replace(/<\/?[^>]+(>|$)/g, ' ')
    .replace(/ \. /g, '. ')
    .replace(/ \, /g, ', ')
  const excerpt = plainText.trim().slice(0, 170)

  return excerpt
}
