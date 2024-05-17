import type { NextPage } from 'next'

import { Layout } from '~/components/layout'
import { NotFound } from '~/containers/not-found'

const Error404: NextPage = () => {
  return (
    <Layout>
      <NotFound />
    </Layout>
  )
}

export default Error404
