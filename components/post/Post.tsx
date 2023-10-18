import parse from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Alert } from '~/components/common/Alert'
import { AlertBox } from '~/components/common/AlertBox'
import { Button } from '~/components/common/Button'
import { Editor } from '~/components/common/Editor'
import { Input } from '~/components/common/Input'
import { PostDeletion } from '~/components/post/PostDeletion'
import { PostState, useGetAllPostsQuery, useUpdatePostMutation } from '~/services/postApi'
import { formatDate } from '~/utilities/formatDate'
import { showAlert } from '~/utilities/showAlert'

import s from './Post.module.scss'

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

      showAlert(alerts, setAlerts, 'success', 'This post has been updated.')
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
        <h1 className={s.title}>{title}</h1>
        <p className={s.postInfo}>
          {formatDate(post.date)}{' '}
          <span className={s.updatedDate}>
            {post.updatedDate && `(edited on ${formatDate(post.updatedDate, true)})`}
          </span>{' '}
          by&nbsp;<span className={s.author}>Guest</span>
        </p>
        <hr />
        <div className='postBody'>{parse(content)}</div>
        <hr className={s.buttonsDivider} />
        <div className={s.buttons}>
          <Button
            className={s.button}
            label='Edit'
            variant='primary'
            isDisabled={isPending}
            onClick={() => setIsEditMode(true)}
          />
          <Button
            className={s.button}
            label='Delete'
            variant='primary'
            isDisabled={isPending}
            onClick={toggleDeletionModal}
          />
        </div>
        <PostDeletion
          isActive={isDeletionModalActive}
          toggleModal={toggleDeletionModal}
          postId={post.id}
          postTitle={title}
          setIsDeleting={setIsDeleting}
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
          onChange={(e: any) => setTitle(e.target.value)}
          required
        />
        <Editor content={content} setContent={setContent} />
        <div className={s.buttons}>
          <Button
            className={s.button}
            label='Save'
            variant='primary'
            isDisabled={!isFormValid || isPending}
            isPending={isPending}
            onClick={handlePostUpdate}
          />
          <Button
            className={s.button}
            label='Cancel'
            variant='primary'
            isDisabled={isPending}
            onClick={cancelEditing}
          />
        </div>
      </form>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <>
        <div className={s.imageWrapper}>
          <Image className={s.image} src={post.image} sizes='100vw' alt='' fill priority />
        </div>
        <div className={s.inner}>
          <AlertBox alerts={alerts} hidden={isEditMode} />
          {!isEditMode ? renderPostBody() : renderEditingForm()}
        </div>
      </>
    </>
  )
}
