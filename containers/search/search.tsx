import { useRouter } from 'next/router'

import { PostList } from '~/components/post-list'
import { Spinner } from '~/components/spinner'
import { useSearchPostQuery } from '~/services/post-api'

import s from './search.module.scss'

export function Search() {
  const router = useRouter()
  const { query }: any = router.query
  const { data, isLoading } = useSearchPostQuery(query)
  const posts = data?.posts

  function renderContent() {
    if (isLoading) {
      return <Spinner />
    }

    if (query === '' || !query) {
      return <p className={s.noPostsMessage}>No query, no results.</p>
    }

    if (posts && posts.length !== 0) {
      return <PostList posts={posts} />
    }

    if (posts && posts.length === 0) {
      return <p className={s.noPostsMessage}>Found 0 matches.</p>
    }
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Search results {query && 'for ' + query}</h1>
      {renderContent()}
    </section>
  )
}
