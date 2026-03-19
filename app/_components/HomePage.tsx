import { Suspense } from 'react'

import { AlertBox } from '@/app/_components/AlertBox'
import { PostList } from '@/app/_components/PostList'
import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import { addPostAction } from '@/lib/actions'

import s from './HomePage.module.scss'

export async function HomePage() {
  return (
    <>
      <section className={s.container}>
        <h1 className={s.title}>Add a New Post</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <AlertBox />
        </Suspense>
        <form className={s.form} action={addPostAction}>
          <Input label='Post title' name='title' autoComplete='off' placeholder='' maxLength={100} required />
          <Editor />
          <Button className={s.button} type='submit' label='Add Post' variant='primary' />
        </form>
      </section>
      <section className={s.container}>
        <h2 className={s.title}>All Posts</h2>
        <Suspense fallback={<PostList skeleton />}>
          <PostList />
        </Suspense>
      </section>
    </>
  )
}
