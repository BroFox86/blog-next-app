import type { NextPage } from 'next'

import { Layout } from '~/components/common/Layout'
import { PageNotFound } from '~/components/common/PageNotFound'
import { app } from '~/services/app'

const Error404: NextPage = () => {
  return (
    <Layout app={app}>
      <PageNotFound />
    </Layout>
  )
}

export default Error404
