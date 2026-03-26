'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { useAlert } from '@/app/_components/AlertProvider'
import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import { updatePostAction } from '@/lib/actions'
import type { Post } from '@/lib/generated/prisma/client'
import { setErrorAlert, setFillOutAlert, setNoChangesAlert, setUpdatePostAlert } from '@/utils/alerts'
import { getCleanText } from '@/utils/format'

import s from './Post.module.scss'

type Props = {
  post: Post
}

export function PostEdit({ post }: Props) {
  const { id, slug, title: postTitle, content: postContent } = post
  const [title, setTitle] = useState(postTitle)
  const [content, setContent] = useState(postContent)
  const [isPending, startTransition] = useTransition()
  const { dispatch } = useAlert()
  const router = useRouter()

  async function handleUpdate() {
    const textContent = getCleanText(content)

    if (title === '' || textContent === '') {
      setFillOutAlert(dispatch)
      return
    }

    if (title === postTitle && content === postContent) {
      setNoChangesAlert(dispatch)
      return
    }

    try {
      startTransition(async () => {
        const newSlug = await updatePostAction(id, title, content)

        setUpdatePostAlert(dispatch, title)

        router.push(`./${newSlug}`)
      })
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'

      console.log(errorMessage)

      setErrorAlert(dispatch, 'Error: Unable to update the post')
    }
  }

  return (
    <form className={s.editForm}>
      <Input
        label='Post title'
        defaultValue={postTitle}
        maxLength={100}
        autoComplete='off'
        placeholder=''
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Editor content={content} onChange={setContent} />
      <div className={s.buttons}>
        <Button className={s.button} variant='primary' label='Save' pending={isPending} onClick={handleUpdate} />
        <Button
          className={s.button}
          as='link'
          href={`/posts/${slug}`}
          variant='primary'
          label='Cancel'
          pending={isPending}
        />
      </div>
    </form>
  )
}
