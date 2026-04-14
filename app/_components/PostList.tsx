import { LoadMoreButton } from '@/app/_components/LoadMoreButton'
import { PostListError } from '@/app/_components/PostListError'
import { PostPreview } from '@/components/PostPreview'
import { getAllPostsAction, searchPostAction } from '@/lib/actions'
import type { Post } from '@/lib/generated/prisma/client'
import { POST_LIST_INCREMENT, POST_LIST_LIMIT } from '@/utils/constants'

import s from './PostList.module.scss'

export async function PostList({ sort, limit = POST_LIST_LIMIT.toString() }: { sort?: string; limit?: string }) {
  const currentLimit = +limit
  const result = await getAllPostsAction({ sort, limit: currentLimit + 1 })

  if (result?.error) return <PostListError />

  const posts = result.posts

  if (!posts?.length) {
    return <p className={s.noPostsMessage}>There are no posts...</p>
  }

  const hasMore = posts.length > currentLimit
  const visiblePosts = posts.slice(0, currentLimit)

  return <PostListMarkup posts={visiblePosts} hasMore={hasMore} limit={currentLimit} />
}

export async function PostListQuery({
  query,
  sort,
  limit = POST_LIST_LIMIT.toString()
}: {
  query?: string
  sort?: string
  limit?: string
}) {
  const currentLimit = +limit

  if (!query) {
    return <p className={s.noPostsMessage}>No query, no results...</p>
  }

  const result = await searchPostAction({ query, sort, limit: currentLimit + 1 })

  if (result.error) return <PostListError />

  const posts = result.posts

  if (!posts?.length) {
    return <p className={s.noPostsMessage}>Found 0 matches.</p>
  }

  const hasMore = posts.length > currentLimit
  const visiblePosts = posts.slice(0, currentLimit)

  return <PostListMarkup posts={visiblePosts} hasMore={hasMore} limit={currentLimit} />
}

function PostListMarkup({ posts, hasMore, limit }: { posts: Post[]; hasMore: boolean; limit: number }) {
  return (
    <>
      <div className={s.root}>
        {posts.map(post => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className={s.loadMoreWrapper}>
          <LoadMoreButton nextLimit={limit + POST_LIST_INCREMENT} />
        </div>
      )}
    </>
  )
}
