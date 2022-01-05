import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/layouts/Layout'

import s from './404.module.scss'

const Error404: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page not found</title>
      </Head>
      <div className={s.error_404}>
        <h1 className={s.heading}>Oops! Page not found</h1>
        <h2 className={s.errorNumber}>404</h2>
        <p className={s.message}>
          We are sorry, but the page you requested
          <br /> was not found
        </p>
      </div>
    </Layout>
  )
}

export default Error404
