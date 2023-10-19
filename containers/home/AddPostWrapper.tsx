import { AddPostForm } from '~/containers/home/AddPostForm'
import { PostList } from '~/containers/home/PostList'
import { app } from '~/services/app'

export function AddPostWrapper() {
  return (
    <>
      <AddPostForm app={app} />
      <PostList />
    </>
  )
}
