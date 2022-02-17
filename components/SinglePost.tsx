import parse from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Alert } from '~/components/common/Alert'
import { Button } from '~/components/common/Button'
import { Editor } from '~/components/common/Editor'
import { Input } from '~/components/common/Input'
import { Spinner } from '~/components/common/Spinner'
import { DeletionModal } from '~/components/modal/DeletionModal'
import { app } from '~/services/app'
import { useGetAllPostsQuery, useGetPostQuery, useUpdatePostMutation } from '~/services/postApi'
import { formatDate } from '~/utilities/formatDate'

import s from './SinglePost.module.scss'

export function SinglePost() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([])

  const router = useRouter()
  const postId = String(router.query.postId)
  const { data, isLoading } = useGetPostQuery(postId)
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const isPending = isUpdating || isDeleting
  const post = data?.post
  const isFormValid: boolean = Boolean(title) && Boolean(content)

  // Update PostList after editing
  useGetAllPostsQuery()

  useEffect(() => {
    if (!post) return
    setTitle(post.title)
    setContent(post.content)
  }, [post])

  async function handlePostUpdate() {
    if (!isFormValid) return

    try {
      await updatePost({
        id: postId,
        updatedDate: new Date().toISOString(),
        title,
        content,
      })
      setIsEditMode(false)
      setAlerts(alerts.concat(<Alert variant='success'>Post has been updated.</Alert>))
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

  function toggleModal() {
    setIsModalActive(!isModalActive)
  }

  function renderPostPanel() {
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
            type='button'
            isDisabled={isPending}
            onClick={() => setIsEditMode(true)}
          />
          <Button
            className={s.button}
            label='Delete'
            variant='primary'
            type='button'
            isDisabled={isPending}
            onClick={toggleModal}
          />
        </div>
        <DeletionModal
          app={app}
          isActive={isModalActive}
          toggleModal={toggleModal}
          postId={postId}
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
            type='button'
            isDisabled={!isFormValid || isPending}
            isPending={isPending}
            onClick={handlePostUpdate}
          />
          <Button
            className={s.button}
            label='Cancel'
            variant='primary'
            type='button'
            isDisabled={isPending}
            onClick={cancelEditing}
          />
        </div>
      </form>
    )
  }

  if (!post || isLoading) {
    return <Spinner className={s.spinner} />
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <>
        <div className={s.image}>
          <Image src={post.image} sizes='100vw' layout='fill' objectFit='cover' priority alt='' />
        </div>
        <div className={s.inner}>
          {alerts.length !== 0 && (
            <div className={s.alertBox} hidden={isEditMode}>
              {alerts.map((item, index) => {
                return <React.Fragment key={index}>{item}</React.Fragment>
              })}
            </div>
          )}
          {!isEditMode ? renderPostPanel() : renderEditingForm()}
        </div>
      </>
    </>
  )
}
