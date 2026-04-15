import parse from 'html-react-parser'

import { PostControl } from '@/app/posts/[slug]/_components/PostControl'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'

export function PostView({ post }: { post: Post }) {
  const { content } = post

  return (
    <>
      <div className={s.postBody}>{parse(content)}</div>
      <PostControl post={post} />
    </>
  )
}
