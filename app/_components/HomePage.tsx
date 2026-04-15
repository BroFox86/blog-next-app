import clsx from 'clsx'
import { Suspense } from 'react'

import { PostSorter } from '@/components/PostSorter'
import { PostList } from '@/shared/PostList'
import { PostListSkeleton } from '@/shared/PostListSkeleton'

import s from './HomePage.module.scss'
import { HomePostForm } from './HomePostForm'

export async function HomePage({ sort, limit }: { sort: string; limit: string }) {
  return (
    <>
      <section className={s.container}>
        <h1 className={s.title}>Add a New Post</h1>
        <HomePostForm />
      </section>
      <section className={s.container}>
        <div className={s.titleWrapper}>
          <h2 className={clsx(s.title, s.hasNoMargin)}>All Posts</h2>
          <PostSorter className={s.postSorter} />
        </div>
        <Suspense key={sort} fallback={<PostListSkeleton limit={limit} />}>
          <PostList sort={sort} limit={limit} />
        </Suspense>
      </section>
    </>
  )
}
