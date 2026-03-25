'use client'

import { useRouter } from 'next/navigation'

import { useAlert } from '@/app/_components/AlertProvider'
import { updatePostAction } from '@/app/posts/[slug]/actions'
import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'

type Props = {
  post: Post
}

export function PostEdit({ post }: Props) {
  const { slug, title, content } = post
  const { dispatch } = useAlert()
  const router = useRouter()

  async function formAction(formData: FormData) {
    const handleUpdatePost = updatePostAction.bind(null, post)
    const response = await handleUpdatePost(formData)
    const { slug, alertData } = response

    dispatch({ type: 'ADD_ALERT', payload: alertData })

    if (alertData.type === 'error') {
      return
    }

    router.push(`./${slug}`)
  }

  return (
    <form className={s.editForm}>
      <Input
        label='Post title'
        name='title'
        defaultValue={title}
        maxLength={100}
        autoComplete='off'
        placeholder=''
        required
      />
      <Editor content={content} />
      <div className={s.buttons}>
        <Button className={s.button} type='submit' formAction={formAction} variant='primary' label='Save' />
        <Button className={s.button} as='link' href={`/posts/${slug}`} variant='primary' label='Cancel' />
      </div>
    </form>
  )
}
