import type { NextPage } from "next"
import Head from "next/head"
import { Layout } from "~/layouts/Layout"

const Page: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page Title</title>
      </Head>

      <h1>Hello world!!!</h1>
    </Layout>
  )
}

export default Page
