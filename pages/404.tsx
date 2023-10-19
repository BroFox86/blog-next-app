import type { NextPage } from 'next'

import { Layout } from '~/components/Layout'
import { PageNotFound } from '~/components/PageNotFound'

const Error404: NextPage = () => {
  return (
    <Layout>
      <PageNotFound />
    </Layout>
  )
}

export default Error404
