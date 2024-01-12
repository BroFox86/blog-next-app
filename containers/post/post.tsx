import parse from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Alert } from '~/components/alert'
import { AlertBox } from '~/components/alert-box'
import { Button } from '~/components/button'
import { Editor } from '~/components/editor'
import { Input } from '~/components/input'
import { PostDeletion } from '~/containers/post/post-deletion'
import { PostState, useUpdatePostMutation } from '~/services/post-api'
import { EventFor } from '~/utilities/event-for'
import { formatDate } from '~/utilities/format-date'

import s from './post.module.scss'

export function Post({ post }: { post: PostState }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeletionModalActive, setIsDeletionModalActive] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([])
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const isPending = isUpdating || isDeleting
  const isFormValid: boolean = Boolean(title) && Boolean(content)

  useEffect(() => {
    setTitle(post.title)
    setContent(post.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onTitleChange(e: EventFor<'input', 'onChange'>) {
    setTitle(e.target.value)
  }

  async function handlePostUpdate() {
    if (!isFormValid) return

    try {
      await updatePost({
        id: post.id,
        updatedDate: new Date().toISOString(),
        title,
        content,
      })

      setIsEditMode(false)

      setAlerts(alerts.concat(<Alert variant='success'>This post has been updated.</Alert>))
    } catch (e: any) {
      setAlerts(alerts.concat(<Alert variant='danger'>Error: {e.message}</Alert>))
    }
  }

  function cancelEditing() {
    if (!post) return
    setIsEditMode(false)
    setTitle(post.title)
    setContent(post.content)
  }

  function toggleDeletionModal() {
    setIsDeletionModalActive(!isDeletionModalActive)
  }

  function renderPostBody() {
    if (!post) return

    return (
      <>
        <header>
          <h1 className={s.title}>{title}</h1>
          <p className={s.postInfo}>
            {formatDate(post.date)}{' '}
            <span className={s.updatedDate}>
              {post.updatedDate && `(edited on ${formatDate(post.updatedDate, true)})`}
            </span>{' '}
            by&nbsp;<span className={s.author}>Guest</span>
          </p>
        </header>
        <hr />
        <div className='postBody'>{parse(content)}</div>
        <hr className={s.buttonsDivider} />
        <div className={s.buttons}>
          <Button
            className={s.button}
            label='Edit'
            variant='primary'
            disabled={isPending}
            onClick={() => setIsEditMode(true)}
          />
          <Button
            className={s.button}
            label='Delete'
            variant='primary'
            disabled={isPending}
            onClick={toggleDeletionModal}
          />
        </div>
        <PostDeletion
          isActive={isDeletionModalActive}
          toggleModal={toggleDeletionModal}
          postId={post.id}
          postTitle={title}
          onDelete={setIsDeleting}
          isDeleting={isDeleting}
        />
      </>
    )
  }

  function renderEditingForm() {
    return (
      <form className={s.editForm}>
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
        <div className={s.buttons}>
          <Button
            className={s.button}
            label='Save'
            variant='primary'
            disabled={!isFormValid || isPending}
            pending={isPending}
            onClick={handlePostUpdate}
          />
          <Button className={s.button} label='Cancel' variant='primary' disabled={isPending} onClick={cancelEditing} />
        </div>
      </form>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className={s.imageWrapper}>
        <Image className={s.image} src={post.image} sizes='100vw' alt='' fill priority />
      </div>
      <div className={s.inner}>
        <AlertBox alerts={alerts} hidden={isEditMode} />
        {!isEditMode ? renderPostBody() : renderEditingForm()}
      </div>
    </>
  )
}
