import { useRouter } from 'next/router'

import { PageNotFound } from '~/components/PageNotFound'
import { Spinner } from '~/components/Spinner'
import { Post } from '~/containers/post/Post'
import { useGetPostQuery } from '~/services/postApi'

import s from './PostWrapper.module.scss'

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
