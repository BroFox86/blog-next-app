import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/lib/generated/prisma/client'
import { BREAKPOINTS } from '@/utils/constants'
import { formatDate } from '@/utils/format'

import s from './PostPreview.module.scss'

type Props = {
  post?: Post
  skeleton?: boolean
}

export function PostPreview({ post, skeleton }: Props) {
  function renderSkeleton() {
    return (
      <article className={clsx(s.root, s.isSkeleton)} aria-hidden>
        <div className={s.wrapper}>
          <div className={s.imageWrapper} />
          <div className={s.text}>
            <h3 className={s.heading}>Placeholder</h3>
            <p className={s.excerpt}>
              {getTextExcerpt(
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet iure natus veritatis maxime tempore a earum dolor dicta, repellat quod corrupti minus odit sequi asperiores sapiente exercitationem ducimus laboriosam minima.'
              )}
            </p>
          </div>
        </div>
      </article>
    )
  }

  function renderComponent() {
    if (!post) return

    const { slug, createdAt, imageUrl, title, content } = post
    const createdAtString = createdAt.toISOString()

    return (
      <article className={s.root}>
        <Link className={s.wrapper} href={`/posts/${slug}`}>
          <div className={s.imageWrapper}>
            <Image
              className={s.image}
              src={imageUrl || ''}
              sizes={`(min-width: ${BREAKPOINTS.xl}) 356px, (min-width: ${BREAKPOINTS.md}) 45vw, (min-width: 470px) 432px, 91vw`}
              loading='eager'
              alt=''
              fill
            />
            <time className={s.date} dateTime={createdAtString}>
              {formatDate(createdAtString)}
            </time>
          </div>
          <div className={s.text}>
            <h3 className={s.heading}>{title}</h3>
            <p className={s.excerpt}>{getTextExcerpt(content)}</p>
          </div>
        </Link>
      </article>
    )
  }

  return skeleton ? renderSkeleton() : renderComponent()
}

function getTextExcerpt(content: string) {
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ')
  let excerpt = plainText.trim().slice(0, 170)

  if (plainText.length > 170) {
    excerpt += '...'
  }

  return excerpt || ''
}
