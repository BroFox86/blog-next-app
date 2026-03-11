import type { NextPage } from 'next'

import { Layout } from '~/components/Layout'
import { NotFound } from '~/containers/NotFound'

const Error404: NextPage = () => {
  return (
    <Layout>
      <NotFound />
    </Layout>
  )
}

export default Error404
