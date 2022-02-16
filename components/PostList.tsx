import Image from 'next/image'
import Link from 'next/link'

import { Button } from '~/components/common/Button'
import { Spinner } from '~/components/common/Spinner'
import { PostState, useGetAllPostsQuery } from '~/services/postApi'
import { formatDate } from '~/utilities/formatDate'
import { getTextExcerpt } from '~/utilities/getTextExcerpt'

import s from './PostList.module.scss'

export function PostList() {
  const { data, isLoading } = useGetAllPostsQuery()
  const posts = data?.posts
  let sortedPosts

  if (posts) {
    sortedPosts = posts.slice().sort((a, b) => {
      return b.date.localeCompare(a.date)
    })
  }

  return (
    <section className={s.container}>
      <h2 className={s.title}>Your Posts</h2>

      {isLoading ? (
        <Spinner />
      ) : sortedPosts ? (
        <div className={s.postList}>
          {sortedPosts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      ) : (
        <p className={s.noPostsMessage}>You have no posts!</p>
      )}
    </section>
  )
}

function Post({ id, date, image, title, content }: PostState) {
  return (
    <article className={s.post}>
      <div className={s.imageWrapper}>
        <Image src={image} sizes='(min-width: 700px) 432px, 340px' layout='fill' objectFit='cover' alt='' />
        <div className={s.date}>{formatDate(date)}</div>
      </div>
      <div className={s.postInner}>
        <h3 className={s.postHeading}>
          <Link href={`/posts/${id}`}>
            <a className={s.link} suppressHydrationWarning>
              {title}
            </a>
          </Link>
        </h3>
        <p className={s.excerpt} suppressHydrationWarning>
          {getTextExcerpt(content)}
        </p>
        <Button className={s.button} as='link' variant='primary' label='View post' href={`/posts/${id}`} />
      </div>
    </article>
  )
}
