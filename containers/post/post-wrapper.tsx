import { useRouter } from 'next/router'

import { Spinner } from '~/components/spinner'
import { NotFound } from '~/containers/not-found'
import { Post } from '~/containers/post/post'
import { useGetPostQuery } from '~/services/post-api'

import s from './post-wrapper.module.scss'

export function PostWrapper() {
  const router = useRouter()
  const postId = String(router.query.post)
  const { data, isLoading, isError } = useGetPostQuery(postId)
  const post = data?.post

  if (isLoading) {
    return <Spinner className={s.spinner} />
  }

  if (isError) {
    return <em>Something went wrong...</em>
  }

  if (!post) {
    return <NotFound />
  }

  return <Post post={post} />
}
