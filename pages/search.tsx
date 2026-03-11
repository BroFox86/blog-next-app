import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/components/Layout'
import { Search } from '~/containers/search/Search'

const SearchPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mock Blog Application</title>
      </Head>
      <Search />
    </Layout>
  )
}

export default SearchPage
