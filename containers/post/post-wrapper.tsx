import { useRouter } from 'next/router'

import { PageNotFound } from '~/components/page-not-found'
import { Spinner } from '~/components/spinner'
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
    return <PageNotFound />
  }

  return <Post post={post} />
}
