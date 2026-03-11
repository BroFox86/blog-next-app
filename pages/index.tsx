import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/Layout'
import { Home } from '~/containers/home/Home'

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mock Blog Application</title>
      </Head>
      <Home />
    </Layout>
  )
}

export default HomePage
