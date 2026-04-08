import clsx from 'clsx'
import { Suspense } from 'react'

import { PostList, PostListSkeleton } from '@/app/_components/PostList'
import { PostSorter } from '@/components/PostSorter'

import s from './HomePage.module.scss'
import { HomePostForm } from './HomePostForm'

type Props = {
  sort: string
}

export async function HomePage({ sort }: Props) {
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
        <Suspense key={sort} fallback={<PostListSkeleton />}>
          <PostList sort={sort} />
        </Suspense>
      </section>
    </>
  )
}
