import type { NextPage } from 'next'

import { SinglePost } from '~/components/posts/SinglePost'
import { Layout } from '~/layouts/Layout'

const PostPage: NextPage = () => {
  return (
    <Layout>
      <SinglePost />
    </Layout>
  )
}

export default PostPage
