import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect } from 'react'

import { Button } from '~/components/common/Button'
import { Modal } from '~/components/post/Modal'
import { app } from '~/services/app'
import { useDeletePostMutation } from '~/services/postApi'

import s from './PostDeletion.module.scss'

type Props = {
  isActive: boolean
  toggleModal: MouseEventHandler
  setIsDeleting: Function
  postId: string
  postTitle: string
}

export const PostDeletion = observer((props: Props) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  const router = useRouter()

  async function handlePostDeletion() {
    try {
      await deletePost(props.postId)
      app.setDeletedPostTitle(props.postTitle)
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
          label='Confirm'
          variant='danger'
          isPending={isDeleting}
          isDisabled={isDeleting}
          onClick={handlePostDeletion}
        />
      </div>
    </Modal>
  )
})
