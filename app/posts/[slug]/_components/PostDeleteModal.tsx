'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { Modal } from '@/components/modal/Modal'

import s from './PostDeleteModal.module.scss'

export function PostDeleteModal({
  postTitle,
  pending,
  onRemovePost
}: {
  postTitle: string
  pending: boolean
  onRemovePost: React.MouseEventHandler
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleToggleModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <Button className={s.button} label='Delete' variant='primary' onClick={handleToggleModal} pending={pending} />
      <Modal open={isModalOpen} variant='small' animation='zoomIn' onClose={handleToggleModal} label='Confirmation'>
        <p className={s.text}>
          <span>Delete {postTitle}?</span>
        </p>
        <div className={s.buttonWrapper}>
          <Button label='Confirm' variant='danger' pending={pending} onClick={onRemovePost} />
        </div>
      </Modal>
    </>
  )
}
