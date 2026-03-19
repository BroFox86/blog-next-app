import parse from 'html-react-parser'

import { Button } from '@/components/Button'
import type { Post } from '@/lib/db'
import { formatDate } from '@/utils/formatDate'

import s from './Post.module.scss'
import { PostDeleteModal } from './PostDeleteModal'

type Props = {
  slug: string
  post: Post
  handleDeletePost: () => void
}

export function PostView({ slug, post: { title, content, date, editedDate }, handleDeletePost }: Props) {
  return (
    <>
      <header>
        <h1 className={s.title}>{title}</h1>
        <p className={s.postInfo}>
          {formatDate(date)}{' '}
          <span className={s.updatedDate}>{editedDate && `(edited on ${formatDate(editedDate, true)})`}</span> by&nbsp;
          <span className={s.author}>Guest</span>
        </p>
      </header>
      <hr />
      <div className='postBody'>{parse(content)}</div>
      <hr />
      <form className={s.buttons} action={handleDeletePost} id='delete-post-form'>
        <Button className={s.button} as='link' href={`/posts/${slug}?edit=true`} label='Edit' variant='primary' />
        <PostDeleteModal postTitle={title} />
      </form>
    </>
  )
}
