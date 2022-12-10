import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/common/Layout'
import { AddPostForm } from '~/components/index/AddPostForm'
import { PostList } from '~/components/index/PostList'
import { app } from '~/services/app'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mock Blog Application</title>
      </Head>
      <AddPostForm app={app} />
      <PostList />
    </Layout>
  )
}

export default Home
