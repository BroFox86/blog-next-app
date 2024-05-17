import Image from 'next/image'
import Link from 'next/link'

import { Button } from '~/components/button'
import { PostState } from '~/services/post-api'
import { formatDate } from '~/utilities/format-date'

import s from './post-preview.module.scss'

export function PostPreview({ id, date, image, title, content }: PostState) {
  return (
    <article className={s.container}>
      <Link className={s.imageWrapper} href={`/posts/${id}`}>
        <Image
          className={s.image}
          src={image}
          sizes='(min-width: 1000px) 432px, (min-width: 700px) calc((95vw / 2) - 20px), (min-width: 460px) 432px, 95vw'
          loading='lazy'
          alt=''
          fill
        />
        <time className={s.date} dateTime={date}>
          {formatDate(date)}
        </time>
      </Link>
      <div className={s.inner}>
        <h3 className={s.heading}>
          <Link className={s.link} href={`/posts/${id}`}>
            {title}
          </Link>
        </h3>
        <p className={s.excerpt}>{getTextExcerpt(content)}</p>
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
