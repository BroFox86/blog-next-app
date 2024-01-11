import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/layout'
import { AddPostWrapper } from '~/containers/home/add-post-wrapper'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mock Blog Application</title>
      </Head>
      <AddPostWrapper />
    </Layout>
  )
}

export default Home
