import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect } from 'react'

import { setdeletionAlert } from '~/app/services/appSlice'
import { useDeletePostMutation } from '~/app/services/postApi'
import { useAppDispatch } from '~/hooks/redux'

import { Button } from '../common/Button'
import { Modal } from '../modal/Modal'
import s from './DeletionModal.module.scss'

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
      dispatch(setdeletionAlert({ isActive: true, title: props.postTitle }))
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
          extraStyles={s.buttonWrapper}
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
