import parse from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Alert } from '~/components/common/Alert'
import { Button } from '~/components/common/Button'
import { Editor } from '~/components/common/Editor'
import { Input } from '~/components/common/Input'
import { DeletePostModal } from '~/components/DeletePostModal'
import { app } from '~/services/app'
import { PostState, useGetAllPostsQuery, useUpdatePostMutation } from '~/services/postApi'
import { formatDate } from '~/utilities/formatDate'

import s from './Post.module.scss'

export function Post({ post }: { post: PostState }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([])
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const isPending = isUpdating || isDeleting
  const isFormValid: boolean = Boolean(title) && Boolean(content)

  // Update PostList after editing
  useGetAllPostsQuery()

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

  function toggleModal() {
    setIsModalActive(!isModalActive)
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
          <Button className={s.button} label='Delete' variant='primary' isDisabled={isPending} onClick={toggleModal} />
        </div>
        <DeletePostModal
          app={app}
          isActive={isModalActive}
          toggleModal={toggleModal}
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
        <div className={s.image}>
          <Image src={post.image} sizes='100vw' alt='' fill priority />
        </div>
        <div className={s.inner}>
          {alerts.length !== 0 && (
            <div className={s.alertBox} hidden={isEditMode}>
              {alerts.map((item, index) => {
                return <React.Fragment key={index}>{item}</React.Fragment>
              })}
            </div>
          )}
          {!isEditMode ? renderPostBody() : renderEditingForm()}
        </div>
      </>
    </>
  )
}
