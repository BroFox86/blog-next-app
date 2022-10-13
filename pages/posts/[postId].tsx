import type { NextPage } from 'next'

import { Layout } from '~/components/common/Layout'
import { PostWrapper } from '~/components/PostWrapper'

const PostPage: NextPage = () => {
  return (
    <Layout>
      <PostWrapper />
    </Layout>
  )
}

export default PostPage
