import { useRouter } from 'next/router'

import { Spinner } from '~/components/Spinner'
import { NotFound } from '~/containers/NotFound'
import { Post } from '~/containers/post/Post'
import { getPostAction } from '~/server/actions'

import s from './PostWrapper.module.scss'

export function PostWrapper() {
  const router = useRouter()
  const postId = String(router.query.post)
  const post = getPostAction(postId)

  // if (isLoading) {
  //   return <Spinner className={s.spinner} />
  // }

  // if (isError) {
  //   return <em>Something went wrong...</em>
  // }

  if (!post) {
    return <NotFound />
  }

  return <Post post={post} />
}
