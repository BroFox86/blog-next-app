import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "~/hooks/redux"
import { fetchPosts, PostState } from "./postsSlice"
import clsx from "clsx"
import { Button } from "../common/Button"
import { Spinner } from "../common/Spinner"
import s from "./PostList.module.scss"

export function PostList() {
  const hasDarkTheme = useAppSelector(state => state.darkTheme)
  const posts = useAppSelector((state) => state.posts)
  const postsStatus = useAppSelector((state) => state.posts.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  return (
    <section className={clsx(s.container, hasDarkTheme && s.hasDarkTheme)}>
      <h2 className={s.title}>
        {postsStatus === "loading" ?
          "Your Posts" 
          :
          posts.list.length ? "Your Posts" : "You have no posts!"
        }
      </h2>

      {postsStatus === "loading" ?
        <Spinner />
        :
        <div className={s.postList}>
          {posts.list.map((post, index) => <Post key={index} {...post} />)}
        </div>
      }
    </section>
  )
}

function Post({ id, date, image, title, content }: PostState) {
  // Add space instead of a closing tag, remove all tags, trim and reduce the text.
  let excerpt = content.replace(/<\/[^>]*>/gm, " ").replace(/<[^>]*>/gm, "")
  excerpt = excerpt.trim()
  excerpt = excerpt.slice(0, 200) + "..."
  
  return (
    <article className={s.post}>
      <div className={s.imageWrapper}>
        <Image
          src={image}
          sizes="(min-width: 700px) 432px, 340px"
          layout="fill"
          objectFit="cover"
          alt=""
        />
        <div className={s.date}>
          {date}
        </div>
      </div>
      <div className={s.postInner}>
        <h3 className={s.postHeading}>
          <Link href={`/posts/${id}`}>
            <a className={s.link} suppressHydrationWarning>{title}</a>
          </Link>
        </h3>
        <p className={s.excerpt} suppressHydrationWarning>
          {excerpt}
        </p>
        <Button
          extraStyles={s.button}
          as="link"
          variant="primary"
          label="View post"
          href={`/posts/${id}`}
        />
      </div>
    </article>
  )
}
