import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/Layout'
import { AddPostWrapper } from '~/containers/home/AddPostWrapper'

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
