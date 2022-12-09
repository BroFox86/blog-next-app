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

  function renderResult() {
    const posts = data?.posts

    if (!posts) return

    if (posts.length === 0) {
      return <p className={s.noPostsMessage}>You have no posts...</p>
    }

    const sortedPosts = posts.slice().sort((a, b) => {
      return b.date.localeCompare(a.date)
    })

    return (
      <div className={s.postList}>
        {sortedPosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    )
  }

  return (
    <section className={s.container}>
      <h2 className={s.title}>Your Posts</h2>
      {isLoading ? <Spinner /> : renderResult()}
    </section>
  )
}

function Post({ id, date, image, title, content }: PostState) {
  return (
    <article className={s.post}>
      <div className={s.imageWrapper}>
        <Image
          className={s.image}
          src={image}
          sizes='(min-width: 1000px) 432px, (min-width: 700px) 354px, 368px'
          alt=''
          fill
        />
        <div className={s.date}>{formatDate(date)}</div>
      </div>
      <div className={s.postInner}>
        <h3 className={s.postHeading}>
          <Link className={s.link} href={`/posts/${id}`} suppressHydrationWarning>
            {title}
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
