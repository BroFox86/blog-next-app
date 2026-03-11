import { PostList } from '~/components/PostList'
import { Spinner } from '~/components/Spinner'
import { PostCreation } from '~/containers/home/PostCreation'
import { app } from '~/services/App'
import { useGetAllPostsQuery } from '~/services/postApi'

import s from './Home.module.scss'

export function Home() {
  const { data, isLoading } = useGetAllPostsQuery()
  let posts = data?.posts

  function renderContent() {
    if (isLoading) {
      return <Spinner />
    }

    if (posts && posts.length !== 0) {
      return <PostList posts={posts} />
    }

    if (posts && posts.length === 0) {
      return <p className={s.noPostsMessage}>There are no posts.</p>
    }
  }

  return (
    <>
      <section className={s.container}>
        <h1 className={s.title}>Add a New Post</h1>
        <PostCreation app={app} />
      </section>
      <section className={s.container}>
        <h2 className={s.title}>All Posts</h2>
        {renderContent()}
      </section>
    </>
  )
}
