import { Suspense } from 'react'

import { PostList, PostListSkeleton } from '@/app/_components/PostList'

import s from './HomePage.module.scss'
import { HomePostForm } from './HomePostForm'

export async function HomePage() {
  return (
    <>
      <section className={s.container}>
        <h1 className={s.title}>Add a New Post</h1>
        <HomePostForm />
      </section>
      <section className={s.container}>
        <h2 className={s.title}>All Posts</h2>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </section>
    </>
  )
}
