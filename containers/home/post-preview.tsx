import Image from 'next/image'
import Link from 'next/link'

import { Button } from '~/components/button'
import { PostState } from '~/services/post-api'
import { formatDate } from '~/utilities/format-date'

import s from './post-preview.module.scss'

export function PostPreview({ id, date, image, title, content }: PostState) {
  return (
    <article className={s.container}>
      <div className={s.imageWrapper}>
        <Image
          className={s.image}
          src={image}
          sizes='(min-width: 1000px) 432px, (min-width: 700px) 354px, 368px'
          loading='lazy'
          alt=''
          fill
        />
        <div className={s.date}>{formatDate(date)}</div>
      </div>
      <div className={s.inner}>
        <h3 className={s.heading}>
          <Link className={s.link} href={`/posts/${id}`} suppressHydrationWarning>
            {title}
          </Link>
        </h3>
        <p className={s.excerpt} suppressHydrationWarning>
          {getTextExcerpt(content)}
        </p>
        <Button className={s.button} as='link' variant='primary' label='View post' href={`/posts/${id}`} />
      </div>
    </article>
  )
}

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
