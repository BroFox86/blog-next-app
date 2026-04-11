import Image from 'next/image'

import type { Post } from '@/lib/generated/prisma/client'
import { formatDate } from '@/utils/format'

import s from './PostHero.module.scss'

export function PostHero({ post }: { post: Post }) {
  const { title, imageUrl, createdAt, updatedAt } = post
  const createdAtIso = createdAt.toISOString()
  const updatedAtIso = updatedAt.toISOString()
  const isEdited = updatedAt.getTime() > createdAt.getTime()

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <header className={s.container}>
          <div className={s.content}>
            <h1 className={s.title}>{title}</h1>
            <p className={s.postInfo}>
              <span className={s.date}>
                {formatDate(createdAtIso)}
                {isEdited && <span className={s.updatedAt}> {`(edited on ${formatDate(updatedAtIso)})`}</span>}
              </span>{' '}
              by <span className={s.author}>Guest</span>
            </p>
          </div>
        </header>
        <div className={s.imageWrapper}>
          <Image className={s.image} src={imageUrl || ''} sizes='100vw' alt='' fill priority />
        </div>
      </div>
    </div>
  )
}
