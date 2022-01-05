import type { NextPage } from 'next'
import Head from 'next/head'

import { AddPostForm } from '~/components/posts/AddPostForm'
import { PostList } from '~/components/posts/PostList'
import { Layout } from '~/layouts/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mock Blog Application</title>
      </Head>
      <AddPostForm />
      <PostList />
    </Layout>
  )
}

export default Home
