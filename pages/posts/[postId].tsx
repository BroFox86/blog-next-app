import type { NextPage } from 'next'

import { Layout } from '~/components/common/Layout'
import { PostWrapper } from '~/components/PostWrapper'
import { app } from '~/services/app'

const PostPage: NextPage = () => {
  return (
    <Layout app={app}>
      <PostWrapper />
    </Layout>
  )
}

export default PostPage
