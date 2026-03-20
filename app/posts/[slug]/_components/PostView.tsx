import parse from 'html-react-parser'

import { deletePostAction } from '@/app/posts/[slug]/actions'
import { Button } from '@/components/Button'
import type { Post } from '@/lib/generated/prisma/client'
import { formatDate } from '@/utils/formatDate'

import s from './Post.module.scss'
import { PostDeleteModal } from './PostDeleteModal'

type Props = {
  post: Post
}

export function PostView({ post: { id, slug, title, content, createdAt } }: Props) {
  const handleDeletePost = deletePostAction.bind(null, id)
  const createdAtString = createdAt.toISOString()
  // const updatedAtString = updatedAt.toISOString()

  return (
    <>
      <header>
        <h1 className={s.title}>{title}</h1>
        <p className={s.postInfo}>
          {formatDate(createdAtString)}{' '}
          {/* <span className={s.updatedAt}>{updatedAt && `(edited on ${formatDate(updatedAtString, true)})`}</span> by&nbsp; */}
          {/* <span className={s.author}>Guest</span> */}
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
