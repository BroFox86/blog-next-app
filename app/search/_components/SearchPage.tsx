import { PostSorter } from '@/components/PostSorter'

import s from './SearchPage.module.scss'

export function SearchPage({ query, children }: { query?: string; children: React.ReactNode }) {
  return (
    <section className={s.container}>
      <div className={s.titleWrapper}>
        <h1 className={s.title}>Search results for {query}</h1>
        <PostSorter className={s.postSorter} />
      </div>
      {children}
    </section>
  )
}
