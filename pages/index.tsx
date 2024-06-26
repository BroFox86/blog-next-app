import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/layout'
import { Home } from '~/containers/home/home'

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
