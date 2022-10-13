import type { NextPage } from 'next'

import { Layout } from '~/components/common/Layout'
import { PageNotFound } from '~/components/common/PageNotFound'

const Error404: NextPage = () => {
  return (
    <Layout>
      <PageNotFound />
    </Layout>
  )
}

export default Error404
