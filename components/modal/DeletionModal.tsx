import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect } from 'react'

import { setDeletionAlert } from '~/app/services/appSlice'
import { useDeletePostMutation } from '~/app/services/postApi'
import { Button } from '~/components/common/Button'
import { useAppDispatch } from '~/hooks/redux'

import s from './DeletionModal.module.scss'
import { Modal } from './Modal'

type Props = {
  isActive: boolean
  toggleModal: MouseEventHandler
  setIsDeleting: Function
  postId: string
  postTitle: string
}

export function DeletionModal(props: Props) {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  async function handlePostDeletion() {
    try {
      await deletePost(props.postId)
      dispatch(setDeletionAlert({ isActive: true, title: props.postTitle }))
      router.push('/')
    } catch (e: any) {}
  }

  useEffect(() => {
    props.setIsDeleting(isDeleting)
  }, [props, isDeleting])

  return (
    <Modal isActive={props.isActive} toggleModal={props.toggleModal} ariaLabelledby='modalHeading'>
      <p className={s.heading} id='modalHeading'>
        Do you want to delete this post?
      </p>
      <div className={s.buttonWrapper}>
        <Button
          className={s.buttonWrapper}
          label='Confirm'
          variant='danger'
          type='button'
          isPending={isDeleting}
          isDisabled={isDeleting}
          onClick={handlePostDeletion}
        />
      </div>
    </Modal>
  )
}
