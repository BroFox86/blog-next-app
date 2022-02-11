import type { NextPage } from 'next'

import { app } from '~/app/services/app'
import { Layout } from '~/components/common/Layout'
import { SinglePost } from '~/components/posts/SinglePost'

const PostPage: NextPage = () => {
  return (
    <Layout app={app}>
      <SinglePost />
    </Layout>
  )
}

export default PostPage
