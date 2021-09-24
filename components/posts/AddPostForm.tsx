import { useState } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { useAddPostMutation } from "~/app/services/postApi"
import { PostForm } from "./PostForm"
import { Button } from "../common/Button"
import s from "./AddPostForm.module.scss"

export function AddPostForm() {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [addPost, { isLoading }] = useAddPostMutation()
  const isFormValid: boolean = Boolean(title) && Boolean(content)

  async function handlePostAdding() {
    if (!isFormValid) {
      return
    }

    await addPost({
      id: nanoid(),
      date: new Date().toISOString(),
      image: "/images/cover-7.jpg",
      title: title,
      content: content
    })
    
    setTitle("")
    setContent("")
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
          isDisabled={!isFormValid || isLoading}
          isPending={isLoading}
          onClick={handlePostAdding}
        />
      </form>
    </section>
  )
}
