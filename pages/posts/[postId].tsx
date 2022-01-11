import type { NextPage } from 'next'

import { Layout } from '~/components/common/Layout'
import { SinglePost } from '~/components/posts/SinglePost'

const PostPage: NextPage = () => {
  return (
    <Layout>
      <SinglePost />
    </Layout>
  )
}

export default PostPage
