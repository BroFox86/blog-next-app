import parse from 'html-react-parser'

import { PostControl } from '@/app/posts/[slug]/_components/PostControl'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'

export function PostView({ post }: { post: Post }) {
  const { content } = post
  const cleanContent = content.replace(/\u00A0/g, ' ')
  const parsedContent = parse(cleanContent)

  return (
    <>
      <div className={s.postBody}>{parsedContent}</div>
      <PostControl post={post} />
    </>
  )
}
