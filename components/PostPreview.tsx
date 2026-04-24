import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/lib/generated/prisma/client'
import { BREAKPOINTS } from '@/utils/constants'
import { formatDate, getTextExcerpt } from '@/utils/format'

import s from './PostPreview.module.scss'

export function PostPreview({ post, skeleton }: { post?: Post; skeleton?: boolean }) {
  function renderSkeleton() {
    return (
      <article className={clsx(s.root, s.isSkeleton)} aria-hidden>
        <div className={s.wrapper}>
          <div className={s.imageWrapper} />
          <div className={s.text}>
            <h3 className={s.heading}>Placeholder</h3>
            <p className={s.excerpt} />
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
              sizes={`
                 (min-width: ${BREAKPOINTS.xl}) 356px, 
                 (min-width: ${BREAKPOINTS.lg}) 30vw,
                 (min-width: 674px) 44vw, 91vw`}
              loading='lazy'
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
