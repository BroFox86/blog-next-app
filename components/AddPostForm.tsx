import { nanoid } from '@reduxjs/toolkit'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import React from 'react'

import { Alert } from '~/components/common/Alert'
import { AlertLink } from '~/components/common/Alert'
import { Button } from '~/components/common/Button'
import { Editor } from '~/components/common/Editor'
import { Input } from '~/components/common/Input'
import { App } from '~/services/app'
import { useAddPostMutation } from '~/services/postApi'

import s from './AddPostForm.module.scss'

export const AddPostForm = observer(({ app }: { app: App }) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([])
  const [addPost, { isLoading }] = useAddPostMutation()
  const isFormValid: boolean = Boolean(title) && Boolean(content)
  const deletedPostTitle = app.deletedPostTitle

  useEffect(() => {
    if (!deletedPostTitle) return

    setAlerts(alerts.concat(<Alert variant='warning'>The post &quot;{deletedPostTitle}&quot; has been deleted.</Alert>))

    app.setDeletedPostTitle('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handlePostAdding() {
    if (!isFormValid) return

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

      setAlerts(
        alerts.concat(
          <Alert variant='success'>
            <>
              The post <AlertLink href={`/posts/${postId}`}>{title}</AlertLink> has been added.
            </>
          </Alert>
        )
      )
    } catch (e: any) {
      setAlerts(alerts.concat(<Alert variant='danger'>Error: {e.message}</Alert>))
    }
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Add a New Post</h1>
      {alerts.length !== 0 && (
        <div className={s.alertBox}>
          {alerts.map((item, index) => {
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
          isDisabled={!isFormValid || isLoading}
          isPending={isLoading}
          onClick={handlePostAdding}
        />
      </form>
    </section>
  )
})
