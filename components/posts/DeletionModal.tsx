import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect } from 'react'

import { useDeletePostMutation } from '~/app/services/postApi'

import { Button } from '../common/Button'
import { Modal } from '../modal/Modal'
import s from './DeletionModal.module.scss'

type Props = {
  isActive: boolean
  toggleModal: MouseEventHandler
  setIsDeleting: Function
  postId: string
}

export function DeletionModal(props: Props) {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  const router = useRouter()

  async function handlePostDeletion() {
    await deletePost(props.postId)
    router.push('/')
  }

  useEffect(() => {
    props.setIsDeleting(isDeleting)
  }, [props, isDeleting])

  return (
    <Modal isActive={props.isActive} toggleModal={props.toggleModal} ariaLabelledby='modalHeading'>
      <h2 className={s.heading} id='modalHeading'>
        Do you want to delete this post?
      </h2>
      <div className={s.buttonWrapper}>
        <Button
          extraStyles={s.buttonWrapper}
          label='Delete'
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
