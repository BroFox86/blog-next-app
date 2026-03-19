import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import type { Post } from '@/lib/db'
import { formatDate } from '@/utils/formatDate'

import s from './PostPreview.module.scss'

type Props = {
  post?: Post
  skeleton?: boolean
}

export function PostPreview({ post, skeleton }: Props) {
  function renderSkeleton() {
    return (
      <article className={clsx(s.root, s.isSkeleton)} aria-hidden>
        <div className={s.imageWrapper} />
        <div className={s.inner}>
          <h3 className={s.heading}>Placeholder</h3>
          <p className={s.excerpt}>
            {getTextExcerpt(
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet iure natus veritatis maxime tempore a earum dolor dicta, repellat quod corrupti minus odit sequi asperiores sapiente exercitationem ducimus laboriosam minima.'
            )}
          </p>
          <Button className={clsx(s.button, skeleton && s.isSkeleton)} as='link' variant='primary' label='View post' />
        </div>
      </article>
    )
  }

  function renderComponent() {
    if (!post) return

    const { id, date, image, title, content } = post

    return (
      <article className={s.root}>
        <Link className={s.imageWrapper} href={`/posts/${id}`}>
          <Image
            className={s.image}
            src={image}
            sizes='(min-width: 1200px) 356px, (min-width: 768px) 45vw, (min-width: 470px) 432px, 91vw'
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

  return skeleton ? renderSkeleton() : renderComponent()
}

function getTextExcerpt(content: string) {
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ')
  let excerpt = plainText.trim().slice(0, 190)

  if (plainText.length > 190) {
    excerpt += '...'
  }

  return excerpt || ''
}
