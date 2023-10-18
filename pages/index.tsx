import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/common/Layout'
import { AddPostWrapper } from '~/components/index/AddPostWrapper'

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
