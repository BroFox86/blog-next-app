import parse from 'html-react-parser'

import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'
import { PostControl } from './PostControl'

export function PostView({ post }: { post: Post }) {
  const { content } = post

  return (
    <>
      <div className={s.postBody}>{parse(content)}</div>
      <PostControl post={post} />
    </>
  )
}
