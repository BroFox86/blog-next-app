import { nanoid } from '@reduxjs/toolkit'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import React from 'react'

import { App } from '~/app/services/app'
import { useAddPostMutation } from '~/app/services/postApi'
import { Alert } from '~/components/common/Alert'
import { AlertLink } from '~/components/common/Alert'
import { Button } from '~/components/common/Button'
import { Editor } from '~/components/common/Editor'
import { Input } from '~/components/common/Input'

import s from './AddPostForm.module.scss'

type Props = {
  app: App
}

export const AddPostForm = observer(({ app }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [alertMesages, setAlertMessages] = useState<Array<JSX.Element>>([])
  const [addPost, { isLoading }] = useAddPostMutation()
  const isFormValid: boolean = Boolean(title) && Boolean(content)
  const deletionAlert = app.deletionAlert

  useEffect(() => {
    deletionAlert &&
      setAlertMessages(
        alertMesages.concat(<Alert variant='warning'>Post &quot;{deletionAlert}&quot; has been deleted.</Alert>)
      )
    app.deletionAlert = ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handlePostAdding() {
    if (!isFormValid) {
      return
    }

    try {
      const postId = nanoid()

      await addPost({
        id: postId,
        date: new Date().toISOString(),
        image: '/images/cover-7.jpg',
        title: title,
        content: content,
      })

      setTitle('')
      setContent('')

      setAlertMessages(
        alertMesages.concat(
          <Alert variant='success'>
            <span>
              Post <AlertLink href={`/posts/${postId}`}>{title}</AlertLink> has been added.
            </span>
          </Alert>
        )
      )
    } catch (e: any) {
      console.log(e.message)
      setAlertMessages(alertMesages.concat(<Alert variant='danger'>Error: Something went wrong...</Alert>))
    }
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Add a New Post</h1>
      {alertMesages.length !== 0 && (
        <div className={s.alertBox}>
          {alertMesages.map((item, index) => {
            return <React.Fragment key={index}>{item}</React.Fragment>
          })}
        </div>
      )}
      <form className={s.form}>
        <Input
          label='Post title'
          name='titleInput'
          autoComplete='off'
          placeholder=''
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          required
        />
        <Editor content={content} setContent={setContent} />
        <Button
          className={s.button}
          label='Add Post'
          variant='primary'
          type='button'
          isDisabled={!isFormValid || isLoading}
          isPending={isLoading}
          onClick={handlePostAdding}
        />
      </form>
    </section>
  )
})
