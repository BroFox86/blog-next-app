import { PostEdit } from '@/app/posts/[slug]/_components/PostEdit'
import { PostView } from '@/app/posts/[slug]/_components/PostView'
import { PostHero } from '@/components/PostHero'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'

export function Post({ searchParams, post }: { searchParams: { edit: string }; post: Post }) {
  const { edit } = searchParams

  return (
    <>
      <PostHero post={post} />
      <div className={s.root}>{edit === 'true' ? <PostEdit post={post} /> : <PostView post={post} />}</div>
    </>
  )
}
