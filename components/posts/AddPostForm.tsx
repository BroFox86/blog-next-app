import { nanoid } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'

import { setdeletionAlert } from '~/app/services/appSlice'
import { useAddPostMutation } from '~/app/services/postApi'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'

import { Alert } from '../common/Alert'
import { Button } from '../common/Button'
import s from './AddPostForm.module.scss'
import { PostForm } from './PostForm'

export function AddPostForm() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [alertMesages, setAlertMessages] = useState<Array<JSX.Element>>([])
  const [addPost, { isLoading }] = useAddPostMutation()
  const isFormValid: boolean = Boolean(title) && Boolean(content)
  const deletionAlert = useAppSelector(state => state.app.deletionAlert)
  const dispatch = useAppDispatch()

  useEffect(() => {
    deletionAlert.isActive &&
      setAlertMessages(
        alertMesages.concat(<Alert variant='warning'>Post &quot;{deletionAlert.title}&quot; has been deleted.</Alert>)
      )
    dispatch(setdeletionAlert({ isActive: false, title: '' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handlePostAdding() {
    if (!isFormValid) {
      return
    }

    try {
      await addPost({
        id: nanoid(),
        date: new Date().toISOString(),
        image: '/images/cover-7.jpg',
        title: title,
        content: content,
      })

      setTitle('')
      setContent('')

      setAlertMessages(alertMesages.concat(<Alert variant='success'>Post &quot;{title}&quot; has been added.</Alert>))
    } catch (e: any) {
      console.log(e.message)
      setAlertMessages(alertMesages.concat(<Alert variant='danger'>Error: Something went wrong...</Alert>))
    }
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Add a New Post</h1>
      {alertMesages.length !== 0 && <div className={s.alertBox}>{alertMesages}</div>}
      <form className={s.form}>
        <PostForm title={title} content={content} setTitle={setTitle} setContent={setContent} />
        <Button
          extraStyles={s.button}
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
}
