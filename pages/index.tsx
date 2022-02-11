import type { NextPage } from 'next'
import Head from 'next/head'

import { app } from '~/app/services/app'
import { Layout } from '~/components/common/Layout'
import { AddPostForm } from '~/components/posts/AddPostForm'
import { PostList } from '~/components/posts/PostList'

const Home: NextPage = () => {
  return (
    <Layout app={app}>
      <Head>
        <title>Mock Blog Application</title>
      </Head>
      <AddPostForm app={app} />
      <PostList />
    </Layout>
  )
}

export default Home
