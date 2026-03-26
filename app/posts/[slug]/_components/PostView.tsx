import parse from 'html-react-parser'

import type { Post } from '@/lib/generated/prisma/client'
import { formatDate } from '@/utils/format'

import s from './Post.module.scss'
import { PostViewForm } from './PostViewForm'

type Props = {
  post: Post
}

export function PostView({ post }: Props) {
  const { title, content, createdAt } = post
  const createdAtString = createdAt.toISOString()
  // const updatedAtString = updatedAt.toISOString()

  return (
    <>
      <header>
        <h1 className={s.title}>{title}</h1>
        <p className={s.postInfo}>
          {formatDate(createdAtString)}{' '}
          {/* <span className={s.updatedAt}>{updatedAt && `(edited on ${formatDate(updatedAtString, true)})`}</span> by&nbsp; */}
          {/* <span className={s.author}>Guest</span> */}
        </p>
      </header>
      <hr />
      <div className='postBody'>{parse(content)}</div>
      <hr />
      <PostViewForm post={post} />
    </>
  )
}
