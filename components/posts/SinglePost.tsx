import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"
import { unwrapResult } from "@reduxjs/toolkit"
import { useAppSelector, useAppDispatch } from "~/hooks/redux"
import { PostState, deletePost, editPost, selectPostById } from "./postsSlice"
import parse from "html-react-parser"
import { useScrollLock } from "~/utilities/useScrollLock"
import { PostForm } from "./PostForm"
import { Button } from "../common/Button"
import { DeletionModal } from "./DeletionModal"
import { Spinner } from "../common/Spinner"
import s from "./SinglePost.module.scss"

export function SinglePost() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [isModalActive, setIsModalActive] = useState<boolean>(false)

  const router = useRouter()
  const postId = String(router.query.postId)
  const post: PostState | undefined = useAppSelector(state => selectPostById(state, postId))
  const postsStatus = useAppSelector((state) => state.posts.status)
  const isStatusPending = postsStatus === "pending" ? true : false
  const isFormValid: boolean = Boolean(title) && Boolean(content)
  const dispatch = useAppDispatch()

  useScrollLock("isFixedByModal", isModalActive)

  function toggleModal() {
    setIsModalActive(isModalActive ? false : true)
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  async function handlePostEditing() {

    if (!isFormValid) return

    try {
      const resultAction = await dispatch(editPost({ id: postId, title, content }))
      unwrapResult(resultAction)
      setIsEditMode(false)

    } catch (error: any) {
      alert(error.message)
    }
  }

  function handleCancelEditing() {
    if (!post) return

    setIsEditMode(false)
    setTitle(post.title)
    setContent(post.content)
  }

  if (!post) {
    return (
      <div className={s.inner}>
        <Spinner extraStyles={s.spinner} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <>
        <div className={s.image}>
          <Image
            src={post.image}
            sizes="100vw"
            layout="fill"
            objectFit="cover"
            priority={true}
            alt=""
          />
        </div>
        <div className={s.inner}>
          {!isEditMode ? (
            <>
              <h1 className={s.title}>
                {title}
              </h1>
              <p className={s.postInfo}>
                {post.date}{" "}<span className={s.editedDate}>{post.editedDate && `(edited on ${post.editedDate})`}</span> by&nbsp;<span className={s.author}>Guest</span>
              </p>
              <hr />
              <div className="postBody">
                {parse(content)}
              </div>
              <hr className={s.buttonsDivider} />
              <div className={s.buttons}>
                <Button
                  extraStyles={s.button}
                  label="Edit"
                  variant="primary"
                  type="button"
                  isDisabled={isStatusPending}
                  onClick={() => setIsEditMode(true)}
                />
                <Button
                  extraStyles={s.button}
                  label="Delete"
                  variant="primary"
                  type="button"
                  isDisabled={isStatusPending}
                  onClick={toggleModal}
                />
              </div>
              <DeletionModal 
                isActive={isModalActive} 
                toggleModal={toggleModal} 
                postId={postId}
              />
            </>
          ) : (
            <form className={s.editForm}>
              <PostForm
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
              />
              <div className={s.buttons}>
                <Button
                  extraStyles={s.button}
                  label="Save"
                  variant="primary"
                  type="button"
                  isDisabled={!isFormValid || isStatusPending}
                  isPending={isStatusPending}
                  onClick={handlePostEditing}
                />
                <Button
                  extraStyles={s.button}
                  label="Cancel"
                  variant="primary"
                  type="button"
                  isDisabled={isStatusPending}
                  onClick={handleCancelEditing}
                />
              </div>
            </form>
          )}
        </div>
      </>
    </>
  )
}
