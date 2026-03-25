import { getAllPostsAction } from '@/app/actions'
import { searchPostAction } from '@/app/search/actions'
import { PostPreview } from '@/components/PostPreview'

import s from './PostList.module.scss'

type Props = {
  searchResults?: boolean
  query?: string
}

export async function PostList({ query, searchResults }: Props) {
  let posts

  if (searchResults && query) {
    posts = await searchPostAction(query)
  } else {
    posts = await getAllPostsAction()
  }

  if (!posts || posts.length === 0) {
    return <p className={s.noPostsMessage}>{query ? 'Found 0 matches.' : 'There are no posts...'}</p>
  }

  if (searchResults && !query) {
    return <p className={s.noPostsMessage}>No query, no results...</p>
  }

  return (
    <div className={s.root}>
      {posts.map((post, index) => (
        <PostPreview key={index} post={post} />
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
