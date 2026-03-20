'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { Modal } from '@/components/modal/Modal'

import s from './PostDeleteModal.module.scss'

export function PostDeleteModal({ postTitle }: { postTitle: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleToggleModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <Button className={s.button} label='Delete' variant='primary' onClick={handleToggleModal} />
      <Modal open={isModalOpen} variant='small' animation='zoomIn' onClose={handleToggleModal} label='Confirmation'>
        <p className={s.text}>
          <span>
            Do you want to delete <i>{postTitle}</i> ?
          </span>
        </p>
        <div className={s.buttonWrapper}>
          <Button label='Confirm' type='submit' variant='danger' form='delete-post-form' />
        </div>
      </Modal>
    </>
  )
}
