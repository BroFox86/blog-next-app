import { PostHero } from '@/components/PostHero'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'
import { PostEdit } from './PostEdit'
import { PostView } from './PostView'

export function Post({ searchParams, post }: { searchParams: { edit: string }; post: Post }) {
  const { edit } = searchParams

  return (
    <>
      <PostHero post={post} />
      <div className={s.inner}>{edit === 'true' ? <PostEdit post={post} /> : <PostView post={post} />}</div>
    </>
  )
}
