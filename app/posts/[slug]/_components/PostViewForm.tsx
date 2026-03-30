'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { useAlert } from '@/app/_components/AlertProvider'
import { Button } from '@/components/Button'
import { deletePostAction } from '@/lib/actions'
import type { Post } from '@/lib/generated/prisma/client'
import { setErrorAlert, setRemovePostAlert } from '@/utils/alerts'

import s from './Post.module.scss'
import { PostDeleteModal } from './PostDeleteModal'

type Props = {
  post: Post
}

export function PostViewForm({ post }: Props) {
  const { id, title, slug } = post
  const [isPending, startTransition] = useTransition()
  const { dispatch } = useAlert()
  const router = useRouter()

  async function handleRemove() {
    startTransition(async () => {
      const result = await deletePostAction(id)

      if (result?.error) {
        setErrorAlert(dispatch, 'Error: Unable to remove the post.')
        return
      }

      setRemovePostAlert(dispatch, result.title || '')

      router.push('/')
    })
  }

  return (
    <form className={s.buttons}>
      <Button
        className={s.button}
        as='link'
        href={`/posts/${slug}?edit=true`}
        label='Edit'
        variant='primary'
        pending={isPending}
      />
      <PostDeleteModal postTitle={title} pending={isPending} onRemovePost={handleRemove} />
    </form>
  )
}
