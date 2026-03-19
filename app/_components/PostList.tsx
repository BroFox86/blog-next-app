import { PostPreview } from '@/components/PostPreview'
import { wait } from '@/lib/actions'
import { db } from '@/lib/db'

import s from './PostList.module.scss'

type Props = {
  skeleton?: boolean
  searchResults?: boolean
  query?: string
}

export async function PostList({ skeleton, query, searchResults }: Props) {
  let posts

  if (skeleton) {
    return (
      <div className={s.root}>
        {Array.from({ length: 3 }).map((post, index) => (
          <PostPreview key={index} skeleton />
        ))}
      </div>
    )
  }

  if (searchResults && query) {
    await wait()
    posts = await db.searchPosts(query)
  } else {
    await wait()
    posts = await db.getAllPosts()
  }

  if (posts.length === 0) {
    return <p className={s.noPostsMessage}>{query ? 'Found 0 matches.' : 'There are no posts...'}</p>
  }

  if (searchResults && !query) {
    return <p className={s.noPostsMessage}>No query, no results...</p>
  }

  const sortedPosts = posts.slice().sort((a, b) => {
    return b.date.localeCompare(a.date)
  })

  return (
    <div className={s.root}>
      {sortedPosts.map((post, index) => (
        <PostPreview key={index} post={post} />
      ))}
    </div>
  )
}
