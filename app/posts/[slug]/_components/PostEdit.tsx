import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'
import type { Post } from '@/lib/db'

import s from './Post.module.scss'

type Props = {
  slug: string
  post: Post
  handleUpdatePost: (formData: FormData) => void
}

export function PostEdit({ slug, post: { title, content }, handleUpdatePost }: Props) {
  return (
    <form className={s.editForm} action={handleUpdatePost}>
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
        <Button className={s.button} type='submit' label='Save' variant='primary' />
        <Button className={s.button} as='link' href={`/posts/${slug}`} label='Cancel' variant='primary' />
      </div>
    </form>
  )
}
