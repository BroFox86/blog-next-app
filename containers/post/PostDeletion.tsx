import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'

import { Button } from '~/components/Button'
import { Modal } from '~/components/modal/Modal'
import { app } from '~/services/App'
import { useDeletePostMutation } from '~/services/postApi'

import s from './PostDeletion.module.scss'

type Props = {
  isActive: boolean
  toggleModal: MouseEventHandler
  postId: string
  postTitle: string
  onDelete: Function
  isDeleting: boolean
}

export const PostDeletion = observer((props: Props) => {
  const [deletePost] = useDeletePostMutation()
  const router = useRouter()

  async function handlePostDeletion() {
    try {
      props.onDelete(true)
      await deletePost(props.postId)
      app.setDeletedPostTitle(props.postTitle)
      router.push('/')
    } catch (e: any) {}
  }

  return (
    <Modal isActive={props.isActive} toggleModal={props.toggleModal} ariaLabelledby='modalHeading'>
      <p className={s.heading} id='modalHeading'>
        Do you want to delete this post?
      </p>
      <div className={s.buttonWrapper}>
        <Button
          label='Confirm'
          variant='danger'
          pending={props.isDeleting}
          disabled={props.isDeleting}
          onClick={handlePostDeletion}
        />
      </div>
    </Modal>
  )
})
