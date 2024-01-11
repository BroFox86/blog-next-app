import { AddPostForm } from '~/containers/home/add-post-form'
import { PostList } from '~/containers/home/post-list'
import { app } from '~/services/app'

export function AddPostWrapper() {
  return (
    <>
      <AddPostForm app={app} />
      <PostList />
    </>
  )
}
