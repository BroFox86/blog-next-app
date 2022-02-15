import type { NextPage } from 'next'
import Head from 'next/head'

import { AddPostForm } from '~/components/AddPostForm'
import { Layout } from '~/components/common/Layout'
import { PostList } from '~/components/PostList'
import { app } from '~/services/app'

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
