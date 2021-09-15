import { MouseEventHandler } from "react"
import { useRouter } from "next/router"
import { unwrapResult } from "@reduxjs/toolkit"
import { useAppSelector, useAppDispatch} from "~/hooks/redux"
import { deletePost } from "./postsSlice"
import { Modal } from "../modal/Modal"
import { Button } from "../common/Button"
import s from "./DeletionModal.module.scss"

interface Props {
  isActive: boolean,
  toggleModal: MouseEventHandler,
  postId: string
}

export function DeletionModal(props: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const postsStatus = useAppSelector((state) => state.posts.status)
  const isStatusPending = postsStatus === "update-database" ? true : false

  async function handlePostDeletion() {
    try {
      const resultAction = await dispatch(deletePost(props.postId)) 

      unwrapResult(resultAction)

      router.push("/")

    } catch (error: any) {

      alert(error.message)
    }
  }

  return (
    <Modal
      isActive={props.isActive}
      toggleModal={props.toggleModal}
      ariaLabelledby="modalHeading"
    >
      <h2 className={s.heading} id="modalHeading">
        Do you want to delete this post?
      </h2>
      <div className={s.buttonWrapper}>
        <Button
          extraStyles={s.buttonWrapper}
          label="Delete"
          variant="danger"
          type="button"
          isPending={isStatusPending}
          isDisabled={isStatusPending}
          onClick={handlePostDeletion}
        />
      </div>
    </Modal>
  )
}
