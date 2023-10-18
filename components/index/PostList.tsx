import { Spinner } from '~/components/common/Spinner'
import { useGetAllPostsQuery } from '~/services/postApi'

import s from './PostList.module.scss'
import { PostPreview } from './PostPreview'

export function PostList() {
  const { data, isLoading } = useGetAllPostsQuery()

  function renderResult() {
    const posts = data?.posts

    if (!posts) return

    if (posts.length === 0) {
      return <p className={s.noPostsMessage}>You have no posts...</p>
    }

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

  return (
    <section className={s.container}>
      <h2 className={s.title}>Your Posts</h2>
      {isLoading ? <Spinner /> : renderResult()}
    </section>
  )
}
