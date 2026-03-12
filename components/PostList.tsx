import { PostState } from '~/services/PostApi'

import s from './PostList.module.scss'
import { PostPreview } from './PostPreview'

export function PostList({ posts }: { posts: PostState[] }) {
  // Sort items
  // const sortedPosts = posts.slice().sort((a, b) => {
  //   return b.date.localeCompare(a.date)
  // })

  const sortedPosts = posts

  return (
    <div className={s.postList}>
      {sortedPosts.map((post, index) => (
        <PostPreview key={index} {...post} />
      ))}
    </div>
  )
}
