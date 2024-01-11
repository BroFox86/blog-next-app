import type { NextPage } from 'next'

import { Layout } from '~/components/layout'
import { PageNotFound } from '~/components/page-not-found'

const Error404: NextPage = () => {
  return (
    <Layout>
      <PageNotFound />
    </Layout>
  )
}

export default Error404
