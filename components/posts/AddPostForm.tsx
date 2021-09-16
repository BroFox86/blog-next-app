import { useState } from "react"
import { unwrapResult } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { addPost } from "./postsSlice"
import { PostForm } from "./PostForm"
import { Button } from "../common/Button"
import s from "./AddPostForm.module.scss"

export function AddPostForm() {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const dispatch = useAppDispatch()
  const postsStatus = useAppSelector((state) => state.posts.status)
  const isStatusPending = postsStatus === "update" ? true : false
  const isFormValid: boolean = Boolean(title) && Boolean(content)

  async function handlePostAdding() {
    if (isFormValid) {
      try {
        const resultAction = await dispatch(addPost({
          title: title,
          content: content
        }))
        unwrapResult(resultAction)
        setTitle("")
        setContent("")
        
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Add a New Post</h1>
      <form className={s.form}>
        <PostForm
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
        <Button
          extraStyles={s.button}
          label="Add Post"
          variant="primary"
          type="button"
          isDisabled={!isFormValid || isStatusPending}
          isPending={isStatusPending}
          onClick={handlePostAdding}
        />
      </form>
    </section>
  )
}
