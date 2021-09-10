import type { NextPage } from "next"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "~/hooks/redux"
import { fetchPosts } from "~/components/posts/postsSlice"
import { Layout } from "~/layouts/Layout"
import { SinglePost } from "~/components/posts/SinglePost"

const PostPage: NextPage = () => {
  const postsStatus = useAppSelector((state) => state.posts.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts())
    }
  },[postsStatus, dispatch])

  return (
    <Layout>
      <SinglePost />
    </Layout>
  )
}

export default PostPage
