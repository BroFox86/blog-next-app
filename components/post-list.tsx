import { PostState } from '~/services/post-api'

import s from './post-list.module.scss'
import { PostPreview } from './post-preview'

export function PostList({ posts }: { posts: PostState[] }) {
  // Sort items
  const sortedPosts = posts.slice().sort((a, b) => {
    return b.date.localeCompare(a.date)
  })

  return (
    <div className={s.postList}>
      {sortedPosts.map((post, index) => (
        <PostPreview key={index} {...post} />
      ))}
    </div>
  )
}
