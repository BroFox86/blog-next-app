'use client'

import { useRouter } from 'next/navigation'

import { useAlert } from '@/app/_components/AlertProvider'
import { deletePostAction } from '@/app/posts/[slug]/actions'
import { Button } from '@/components/Button'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'
import { PostDeleteModal } from './PostDeleteModal'

type Props = {
  post: Post
}

export function PostViewForm({ post }: Props) {
  const { id, title, slug } = post
  const { dispatch } = useAlert()
  const router = useRouter()

  async function formAction() {
    const handleFormAction = deletePostAction.bind(null, id)
    const alertData = await handleFormAction()

    if (!alertData) return

    dispatch({ type: 'ADD_ALERT', payload: alertData })

    if (alertData.type === 'error') {
      return
    }

    router.push('/')
  }

  return (
    <form className={s.buttons} action={formAction} id='delete-post-form'>
      <Button className={s.button} as='link' href={`/posts/${slug}?edit=true`} label='Edit' variant='primary' />
      <PostDeleteModal postTitle={title} />
    </form>
  )
}
