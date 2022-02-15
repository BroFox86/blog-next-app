import type { NextPage } from 'next'

import { Layout } from '~/components/common/Layout'
import { SinglePost } from '~/components/SinglePost'
import { app } from '~/services/app'

const PostPage: NextPage = () => {
  return (
    <Layout app={app}>
      <SinglePost />
    </Layout>
  )
}

export default PostPage
