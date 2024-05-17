import { PostList } from '~/components/post-list'
import { Spinner } from '~/components/spinner'
import { PostCreation } from '~/containers/home/post-creation'
import { app } from '~/services/app'
import { useGetAllPostsQuery } from '~/services/post-api'

import s from './home.module.scss'

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
