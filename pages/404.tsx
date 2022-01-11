import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/common/Layout'
import { PageNotFound } from '~/components/common/PageNotFound'

const Error404: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page not found</title>
      </Head>
      <PageNotFound />
    </Layout>
  )
}

export default Error404
