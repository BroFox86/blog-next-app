// import { redirect, RedirectType } from 'next/navigation'

import { updatePostAction } from '@/app/posts/[slug]/actions'
// import { cancelEditAction } from '@/app/posts/[slug]/actions'
import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import type { Post } from '@/lib/generated/prisma/client'

import s from './Post.module.scss'

type Props = {
  post: Post
}

export function PostEdit({ post: { id, slug, title, content } }: Props) {
  // const handleCancelEdit = cancelEditAction.bind(null, slug)
  const handleUpdatePost = updatePostAction.bind(null, id)

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
        <Button className={s.button} type='submit' formAction={handleUpdatePost} variant='primary' label='Save' />
        <Button
          className={s.button}
          as='link'
          // type='submit'
          // formAction={handleCancelEdit}
          href={`/posts/${slug}`}
          variant='primary'
          label='Cancel'
        />
      </div>
    </form>
  )
}
