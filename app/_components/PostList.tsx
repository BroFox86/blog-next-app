import { PostListError } from '@/app/_components/PostListError'
import { PostPreview } from '@/components/PostPreview'
import { getAllPostsAction, searchPostAction } from '@/lib/actions'

import s from './PostList.module.scss'

export async function PostList() {
  const result = await getAllPostsAction()

  if (result?.error) {
    return <PostListError />
  }

  const posts = result.posts

  if (!posts?.length) {
    return <p className={s.noPostsMessage}>There are no posts...</p>
  }

  return (
    <div className={s.root}>
      {posts.map(post => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  )
}

export async function PostListQuery({ query }: { query?: string }) {
  if (!query) {
    return <p className={s.noPostsMessage}>No query, no results...</p>
  }

  const result = await searchPostAction(query)

  if (result.error) {
    return <PostListError />
  }

  const posts = result.posts

  if (!posts?.length) {
    return <p className={s.noPostsMessage}>Found 0 matches.</p>
  }

  return (
    <div className={s.root}>
      {posts.map(post => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  )
}

export function PostListSkeleton() {
  return (
    <div className={s.root}>
      {Array.from({ length: 3 }).map((post, index) => (
        <PostPreview key={index} skeleton />
      ))}
    </div>
  )
}
