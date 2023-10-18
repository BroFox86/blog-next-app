import { AddPostForm } from '~/components/index/AddPostForm'
import { PostList } from '~/components/index/PostList'
import { app } from '~/services/app'

export function AddPostWrapper() {
  return (
    <>
      <AddPostForm app={app} />
      <PostList />
    </>
  )
}
