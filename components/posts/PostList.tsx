import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { PostState, useGetAllPostsQuery } from '~/app/services/postApi'
import { Button } from '~/components/common/Button'
import { Spinner } from '~/components/common/Spinner'
import { useAppSelector } from '~/hooks/redux'
import { formatDate } from '~/utilities/formatDate'

import s from './PostList.module.scss'

export function PostList() {
  const { data, isLoading } = useGetAllPostsQuery()
  const hasDarkTheme = useAppSelector(state => state.app.darkTheme)
  const posts = data?.posts
  let sortedPosts

  if (posts) {
    sortedPosts = posts.slice().sort((a, b) => {
      return b.date.localeCompare(a.date)
    })
  }

  return (
    <section className={clsx(s.container, hasDarkTheme && s.hasDarkTheme)}>
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
  const formattedDate = formatDate(date)

  // Add space instead of a closing tag, remove all tags, trim and reduce the text.
  let excerpt = content.replace(/<\/[^>]*>/gm, ' ').replace(/<[^>]*>/gm, '')
  excerpt = excerpt.slice(0, 200)
  excerpt = excerpt.trim()

  if (excerpt.length >= 190) {
    excerpt += '...'
  }

  return (
    <article className={s.post}>
      <div className={s.imageWrapper}>
        <Image src={image} sizes='(min-width: 700px) 432px, 340px' layout='fill' objectFit='cover' alt='' />
        <div className={s.date}>{formattedDate}</div>
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
          {excerpt}
        </p>
        <Button className={s.button} as='link' variant='primary' label='View post' href={`/posts/${id}`} />
      </div>
    </article>
  )
}
