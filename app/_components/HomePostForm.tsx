'use client'

import { useState, useTransition } from 'react'

import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import { addPostAction } from '@/lib/actions'
import { TITLE_MAX_LENGTH } from '@/utils/constants'
import { getCleanText } from '@/utils/format'
import { useNotify } from '@/utils/useNotify'

import s from './HomePage.module.scss'

export function HomePostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const notify = useNotify()

  async function handleAddPost() {
    const cleanContent = getCleanText(content)

    if (title === '' || cleanContent === '') {
      notify.fillOut()
      return
    }

    startTransition(async () => {
      const result = await addPostAction(title, content)

      if (result?.error) {
        notify.error('Error: Unable to add new post.')
        return
      }

      notify.addPost()

      setTitle('')
      setContent('')
    })
  }

  return (
    <form className={s.form}>
      <Input
        label='Post title'
        name='post-title'
        autoComplete='off'
        placeholder='Title text'
        minLength={2}
        maxLength={TITLE_MAX_LENGTH}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Editor content={content} onChange={setContent} />
      <Button variant='primary' label='Add' pending={isPending} onClick={handleAddPost} />
    </form>
  )
}
