import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'

import { Alert, AlertLink } from '~/components/Alert'
import { AlertBox } from '~/components/AlertBox'
import { Button } from '~/components/Button'
import { Editor } from '~/components/Editor'
import { Input } from '~/components/Input'
import { addPostAction } from '~/server/actions'
import { App } from '~/services/App'
import { EventFor } from '~/utilities/EventFor'
import { getCleanText } from '~/utilities/getCleanText'

import s from './PostCreation.module.scss'

export const PostCreation = observer(({ app }: { app: App }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([])
  const isFormValid = Boolean(title) && Boolean(getCleanText(content))
  const deletedPostTitle = app.deletedPostTitle
  const isLoading = false
  const router = useRouter()

  useEffect(() => {
    if (!deletedPostTitle) return

    setAlerts(alerts.concat(<Alert variant='warning'>The post {deletedPostTitle} has been deleted.</Alert>))

    app.setDeletedPostTitle('')
  }, [deletedPostTitle, alerts, app])

  function onTitleChange(e: EventFor<'input', 'onChange'>) {
    setTitle(e.target.value)
  }

  function handlePostAdd() {
    if (!isFormValid) return

    try {
      addPostAction({
        date: new Date().toISOString(),
        image: '/images/cover-7.jpg',
        title: title,
        content: content,
      })

      setTitle('')
      setContent('')

      router.replace('/')

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
    <>
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
          disabled={!isFormValid || isLoading}
          pending={isLoading}
          onClick={handlePostAdd}
        />
      </form>
    </>
  )
})
