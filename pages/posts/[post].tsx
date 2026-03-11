import type { NextPage } from 'next'

import { Layout } from '~/components/Layout'
import { PostWrapper } from '~/containers/post/PostWrapper'

const PostPage: NextPage = () => {
  return (
    <Layout>
      <PostWrapper />
    </Layout>
  )
}

export default PostPage
