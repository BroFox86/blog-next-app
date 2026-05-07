import parse from 'html-react-parser'

import { PostControl } from '@/app/posts/[slug]/_components/PostControl'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'

export function PostView({ post }: { post: Post }) {
  const { content } = post
  const cleanContent = content.replaceAll('\u00A0', ' ')
  const parsedContent = parse(cleanContent)

  return (
    <>
      <div className={s.postBody}>{parsedContent}</div>
      <PostControl post={post} />
    </>
  )
}
