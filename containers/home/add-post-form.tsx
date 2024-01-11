import { nanoid } from '@reduxjs/toolkit'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import React from 'react'

import { Alert, AlertLink } from '~/components/alert'
import { AlertBox } from '~/components/alert-box'
import { Button } from '~/components/button'
import { Editor } from '~/components/editor'
import { Input } from '~/components/input'
import { App } from '~/services/app'
import { useAddPostMutation } from '~/services/post-api'
import { EventFor } from '~/utilities/event-for'

import s from './add-post-form.module.scss'

export const AddPostForm = observer(({ app }: { app: App }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([])
  const [addPost, { isLoading }] = useAddPostMutation()
  const isFormValid: boolean = Boolean(title) && Boolean(content)
  const deletedPostTitle = app.deletedPostTitle

  useEffect(() => {
    if (!deletedPostTitle) return

    setAlerts(alerts.concat(<Alert variant='warning'>The post {deletedPostTitle} has been deleted.</Alert>))

    app.setDeletedPostTitle('')
  }, [deletedPostTitle, alerts, app])

  function onTitleChange(e: EventFor<'input', 'onChange'>) {
    setTitle(e.target.value)
  }

  async function handlePostAdd() {
    if (!isFormValid) return

    try {
      const postId = `${title}-${nanoid()}`

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
          </Alert>,
        ),
      )
    } catch (e: any) {
      setAlerts(alerts.concat(<Alert variant='danger'>Error: {e.message}</Alert>))
    }
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Add a New Post</h1>
      <AlertBox alerts={alerts} />
      <form className={s.form}>
        <Input
          label='Post title'
          name='titleInput'
          autoComplete='off'
          placeholder=''
          value={title}
          onChange={onTitleChange}
          required
        />
        <Editor content={content} setContent={setContent} />
        <Button
          className={s.button}
          label='Add Post'
          variant='primary'
          isDisabled={!isFormValid || isLoading}
          isPending={isLoading}
          onClick={handlePostAdd}
        />
      </form>
    </section>
  )
})
