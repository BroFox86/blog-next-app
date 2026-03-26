'use client'

import { useState, useTransition } from 'react'

import { useAlert } from '@/app/_components/AlertProvider'
import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import { addPostAction } from '@/lib/actions'
import { setAddPostAlert, setErrorAlert, setFillOutAlert } from '@/utils/alerts'
import { getCleanText } from '@/utils/format'

import s from './HomePage.module.scss'

export function HomePostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const { dispatch } = useAlert()

  async function handleAddPost() {
    const textContent = getCleanText(content)

    if (title === '' || textContent === '') {
      setFillOutAlert(dispatch)
      return
    }

    try {
      startTransition(async () => {
        await addPostAction(title, content)
      })

      setAddPostAlert(dispatch, title)

      setTitle('')
      setContent('')
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'

      console.log(errorMessage)

      setErrorAlert(dispatch, 'Error: unable to add new post.')
    }
  }

  return (
    <form className={s.form}>
      <Input
        label='Post title'
        autoComplete='off'
        placeholder='Title text'
        maxLength={100}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Editor content={content} onChange={setContent} />
      <Button className={s.button} variant='primary' label='Add' pending={isPending} onClick={handleAddPost} />
    </form>
  )
}
