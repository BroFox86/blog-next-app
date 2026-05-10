'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import { updatePostAction } from '@/lib/actions'
import type { Post } from '@/lib/generated/prisma/client'
import { TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from '@/utils/constants'
import { getCleanText, getSafeHtml } from '@/utils/format'
import { useNotify } from '@/utils/useNotify'

import s from './Post.module.scss'

export function PostEdit({ post }: { post: Post }) {
  const { id, slug, title: postTitle, content: postContent } = post
  const [title, setTitle] = useState(postTitle)
  const [content, setContent] = useState(postContent)
  const [isPending, startTransition] = useTransition()
  const notify = useNotify()
  const router = useRouter()

  async function handleUpdate() {
    const cleanTitle = title.trim()
    const textContent = getCleanText(content)

    if (cleanTitle === '' || textContent === '') {
      notify.fillOut()
      return
    }

    const safeContent = getSafeHtml(content)

    if (cleanTitle === postTitle && safeContent === postContent) {
      notify.noChanges()
      return
    }

    if (cleanTitle.length < TITLE_MIN_LENGTH) {
      notify.shortTitle(TITLE_MIN_LENGTH)
      return
    }

    if (cleanTitle.length > TITLE_MAX_LENGTH) {
      notify.longTitle(TITLE_MAX_LENGTH)
      return
    }

    startTransition(async () => {
      const result = await updatePostAction({ id, title: cleanTitle, content })

      if (result?.error) {
        notify.error('Error: Unable to update the post')
        return
      }

      notify.updatePost()

      router.replace(`./${result.slug}`)
    })
  }

  return (
    <form className={s.editForm}>
      <Input
        label='Post title'
        name='post-title'
        defaultValue={postTitle}
        minLength={TITLE_MIN_LENGTH}
        maxLength={TITLE_MAX_LENGTH}
        autoComplete='off'
        placeholder=''
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Editor content={content} onChange={setContent} />
      <div className={s.controlButtons}>
        <Button variant='primary' label='Update' pending={isPending} onClick={handleUpdate} />
        <Button as='link' href={`/posts/${slug}`} variant='primary' label='Cancel' pending={isPending} />
      </div>
    </form>
  )
}
