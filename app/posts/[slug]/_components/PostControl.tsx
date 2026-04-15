'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/Button'
import { Modal } from '@/components/modal/Modal'
import { deletePostAction } from '@/lib/actions'
import type { Post } from '@/lib/generated/prisma/client'
import { useNotify } from '@/utils/useNotify'

import s from './Post.module.scss'

export function PostControl({ post }: { post: Post }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { id, title, slug } = post
  const notify = useNotify()
  const router = useRouter()

  function handleToggleModal() {
    setIsModalOpen(!isModalOpen)
  }

  async function handleRemove() {
    startTransition(async () => {
      const result = await deletePostAction(id)

      if (result?.error) {
        notify.error('Error: Unable to remove the post.')
        return
      }

      notify.removePost(result.title || '')

      router.push('/')
    })
  }

  return (
    <>
      <div className={s.controlButtons}>
        <Button as='link' href={`/posts/${slug}?edit=true`} label='Edit' variant='primary' pending={isPending} />
        <Button label='Delete' variant='primary' onClick={handleToggleModal} pending={isPending} />
      </div>
      <Modal open={isModalOpen} variant='small' animation='zoomIn' onClose={handleToggleModal} label='Confirmation'>
        <p className={s.deleteText}>
          <span>Delete {title}?</span>
        </p>
        <Button label='Confirm' variant='danger' justify='center' pending={isPending} onClick={handleRemove} />
      </Modal>
    </>
  )
}
