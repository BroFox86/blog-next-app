import Image from 'next/image'

import { AlertBox } from '@/app/_components/AlertBox'
import { deletePostAction } from '@/lib/actions'
import { updatePostAction } from '@/lib/actions'
import type { Post } from '@/lib/db'

import s from './Post.module.scss'
import { PostEdit } from './PostEdit'
import { PostView } from './PostView'

type Props = {
  slug: string
  searchParams: { [key: string]: string | string[] | undefined }
  post: Post
}

export function Post({ slug, searchParams, post }: Props) {
  const { edit } = searchParams
  const handleDeletePost = deletePostAction.bind(null, slug)
  const handleUpdatePost = updatePostAction.bind(null, slug)

  return (
    <>
      <div className={s.imageWrapper}>
        <Image className={s.image} src={post.image} sizes='100vw' alt='' fill priority />
      </div>
      <div className={s.inner}>
        <AlertBox />
        {edit === 'true' ? PostEdit({ slug, post, handleUpdatePost }) : PostView({ slug, post, handleDeletePost })}
      </div>
    </>
  )
}
