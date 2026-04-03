import parse from 'html-react-parser'

import type { Post } from '@/lib/generated/prisma/client'
import { formatDate } from '@/utils/format'

import s from './Post.module.scss'
import { PostViewForm } from './PostViewForm'

type Props = {
  post: Post
}

export function PostView({ post }: Props) {
  const { title, content, createdAt, updatedAt } = post
  const createdAtIso = createdAt.toISOString()
  const updatedAtIso = updatedAt.toISOString()
  const isEdited = updatedAt.getTime() > createdAt.getTime()

  return (
    <>
      <header>
        <h1 className={s.title}>{title}</h1>
        <p className={s.postInfo}>
          {formatDate(createdAtIso)}{' '}
          <span className={s.updatedAt}>{isEdited && `(edited on ${formatDate(updatedAtIso)})`}</span> by{' '}
          <span className={s.author}>Guest</span>
        </p>
      </header>
      <div className={s.postBody}>{parse(content)}</div>
      <PostViewForm post={post} />
    </>
  )
}
