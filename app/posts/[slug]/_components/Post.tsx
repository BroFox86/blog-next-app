import Image from 'next/image'

import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'
import { PostEdit } from './PostEdit'
import { PostView } from './PostView'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
  post: Post
}

export function Post({ searchParams, post }: Props) {
  const { edit } = searchParams

  return (
    <>
      <div className={s.imageWrapper}>
        <Image className={s.image} src={post.imageUrl || ''} sizes='100vw' alt='' fill priority />
      </div>
      <div className={s.inner}>{edit === 'true' ? <PostEdit post={post} /> : <PostView post={post} />}</div>
    </>
  )
}
