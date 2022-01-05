import parse from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useGetAllPostsQuery, useGetPostQuery, useUpdatePostMutation } from '~/app/services/postApi'
import { formatDate } from '~/utilities/formatDate'
import { useScrollLock } from '~/utilities/useScrollLock'

import { Button } from '../common/Button'
import { Spinner } from '../common/Spinner'
import { DeletionModal } from './DeletionModal'
import { PostForm } from './PostForm'
import s from './SinglePost.module.scss'

export function SinglePost() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const router = useRouter()
  const postId = String(router.query.postId)
  const { data, isLoading } = useGetPostQuery(postId)
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  // Update PostList after editing
  useGetAllPostsQuery()

  const isPending = isUpdating || isDeleting
  const post = data?.post
  const isFormValid: boolean = Boolean(title) && Boolean(content)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  useScrollLock('isFixedByModal', isModalActive)

  function toggleModal() {
    setIsModalActive(isModalActive ? false : true)
  }

  async function handlePostUpdate() {
    if (!isFormValid) return

    await updatePost({
      id: postId,
      updatedDate: new Date().toISOString(),
      title,
      content,
    })

    setIsEditMode(false)
  }

  function cancelEditing() {
    if (!post) return
    setIsEditMode(false)
    setTitle(post.title)
    setContent(post.content)
  }

  if (!post || isLoading) {
    return <Spinner extraStyles={s.spinner} />
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <>
        <div className={s.image}>
          <Image src={post.image} sizes='100vw' layout='fill' objectFit='cover' priority={true} alt='' />
        </div>
        <div className={s.inner}>
          {!isEditMode ? (
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
                  extraStyles={s.button}
                  label='Edit'
                  variant='primary'
                  type='button'
                  isDisabled={isPending}
                  onClick={() => setIsEditMode(true)}
                />
                <Button
                  extraStyles={s.button}
                  label='Delete'
                  variant='primary'
                  type='button'
                  isDisabled={isPending}
                  onClick={toggleModal}
                />
              </div>
              <DeletionModal
                isActive={isModalActive}
                toggleModal={toggleModal}
                postId={postId}
                setIsDeleting={setIsDeleting}
              />
            </>
          ) : (
            <form className={s.editForm}>
              <PostForm title={title} content={content} setTitle={setTitle} setContent={setContent} />
              <div className={s.buttons}>
                <Button
                  extraStyles={s.button}
                  label='Save'
                  variant='primary'
                  type='button'
                  isDisabled={!isFormValid || isPending}
                  isPending={isPending}
                  onClick={handlePostUpdate}
                />
                <Button
                  extraStyles={s.button}
                  label='Cancel'
                  variant='primary'
                  type='button'
                  isDisabled={isPending}
                  onClick={cancelEditing}
                />
              </div>
            </form>
          )}
        </div>
      </>
    </>
  )
}
