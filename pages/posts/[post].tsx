import type { NextPage } from 'next'

import { Layout } from '~/components/layout'
import { PostWrapper } from '~/containers/post/post-wrapper'

const PostPage: NextPage = () => {
  return (
    <Layout>
      <PostWrapper />
    </Layout>
  )
}

export default PostPage
